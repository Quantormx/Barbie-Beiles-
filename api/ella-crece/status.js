import {authorized,settings} from '../../lib/ella-crece.js';
import {RedisStore,SendPulse} from '../../lib/ella-crece-services.js';
export default async function handler(req,res){
 res.setHeader('Cache-Control','no-store');if(req.method!=='GET')return res.status(405).json({error:'method_not_allowed'});
 if(!authorized(req.headers.authorization,process.env.CRON_SECRET))return res.status(401).json({error:'unauthorized'});
 const cfg=settings(),out={service:'ella-crece',mode:cfg.mode,configurationReady:cfg.ready,missing:cfg.missing,emailEnabled:cfg.emailEnabled,liveVerified:false};
 try{
  if(process.env.UPSTASH_REDIS_REST_TOKEN){out.queue=await new RedisStore(process.env).health();out.workerRecentlySeen=Number(out.queue.lastWorkerAt)>Date.now()-300000;}
  if(req.query?.providers==='1'&&process.env.SENDPULSE_CLIENT_SECRET){const c=new SendPulse(process.env),p=await c.request('/crm/v1/pipelines/187604');out.crmReachable=p.data?.id===187604;out.expectedStagesPresent=[654665,654666,654668].every(id=>p.data?.steps?.some(s=>s.id===id));out.senderAllowed=process.env.ELLA_CRECE_SENDER_EMAIL?await c.smtpAllowed(process.env.ELLA_CRECE_SENDER_EMAIL):false;}
  return res.status(cfg.ready?200:503).json(out);
 }catch{return res.status(503).json({...out,configurationReady:false,error:'provider_check_failed'});}
}
