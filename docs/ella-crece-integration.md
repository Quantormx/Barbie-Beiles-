# ELLA CRECE — integración Tally / SendPulse (rama de preparación)

## Alcance actual
- Se añade una función Vercel en \`/api/ella-crece/webhook\` y librería independiente.
- La función verifica firma HMAC-SHA256 del encabezado \`Tally-Signature\`, restringe el form ID a \`6DjDrJ\`, valida el payload y calcula scoring comercial.
- **DRY RUN obligatorio**: ningún contacto, oportunidad ni correo se crea/envía desde el endpoint.
- No cambia la landing \`creditos/index.html\`, el quiz, las rutas existentes ni \`main\`.

## Prueba local
Usar Node.js 24 (proyecto Vercel), ejecutar \`node --test tests/ella-crece.test.mjs\`.
En el entorno de preview: definir \`ELLA_CRECE_TALLY_SIGNING_SECRET\` como secreto (no guardar en GitHub).
El webhook no estará activo hasta que se conecte manualmente desde Tally / Integrations / Webhooks y se pruebe con firma válida.

## Requisitos pendientes para activar CRM
1. Validar esquema real y contrato del OAuth2 CRM API de SendPulse: \`https://api.sendpulse.com/oauth/access_token\`; base CRM documentada por SendPulse, con endpoints para contactos y deals.
2. Crear adaptador backend OAuth2 para buscar contacto por email, crear/actualizar contacto, crear una única oportunidad por submissionId y registrar puntuación/contenido sin duplicados.
3. **Persistencia atómica externa** para idempotencia por \`submissionId\`; en serverless una variable en memoria no sirve. Los reintentos de Tally pueden repetir el evento.
4. Verificar avisos de privacidad y autorización específica antes de remitir datos a la entidad financiera; contacto no equivale a marketing ni a transferencia.
5. Configurar credenciales SendPulse solo en secretos de Vercel (Preview antes de Production); no hacerlas visibles en código ni logs.
6. Añadir y probar email transaccional usando remitente aprobado; seguir deshabilitado hasta autorización.
7. Probar rutas de error: firma inválida, duplicado, ausencia de consentimiento, reintentos, error SendPulse, y validación de datos.
8. Preservar el perfil CEO entre quiz y landing, usando parámetro seguro \`perfil_ceo\`, sin asumir que el branding de la página equivale al campo capturado.
9. Revisar preview/PR y aplicar aprobación antes de merge y publicación. No conectar webhook de producción a preview con datos reales.

## Política de puntuación
- Facturación/formalización: 25
- Antigüedad: 20
- Ventas autodeclaradas: 20
- Finalidad: 20
- Urgencia: 15

Este score sirve solo para **ordenar la revisión humana comercial**. No concede ni rechaza créditos, ni estima capacidad de pago o solvencia.

## Referencias
- https://tally.so/help/webhooks
- https://sendpulse.com/integrations/api/crm
