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



//Comment the long table out------------------------------
// loader.load('models/longTable/longTable.gltf', (gltf) => {
//     const longTable = gltf.scene;
//      longTable.scale.set(0.5, 0.4, 1.2);
//    // longTable.rotation.y = (Math.PI/2);
//     longTable.position.set(-6.5, 0.7, -3)
//     roomAndFurnitureGroup.add(longTable); 
// });






let woodenTexture = new THREE.TextureLoader();
 woodenTexture=textureLoader.load('/textures/woodTexture.jpg');
// Create a CubeTextureLoader
const cubeTextureLoader = new THREE.CubeTextureLoader();

// Load the six images of the environment map
cubeTextureLoader.load([
    'mirrorImg/one.jpg', // positive x
    'mirrorImg/two.jpg', // negative x
    'mirrorImg/three.jpg', // positive y
    'mirrorImg/four.jpg', // negative y
    'mirrorImg/five.jpg', // positive z
    'mirrorImg/six.jpg'  // negative z
], (texture) => {
    // Once all six images are loaded, create the mirror object
    loader.load('models/mirror/makeupmirror.gltf', (gltf) => {
        const longmirror = gltf.scene;
        longmirror.scale.set(1.3, 0.92, 3);
        longmirror.rotation.y = Math.PI / -2;
        longmirror.traverse((child) => {
            if (child.isMesh && child.name === 'Listones') {
                console.log('wood found');
                // Create a mirror material with environment mapping
                const mirrorMaterial = new THREE.MeshStandardMaterial({
                    color: 0xffffff, // White color for the mirror
                    metalness: 1, // Fully metallic
                    roughness: 0, // Completely smooth
                    envMap: texture // Assign the loaded environment map
                });
                // Ensure the mirror reflects its surroundings accurately
                mirrorMaterial.envMapIntensity = 1;
                child.material = mirrorMaterial;
            } else {
                console.log("wood not found");
            }
        });
        longmirror.position.set(7.74, 1.3, -3);
        roomAndFurnitureGroup.add(longmirror);
    });
});

// Your other code continues here...



// Load the six images of the environment map
cubeTextureLoader.load([
    'mirrorImg/one.jpg', // positive x
    'mirrorImg/two.jpg', // negative x
    'mirrorImg/three.jpg', // positive y
    'mirrorImg/four.jpg', // negative y
    'mirrorImg/five.jpg', // positive z
    'mirrorImg/six.jpg'  // negative z
], (texture) => {
    // Once all six images are loaded, create the mirror object
    loader.load('models/mirror/makeupmirror.gltf', (gltf) => {
        const longmirror = gltf.scene;
        longmirror.scale.set(1.3, 0.92, 3);
        longmirror.rotation.y = Math.PI / -2;
        longmirror.traverse((child) => {
            if (child.isMesh && child.name === 'Listones') {
                console.log('wood found');
                // Create a mirror material with environment mapping
                const mirrorMaterial = new THREE.MeshStandardMaterial({
                    color: 0xffffff, // White color for the mirror
                    metalness: 1, // Fully metallic
                    roughness: 0, // Completely smooth
                    envMap: texture // Assign the loaded environment map
                });
                // Ensure the mirror reflects its surroundings accurately
                mirrorMaterial.envMapIntensity = 1;
                child.material = mirrorMaterial;
            } else {
                console.log("wood not found");
            }
        });
        longmirror.position.set(7.74, 1.3, 3);
        roomAndFurnitureGroup.add(longmirror);
    });
});

//----------------------CODE FOR CHAIR
loader.load('models/chair/chair.gltf', (gltf) => {
  const chair = gltf.scene;
  chair.scale.set(6, 3, 4);
  chair.rotation.y = Math.PI / 2;

  chair.position.set(3, 0, -2);

  // Assuming the chair's material is a MeshStandardMaterial
  chair.traverse((child) => {
    if (child.isMesh) {
      child.material.transparent = true;
      child.material.opacity = 0.3; // Adjust the opacity as needed (0 is fully transparent, 1 is fully opaque)
   
   
      child.material.color.set(0x888888);
    }
  });

  roomAndFurnitureGroup.add(chair);
});




loader.load('models/room/table.gltf', (gltf) => {
  const table = gltf.scene;
  table.scale.set(1.5, 1.5, 1.5);
  table.rotation.y = Math.PI / -2;
  table.position.set(-1.5, 0, -5);

  // Traverse through all the children of the loaded table model
  table.traverse((child) => {
    if (child.isMesh) {
      // Load the texture
      const textureLoader = new THREE.TextureLoader();
      const texture = textureLoader.load('textures/grey.jpg'); // Adjust the path to your grey texture file

      // Create a material with the texture
      const material = new THREE.MeshStandardMaterial({ map: texture });

      // Assign the material to the mesh
      child.material = material;
    }
  });

  roomAndFurnitureGroup.add(table);
});



// loader.load('models/coffeTable/coffeTable.gltf', (gltf) => {
//     const coffeTable = gltf.scene;
//     coffeTable.scale.set(0.5, 0.5, 0.5);
//     coffeTable.rotation.y = (Math.PI/-2);
  
//     coffeTable.position.set(-1.5, 0, -5.4)
//     roomAndFurnitureGroup.add(coffeTable); 
//   });

  loader.load('models/coffeTable/flower.gltf', (gltf) => {
    const flower = gltf.scene;
    flower.scale.set(0.3, 0.3, 0.3);
    flower.rotation.y = (Math.PI/-2);
  
    flower.position.set(0.2, 0.4, -5)
    roomAndFurnitureGroup.add(flower); 
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


  loader.load('models/ceilingLight/ceilingLight.gltf', (gltf) => {
    const ceilingLight = gltf.scene;
    ceilingLight.scale.set(1.5, 1, 1.5);
    ceilingLight.position.set(0, 3, 0)
    ceilingLight.rotation.y = (Math.PI/3);
  
    scene.add(ceilingLight); 
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


  //-------------------------Letters-Wall Decor-----------------------
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



//----------------Makeup Shelf----------------------------------------------
loader.load('models/shelf1/shelf1.gltf', (gltf) => {
  const shelf = gltf.scene;
  shelf.scale.set(0.5, 0.6, 0.3);
 shelf.rotation.y = (Math.PI/2);
 shelf.position.set(-7, 0.01, 2)
  roomAndFurnitureGroup.add(shelf); 
});


//-----------------Function for painting canvas--------------------------
let canvasMaterial; // Define canvasMaterial variable outside


loader.load('models/board/board.gltf', (gltf) => {
    const blankCanvas = gltf.scene;

    
    blankCanvas.traverse((child) => {
        if (child.isMesh) {
            
            canvasMaterial = child.material;
        }
    });

    
    if (!canvasMaterial) {
        console.error('Error: canvasMaterial is not assigned properly.');
    }

    blankCanvas.scale.set(0.4, 0.4, 0.4);
    blankCanvas.position.set(-6, 0, 0.2);
    blankCanvas.rotation.y = (Math.PI/4);

    roomAndFurnitureGroup.add(blankCanvas);
});




// Function to change canvas color
const changeCanvasColor = (color) => {
  canvasMaterial.color.set(color);
};

const handleMakeupModelClick = (color) => {
  changeCanvasColor(color);
};


// Raycaster setup
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Event listener for mouse clicks
// Event listener for mouse clicks
document.addEventListener('click', onMouseClick);

function onMouseClick(event) {
    // Calculate mouse position
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Raycasting
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    // Check for intersection with makeup models
    for (let i = 0; i < intersects.length; i++) {
        const object = intersects[i].object;
        if (object.userData.isMakeupModel) {
            // Handle makeup model click
            handleMakeupModelClick(object.userData.color);
            break; // Exit loop after handling the first makeup model click
        }
    }
}


// ------------------- makeup products----------------------------------------


loader.load('models/makeup/lipstick/lipstick.gltf', (gltf) => {
  const lipstick = gltf.scene;
  lipstick.userData.isMakeupModel = true;
  lipstick.userData.color = 0xff0000; // Red color
  lipstick.scale.set(0.7, 0.7, 0.7);
  lipstick.rotation.y = Math.PI / 2;
  lipstick.position.set(-6.8, 1.2, 1.2);
  scene.add(lipstick);
});

loader.load('models/makeup/chanel/chanel.gltf', (gltf) => {
  const chanel = gltf.scene;
  chanel.userData.isMakeupModel = true;
  chanel.userData.color = 0xf5f5dc; // Beige color
  chanel.scale.set(0.4, 0.5, 0.5);
  chanel.position.set(-6.8, 0.3, 2.5);
  chanel.rotation.y = (Math.PI/2);
  scene.add(chanel); 
   
});



loader.load('models/makeup/gorgioarmani/gorgioarmani.gltf', (gltf) => {
  const gorgioarmani = gltf.scene;
  // gorgioarmani.onClick = handleMakeupModelClick(0x8b4513);
  gorgioarmani.scale.set(0.07, 0.08, 0.1);
  gorgioarmani.position.set(-6.7, 0.8, 2.3);
 //gorgioarmani.rotation.y = (Math.PI/2);
 scene.add(gorgioarmani); 
});





loader.load('models/makeup/tfLipstic/tfLipstic.gltf', (gltf) => {
  const tfLipstic = gltf.scene;
  tfLipstic.userData.isMakeupModel = true;
  tfLipstic.userData.color = 0x8b4513;
  tfLipstic.scale.set(0.15, 0.15, 0.15);
  tfLipstic.position.set(-6.8, 1.5, 2.4);
  tfLipstic.rotation.y = (Math.PI/2);
  scene.add(tfLipstic); 
  
});

loader.load('models/makeup/lipstick1/lipstick1.gltf', (gltf) => {
  const lipstick1 = gltf.scene;
  //lipstick1.onClick = handleMakeupModelClick(0x8b4513);
  lipstick1.scale.set(0.4, 0.4, 0.4);
  lipstick1.position.set(-6.8, 0.1, 1.55);
  lipstick1.rotation.y = (Math.PI/2);
  scene.add(lipstick1); 
});



//-------------------------people----------------------

loader.load('models/makeupArtist/makeupArtist.gltf', (gltf) => {
  const makeupArtist = gltf.scene;
  makeupArtist.scale.set(1.2, 1.2, 1.2);
  makeupArtist.position.set(-6.7, 0, 3.5);
  makeupArtist.rotation.y = (Math.PI/2);
  scene.add(makeupArtist); 
});






//-------------------------room----------------------------------------

loader.load('models/photoroom/photoroom.gltf', (gltf) => {
  const photoroom = gltf.scene;
  photoroom.scale.set(0.5, 0.5, 0.3);
  photoroom.position.set(-11.5, 0, 4.8);
  photoroom.rotation.y = (Math.PI);
  scene.add(photoroom); 
  
});



//-------------DEcor-------------------------------
loader.load('models/carpet/carpet.gltf', (gltf) => {
  const carpet = gltf.scene;
  carpet.scale.set(1.5, 1.5, 1.5);
  carpet.position.set(-1, 0, -5);
  carpet.rotation.y = (Math.PI);
  scene.add(carpet); 
  
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