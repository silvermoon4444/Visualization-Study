import { PerspectiveCamera } from 'three';

function createCamera() {
  const camera = new PerspectiveCamera(35, 1, 0.1, 100);

  // camera.position.set(-1.5, 1.5, 6.5);
  camera.position.set(-1.5, 1.5, 6.5);
  // camera.position.multiplyScalar(2);
  
  console.log(camera.position);
  camera.initPos=camera.position.clone()

  return camera;
}

export { createCamera };
