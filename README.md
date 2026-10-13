# El Alquimista — web de Barbie Beiles

Paquete editable estático (HTML + CSS + JavaScript) reconstruido a partir de la última dirección creativa y los assets guardados en **Proyecto Influencer**.

## Abrir localmente

No requiere build ni dependencias. Abre `index.html` en el navegador.

Para una prueba con servidor local:

```bash
python -m http.server 8080
```

y visita `http://localhost:8080`.

## Estructura

- `index.html` — estructura y contenido de la landing.
- `styles.css` — diseño responsive y sistema visual.
- `script.js` — contador persistente, navegación, testimonios, checkout y medición.
- `assets/` — hero, retrato de Barbie, pilares y método de 21 días.
- `source-material/` — referencia de decisiones y contenido fuente.

## Compra

Todos los CTA de compra apuntan a:

https://pay.hotmart.com/T95794906V?checkoutMode=2

Los CTA del encabezado, hero y método llevan a la sección de inversión. Los de la tarjeta de precio y el cierre abren el checkout de Hotmart, con enlace directo de respaldo. WhatsApp conserva el contacto existente.

Precio implementado: **$37 USD**, modalidad única **autoguiada**.

La narrativa final del recorrido queda como:

**Identidad → Regulación → Claridad → Expansión → Integración**

El bloque de oferta se mantiene en una sola tarjeta: programa autoguiado, pago único y CTA directo a Hotmart.

## Publicación

El sitio es estático y se publica desde `main` de `Quantormx/Barbie-Beiles-` en el proyecto `barbie-beiles` de Vercel. Dominio: https://www.barbiebeiles.com.

## Nota de versión

La actualización del 12 de octubre de 2026 integra el mockup HTML v2 aprobado. El contador conserva los 59 minutos por visitante y la clave existente de localStorage; cada valor parpadea al cambiar y el plazo no se reinicia al recargar. Respeta la preferencia de movimiento reducido. Véase `source-material/ajustes-2026-10-12.md`.
