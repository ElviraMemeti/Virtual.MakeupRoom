import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
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
const axesHelper = new THREE.AxesHelper(30); 
scene.add(axesHelper);

// Groups
const roomAndFurnitureGroup = new THREE.Group();

//------------------FRAME ON THE WALL-------------------------------------------


const textureLoader = new THREE.TextureLoader();

const geometry = new THREE.BoxGeometry(6, 3, 0.1, 10, 5, 10);
const frametexture = textureLoader.load('textures/wallFrame2.jpg');
const material = new THREE.MeshStandardMaterial({ map: frametexture,  roughness: 0.1, metalness: 0 });
const rectangle = new THREE.Mesh(geometry, material);
rectangle.position.set(-1.7, 2.5, -9.4);
scene.add(rectangle);

//-------------------------------------------------------------------------------------------
RectAreaLightUniformsLib.init();
const rectLight1 = new THREE.RectAreaLight( 0xffffff, 5, 6, 10 );
rectLight1.position.copy(rectangle.position);
rectLight1.lookAt(-1,1,100);
scene.add( rectLight1 );


//Models

const loader = new GLTFLoader();
//const textureLoader = new THREE.TextureLoader();
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
            room.scale.set(1,2,1);
        scene.add(room);
    }, undefined, function (error) {
      console.error('An error happened:', error);
    });
  }, undefined, function (error) {
    console.log('An error occurred while loading the texture:', error);
  });


  const planeGeometry = new THREE.PlaneGeometry(10, 20); 
  const planeMaterial = new THREE.MeshStandardMaterial({ 
  color: 0xFFFFFF, 
  side: THREE.DoubleSide
});

const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.scale.set(1.55, 0.9, 1.2);

plane.position.set(0.3, 5.45, -1);

scene.add(plane);
roomAndFurnitureGroup.add(planeGeometry);



let woodenTexture = new THREE.TextureLoader();
woodenTexture=textureLoader.load('/textures/woodTexture.jpg');

//----------------------MIRRORS------------------------------------ 
const cubeTextureLoader = new THREE.CubeTextureLoader();

const darkWoodTexture = textureLoader.load('textures/darkwood.jpg');

const mirrorTexture = textureLoader.load('textures/mirror.jpg');
const LavamanosTexture = textureLoader.load('textures/brown.jpg')  

    loader.load('models/mirror/makeupmirror.gltf', (gltf) => {
        const longmirror = gltf.scene;
        longmirror.scale.set(1.3, 0.92, 3);
        longmirror.rotation.y = Math.PI / -2;
        longmirror.traverse((child) => {
            if (child.isMesh && child.name === 'Listones') {
              const darkWoodMaterial = new THREE.MeshStandardMaterial({
                map: darkWoodTexture // Assign the loaded darkwood texture
            });

            child.material = darkWoodMaterial;

          }


          if (child.isMesh && child.name === 'Lavamanos') {
            const lavamanosMaterial = new THREE.MeshStandardMaterial({
              map: LavamanosTexture // Assign the loaded darkwood texture
          });

          child.material = lavamanosMaterial;

        }
          

        if (child.isMesh && child.name === 'polySurface1') {
          const mirrorMaterial = new THREE.MeshStandardMaterial({
            map: mirrorTexture // Assign the loaded darkwood texture
        });

        child.material = mirrorMaterial;
      }

        });
        
        longmirror.position.set(7.74, 1.3, -3);
        roomAndFurnitureGroup.add(longmirror);
    });


    loader.load('models/mirror/makeupmirror.gltf', (gltf) => {
      const longmirror = gltf.scene;
      longmirror.scale.set(1.3, 0.92, 3);
      longmirror.rotation.y = Math.PI / -2;
      longmirror.traverse((child) => {
          if (child.isMesh && child.name === 'Listones') {
            const darkWoodMaterial = new THREE.MeshStandardMaterial({
              map: darkWoodTexture // Assign the loaded darkwood texture
          });

          child.material = darkWoodMaterial;

        }

        if (child.isMesh && child.name === 'Lavamanos') {
          const lavamanosMaterial = new THREE.MeshStandardMaterial({
            map: LavamanosTexture // Assign the loaded darkwood texture
        });

        child.material = lavamanosMaterial;

      }
      
      if (child.isMesh && child.name === 'polySurface1') {
        const mirrorMaterial = new THREE.MeshStandardMaterial({
          map: mirrorTexture // Assign the loaded darkwood texture
      });
      child.material = mirrorMaterial;
      }

      });
      
      longmirror.position.set(7.74, 1.3, 3);
      roomAndFurnitureGroup.add(longmirror);
  });




//----------------------CODE FOR CHAIR-----------------------------------------

const brownTexture = textureLoader.load('textures/brown.jpg');
loader.load('models/chair/chair.gltf', (gltf) => {
  const chair = gltf.scene;
  chair.scale.set(1.5, 1.5, 1.5);
  chair.rotation.y = Math.PI / 2;

  chair.position.set(5.8, 0, -2.5);
  chair.traverse((child) => {
    if (child.isMesh) {
      const material = new THREE.MeshStandardMaterial({ map: brownTexture });
      chair.traverse((child) => {
        if (child.isMesh) {
    
        child.material = material;
         
        }
      });
    }
  });

  roomAndFurnitureGroup.add(chair);
});




loader.load('models/chair/chair.gltf', (gltf) => {
  const chair = gltf.scene;
  chair.scale.set(1.5, 1.5, 1.5);
  chair.rotation.y = Math.PI / 2;

  chair.position.set(5.8, 0, 3);

  const material = new THREE.MeshStandardMaterial({ map: brownTexture });
  chair.traverse((child) => {
    if (child.isMesh) {

    child.material = material;
     
    }
  });

  roomAndFurnitureGroup.add(chair);
});




//------------------TABLE--------------------------------------
const wooodenTexture = textureLoader.load('textures/darkwood.jpg');

loader.load('models/room/table.gltf', (gltf) => {
  const table = gltf.scene;
  table.scale.set(1.5, 1.5, 1.5);
  table.rotation.y = Math.PI / -2;
  table.position.set(-1.5, 0, -5);

  // Create a material with the texture
  const material = new THREE.MeshStandardMaterial({ map: wooodenTexture });

  // Traverse through all the children of the loaded table model
  table.traverse((child) => {
    if (child.isMesh) {
      // Assign the material to the mesh
      child.material = material;
    }
  });

  roomAndFurnitureGroup.add(table);
});



//-----Decoration lamp, flowers---------------------------------------
loader.load('models/lamps/chandelier.gltf', (gltf) => {
  const chandelier = gltf.scene;

  // Traverse through all the children of the loaded chandelier model
  chandelier.traverse((child) => {
    if (child.isMesh) {
      // Create a material with the desired color
      const material = new THREE.MeshStandardMaterial({ color: 0xd2b48c }); // Brownish creamy color

      // Assign the material to the mesh
      child.material = material;
    }
  });

  chandelier.scale.set(1.5, 1.5, 1.5);
  chandelier.position.set(0, 1, 0);
  scene.add(chandelier);
});


//light for chandelier
const rectLight2 = new THREE.RectAreaLight( 0xffffff, 2, 6.5, 20);
rectLight2.position.set(-0.1,0.4,-0.7);
rectLight2.lookAt(0,0,100);
scene.add( rectLight2 );



  loader.load('models/coffeTable/flower.gltf', (gltf) => {
    const flower = gltf.scene;
    flower.scale.set(0.3, 0.3, 0.3);
    flower.rotation.y = (Math.PI/-2);
  
    flower.position.set(0.2, 0.4, -5)
    roomAndFurnitureGroup.add(flower); 
  });


const plantsGroup=new THREE.Group();




loader.load('models/plants/pot.gltf', (gltf) => {
    const flaskfilondreon = gltf.scene;
    flaskfilondreon.scale.set(0.3, 0.3, 0.3 );
    flaskfilondreon.position.set(-4.2, 0, -6.5)
    scene.add(flaskfilondreon); 
});




//-------------SOFAS-------------------------------------------------------

const beigeTexture = textureLoader.load('textures/beige.jpg');
loader.load('models/couch/SofaBaker.gltf', (gltf) => {
    const couch = gltf.scene;
    couch.scale.set(2.5, 2, 2 );
    couch.position.set(-1, 0, -7)
    scene.add(couch); 

   
    const material = new THREE.MeshStandardMaterial({ map: beigeTexture });
   
    couch.traverse((child) => {
      if (child.isMesh) {
        
        child.material = material;
      }
    });
    
    
});


const bbTextureLoader = new THREE.TextureLoader();
const BeanBagTexture=bbTextureLoader.load('/textures/beanBagTexture.jpg');


loader.load('models/couch/BeanBag.gltf', (gltf) => {
    const beanBag = gltf.scene;
    beanBag.scale.set(2, 1.6, 1.6 );
    beanBag.position.set(-3, 0, -4)
    scene.add(beanBag); 
    beanBag.rotation.y = (Math.PI/1.5);
    

    const material = new THREE.MeshStandardMaterial({ map: beigeTexture });
    
    beanBag.traverse((child) => {
      if (child.isMesh) {
        
        child.material = material;
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


//-------------------------Letters-Wall Decor-----------------------
loader.load('models/letters/letters.gltf', (gltf) => {
    const letters = gltf.scene;

    letters.traverse((child) => {
        if (child.isMesh) {
            
            const texture = new THREE.TextureLoader().load('textures/darkwood.jpg');
            const material = new THREE.MeshBasicMaterial({ map: texture });
            child.material = material;
        }
    });
    letters.scale.set(0.5, 0.5, 0.5);
    letters.rotation.y = (Math.PI/2);
    letters.position.set(-7, 2.2, -2)
    roomAndFurnitureGroup.add(letters); 
});



//-------------------AIR PURIFIER-------------------------------------------

loader.load('models/airpurifier/airpurifier.gltf', (gltf) => {
  const airpurifier = gltf.scene;
  airpurifier.scale.set(1, 1, 1);
  airpurifier.rotation.y = (Math.PI/2);
  airpurifier.position.set(-6.3, 0.01, -8)
  roomAndFurnitureGroup.add(airpurifier); 
});


let smoke; 
loader.load('models/smoke/smoke.gltf', (gltf) => {
    smoke = gltf.scene;

    smoke.traverse((child) => {
      if (child.isMesh) {
          
          const milkMaterial = new THREE.MeshStandardMaterial({ color: 0xf5f5dc, transparent: true, opacity: 0.7 });
         
          child.material = milkMaterial;
      }
  });

    smoke.scale.set(0.5, 0.5, 0.5);
    smoke.rotation.y = Math.PI / 2;
    smoke.position.set(-6.7, 2.2, -8);
    roomAndFurnitureGroup.add(smoke);
    
    
    animateSmokeScaling();
});


const animationDuration = 3600000;


let scaleIncrement = 0.001;
let currentScale = 1;


let startTime = null;


function updateScale(timestamp) {
    
    if (!startTime) {
        startTime = timestamp;
    }

    
    const elapsedTime = timestamp - startTime;

    const progress = elapsedTime / animationDuration;
    if (progress < 1) {
       
        currentScale += scaleIncrement;

        
        smoke.scale.set(currentScale, currentScale, currentScale);

      
        if (currentScale > 1.5 || currentScale < 0.5) {
            scaleIncrement *= -1;
        }

       
        requestAnimationFrame(updateScale);
    }
}




//---------------WALL SHELF---------------------------------
loader.load('models/wallshelf/wallshelf.gltf', (gltf) => {
  const wallshelf = gltf.scene;
  wallshelf.scale.set(1.05, 0.5, 0.5);
  wallshelf.rotation.y = (Math.PI/2);
  wallshelf.position.set(-7, 1.5, -3.1)
  roomAndFurnitureGroup.add(wallshelf); 
});





//------------------ANIMATION OF MAKEUPS-------------------------------------


// Function to animate the bouncing effect
function animateBouncing(object, initialY) {
  const bounceSpeed = 0.99; // Adjust the speed of the bouncing effect
  const bounceHeight = 0.05; // Adjust the maximum height of the bounce

  let time = 0;

  function update() {
      const delta = Math.sin(time) * bounceHeight;
      object.position.y = initialY + delta;
      time += bounceSpeed;
  }

  return update;
}

// Example usage:




// ---------------------MAKEUP PRODUCTS/ MODELS----------------------------------------



loader.load('models/makeup/lipstick/lipstick.gltf', (gltf) => {
  const lipstick = gltf.scene;
  lipstick.userData.isMakeupModel = true;
  lipstick.userData.color = new THREE.Color('red'); // Red color
  lipstick.scale.set(0.7, 0.7, 0.7);
  lipstick.rotation.y = Math.PI / 2;
  lipstick.position.set(-6.6, 1.5, -1);

  // Add the bouncing animation
  const initialY = lipstick.position.y;
  const animateBounce = animateBouncing(lipstick, initialY);
  scene.add(lipstick);

  // Update the bouncing animation in the render loop
  function render() {
      animateBounce();
      renderer.render(scene, camera);
      requestAnimationFrame(render);
  }

  // Start rendering
  render();
});

loader.load('models/makeup/chanel/chanel.gltf', (gltf) => {
  const chanel = gltf.scene;
  chanel.userData.isMakeupModel = true;
  chanel.userData.color = 0xf5f5dc; // Beige color
  chanel.scale.set(0.4, 0.5, 0.5);
  chanel.position.set(-6.6, 1.9, -1.4);
  chanel.rotation.y = (Math.PI/2);
   // Add the bouncing animation
   const initialY = chanel.position.y;
   const animateBounce = animateBouncing(chanel, initialY);
   scene.add(chanel); 
 
   // Update the bouncing animation in the render loop
   function render() {
       animateBounce();
       renderer.render(scene, camera);
       requestAnimationFrame(render);
   }
 
   // Start rendering
   render();
  
   
});


loader.load('models/makeup/gorgioarmani/gorgioarmani.gltf', (gltf) => {
  const gorgioarmani = gltf.scene;
  // gorgioarmani.onClick = handleMakeupModelClick(0x8b4513);
  gorgioarmani.scale.set(0.07, 0.08, 0.1);
  gorgioarmani.position.set(-6.7, 1.5, -2.8);
 //gorgioarmani.rotation.y = (Math.PI/2);
  // Add the bouncing animation
  const initialY = gorgioarmani.position.y;
  const animateBounce = animateBouncing(gorgioarmani, initialY);
  scene.add(gorgioarmani); 

  // Update the bouncing animation in the render loop
  function render() {
      animateBounce();
      renderer.render(scene, camera);
      requestAnimationFrame(render);
  }

  // Start rendering
  render();


});


loader.load('models/makeup/tfLipstic/tfLipstic.gltf', (gltf) => {
  const tfLipstic = gltf.scene;
  tfLipstic.userData.isMakeupModel = true;
  tfLipstic.userData.color = 0x8b4513;
  tfLipstic.scale.set(0.15, 0.15, 0.15);
  tfLipstic.position.set(-6.6, 1.5, -4);
  tfLipstic.rotation.y = (Math.PI/2);
  const initialY = tfLipstic.position.y;
  const animateBounce = animateBouncing(tfLipstic, initialY);
  scene.add(tfLipstic); 

  // Update the bouncing animation in the render loop
  function render() {
      animateBounce();
      renderer.render(scene, camera);
      requestAnimationFrame(render);
  }

  // Start rendering
  render();
 
  
});

loader.load('models/makeup/lipstick1/lipstick1.gltf', (gltf) => {
  const lipstick1 = gltf.scene;
  //lipstick1.onClick = handleMakeupModelClick(0x8b4513);
  lipstick1.scale.set(0.4, 0.4, 0.4);
  lipstick1.position.set(-6.6, 1.5, -4.8);
  lipstick1.rotation.y = (Math.PI/2);
  const initialY = lipstick1.position.y;
  const animateBounce = animateBouncing(lipstick1, initialY);
  scene.add(lipstick1); 

  // Update the bouncing animation in the render loop
  function render() {
      animateBounce();
      renderer.render(scene, camera);
      requestAnimationFrame(render);
  }

  // Start rendering
  render();
  
  
});

//------------------------ONHOVER TEXTURE----------------------------

// const boxGeometry = new THREE.BoxGeometry(2, 2, 2);
// const normalTexture = new THREE.TextureLoader().load('textures/glitter.jpg');
// const hoverTexture = new THREE.TextureLoader().load('textures/white.jpg');
// const mmaterial = new THREE.MeshBasicMaterial({ map: normalTexture });
// const boxMesh = new THREE.Mesh(boxGeometry, mmaterial);
// boxMesh.position.set(0, 4, 0);
// scene.add(boxMesh);

// boxMesh.addEventListener('mouseenter', () => {
//     boxMesh.material.map = hoverTexture;
// });

// boxMesh.addEventListener('mouseleave', () => {
//     boxMesh.material.map = normalTexture;
// });




//-------------------------MAKEUP ARTIST----------------------

loader.load('models/makeupArtist/makeupArtist.gltf', (gltf) => {
  const makeupArtist = gltf.scene;
  makeupArtist.scale.set(1.2, 1.2, 1.2);
  makeupArtist.position.set(-6.7, 0, 3.5);
  makeupArtist.rotation.y = (Math.PI/2);
  scene.add(makeupArtist); 
});






//-------------------------PHOTOGRAPHY ROOM----------------------------------------

loader.load('models/photoroom/photoroom.gltf', (gltf) => {
  const photoroom = gltf.scene;
  photoroom.scale.set(0.5, 0.5, 0.3);
  photoroom.position.set(-11.5, 0, 4.8);
  photoroom.rotation.y = (Math.PI);
  scene.add(photoroom); 
  
});



//-------------DECORATION-------------------------------
loader.load('models/carpet/carpet.gltf', (gltf) => {
  const carpet = gltf.scene;
  carpet.scale.set(1.5, 1.5, 1.5);
  carpet.position.set(-1, 0, -4.7);
  carpet.rotation.y = (Math.PI);
  scene.add(carpet); 
  
});


scene.add(roomAndFurnitureGroup);



//-------------------LIGHTS------------------------------------------

const ambientLight = new THREE.AmbientLight(0x404040, 5); // Increase intensity to 2
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(5, 5, 5);
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

//--------------ORBIT CONTROL FOR ROTATION CAMERA CONTROL--------------------------------------
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI / 2;


document.addEventListener('keydown', (event) => {
    const speed = 0.1; 
    switch (event.key) {
        case 'ArrowUp':
            
            camera.position.x -= Math.sin(camera.rotation.y) * speed;
            camera.position.z -= Math.cos(camera.rotation.y) * speed;
            break;
        case 'ArrowDown':
            
            camera.position.x += Math.sin(camera.rotation.y) * speed;
            camera.position.z += Math.cos(camera.rotation.y) * speed;
            break;
        case 'ArrowLeft':
            
            camera.rotation.y += 0.1;
            break;
        case 'ArrowRight':
            
            camera.rotation.y -= 0.1;
            break;
    }
});

//------------------------DAY AND NIGHT MODE-----------------------------------

const toggleModeButton = document.getElementById('toggleModeButton');
let isDayMode = true;

const toggleMode = () => {
  
    isDayMode = !isDayMode;

    if (isDayMode) {
        scene.background = new THREE.Color(0xfff0ff); 
        rectLight1.color.set(0xffffff); 
    } else {
        scene.background = new THREE.Color(0x000000); 
        rectLight1.color.set(0xff0000); 
    }
};

toggleModeButton.addEventListener('click', toggleMode);
const animate = () => {

requestAnimationFrame(updateScale);

renderer.render(scene, camera);
requestAnimationFrame(animate);
};

animate();