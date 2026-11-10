import test from 'node:test';
import assert from 'node:assert/strict';
import {parseSubmission,scoreLead,hasContactConsent} from '../lib/ella-crece.js';
const fields=[
['1. ¿Tu negocio está formalizado y factura actualmente?','Sí, está formalizado y factura'],
['2. ¿Cuánto tiempo lleva operando tu negocio?','3 años o más'],
['3. ¿En qué rango están tus ventas mensuales aproximadas? (MXN)','Más de $500,000'],
['4. ¿Qué monto te gustaría explorar para tu negocio? (MXN)','De $300,001 a $700,000'],
['5. ¿Para qué utilizarías el financiamiento principalmente?','Expansión del negocio'],
['6. ¿Cuándo te gustaría contar con ese capital?','Lo antes posible'],
['Nombre completo','TEST ELLA CRECE BARBIE'],['Correo electrónico','test@example.org'],
['WhatsApp (con lada)','+525500000000'],
['Autorización de contacto','Acepto que el equipo de ELLA CRECE me contacte']
].map(([label,value])=>({label,value}));
test('fictional high-priority lead is accepted and scored',()=>{
 const record=parseSubmission({eventType:'FORM_RESPONSE',data:{formId:'6DjDrJ',submissionId:'TEST-1',fields}});
 assert.equal(record.isTest,true);
 assert.equal(scoreLead(record).total,100);
 assert.equal(scoreLead(record).priority,'alta');
 assert.equal(hasContactConsent(record),true);
});
test('unknown form cannot inject events',()=>assert.throws(()=>parseSubmission({eventType:'FORM_RESPONSE',data:{formId:'incorrect',submissionId:'x',fields}})));
test('contact consent missing means no contact',()=>assert.equal(hasContactConsent({consent:''}),false));
