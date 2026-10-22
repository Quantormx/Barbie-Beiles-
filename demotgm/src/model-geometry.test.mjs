import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {MeshoptDecoder} from 'three/addons/libs/meshopt_decoder.module.js';
import {normalizeModel} from './model-geometry.js';

// Load actual compressed production meshes in Node; texture decoding is browser-only.
async function loadMesh(filename) {
  const bytes=await readFile(new URL('../assets/'+filename,import.meta.url));
  const length=bytes.readUInt32LE(12);
  const json=JSON.parse(bytes.subarray(20,20+length).toString());
  delete json.images;delete json.textures;delete json.materials;
  for(const mesh of json.meshes)for(const primitive of mesh.primitives)delete primitive.material;
  const jsonBytes=Buffer.from(JSON.stringify(json));
  const padded=Buffer.alloc(Math.ceil(jsonBytes.length/4)*4,32);jsonBytes.copy(padded);
  const tail=bytes.subarray(20+length);
  const glb=Buffer.alloc(20+padded.length+tail.length);
  bytes.copy(glb,0,0,12);glb.writeUInt32LE(glb.length,8);glb.writeUInt32LE(padded.length,12);glb.writeUInt32LE(0x4e4f534a,16);
  padded.copy(glb,20);tail.copy(glb,20+padded.length);
  return new GLTFLoader().setMeshoptDecoder(MeshoptDecoder).parseAsync(glb.buffer.slice(glb.byteOffset,glb.byteOffset+glb.byteLength),'');
}

for(const filename of ['jelly.glb','jelly-mobile.glb','crystals.glb']) {
  test(filename+' keeps its silhouette and proportions after scaling',async()=>{
    const {scene}=await loadMesh(filename);
    scene.updateMatrixWorld(true);
    const originalBounds=new THREE.Box3().setFromObject(scene);
    const originalSize=originalBounds.getSize(new THREE.Vector3());
    const model=normalizeModel(scene,5.8);
    const bounds=new THREE.Box3().setFromObject(model);
    const size=bounds.getSize(new THREE.Vector3());
    const center=bounds.getCenter(new THREE.Vector3());
    assert.ok(Math.abs(size.y-5.8)<0.00001,'height must not wrap into [-1,1]');
    assert.ok(center.length()<0.00001,'model remains centered');
    for(const axis of ['x','z'])assert.ok(Math.abs(size[axis]/size.y-originalSize[axis]/originalSize.y)<0.00001,'original proportions preserved');
    model.traverse(mesh=>{if(!mesh.isMesh)return;
      const positions=mesh.geometry.getAttribute('position');
      assert.equal(positions.array.constructor,Float32Array);
      assert.ok(positions.array.every(Number.isFinite));
    });
  });
}
