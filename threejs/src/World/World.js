import {Euler,Vector3} from 'three';
import { loadBirds } from './components/birds/birds.js';
import { createCamera } from './components/camera.js';
import { createLights } from './components/lights.js';
import { createScene } from './components/scene.js';

import { createControls } from './systems/controls.js';
import { createRenderer } from './systems/renderer.js';
import { update } from './systems/update.js';

let scene;
let camera;
let controls;
let renderer;

const updatables = [];

class World {
  constructor() {
    camera = createCamera();
    scene = createScene();
    renderer = createRenderer();

    controls = createControls(camera, renderer.domElement);

    const { ambientLight, mainLight } = createLights();

    updatables.push(controls);

    scene.add(ambientLight, mainLight);

    this.canvas = renderer.domElement;

    this.tarInd=0
  }

  async init() {
    const { parrot, flamingo, stork } = await loadBirds();

    // move the target to the center of the front bird
    controls.target.copy(parrot.position);

    updatables.push(parrot, flamingo, stork);

    scene.add(parrot, flamingo, stork);
  }

  // draw a single frame
  render() {
    renderer.render(scene, camera);
  }

  setSize(width, height, pixelRatio) {
    camera.aspect = width / height;

    // update the camera's frustum
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);

    renderer.setPixelRatio(pixelRatio);
  }

  start() {
    // everything inside here will run once per frame
    renderer.setAnimationLoop(() => {
      update(updatables);

      this.render();
    });
  }
  focusNext=()=>{ 
    let birds=updatables.slice(1)
    this.tarInd++
    this.tarInd=this.tarInd>2?0:this.tarInd
    // console.log('camera.initPo',camera.initPos);
    let x=camera.initPos.getComponent(0)
    let y=camera.initPos.getComponent(1)
    let z=camera.initPos.getComponent(2)
    // camera.position.set(x,y,z);  
    // camera.updateProjectionMatrix()
    
    // 控制器调整
    let controlsDiff=new Vector3( 0, 0, 0)
    switch(this.tarInd){
      case 1:
      controlsDiff = new Vector3( 3.5,2,-2 );
      break
      case 2:
      controlsDiff = new Vector3( -1, 0, 0);
      break
    }
    controls.target.copy(new Vector3().subVectors(birds[this.tarInd].position,controlsDiff));

    // 相机调整
    camera.position.set(x,y,z)
    let cameraDiff=new Euler( 0, 0, 0, 'YXZ' )
    switch(this.tarInd){
      case 1:
      cameraDiff = new Euler( 0, -0.15, 0, 'YXZ' );
      camera.position.applyEuler(cameraDiff)

      break
      case 2:
      cameraDiff = new Euler( 0, 0.6, 0, 'YXZ' );
      camera.position.applyEuler(cameraDiff)
      camera.position.multiplyScalar(1.5)
      break
    }

  }
}

export { World };
