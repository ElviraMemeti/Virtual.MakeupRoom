import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';

 // Scene, Camera and Renderer
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 15;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);
renderer.gammaOutput = false;

// Axes X,Y,Z
const axesHelper = new THREE.AxesHelper(20); 
scene.add(axesHelper);

// Groups
const roomAndFurnitureGroup = new THREE.Group();


//Models
const loader = new GLTFLoader();
loader.load('models/room/room.gltf', (gltf) => {
    const room = gltf.scene;
    console.log('Model loaded:', room);

      room.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });

    room.scale.set(1, 1, 1);
    roomAndFurnitureGroup.add(room);

    scene.add(room);
});


loader.load('models/longTable/longTable.gltf', (gltf) => {
    const longTable = gltf.scene;
     longTable.scale.set(0.5, 0.4, 1.2);
   // longTable.rotation.y = (Math.PI/2);
    longTable.position.set(-6.5, 0.7, -3)
    roomAndFurnitureGroup.add(longTable); 
});



loader.load('models/dressingTable/dressingTable.gltf', (gltf) => {
    const dressingTable = gltf.scene;
    dressingTable.scale.set(1.5, 1.5, 1.5);
   dressingTable.rotation.y = (Math.PI/2);
   dressingTable.position.set(6.7, 0, -4.5)
    roomAndFurnitureGroup.add(dressingTable); 
});


loader.load('models/dressingTable/dressingTable.gltf', (gltf) => {
    const dressingTable = gltf.scene;
    dressingTable.scale.set(1.5, 1.5, 1.5);
   dressingTable.rotation.y = (Math.PI/2);
   dressingTable.position.set(6.7, 0, -1.5)
    roomAndFurnitureGroup.add(dressingTable); 
});


loader.load('models/dressingTable/dressingTable.gltf', (gltf) => {
    const dressingTable = gltf.scene;
    dressingTable.scale.set(1.5, 1.5, 1.5);
   dressingTable.rotation.y = (Math.PI/2);
   dressingTable.position.set(6.7, 0, 1.5)
    roomAndFurnitureGroup.add(dressingTable); 
});





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
    blankCanvas.position.set(-6.5, 1.2, -3.3)
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

// loader.load('models/makeup/tfLipstic/tfLiptstic.gltf', (gltf) => {
//     const tfLiptstic = gltf.scene;
//     tfLiptstic.scale.set(1, 1, 1);
//    // tfLiptstic.rotation.y = (Math.PI/2);
//     tfLiptstic.position.set(-6.5, 1.1, -6)
//     roomAndFurnitureGroup.add(tfLiptstic); 
// });


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