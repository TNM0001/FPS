function initHouseEnvironment() {
    let floor = new THREE.Mesh(new THREE.BoxGeometry(20, 0.1, 20), new THREE.MeshBasicMaterial({ color: 0x00ff00 }));
    floor.position.y = -0.05;
    scene.add(floor);

    let wall1 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 2, 20), new THREE.MeshBasicMaterial({ color: 0xff0000 }));
    wall1.position.set(-9.95, 1, 0);
    scene.add(wall1);

    let wall2 = wall1.clone();
    wall2.position.set(9.95, 1, 0);
    scene.add(wall2);

    let wall3 = wall1.clone();
    wall3.geometry = new THREE.BoxGeometry(20, 2, 0.1);
    wall3.position.set(0, 1, -9.95);
    scene.add(wall3);

    camera.position.set(0, 2, 10);
    camera.lookAt(0, 0, 0);

    loadingStatus.style.display = 'none';
    isLoaded = true;
}

function animateHouseScene() {
    requestAnimationFrame(animateHouseScene);
    if (isLoaded) {
        renderer.render(scene, camera);
    }
}

initHouseEnvironment();
animateHouseScene();