# Ella Crece - implementación operativa / PR 8

## Estado y alcance
Preparación en rama, NO activación comercial. No fusionar a main hasta completar configuración privada y prueba real. Las pruebas automatizadas usan datos ficticios y proveedores simulados; no prueban credenciales, entrega SMTP ni ejecución de Redis real.

## Flujo
Tally 6DjDrJ -> POST firmado /api/ella-crece/webhook -> cola Redis durable -> /api/ella-crece/worker protegido -> SendPulse contacto + oportunidad + nota -> confirmación individual opcional.
El webhook responde después de la escritura atómica, sin esperar al CRM. Un worker procesa un registro por invocación, guarda avances y detiene escrituras ambiguas para reconciliación humana; no se promete entrega distribuida exactamente-una-vez.

## Implementado
Firma HMAC, formulario autorizado, opciones y consentimiento exactos, límite 128 KB, ventana de replay de 7 días, lista de pruebas por correo y nombre. IDs de contacto y huellas protegidos con HMAC. Redis con bloqueo renovable, checkpoints, reintentos y cola de revisión. Variables y datos no se imprimen en logs.
CRM usa pipeline 187604: alta 654666, media 654665, orientación 654668. Score comercial preliminar de 100 puntos, no solvencia ni aprobación. Monto solicitado conservado, no puntuado como capacidad de pago. Perfil CEO recibido de URL no verificada, sin peso en score.
Correo desactivado por defecto; exige remitente realmente habilitado en SMTP y consulta bajas. Sin fallback Gmail, envíos masivos, WhatsApp ni campañas promocionales. Seguimiento humano indicado en nota; no están activados los toques 2/5/10/15 días.
Build conserva las páginas públicas y agrega transferencia de UTM/perfil_ceo al iframe y enlace alternativo. No cambia diseño ni fuente HTML. El directorio estático .site excluye backend, pruebas, documentación y archivos de entorno.

## Configuración privada pendiente
En Vercel > barbie-beiles > Settings > Environment Variables > Preview, rama feature/ella-crece-crm-webhook-20261110:
- SENDPULSE_CLIENT_ID y SENDPULSE_CLIENT_SECRET. El acceso del conector ChatGPT no se transfiere a las funciones de Vercel.
- UPSTASH_REDIS_REST_URL y UPSTASH_REDIS_REST_TOKEN de una base persistente privada. No se compró ni creó una base en esta preparación.
- ELLA_CRECE_TALLY_SIGNING_SECRET, CRON_SECRET y ELLA_CRECE_ID_SECRET: tres secretos aleatorios distintos, mínimo 32 caracteres. El primero también se configura en Tally; el tercero debe permanecer estable para deduplicación.
- ELLA_CRECE_TEST_EMAILS: únicamente el correo de prueba autorizado, no prospectos. No guardar datos reales de prueba en el repositorio público.
- ELLA_CRECE_WORKER_READY=false hasta configurar la ejecución del worker. Para el chequeo inicial, habilitar true en preview con base vacía y credenciales completas.
- ELLA_CRECE_EMAIL_ENABLED=false y ELLA_CRECE_SMTP_VERIFIED=false hasta validar soporte@barbiebeiles.com para SMTP.
- ELLA_CRECE_STORE_NAMESPACE=barbie-preview. Usar uno diferente en producción.
Nunca pegar claves en chat, GitHub o archivos públicos. .env.example contiene solamente nombres y valores de ejemplo.

## Prueba de aceptación
1. npm test y npm run build; confirmar build de preview.
2. Acceder autenticado a Vercel, sin desactivar protección. GET /api/ella-crece/status con Authorization: Bearer CRON_SECRET. ?providers=1 comprueba Redis, pipeline y remitente; no equivale a prueba integral.
3. POST de fixture firmado, nombre TEST ELLA CRECE y correo autorizado. Esperar 202 queued. Esto no indica correo enviado.
4. POST /api/ella-crece/worker autenticado. Comprobar contacto, oportunidad, nota, score y emailStatus=disabled_no_message_sent.
5. Repetir payload idéntico: already_received, sin duplicados. Mismo ID con respuestas distintas: 409. Probar firma inválida, no consentimiento, destinatario no permitido y errores.
6. Después de validar remitente, habilitar envío solamente en pruebas y usar un nuevo ID ficticio autorizado. Confirmar ID SMTP Y recepción en bandeja; API aceptada no demuestra entrega.

La preview está protegida. Tally requiere acceso autorizado y acotado antes de conectar su webhook; no retirar protección global. Mientras tanto usar fixture firmado mediante acceso autenticado. El conector Tally disponible no configura webhooks: hacerlo en Integrations > Webhooks al contar con URL verificable y signing secret.

## Perfil CEO pendiente en Tally
El CTA del quiz 1AZoNL debe agregar perfil_ceo con el campo calculado fa626b35-45f9-4d7d-a868-274765a71535. Mantener UTM. No se publica ese cambio al quiz desde esta rama. La web puede reenviar un perfil, no inventarlo si no llega. Verificar el campo en la respuesta guardada, no solo la marca visual o URL.

## Programador, alojamiento y producción
La cuenta consultada usa Hobby. Vercel declara Hobby para uso personal/no comercial y limita la frecuencia de cron. Confirmar plan apto para esta operación comercial; no se cambió plan ni se autorizó gasto.
Después de verificar preview/plan, configurar cron Vercel: {"path":"/api/ella-crece/worker","schedule":"* * * * *"}. NO se habilita en este commit. Vercel envía Authorization: Bearer CRON_SECRET. La cola sola no procesa registros; se necesita programador activo y latido comprobado. Un job por minuto es capacidad inicial; vigilar backlog y ampliar antes de escalar.
Antes de producción: aviso de privacidad aprobado y visible antes de captura, consentimiento y scoring comercial revisados, secretos productivos, namespace separado, remitente verificado, alertas, prueba integral y aprobación de publicación. ELLA_CRECE_MODE=live requiere VERCEL_ENV=production, ELLA_CRECE_LIVE_APPROVED=true y ELLA_CRECE_PRIVACY_URL. Esos flags no sustituyen la revisión real.
Preparar build productivo sin asignar dominios, probar y promover con autorización; no promover una preview con secretos de prueba.

## Operación
Status requiere bearer y expone conteos/nombres de variables faltantes, nunca secretos ni respuestas. Al completar CRM se elimina lead de la cola; metadatos y registros para revisión duran hasta 30 días. Establecer retención también en Tally/CRM.
Revisar alertas por pending creciente, reviewRequired>0 o latido ausente. Ante escritura incierta: revisar Redis y el registro real CRM/SMTP, reconciliar ID antes de reencolar. Nunca borrar inflight ni reenviar a ciegas. Recuperación ambigua es manual e intencional.
Para detener: ELLA_CRECE_MODE=disabled, redeploy y pausar webhook Tally; conservar evidencia, no borrar contactos.

## Fuentes primarias
https://tally.so/help/webhooks
https://login.sendpulse.com/api/crm-service/v1/openapi/en
https://sendpulse.com/integrations/api/smtp
https://upstash.com/docs/redis/features/restapi
https://vercel.com/docs/plans/hobby
https://vercel.com/docs/cron-jobs/usage-and-pricing
