import * as THREE from 'three';

// GLTF Meshopt assets may store positions as normalized Int16 values.
// Transform in floating point: writing world coordinates back into Int16 wraps
// them into [-1, 1] and destroys the silhouette.
export function normalizeModel(original, targetHeight) {
  original.updateMatrixWorld(true);
  const bounds = new THREE.Box3().setFromObject(original);
  const center = bounds.getCenter(new THREE.Vector3());
  const size = bounds.getSize(new THREE.Vector3());
  if (!Number.isFinite(size.y) || size.y <= 0) throw new Error('Invalid model bounds');
  const output = new THREE.Group();
  const scale = targetHeight / size.y;
  original.traverse(node => {
    if (!node.isMesh) return;
    const geometry = node.geometry.clone();
    for (const name of ['position', 'normal']) {
      const attribute = geometry.getAttribute(name);
      if (!attribute) continue;
      const values = new Float32Array(attribute.count * 3);
      for (let i = 0; i < attribute.count; i++) {
        values[i * 3] = attribute.getX(i);
        values[i * 3 + 1] = attribute.getY(i);
        values[i * 3 + 2] = attribute.getZ(i);
      }
      geometry.setAttribute(name, new THREE.BufferAttribute(values, 3));
    }
    geometry.applyMatrix4(node.matrixWorld);
    geometry.translate(-center.x, -center.y, -center.z);
    geometry.scale(scale, scale, scale);
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();
    output.add(new THREE.Mesh(geometry, node.material));
  });
  return output;
}
