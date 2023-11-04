let scene, camera, renderer, playerBox;
let loadingStatus = document.getElementById('loading-status');
let isLoaded = false;

function init() {
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("game-container").appendChild(renderer.domElement);

    let playerGeometry = new THREE.BoxGeometry(1, 2, 1);
    let playerMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    playerBox = new THREE.Mesh(playerGeometry, playerMaterial);
    scene.add(playerBox);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    playerBox.add(camera);
    camera.position.set(0, 1.5, 0.5);

    const textureLoader = new THREE.TextureLoader();
    let wallTexture, floorTexture;

    textureLoader.load('https://raw.githubusercontent.com/TNM0001/assets/main/brick.jpg', function (texture) {
        wallTexture = texture;
        loadAssets();
    });

    textureLoader.load('https://raw.githubusercontent.com/TNM0001/assets/main/grass.jpg', function (texture) {
        floorTexture = texture;
        loadAssets();
    });

    function loadAssets() {
        if (wallTexture && floorTexture) {
            const wallMaterial = new THREE.MeshBasicMaterial({ map: wallTexture });
            const floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture });

            const wallGeometry = new THREE.BoxGeometry(20, 10, 0.1);
            const floorGeometry = new THREE.BoxGeometry(20, 0.1, 20);

            const wall1 = new THREE.Mesh(wallGeometry, wallMaterial);
            const wall2 = new THREE.Mesh(wallGeometry, wallMaterial);
            const wall3 = new THREE.Mesh(wallGeometry, wallMaterial);
            const wall4 = new THREE.Mesh(wallGeometry, wallMaterial);
            const floor = new THREE.Mesh(floorGeometry, floorMaterial);

            wall1.position.set(0, 5, -10);
            wall2.position.set(0, 5, 10);
            wall3.position.set(-10, 5, 0);
            wall3.rotation.y = Math.PI / 2;
            wall4.position.set(10, 5, 0);
            wall4.rotation.y = Math.PI / 2;
            floor.position.set(0, -0.05, 0);

            scene.add(wall1, wall2, wall3, wall4, floor);

            const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
            scene.add(ambientLight);

            const dirLight = new THREE.DirectionalLight(0xffffff, 1);
            dirLight.position.set(5, 5, 5);
            scene.add(dirLight);

            loadingStatus.style.display = 'none';
            isLoaded = true;
        }
    }
}

document.addEventListener("keydown", (event) => {
    let moveDistance = 0.1;
    if (isLoaded) {
        if (event.key === "w") {
            playerBox.position.z -= moveDistance;
        } else if (event.key === "s") {
            playerBox.position.z += moveDistance;
        } else if (event.key === "a") {
            playerBox.position.x -= moveDistance;
        } else if (event.key === "d") {
            playerBox.position.x += moveDistance;
        } else if (event.key === " ") {
        }
    }
});

document.addEventListener("click", (event) => {
    if (isLoaded) {
    }
});

function animate() {
    requestAnimationFrame(animate);
    if (isLoaded) {
        camera.position.copy(playerBox.position);
        camera.position.y += 1.2;
        camera.position.z -= 0.3;

        renderer.render(scene, camera);
    }
}

init();
animate();