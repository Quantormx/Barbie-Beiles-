import {AppError,enforceAudience,hasContactConsent,confirmation,commercialNote} from './ella-crece.js';
// Durable checkpoints; uncertain external writes are held for reconciliation, not resent.
export async function processOne({store,client,cfg,env,clock=Date.now}){
 const lease=await store.acquire();if(!lease)return {state:'busy'};let key,record;const started=clock();
 try{
  await store.heartbeat();key=await store.next();if(!key)return {state:'idle'};record=await store.get(key);
  if(!record){await store.finish(key,{status:'review_required',error:'expired_job_payload'},lease);return {state:'review_required'};}
  if(['complete','suppressed','review_required'].includes(record.status)){await store.finish(key,record,lease);return {state:record.status};}
  const v=record.lead;enforceAudience(v,cfg);
  if(!hasContactConsent(v)){const terminal={...record,status:'suppressed'};delete terminal.lead;await store.finish(key,terminal,lease);return {state:'suppressed'};}
  if(record.inflight)throw new AppError('uncertain_previous_write',503);
  record.status='processing';record.attempts++;await store.save(key,record,lease);
  const check=()=>{if(clock()-started>35000)throw new AppError('yield_to_next_worker',503,true);};
  async function checkpoint(name,value){record.steps[name]=value;await store.save(key,record,lease);return value;}
  async function effect(name,action){check();if(record.steps[name]!==undefined)return record.steps[name];record.inflight=name;await store.save(key,record,lease);const result=await action();record.steps[name]=result??true;delete record.inflight;await store.save(key,record,lease);return record.steps[name];}
  if(!record.steps.contactId){check();const matches=await client.findContacts(v.email);if(matches.length>1)throw new AppError('multiple_contacts_need_review',503);const id=matches.length?matches[0].id:await effect('contactCreated',()=>client.createContact(v));await checkpoint('contactId',id);}
  const contactId=record.steps.contactId;
  if(!record.steps.contactDetails){check();const current=await client.getContact(contactId);if(!current.emails?.some(e=>e.email?.toLowerCase()===v.email))await effect('emailAdded',()=>client.addEmail(contactId,v.email));if(!current.phones?.some(p=>String(p.phone).replace(/\D/g,'')===v.phone.replace(/\D/g,'')))await effect('phoneAdded',()=>client.addPhone(contactId,v.phone));await checkpoint('contactDetails',true);}
  if(!record.steps.dealId){check();const external=`ella-crece:${v.formId}:${v.submissionId}`,matches=(await client.contactDeals(contactId)).filter(d=>d.pipelineId===187604&&d.externalDealId===external);if(matches.length>1)throw new AppError('multiple_deals_need_review',503);const id=matches.length?matches[0].id:await effect('dealCreated',()=>client.createDeal(v,contactId));await checkpoint('dealId',id);}
  await effect('noteCreated',()=>client.note(record.steps.dealId,commercialNote(v)));
  if(cfg.emailEnabled){check();if(await client.suppressed(v.email))await checkpoint('emailStatus','suppressed');else{if(!await client.smtpAllowed(env.ELLA_CRECE_SENDER_EMAIL))throw new AppError('sender_not_allowed',503);await effect('smtpMessageId',()=>client.send(confirmation(v,env.ELLA_CRECE_SENDER_EMAIL)));await checkpoint('emailStatus','accepted_by_provider_not_delivery_verified');}}
  else await checkpoint('emailStatus','disabled_no_message_sent');
  const terminal={...record,status:'complete',completedAt:clock(),score:v.scoring,isTest:v.isTest};delete terminal.lead;await store.finish(key,terminal,lease);
  return {state:'complete',crmSynced:true,emailStatus:record.steps.emailStatus};
 }catch(error){const code=error instanceof AppError?error.code:'unexpected_failure';if(record&&key){record.error=code;if(error.retryable&&!record.inflight&&record.attempts<8){record.status='retry';await store.retry(key,record,lease);}else{record.status='review_required';await store.finish(key,record,lease);}return {state:record.status,code};}throw error;}
 finally{await store.release(lease);}
}
