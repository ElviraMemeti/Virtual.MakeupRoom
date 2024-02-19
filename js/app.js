import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';



import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';
import { RectAreaLightUniformsLib } from 'three/addons/lights/RectAreaLightUniformsLib.js';
 // Scene, Camera and Renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xfff0ff );
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 15;
camera.position.y = 10;
camera.position.x= 5;


const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);
renderer.gammaOutput = false;

// Axes X,Y,Z
const axesHelper = new THREE.AxesHelper(20); 
scene.add(axesHelper);

// Groups
const roomAndFurnitureGroup = new THREE.Group();

const geometry=new THREE.BoxGeometry(6,1.5,0.1,10,5,10);
const material=new THREE.MeshStandardMaterial({color:0xDC143C, roughness:0.1, metalness:0});
const rectangle=new THREE.Mesh(geometry,material);
rectangle.position.set(-2, 1.5, -9.4);
scene.add(rectangle);

RectAreaLightUniformsLib.init();
const rectLight1 = new THREE.RectAreaLight( 0xff0000, 5, 6, 10 );
rectLight1.position.copy(rectangle.position);
rectLight1.lookAt(-1,1,100);
scene.add( rectLight1 );


//Models

const loader = new GLTFLoader();
const textureLoader = new THREE.TextureLoader();
const wallTexture=textureLoader.load('/textures/wallTexture2.jpg');
textureLoader.load('/textures/woodflor.avif', function (texture) {
    loader.load('models/room/room.gltf', (gltf) => {
      const room = gltf.scene;
      console.log('Model loaded:', room);

      room.traverse((child) => {
        // console.log(child.name);
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
  
          if (child.name === 'Object_56') {
            console.log('Floor found');
            child.material = new THREE.MeshPhongMaterial({ map: texture, shininess:1000});
            texture.wrapS = THREE.MirroredRepeatWrapping;
            texture.wrapT = THREE.MirroredRepeatWrapping;
            texture.repeat.set( 1, 1 );

          } else {
            console.log('Floor not found');
           
          }

          if(child.name=='Object_3'){
            console.log('Wall found');
            child.material=new THREE.MeshStandardMaterial({color:0xFFFFFF});

                }
                }
            });
        scene.add(room);
    }, undefined, function (error) {
      console.error('An error happened:', error);
    });
  }, undefined, function (error) {
    console.log('An error occurred while loading the texture:', error);
  });

  const planeGeometry = new THREE.PlaneGeometry(10, 20); 
  const planeMaterial = new THREE.MeshStandardMaterial({ 
  color: 0xffff00, 
  side: THREE.DoubleSide
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.scale.set(1.55, 0.9, 1.2);

plane.position.set(0.3, 2.71, -1);

// scene.add(plane);
// roomAndFurnitureGroup.add(planeGeometry);

loader.load('models/room/.ceilingLight.gltf', (gltf) => {
  const cielingLamp = gltf.scene;
   cielingLamp.scale.set(1, 0.4, 1.2);
 // longTable.rotation.y = (Math.PI/2);
  cielingLamp.position.set(-6.5, 2, -3)
  roomAndFurnitureGroup.add(cielingLamp); 
});


loader.load('models/longTable/longTable.gltf', (gltf) => {
    const longTable = gltf.scene;
     longTable.scale.set(0.5, 0.4, 1.2);
   // longTable.rotation.y = (Math.PI/2);
    longTable.position.set(-6.5, 0.7, -3)
    roomAndFurnitureGroup.add(longTable); 
});



// loader.load('models/dressingTable/dressingTable.gltf', (gltf) => {
//     const dressingTable = gltf.scene;
//     dressingTable.scale.set(1.5, 1.5, 1.5);
//    dressingTable.rotation.y = (Math.PI/2);
//    dressingTable.position.set(6.7, 0, -4.5)
//     roomAndFurnitureGroup.add(dressingTable); 
// });


// loader.load('models/dressingTable/dressingTable.gltf', (gltf) => {
//     const dressingTable = gltf.scene;
//     dressingTable.scale.set(1.5, 1.5, 1.5);
//    dressingTable.rotation.y = (Math.PI/2);
//    dressingTable.position.set(6.7, 0, -1.5)
//     roomAndFurnitureGroup.add(dressingTable); 
// });


// loader.load('models/dressingTable/dressingTable.gltf', (gltf) => {
//     const dressingTable = gltf.scene;
//     dressingTable.scale.set(1.5, 1.5, 1.5);
//    dressingTable.rotation.y = (Math.PI/2);
//    dressingTable.position.set(6.7, 0, 1.5)
//     roomAndFurnitureGroup.add(dressingTable); 
// });


let woodenTexture = new THREE.TextureLoader();
 woodenTexture=textureLoader.load('/textures/woodTexture.jpg');

loader.load('models/mirror/makeupmirror.gltf', (gltf) => {
    const longmirror = gltf.scene;
    longmirror.scale.set(1.3, 0.92, 3);
   longmirror.rotation.y = (Math.PI/-2);
  //  longmirror.rotation.x = (Math.PI/);

   longmirror.position.set(7.74, 1.3, -3)
    roomAndFurnitureGroup.add(longmirror); 

    longmirror.traverse((child)=>{
      if(child.isMesh && child.name=='Listones'){
      
        console.log('wood found');
        child.material=new THREE.MeshStandardMaterial({color:0x000000});

      } else {
        console.log("wood not found");
      }
    });
    
});


loader.load('models/mirror/makeupmirror.gltf', (gltf) => {
  const longmirror = gltf.scene;
  longmirror.scale.set(1.3, 0.92, 3);
 longmirror.rotation.y = (Math.PI/-2);
 longmirror.traverse((child)=>{
  if(child.isMesh && child.name=='Listones'){
  
    console.log('wood found');
    child.material=new THREE.MeshStandardMaterial({color:0x000000});

  } else {
    console.log("wood not found");
  }
});
 longmirror.position.set(7.74, 1.3, 3)
  roomAndFurnitureGroup.add(longmirror); 
});

loader.load('models/room/table.gltf', (gltf) => {
  const table = gltf.scene;
  table.scale.set(1.5, 1.5, 1.5);
 table.rotation.y = (Math.PI/-2);

 table.position.set(-1.5, 0, -5)
  roomAndFurnitureGroup.add(table); 
});

const plantsGroup=new THREE.Group();

//plants
loader.load('models/plants/aloePlant/scene.gltf', (gltf) => {
    const aloeplant = gltf.scene;
    aloeplant.scale.set(0.2, 0.2, 0.2 );
    aloeplant.position.set(-5, 0, -6)
    scene.add(aloeplant); 
});
loader.load('models/plants/pot.gltf', (gltf) => {
    const flaskfilondreon = gltf.scene;
    flaskfilondreon.scale.set(0.3, 0.3, 0.3 );
    flaskfilondreon.position.set(-4.2, 0, -6.5)
    scene.add(flaskfilondreon); 
});

loader.load('models/couch/SofaBaker.gltf', (gltf) => {
    const couch = gltf.scene;
    couch.scale.set(2.5, 2, 2 );
    couch.position.set(-1, 0, -7)
    scene.add(couch); 

    couch.traverse(function (child) {
        if (child.isMesh) {
           child.material=new THREE.MeshStandardMaterial({map:BeanBagTexture});
        }
    }); 
});

const bbTextureLoader = new THREE.TextureLoader();
const BeanBagTexture=bbTextureLoader.load('/textures/beanBagTexture.jpg');

loader.load('models/couch/BeanBag.gltf', (gltf) => {
    const beanBag = gltf.scene;
    beanBag.scale.set(2.5, 2, 2 );
    beanBag.position.set(-3, 0, -4)
    scene.add(beanBag); 
    beanBag.rotation.y = (Math.PI/1.5);
    

    beanBag.traverse(function (child) {
        if (child.isMesh) {
            child.material = new THREE.MeshStandardMaterial({ map: BeanBagTexture });
            
        }
    }); 

});

loader.load('models/lamps/lamp.gltf', (gltf) => {
    const lamp = gltf.scene;
    lamp.scale.set(1.5, 1.5, 1.5);
    lamp.position.set(6.5, 0, 5)
    lamp.rotation.y = (Math.PI/3);
  
    scene.add(lamp); 
  });
  const spotLight=new THREE.SpotLight(0xFFFFFF,10,2,5,5);
  spotLight.position.set(5,1.5,5);
  // spotLight.rotation.y = (Math.PI/);
  spotLight.lookAt(0,0,0);
  scene.add(spotLight);
  const spotLightHelper=new THREE.SpotLightHelper(spotLight);
  // scene.add(spotLightHelper);
  scene.add(roomAndFurnitureGroup);
  
  
  const windowLight=new THREE.DirectionalLight(0xFFFFFF,2);
  windowLight.position.set(0, 10, 50);
  windowLight.target.position.set(0, 0, 0); 
  windowLight.castShadow = true;
  windowLight.shadow.mapSize.width = 2048; 
  windowLight.shadow.mapSize.height = 2048; 
  windowLight.shadow.camera.left = -30;
  windowLight.shadow.camera.right = 30;
  windowLight.shadow.camera.top = 30;
  windowLight.shadow.camera.bottom = -30;
  windowLight.shadow.camera.near = 1;
  windowLight.shadow.camera.far = 100; 
  
  scene.add(windowLight);

loader.load('models/letters/letters.gltf', (gltf) => {
    const letters = gltf.scene;

    letters.traverse((child) => {
        if (child.isMesh) {
            
            const texture = new THREE.TextureLoader().load('textures/black.jpg');
            const material = new THREE.MeshBasicMaterial({ map: texture, color: 0x333333 });
            child.material = material;
        }
    });
    letters.scale.set(0.5, 0.5, 0.5);
    letters.rotation.y = (Math.PI/2);
    letters.position.set(-7, 1.2, -2.3)
    roomAndFurnitureGroup.add(letters); 
});



loader.load('models/blankcanvas/blankCanvas.gltf', (gltf) => {
    const blankCanvas = gltf.scene;
    blankCanvas.scale.set(1, 0.8, 1);
    blankCanvas.rotation.y = (Math.PI/2);
    blankCanvas.position.set(-6.5, 1.2, 0.5)
    roomAndFurnitureGroup.add(blankCanvas); 
});

loader.load('models/blankcanvas/blankCanvas.gltf', (gltf) => {
    const blankCanvas = gltf.scene;
    blankCanvas.scale.set(1, 0.8, 1);
    blankCanvas.rotation.y = (Math.PI/2);
    blankCanvas.position.set(-6.5, 1.2, -3.2)
    roomAndFurnitureGroup.add(blankCanvas); 
});


loader.load('models/blankcanvas/blankCanvas.gltf', (gltf) => {
    const blankCanvas = gltf.scene;
    blankCanvas.scale.set(1, 0.8, 1);
    blankCanvas.rotation.y = (Math.PI/2);
    blankCanvas.position.set(-6.5, 1.2, -6.5)
    roomAndFurnitureGroup.add(blankCanvas); 
});

// ------------------- makeup products----------------------------------------

loader.load('models/makeup/6shadepalette/palette.gltf', (gltf) => {
    const shadepalette = gltf.scene;
    shadepalette.scale.set(0.7, 0.3, 0.7);
    shadepalette.rotation.y = (Math.PI/2);
    shadepalette.position.set(-6.5, 1.2, -5.2)
    roomAndFurnitureGroup.add(shadepalette); 
});

loader.load('models/makeup/6shadepalette/palette.gltf', (gltf) => {
    const shadepalette = gltf.scene;
    shadepalette.scale.set(0.7, 0.3, 0.7);
    shadepalette.rotation.y = (Math.PI/2);
    shadepalette.position.set(-6.5, 1.2, -2)
    roomAndFurnitureGroup.add(shadepalette); 
});

loader.load('models/makeup/foundation/foundation.gltf', (gltf) => {
    const foundation = gltf.scene;
    foundation.scale.set(0.5, 0.5, 0.5);
    foundation.rotation.y = (Math.PI/2);
    foundation.position.set(-6.5, 1.2, -1.5)
    roomAndFurnitureGroup.add(foundation); 
});

loader.load('models/makeup/foundation/foundation.gltf', (gltf) => {
    const foundation = gltf.scene;
    foundation.scale.set(0.5, 0.5, 0.5);
    foundation.rotation.y = (Math.PI/2);
    foundation.position.set(-6.5, 1.2, -4.7)
    roomAndFurnitureGroup.add(foundation); 
});


loader.load('models/makeup/lipstick/lipstick.gltf', (gltf) => {
    const lipstick = gltf.scene;
    lipstick.scale.set(0.5, 0.5, 0.5);
    lipstick.rotation.y = (Math.PI/2);
    lipstick.position.set(-6.3, 1.2, -4.6)
    roomAndFurnitureGroup.add(lipstick); 
});

loader.load('models/makeup/lipstick/lipstick.gltf', (gltf) => {
    const lipstick = gltf.scene;
    lipstick.scale.set(0.5, 0.5, 0.5);
    lipstick.rotation.y = (Math.PI/2);
    lipstick.position.set(-6.3, 1.2, -1.4)
    roomAndFurnitureGroup.add(lipstick); 
});


loader.load('models/makeup/palette/palette.gltf', (gltf) => {
    const palette = gltf.scene;
    palette.scale.set(0.2, 0.2, 0.2);
   // palette.rotation.y = (Math.PI/2);
    palette.position.set(-6.3, 1.2, -0.8)
    roomAndFurnitureGroup.add(palette); 
});


loader.load('models/makeup/palette/palette.gltf', (gltf) => {
    const palette = gltf.scene;
    palette.scale.set(0.2, 0.2, 0.2);
   // palette.rotation.y = (Math.PI/2);
    palette.position.set(-6.3, 1.2, -4)
    roomAndFurnitureGroup.add(palette); 
});

loader.load('models/makeup/glitterLipstic/glitterLipstic.gltf', (gltf) => {
    const glitterLipstic = gltf.scene;
    glitterLipstic.scale.set(0.5, 0.5, 0.5);
   // glitterLipstic.rotation.y = (Math.PI/2);
   glitterLipstic.position.set(-6.3, 1.2, -0.5)
    roomAndFurnitureGroup.add(glitterLipstic); 
});







scene.add(roomAndFurnitureGroup);



//-------------------lights------------------------------------------
const ambientLight = new THREE.AmbientLight(0x404040, 5); // Increase intensity to 2
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(5, 5, 5);
// directionalLight.castShadow = true;
// directionalLight.shadow.mapSize.width = 1024;
// directionalLight.shadow.mapSize.height = 1024;
directionalLight.position.set(10, 20, 20); 
directionalLight.target.position.set(0, 0, 0); 
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xffffff, 1, 10);
pointLight.position.set(-5, 20, -5); // Adjust the position of the point light
pointLight.castShadow = true;
scene.add(pointLight);

const oppositePointLight = new THREE.PointLight(0xffffff, 1, 10);
oppositePointLight.position.set(8, 20, 5); // Adjust the position of the point light
oppositePointLight.castShadow = true;
scene.add(oppositePointLight);

// OrbitControls for rotation
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI / 2;

// Add event listener for keyboard input
document.addEventListener('keydown', (event) => {
    const speed = 0.1; // Adjust the speed as needed
    switch (event.key) {
        case 'ArrowUp':
            // Move the camera forward along the direction it's facing
            camera.position.x -= Math.sin(camera.rotation.y) * speed;
            camera.position.z -= Math.cos(camera.rotation.y) * speed;
            break;
        case 'ArrowDown':
            // Move the camera backward along the direction it's facing
            camera.position.x += Math.sin(camera.rotation.y) * speed;
            camera.position.z += Math.cos(camera.rotation.y) * speed;
            break;
        case 'ArrowLeft':
            // Rotate the camera to the left
            camera.rotation.y += 0.1;
            break;
        case 'ArrowRight':
            // Rotate the camera to the right
            camera.rotation.y -= 0.1;
            break;
    }
});


const animate = () => {
    requestAnimationFrame(animate);

    //controls.update();

    renderer.render(scene, camera);
};

animate();