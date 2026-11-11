import {createHmac,timingSafeEqual} from 'node:crypto';
export const FORM_ID='6DjDrJ', VERSION='commercial-v2';
export const CONSENT='Acepto que el equipo de ELLA CRECE con Bárbara Beiles me contacte por correo o WhatsApp para dar seguimiento a mi interés.';
export class AppError extends Error{constructor(code,status=422,retryable=false){super(code);this.code=code;this.status=status;this.retryable=retryable;}}
const text=v=>typeof v==='string'?v.normalize('NFC').trim():'';
const norm=v=>text(v).toLowerCase();
const FIELDS={formal:['4PP6bo','1. ¿Tu negocio está formalizado y factura actualmente?'],age:['jGGRV9','2. ¿Cuánto tiempo lleva operando tu negocio?'],sales:['2OOW6b','3. ¿En qué rango están tus ventas mensuales aproximadas? (MXN)'],amount:['x99qW9','4. ¿Qué monto te gustaría explorar para tu negocio? (MXN)'],purpose:['ZPP7Bv','5. ¿Para qué utilizarías el financiamiento principalmente?'],urgency:['N88jZb','6. ¿Cuándo te gustaría contar con ese capital?'],name:['qjjrlk','Nombre completo'],email:['Q88ZQk','Correo electrónico'],phone:['922kK4','WhatsApp (con lada)'],consent:['e99JXo','Autorización de contacto']};
export const OPTIONS={formal:[['Sí, está formalizado y factura',25],['Está en proceso de formalización',12],['No, aún no factura',0]],age:[['Menos de 12 meses',5],['Entre 1 y 2 años',13],['3 años o más',20]],sales:[['Menos de $50,000',5],['De $50,000 a $150,000',10],['De $150,001 a $500,000',15],['Más de $500,000',20]],amount:[['Hasta $100,000',0],['De $100,001 a $300,000',0],['De $300,001 a $700,000',0],['Más de $700,000',0]],purpose:[['Capital de trabajo',15],['Inventario',18],['Equipo o infraestructura',20],['Expansión del negocio',20],['Mejorar flujo de efectivo',10]],urgency:[['Lo antes posible',15],['En los próximos 1 a 3 meses',10],['Por ahora solo quiero explorar opciones',3]]};
export function fieldValue(fields,id,label){
 const keyed=fields.filter(f=>f.key===`question_${id}`||f.key===id||f.id===id);
 const found=keyed.length?keyed:fields.filter(f=>norm(f.label)===norm(label));
 if(found.length>1)throw new AppError('duplicate_field');const f=found[0];if(!f)return '';
 const values=Array.isArray(f.value)?f.value:[f.value];if(values.length>1)throw new AppError('unexpected_multiple_answers');
 if(f.options!==undefined&&!Array.isArray(f.options))throw new AppError('invalid_options');
 return values.map(v=>text(f.options?.find(o=>o&&o.id===v)?.text??v))[0]||'';
}
export const hasContactConsent=v=>norm(v.consent)===norm(CONSENT);
export function scoreLead(v){
 const breakdown={};for(const [key,choices]of Object.entries(OPTIONS)){const option=choices.find(([label])=>norm(label)===norm(v[key]));if(!option)throw new AppError(`unknown_${key}`);if(key!=='amount')breakdown[key]=option[1];}
 const total=Object.values(breakdown).reduce((a,b)=>a+b,0);return {total,priority:total>=75?'alta':total>=45?'media':'nutricion',breakdown,version:VERSION};
}
export function parseSubmission(p){
 const d=p?.data;if(p?.eventType!=='FORM_RESPONSE'||d?.formId!==FORM_ID)throw new AppError('unexpected_form_or_event');
 if(!/^[A-Za-z0-9_-]{1,100}$/.test(d.submissionId||''))throw new AppError('invalid_submission_id');
 if(!Array.isArray(d.fields)||d.fields.length>80||d.fields.some(f=>!f||typeof f!=='object'))throw new AppError('invalid_fields');
 const v=Object.fromEntries(Object.entries(FIELDS).map(([k,[id,label]])=>[k,fieldValue(d.fields,id,label)]));v.email=norm(v.email);
 if(!v.name||v.name.length>128||/[\r\n<>]/.test(v.name))throw new AppError('invalid_name');
 if(v.email.length>128||!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(v.email))throw new AppError('invalid_email');
 v.phone=v.phone.replace(/[\s().-]/g,'');if(/^\d{10}$/.test(v.phone))v.phone='+52'+v.phone;if(!/^\+[1-9]\d{7,14}$/.test(v.phone))throw new AppError('invalid_phone');
 v.formId=d.formId;v.submissionId=d.submissionId;v.submittedAt=d.createdAt||p.createdAt;
 if(typeof v.submittedAt!=='string'||!Number.isFinite(Date.parse(v.submittedAt)))throw new AppError('invalid_submitted_at');
 v.isTest=/^TEST ELLA CRECE\b/i.test(v.name);const ceo=fieldValue(d.fields,'perfil_ceo','perfil_ceo');v.ceo=['CEO Visión','CEO Constructora','CEO Imprescindible'].includes(ceo)?ceo:'';
 v.ceoSource=v.ceo?'unverified_url_not_used_for_scoring':'not_received';v.attribution={};for(const key of ['origen','utm_source','utm_medium','utm_campaign']){const value=fieldValue(d.fields,key,key);if(value.length<=100&&/^[\p{L}\p{N}_ .-]*$/u.test(value))v.attribution[key]=value;}
 v.scoring=scoreLead(v);return v;
}
const equal=(a,b)=>{if(typeof a!=='string')return false;const x=Buffer.from(a),y=Buffer.from(b);return x.length===y.length&&timingSafeEqual(x,y);};
export const mac=(value,secret)=>createHmac('sha256',secret).update(value).digest('hex');
export function validSignature(p,header,secret){return !!secret&&secret.length>=32&&equal(header,createHmac('sha256',secret).update(JSON.stringify(p)).digest('base64'));}
export const authorized=(header,secret)=>!!secret&&secret.length>=32&&equal(header,`Bearer ${secret}`);
export function settings(e=process.env){
 const mode=e.ELLA_CRECE_MODE||'disabled',emailEnabled=e.ELLA_CRECE_EMAIL_ENABLED==='true',missing=[];
 if(!['disabled','dry_run','test','live'].includes(mode))missing.push('ELLA_CRECE_MODE');
 for(const key of ['ELLA_CRECE_TALLY_SIGNING_SECRET','CRON_SECRET'])if((e[key]||'').length<32)missing.push(key);
 if(['test','live'].includes(mode)){for(const key of ['UPSTASH_REDIS_REST_URL','UPSTASH_REDIS_REST_TOKEN','SENDPULSE_CLIENT_ID','SENDPULSE_CLIENT_SECRET'])if(!e[key])missing.push(key);if((e.ELLA_CRECE_ID_SECRET||'').length<32)missing.push('ELLA_CRECE_ID_SECRET');if(e.ELLA_CRECE_WORKER_READY!=='true')missing.push('ELLA_CRECE_WORKER_READY');}
 const allowlist=(e.ELLA_CRECE_TEST_EMAILS||'').split(',').map(norm).filter(Boolean);if(mode==='test'&&!allowlist.length)missing.push('ELLA_CRECE_TEST_EMAILS');
 if(mode==='live'){if(e.VERCEL_ENV!=='production')missing.push('PRODUCTION_REQUIRED');if(e.ELLA_CRECE_LIVE_APPROVED!=='true')missing.push('ELLA_CRECE_LIVE_APPROVED');if(!/^https:\/\//.test(e.ELLA_CRECE_PRIVACY_URL||''))missing.push('ELLA_CRECE_PRIVACY_URL');}
 if(emailEnabled&&(e.ELLA_CRECE_SMTP_VERIFIED!=='true'||!e.ELLA_CRECE_SENDER_EMAIL))missing.push('VERIFIED_SMTP_SENDER');return {mode,emailEnabled,missing,allowlist,ready:mode!=='disabled'&&!missing.length};
}
export function enforceAudience(v,c){if(c.mode==='test'&&(!v.isTest||!c.allowlist.includes(v.email)))throw new AppError('test_recipient_not_allowed',403);if(c.mode==='live'&&v.isTest)throw new AppError('test_record_in_live_mode',403);}
export async function readJson(req){
 const max=131072;if(!String(req.headers?.['content-type']||'').toLowerCase().startsWith('application/json'))throw new AppError('json_required',415);if(Number(req.headers?.['content-length']||0)>max)throw new AppError('payload_too_large',413);let raw;
 if(req.body!==undefined)raw=typeof req.body==='object'&&!Buffer.isBuffer(req.body)?JSON.stringify(req.body):req.body;
 else{let n=0;const chunks=[];for await(const c of req){n+=Buffer.byteLength(c);if(n>max)throw new AppError('payload_too_large',413);chunks.push(Buffer.from(c));}raw=Buffer.concat(chunks);}
 if(Buffer.byteLength(raw||'')>max)throw new AppError('payload_too_large',413);try{return JSON.parse(String(raw));}catch{throw new AppError('invalid_json',400);}
}
export function confirmation(v,from){return {from:{name:'Ella Crece con Bárbara Beiles',email:from},to:[{email:v.email}],subject:`${v.isTest?'[PRUEBA INTERNA] ':''}Ella Crece | Recibimos tu información`,text:`${v.isTest?'PRUEBA INTERNA. EMPRESA FICTICIA. NO ES UNA SOLICITUD REAL.\n\n':''}Hola, ${v.name}.\n\nRecibimos tus respuestas sobre tu negocio. El equipo de Ella Crece revisará la información para orientarte sobre el siguiente paso.\n\nEste registro no es una solicitud formal ni una oferta o aprobación de crédito. No compartiremos tus datos con una entidad financiera sin tu autorización específica.\n\nEste correo confirma tu registro y no te incorpora a una campaña promocional.\n\nEquipo Ella Crece`};}
export function commercialNote(v){const next=v.scoring.priority==='alta'?'Revisión humana el siguiente día hábil':v.scoring.priority==='media'?'Revisión humana dentro de 2 días hábiles':'Orientación solicitada; sin campaña automática';return [`ELLA CRECE ${v.isTest?'| PRUEBA INTERNA':''}`,`Referencia: ${FORM_ID}:${v.submissionId}`,`Score comercial: ${v.scoring.total}/100 | ${v.scoring.priority} | ${VERSION}`,'No es evaluación de solvencia ni aprobación de crédito.',...Object.keys(OPTIONS).map(k=>`${k}: ${v[k]}`),`Perfil CEO: ${v.ceo||'no recibido'}; URL no verificada, sin peso en score.`,`Contacto autorizado: ${v.submittedAt}. No autoriza marketing ni transferencia a una entidad financiera.`,`Siguiente acción: ${next}.`,'Pausar seguimiento si la persona responde, se opone o retira autorización.'].join('\n');}
