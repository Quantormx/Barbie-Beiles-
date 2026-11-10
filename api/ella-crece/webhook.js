import {createHmac,timingSafeEqual} from 'node:crypto';
import {FORM_ID,parseSubmission,scoreLead,hasContactConsent} from '../../lib/ella-crece.js';

// INERT BY DESIGN: this preview endpoint never sends email or creates CRM data.
// Activation requires a reviewed persistent idempotency store and verified CRM adapter.
function signatureValid(body, header, secret) {
  if (!header || !secret) return false;
  const expected=createHmac('sha256',secret).update(body).digest('base64');
  const a=Buffer.from(header.trim()), b=Buffer.from(expected);
  return a.length===b.length && timingSafeEqual(a,b);
}
export default async function handler(req,res) {
  res.setHeader('Cache-Control','no-store');
  if(req.method!=='POST') return res.status(405).json({error:'Method not allowed'});
  if(!process.env.ELLA_CRECE_TALLY_SIGNING_SECRET) return res.status(503).json({error:'Webhook not configured'});
  // Tally signs the serialized JSON payload. Read raw request bytes before parsing.
  const chunks=[];let size=0;
  for await(const chunk of req){size+=chunk.length;if(size>100000){return res.status(413).json({error:'Too large'});}chunks.push(chunk);}
  const raw=Buffer.concat(chunks).toString('utf8');
  let payload;
  try {payload=JSON.parse(raw);} catch {return res.status(400).json({error:'Invalid JSON'});}
  const signed=signatureValid(JSON.stringify(payload),req.headers['tally-signature'],process.env.ELLA_CRECE_TALLY_SIGNING_SECRET);
  if(!signed) return res.status(401).json({error:'Invalid signature'});
  if(payload.data?.formId!==FORM_ID) return res.status(422).json({error:'Wrong form'});
  let lead;
  try{lead=parseSubmission(payload);}catch{return res.status(422).json({error:'Invalid form response'});}
  const scoring=scoreLead(lead);
  // Do not log or echo PII; store only minimal metadata in test response.
  return res.status(200).json({ok:true,mode:'dry_run',submissionId:lead.submissionId,
    priority:scoring.priority,score:scoring.total,consent:hasContactConsent(lead),
    isTest:lead.isTest, crmSynced:false,emailSent:false,
    next:'Verify CRM API fields, persistent deduplication and authorized messaging before enabling writes'});
}
