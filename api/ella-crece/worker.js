import {AppError,authorized,settings} from '../../lib/ella-crece.js';
import {RedisStore,SendPulse} from '../../lib/ella-crece-services.js';
import {processOne} from '../../lib/ella-crece-worker.js';
export default async function handler(req,res){
 res.setHeader('Cache-Control','no-store');if(!['GET','POST'].includes(req.method))return res.status(405).json({error:'method_not_allowed'});
 if(!authorized(req.headers.authorization,process.env.CRON_SECRET))return res.status(401).json({error:'unauthorized'});
 try{const cfg=settings();if(!cfg.ready||!['test','live'].includes(cfg.mode))throw new AppError('worker_not_ready',503);const out=await processOne({store:new RedisStore(process.env),client:new SendPulse(process.env),cfg,env:process.env});return res.status(out.state==='review_required'?503:200).json(out);}catch(e){return res.status(503).json({error:e instanceof AppError?e.code:'worker_error'});}
}
