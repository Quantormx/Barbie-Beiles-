// Ella Crece: commercial triage only. Never use this score to approve credit.
export const FORM_ID = '6DjDrJ';
const pick = (v) => Array.isArray(v) ? (v[0] ?? '') : (v ?? '');
const normalize = (s) => String(pick(s)).trim().toLocaleLowerCase('es-MX');
export function fieldValue(fields, startsWith) {
  const f = fields.find(f => normalize(f.label).startsWith(normalize(startsWith)));
  if (!f) return '';
  const v = f.value;
  if (Array.isArray(v) && v.length && f.options?.length) return v.map(id => f.options.find(o=>o.id===id)?.text ?? id)[0];
  return pick(v);
}
export function parseSubmission(payload) {
  if (payload.eventType !== 'FORM_RESPONSE' || payload.data?.formId !== FORM_ID || !payload.data?.submissionId) throw new Error('Unexpected Tally event');
  const f = payload.data.fields || [];
  const values = {
    formal: fieldValue(f,'1. ¿Tu negocio'),
    age: fieldValue(f,'2. ¿Cuánto tiempo'),
    sales: fieldValue(f,'3. ¿En qué rango'),
    amount: fieldValue(f,'4. ¿Qué monto'),
    purpose: fieldValue(f,'5. ¿Para qué'),
    urgency: fieldValue(f,'6. ¿Cuándo'),
    name: fieldValue(f,'Nombre completo'),
    email: normalize(fieldValue(f,'Correo electrónico')),
    phone: fieldValue(f,'WhatsApp'),
    consent: fieldValue(f,'Autorización de contacto'),
    ceo: fieldValue(f,'perfil_ceo'),
    origin: fieldValue(f,'origen'),
    utmSource: fieldValue(f,'utm_source'),
    utmCampaign: fieldValue(f,'utm_campaign'),
  };
  if (!values.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) throw new Error('Missing valid email');
  return {submissionId:payload.data.submissionId, ...values, isTest:normalize(values.name).includes('test ella crece')};
}
const starts=(text,prefix)=>normalize(text).startsWith(normalize(prefix));
export function scoreLead(v) {
  const formal = starts(v.formal,'Sí,') ? 25 : starts(v.formal,'Está en proceso') ? 12 : 0;
  const age = starts(v.age,'3 años') ? 20 : starts(v.age,'Entre 1') ? 13 : 5;
  const sales = starts(v.sales,'Más de') ? 20 : starts(v.sales,'De $150') ? 15 : starts(v.sales,'De $50') ? 10 : 5;
  const purpose = starts(v.purpose,'Expansión') || starts(v.purpose,'Equipo') ? 20 : starts(v.purpose,'Inventario') ? 18 : starts(v.purpose,'Capital') ? 15 : 10;
  const urgency = starts(v.urgency,'Lo antes') ? 15 : starts(v.urgency,'En los próximos') ? 10 : 3;
  const amount = v.amount || '';
  const total = formal + age + sales + purpose + urgency;
  const priority = total >= 75 ? 'alta' : total >= 45 ? 'media' : 'nutricion';
  return {total,priority,amount,breakdown:{formal,age,sales,purpose,urgency},note:'Priorización comercial; no es evaluación ni aprobación de crédito'};
}
export function hasContactConsent(v) {
  return Array.isArray(v.consent) ? v.consent.length > 0 : normalize(v.consent).includes('acepto');
}
