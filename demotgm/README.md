# The Guide Method — immersive demo

Public route: `/demotgm`. The rest of the site is independent of this directory.

## Editing

The 18 original content sections are preserved in `src/content.html`. Edit that file for copy changes; `src/build-page.py` assembles them into six chapters. The generated `index.html`, `experience.js`, and CSS are deployed as static files.

```sh
cd demotgm
npm ci
npm run build
```

No runtime service keys, third-party CDN scripts, or generation API calls are required by visitors. Assets and fonts are served from this site. The original Hotmart checkout destinations are preserved.

## Rendering

- Seedance opening film with separate desktop and mobile encodes.
- Three.js WebGL2 scene with six environments, a continuous camera, glass materials, and animated GLB jellyfish.
- Tripo jellyfish: 64,648 triangles desktop / 29,552 mobile; Hunyuan crystals: 29,988 triangles.
- Six image backdrops when WebGL2 is unavailable, reduced motion is preferred, or data saving is enabled.
- Native page scroll, keyboard-accessible chapter links, pause control, mobile navigation, and native FAQ disclosures.

## Assets and generation

Created with Magnific on 2026-10-22 using Seedream 5 Pro (hero, model reference, and chapter artwork), Seedance 2.5 (10-second 1080p film), Tripo H3.1 (selected jellyfish), and Hunyuan 3D (crystal model and alternate jellyfish comparison). Total generation use for this iteration: 11,900 credits. Generated models are simplified and Meshopt-compressed; images use WebP.

Typography: Inter Tight, Manrope, and Bodoni Moda, from Google Fonts under their included SIL Open Font Licenses. Three.js license is retained in `experience.js.LEGAL.txt`.

## Verification record

Verified all 18 original content sections against the previous production page, unique IDs, local assets, navigation targets, checkout URLs, GLB Meshopt decoding, and finite geometry coordinates. Verified desktop and 390px mobile layouts, menu navigation, video playback, FAQ opening, and motion controls in the cloud browser. The cloud browser disables WebGL: its six-scene image fallback was visually verified; the live WebGL scene still requires a visual check on a GPU-enabled browser.

## Geometry and transition correction

The first deployed renderer transformed normalized Int16 vertex attributes in place. Scaling wrote values outside their representable range, folding the jellyfish and crystal meshes into a two-unit cube. `src/model-geometry.js` now expands decoded positions and normals to Float32 before applying world transforms. `npm test` loads all three compressed production models and verifies target height, centering, original proportions, and finite floating-point vertices.

The opening now gradually reveals the world as its introductory section leaves the viewport. Procedural foreground pyramids were removed; rings are thinner, dimmer, and fade before approaching the camera. Mobile framing keeps the jellyfish centered, and its rotation gently oscillates instead of continually turning away. Mobile image-backdrop crops and section gradients were adjusted for continuity.

Typography restored to the existing `/theguidemethod` identity: Inter Tight 900 uppercase headlines, Bodoni supporting statements, Manrope body copy, and the full THE GUIDE METHOD wordmark. Checked at 360px, 390px, and desktop widths; long closing headlines scale to fit mobile.
