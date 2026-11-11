import {AppError,readJson,validSignature,parseSubmission,hasContactConsent,settings,enforceAudience} from '../../lib/ella-crece.js';
import {RedisStore} from '../../lib/ella-crece-services.js';
export function createHandler({env=process.env,storeFactory=e=>new RedisStore(e)}={}){return async(req,res)=>{
 res.setHeader('Cache-Control','no-store');if(req.method!=='POST'){res.setHeader('Allow','POST');return res.status(405).json({error:'method_not_allowed'});}
 try{
  const cfg=settings(env);if(!cfg.ready)throw new AppError('integration_not_ready',503);
  const payload=await readJson(req);if(!validSignature(payload,req.headers['tally-signature'],env.ELLA_CRECE_TALLY_SIGNING_SECRET))throw new AppError('invalid_signature',401);
  const v=parseSubmission(payload);enforceAudience(v,cfg);const age=Date.now()-Date.parse(v.submittedAt);if(age>7*86400000||age< -300000)throw new AppError('submission_outside_replay_window');
  if(!hasContactConsent(v))return res.status(200).json({ok:true,status:'suppressed_no_contact_consent',crmSynced:false,emailSent:false});
  if(cfg.mode==='dry_run')return res.status(200).json({ok:true,mode:'dry_run',score:v.scoring.total,priority:v.scoring.priority,crmSynced:false,emailSent:false});
  const saved=await storeFactory(env).enqueue(v);return res.status(202).json({ok:true,status:saved.duplicate?'already_received':'queued',crmSynced:false,emailSent:false});
 }catch(e){return res.status(e instanceof AppError?e.status:503).json({ok:false,error:e instanceof AppError?e.code:'internal_error'});}
};}
export default createHandler();
