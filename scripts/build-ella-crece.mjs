import {cp,mkdir,rm,readFile,writeFile,lstat} from 'node:fs/promises';
import {basename,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
const marker='/* EC_ATTRIBUTION_V2 */';
export function patchAttribution(source){
 if(source.includes(marker))return source;const needle='function resize(){if(window.Tally?.loadEmbeds)';
 if(source.split(needle).length!==2||!source.includes('tally.so/embed/6DjDrJ'))throw new Error('Unexpected credit landing: refusing unsafe patch');
 return source.replace(needle,`function resize(){${marker}
 const params=new URLSearchParams(window.location.search),frame=document.querySelector('iframe[data-tally-src]'),link=document.querySelector('.form-fallback a');
 function tracked(raw){const u=new URL(raw);for(const k of ['origen','utm_source','utm_medium','utm_campaign','perfil_ceo']){const v=params.get(k);if(!v||v.length>100)continue;if(k==='perfil_ceo'&&!['CEO Visión','CEO Constructora','CEO Imprescindible'].includes(v))continue;if(k!=='perfil_ceo'&&!/^[a-zA-Z0-9_ .-]+$/.test(v))continue;u.searchParams.set(k,v);}return u.toString();}
 if(frame){frame.dataset.tallySrc=tracked(frame.dataset.tallySrc);if(frame.getAttribute('src'))frame.src=frame.dataset.tallySrc;}
 if(link)link.href=tracked(link.href);
 if(window.Tally?.loadEmbeds)`);
}
export const PUBLIC_ROOTS=['index.html','styles.css','script.js','assets','creditos','masterclass','theguidemethod','demotgm','dist'];
export async function build(root=process.cwd()){
 const out=resolve(root,'.site');await rm(out,{recursive:true,force:true});await mkdir(out,{recursive:true});
 for(const name of PUBLIC_ROOTS){const src=resolve(root,name);try{await lstat(src);}catch(e){if(e.code==='ENOENT')continue;throw e;}
  await cp(src,resolve(out,name),{recursive:true,filter:async path=>{if(basename(path).startsWith('.')||basename(path)==='node_modules')return false;if((await lstat(path)).isSymbolicLink())throw new Error('Symlink not allowed in public output');return true;}});
 }
 const page=resolve(out,'creditos/index.html');await writeFile(page,patchAttribution(await readFile(page,'utf8')));
 for(const forbidden of ['lib','api','tests','docs','.env','.env.example','package.json']){try{await lstat(resolve(out,forbidden));throw new Error('Private infrastructure exposed in static output');}catch(e){if(e.code!=='ENOENT')throw e;}}
 console.log('Static site built; backend, tests, documents and environment files excluded.');
}
if(process.argv[1]&&fileURLToPath(import.meta.url)===resolve(process.argv[1]))await build();
