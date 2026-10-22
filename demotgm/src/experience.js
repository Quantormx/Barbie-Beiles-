import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {MeshoptDecoder} from 'three/addons/libs/meshopt_decoder.module.js';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {EffectComposer} from 'three/addons/postprocessing/EffectComposer.js';
import {RenderPass} from 'three/addons/postprocessing/RenderPass.js';
import {UnrealBloomPass} from 'three/addons/postprocessing/UnrealBloomPass.js';
import {OutputPass} from 'three/addons/postprocessing/OutputPass.js';

const body=document.body;
const chapters=[...document.querySelectorAll('.chapter')];
const chapterLinks=[...document.querySelectorAll('[data-chapter]')];
const names=['El despertar','La brecha','El techo mental','El método','Tu expansión','Tu decisión'];
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const motionButton=document.querySelector('#motion-toggle');
const loading=document.querySelector('.loading-state');
const video=document.querySelector('#hero-film');
const menuButton=document.querySelector('.menu-toggle');
const menu=document.querySelector('#mobile-menu');
const sceneName=document.querySelector('#scene-name');
const sceneNumber=document.querySelector('#scene-number');
let manualPause=false;
try{manualPause=sessionStorage.getItem('tgm-motion')==='off';}catch{}
let paused=manualPause||reduced.matches;
let sceneProgress=0, bounds=[], renderOnDemand=()=>{}, videoInView=true;
let fallbackImages=[];

function closeMenu(){menu.hidden=true;menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Abrir menú');body.classList.remove('menu-open');}
menuButton.addEventListener('click',()=>{const open=menu.hidden;menu.hidden=!open;menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');body.classList.toggle('menu-open',open);});
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();menuButton.focus();}});

function updateMotion(){
  body.classList.toggle('motion-off',paused);
  motionButton.setAttribute('aria-pressed',String(paused));
  motionButton.setAttribute('aria-label',paused?'Activar movimiento':'Pausar movimiento');
  if(paused||document.hidden||!videoInView)video.pause();
  else if(video.currentSrc)video.play().catch(()=>{});
  renderOnDemand();
}
motionButton.addEventListener('click',()=>{paused=!paused;manualPause=paused;try{sessionStorage.setItem('tgm-motion',paused?'off':'on');}catch{}updateMotion();});
reduced.addEventListener('change',()=>{paused=reduced.matches||manualPause;updateMotion();});
updateMotion();
document.addEventListener('visibilitychange',updateMotion);
new IntersectionObserver(entries=>{videoInView=entries[0].isIntersecting;updateMotion();},{threshold:.05}).observe(document.querySelector('.hero-frame'));
video.addEventListener('playing',()=>{video.classList.add('is-playing');video.parentElement.classList.add('film-ready');});
video.addEventListener('error',()=>{video.classList.remove('is-playing');video.parentElement.classList.remove('film-ready');});
function loadFilm(){
  if(reduced.matches||navigator.connection?.saveData)return;
  video.src=innerWidth<700?'/demotgm/assets/hero-film-mobile.mp4':'/demotgm/assets/hero-film.mp4';
  video.load();
  if(!paused&&videoInView)video.play().catch(()=>{});
}
if('requestIdleCallback'in window)requestIdleCallback(loadFilm,{timeout:1800});else setTimeout(loadFilm,650);

function measure(){bounds=chapters.map(el=>({top:el.getBoundingClientRect().top+scrollY,height:el.offsetHeight}));updateScroll();}
let scrollQueued=false;
function updateScroll(){
  scrollQueued=false;
  body.classList.toggle('scrolled',scrollY>60);
  const y=scrollY+innerHeight*.24;
  let idx=0;
  for(let i=0;i<bounds.length;i++)if(y>=bounds[i].top)idx=i;
  const b=bounds[idx];
  if(!b)return;
  const local=THREE.MathUtils.clamp((y-b.top)/Math.max(1,b.height),0,1);
  sceneProgress=Math.min(5.85,idx+local);
  sceneName.textContent=names[idx];sceneNumber.textContent=String(idx+1).padStart(2,'0');
  chapterLinks.forEach((link,i)=>{if(i===idx)link.setAttribute('aria-current','step');else link.removeAttribute('aria-current');});
  body.dataset.scene=String(idx);
  if(fallbackImages.length){
    fallbackImages.forEach((image,i)=>{image.classList.toggle('is-active',i===idx);if(i===idx&&!paused)image.style.transform=`scale(${1.015+local*.065})`;});
  }
  const threshold=chapters[idx].querySelector('.chapter-threshold');
  const thresholdVisible=threshold&&threshold.getBoundingClientRect().top<innerHeight*.55&&threshold.getBoundingClientRect().bottom>innerHeight*.4;
  body.style.setProperty('--reading',thresholdVisible?'.15':'.92');
  renderOnDemand();
}
addEventListener('scroll',()=>{if(!scrollQueued){scrollQueued=true;requestAnimationFrame(updateScroll);}},{passive:true});
new ResizeObserver(measure).observe(document.querySelector('main'));
document.fonts.ready.then(measure);
measure();

function finishLoading(){loading.hidden=true;}
function fallback(error){
  body.classList.add('webgl-unavailable');body.classList.remove('world-ready');finishLoading();
  if(!fallbackImages.length){
    const layer=document.createElement('div');layer.className='scene-backdrops';layer.setAttribute('aria-hidden','true');
    ['hero','brecha','techo','metodo','expansion','decision'].forEach((name,i)=>{
      const image=new Image();image.src=`/demotgm/assets/${name}.webp`;image.alt='';image.decoding='async';image.className='scene-backdrop';
      if(i===Number(body.dataset.scene||0))image.classList.add('is-active');layer.append(image);fallbackImages.push(image);
    });body.prepend(layer);
  }
  body.dataset.graphics='fallback';
  if(error)console.warn('TGM: se mantiene la versión visual de respaldo.',error.message||error);
}

async function buildWorld(){
  if(reduced.matches||navigator.connection?.saveData){fallback();return;}
  const canvas=document.querySelector('#world');
  const mobile=matchMedia('(max-width:700px)').matches;
  let renderer;
  const attributes={alpha:true,antialias:!mobile,powerPreference:'high-performance'};
  const context=canvas.getContext('webgl2',attributes);
  if(!context){fallback();return;}
  try{renderer=new THREE.WebGLRenderer({canvas,context,...attributes});}catch(error){fallback(error);return;}
  renderer.setPixelRatio(Math.min(devicePixelRatio,mobile?1.25:1.5));
  renderer.setSize(innerWidth,innerHeight);
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure=1.15;
  renderer.setClearColor(0x140a13,0);
  const scene=new THREE.Scene();
  scene.fog=new THREE.FogExp2(0x1a0a16,.029);
  const camera=new THREE.PerspectiveCamera(mobile?48:43,innerWidth/innerHeight,.12,65);
  const pmrem=new THREE.PMREMGenerator(renderer);
  const envScene=new RoomEnvironment();
  const env=pmrem.fromScene(envScene,.035);
  scene.environment=env.texture;
  scene.environmentIntensity=1.05;
  envScene.dispose();pmrem.dispose();
  scene.add(new THREE.HemisphereLight(0xffdbe9,0x1c0b1a,2.5));
  const key=new THREE.DirectionalLight(0xffe0e7,3.7);key.position.set(3,5,6);scene.add(key);
  const rim=new THREE.DirectionalLight(0xe984ba,3);rim.position.set(-5,3,-4);scene.add(rim);
  const jellyLight=new THREE.PointLight(0xff85bd,38,16,2);scene.add(jellyLight);

  const composer=new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene,camera));
  const bloom=new UnrealBloomPass(new THREE.Vector2(innerWidth,innerHeight),mobile?.2:.27,.55,1.35);
  composer.addPass(bloom);composer.addPass(new OutputPass());
  const timeUniform={value:0};
  const crystalMat=new THREE.MeshPhysicalMaterial({color:0xd889ae,metalness:.12,roughness:.18,transmission:mobile?.08:.48,thickness:1.5,ior:1.45,clearcoat:1,clearcoatRoughness:.12,envMapIntensity:1.8,attenuationColor:new THREE.Color(0xe0a3bd),attenuationDistance:2.2});
  const darkGlass=crystalMat.clone();darkGlass.color.set(0x8a3e65);darkGlass.roughness=.22;darkGlass.transmission=.13;
  const paleGlass=crystalMat.clone();paleGlass.color.set(0xf1c7d3);paleGlass.transmission=mobile?.1:.6;
  const edgeMat=new THREE.MeshBasicMaterial({color:new THREE.Color(0xffb6d4).multiplyScalar(1.4),transparent:true,opacity:.65});
  const stages=[];const moving=[];
  const portalGeometry=new THREE.TorusGeometry(3.15,.065,12,96);
  function portal(parent,{x=0,y=0,z=0,sx=1,sy=1,rot=0,bright=false}={}){
    const g=new THREE.Group();g.position.set(x,y,z);g.scale.set(sx,sy,1);g.rotation.z=rot;
    const ring=new THREE.Mesh(portalGeometry,bright?edgeMat:paleGlass);g.add(ring);
    const outer=new THREE.Mesh(new THREE.TorusGeometry(3.2,.018,6,96),edgeMat);outer.position.z=-.06;g.add(outer);
    parent.add(g);return g;
  }
  function facetGeometry(){
    const shape=new THREE.CylinderGeometry(.03,1,3,5,1,false);shape.translate(0,1.5,0);return shape;
  }
  const facet=facetGeometry();
  let rngSeed=21022;
  const random=()=>{rngSeed=(rngSeed*1664525+1013904223)>>>0;return rngSeed/4294967296;};
  for(let i=0;i<6;i++){
    const group=new THREE.Group();group.position.z=-i*18;scene.add(group);stages.push(group);
    const count=mobile?5:8;
    for(let j=0;j<count;j++){
      const crystal=new THREE.Mesh(facet,j%3===0?paleGlass:darkGlass);
      const side=j%2===0?1:-1;
      crystal.position.set(side*(4+random()*4),-4-random()*2,-2-random()*13);
      crystal.scale.setScalar(.6+random()*1.5);crystal.scale.y=1+random()*1.3;
      crystal.rotation.set((random()-.5)*.7,random()*Math.PI,(random()-.5)*.8);
      group.add(crystal);
    }
  }
  // Six environments, composed around one uninterrupted camera path.
  portal(stages[0],{x:2.1,y:.6,z:-9,sx:1.2,sy:1.65,rot:-.13});
  portal(stages[1],{x:-3.3,y:.4,z:-4,sx:.8,sy:1.8,rot:.28});
  portal(stages[1],{x:3.6,y:-.4,z:-10,sx:1.05,sy:1.8,rot:-.2});
  const ceiling=new THREE.Group();stages[2].add(ceiling);
  for(let i=0;i<13;i++){
    const shard=new THREE.Mesh(new THREE.BoxGeometry(.7+random()*.7,.17+random()*.24,2+random()*2),crystalMat);
    shard.position.set((i-6)*1.1,3+random()*.8,-2-random()*11);
    shard.rotation.set(random()*.5,random()*.8,random()*.15);ceiling.add(shard);
    moving.push({object:shard,kind:'ceiling',base:shard.position.clone(),phase:i});
  }
  for(let i=0;i<5;i++)portal(stages[3],{x:Math.sin(i*.8)*1.1,y:Math.cos(i)*.3,z:-i*3,sx:1.2,sy:1.5,rot:i*.07,bright:i===4});
  const orbitGroup=new THREE.Group();orbitGroup.position.set(1.3,.6,-3);stages[4].add(orbitGroup);
  for(let i=0;i<8;i++){
    const a=i*Math.PI/4;const sphere=new THREE.Mesh(new THREE.IcosahedronGeometry(.35+(i%3)*.07,3),paleGlass);
    sphere.position.set(Math.cos(a)*3.1,Math.sin(a)*3.1,Math.sin(a*2)*1.7);
    orbitGroup.add(sphere);moving.push({object:sphere,kind:'orb',base:sphere.position.clone(),phase:i});
  }
  const orbitRing=portal(orbitGroup,{sx:1,sy:1,bright:true});orbitRing.rotation.x=.65;orbitRing.rotation.y=.45;
  const ring2=portal(orbitGroup,{sx:1.27,sy:1.27});ring2.rotation.x=1.1;ring2.rotation.y=-.4;
  portal(stages[5],{x:2.2,y:.2,z:-4,sx:1.4,sy:2,bright:true});
  portal(stages[5],{x:2.2,y:.2,z:-8,sx:1.55,sy:2.2,rot:.15});

  // Very fine, non-distracting particles establish scale and parallax.
  const particleCount=mobile?130:300;const positions=new Float32Array(particleCount*3);
  for(let i=0;i<particleCount;i++){positions[i*3]=(random()-.5)*26;positions[i*3+1]=(random()-.5)*17;positions[i*3+2]=7-random()*120;}
  const particleGeometry=new THREE.BufferGeometry();particleGeometry.setAttribute('position',new THREE.BufferAttribute(positions,3));
  const particles=new THREE.Points(particleGeometry,new THREE.PointsMaterial({color:0xf2bad8,size:.023,transparent:true,opacity:.6,depthWrite:false,sizeAttenuation:true}));scene.add(particles);
  const jellyRig=new THREE.Group();scene.add(jellyRig);
  const modelLoader=new GLTFLoader();modelLoader.setMeshoptDecoder(MeshoptDecoder);
  const assetBase='/demotgm/assets/';
  function normalizeModel(original,targetHeight){
    original.updateMatrixWorld(true);
    const box=new THREE.Box3().setFromObject(original),center=box.getCenter(new THREE.Vector3()),size=box.getSize(new THREE.Vector3());
    const output=new THREE.Group(),scale=targetHeight/Math.max(size.y,.001);
    original.traverse(node=>{if(node.isMesh){
      const geometry=node.geometry.clone().applyMatrix4(node.matrixWorld);geometry.translate(-center.x,-center.y,-center.z);geometry.scale(scale,scale,scale);
      const mesh=new THREE.Mesh(geometry,node.material);output.add(mesh);
    }});return output;
  }
  let jellyLoaded=false;
  const models=await Promise.allSettled([
    modelLoader.loadAsync(assetBase+(mobile?'jelly-mobile.glb':'jelly.glb')).then(gltf=>{
      const model=normalizeModel(gltf.scene,5.8);
      model.traverse(mesh=>{if(!mesh.isMesh)return;
        const source=Array.isArray(mesh.material)?mesh.material[0]:mesh.material;
        const material=new THREE.MeshPhysicalMaterial({color:0xf0bad0,normalMap:source?.normalMap||null,normalScale:new THREE.Vector2(.6,.6),metalness:.06,roughness:.21,transmission:mobile?.25:.63,thickness:.65,ior:1.34,clearcoat:1,clearcoatRoughness:.1,envMapIntensity:1.6,emissive:0x691534,emissiveIntensity:.23,attenuationColor:new THREE.Color(0xf0b1cf),attenuationDistance:1.6,side:THREE.DoubleSide});
        material.onBeforeCompile=shader=>{
          shader.uniforms.uTgmTime=timeUniform;
          shader.vertexShader='uniform float uTgmTime;\n'+shader.vertexShader;
          shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>',`#include <begin_vertex>
            float tail=1.0-smoothstep(-2.9,1.6,position.y);
            float pulse=sin(uTgmTime*1.25+position.y*.4);
            transformed.x+=sin(uTgmTime*.95+position.y*1.7)*.16*tail;
            transformed.z+=cos(uTgmTime*.8+position.y*1.8)*.1*tail;
            transformed.xz*=1.0+pulse*.028*smoothstep(.7,2.8,position.y);
            transformed.y+=pulse*.035*smoothstep(.7,2.8,position.y);`);
          shader.fragmentShader=shader.fragmentShader.replace('#include <opaque_fragment>',`float tgmRim=pow(1.0-abs(dot(normalize(normal),normalize(vViewPosition))),3.0);
            outgoingLight+=vec3(0.38,0.10,0.20)*tgmRim;
            #include <opaque_fragment>`);
        };
        material.customProgramCacheKey=()=> 'tgm-jelly-flow-v1';mesh.material=material;mesh.frustumCulled=false;
      });
      jellyRig.add(model);jellyLoaded=true;body.dataset.model='loaded';
    }),
    modelLoader.loadAsync(assetBase+'crystals.glb').then(gltf=>{
      const model=normalizeModel(gltf.scene,5.5);
      model.traverse(node=>{if(node.isMesh)node.material=crystalMat;});
      stages.forEach((stage,i)=>{
        const cluster=model.clone(true);cluster.position.set(i%2===0?4.9:-5.8,-2.2,-4.5);cluster.rotation.z=i%2===0?-.24:.2;cluster.rotation.y=i*.8;cluster.scale.setScalar(i===5?1.4:1);stage.add(cluster);
        if(!mobile){const second=model.clone(true);second.position.set(-6.4,2,-10);second.rotation.set(.4,1.2,Math.PI-.2);second.scale.setScalar(.75);stage.add(second);}
      });
    })
  ]);
  models.forEach(result=>{if(result.status==='rejected')console.warn('TGM recurso 3D:',result.reason);});
  if(!jellyLoaded){fallback(new Error('Modelo principal no disponible'));renderer.dispose();return;}
  finishLoading();
  canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();fallback();});
  canvas.addEventListener('webglcontextrestored',()=>location.reload(),{once:true});
  let current=sceneProgress,time=0,last=performance.now(),lastFrame=0,raf=0,firstFrame=true,jellyX=mobile?.85:3.6;
  const pointer=new THREE.Vector2(),smoothPointer=new THREE.Vector2();
  addEventListener('pointermove',event=>{if(event.pointerType==='mouse'){pointer.set((event.clientX/innerWidth-.5)*2,(event.clientY/innerHeight-.5)*2);renderOnDemand();}},{passive:true});
  const look=new THREE.Vector3();
  function draw(now){
    raf=0;if(document.hidden)return;
    if(!paused&&now-lastFrame<1000/(mobile?30:45)){raf=requestAnimationFrame(draw);return;}
    const dt=Math.min((now-last)/1000,.06);last=now;lastFrame=now;
    if(!paused)time+=dt;
    const damp=paused?1:1-Math.exp(-dt*7);
    current=THREE.MathUtils.lerp(current,sceneProgress,damp);
    smoothPointer.lerp(paused?new THREE.Vector2():pointer,.045);
    const z=9-current*18;
    const angle=current*.6;
    camera.position.set(Math.sin(angle)*.6+smoothPointer.x*.17,Math.sin(current*.8)*.35-smoothPointer.y*.1,z);
    look.set(Math.sin(angle+.3)*.6,Math.cos(current*.5)*.17,z-12);camera.lookAt(look);
    const inThreshold=(current%1)<.14&&current> .7;
    const xGoal=mobile?.85:(inThreshold?1.2:3.6);
    jellyX=THREE.MathUtils.lerp(jellyX,xGoal,paused?1:1-Math.exp(-dt*2.5));
    jellyRig.position.set(jellyX+Math.sin(time*.21)*.12, (mobile?.9:.3)+Math.sin(time*.5)*.13,z-(mobile?7.4:9));
    jellyRig.rotation.set(.07+Math.sin(time*.23)*.025,Math.sin(current*1.7)*.42+time*.025,-.15+Math.sin(time*.27)*.04);
    jellyRig.scale.setScalar(mobile?.74:1.03);
    timeUniform.value=time;
    jellyLight.position.copy(jellyRig.position).add(new THREE.Vector3(.5,.9,1.7));
    key.position.z=z+4;rim.position.z=z-6;
    orbitGroup.rotation.z=time*.035;
    moving.forEach(({object,kind,base,phase})=>{if(kind==='orb'){object.position.y=base.y+Math.sin(time*.4+phase)*.12;object.rotation.y=time*.08+phase;}else{const expand=THREE.MathUtils.smoothstep(current,2.05,2.8);object.position.y=base.y+expand*(1+Math.sin(phase)*.6);object.rotation.z=Math.sin(time*.17+phase)*.025+expand*.14;}});
    particles.rotation.z=Math.sin(time*.03)*.015;
    stages.forEach((stage,i)=>{stage.visible=Math.abs(current-i)<2.1;});
    composer.render();
    if(firstFrame){body.classList.add('world-ready');firstFrame=false;}
    body.dataset.graphics='ready';
    if(!paused||Math.abs(current-sceneProgress)>.001)raf=requestAnimationFrame(draw);
  }
  renderOnDemand=()=>{if(!raf&&!document.hidden)raf=requestAnimationFrame(draw);};
  const resize=()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);composer.setSize(innerWidth,innerHeight);measure();renderOnDemand();};
  addEventListener('resize',resize,{passive:true});
  document.addEventListener('visibilitychange',()=>{last=performance.now();updateMotion();if(document.hidden&&raf){cancelAnimationFrame(raf);raf=0;}else renderOnDemand();});
  renderOnDemand();
}
// Text and navigation work immediately; the renderer progressively enhances them.
buildWorld().catch(fallback);
