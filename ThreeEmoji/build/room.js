var Tools;
(function (Tools) {
    function createRoom() {
        // Floor
        var floorMaterial = new THREE.MeshPhongMaterial({
            color: 0xFFFFFf,
            specular: 0x050505,
            shininess: 100
        });
        var floor = new THREE.Mesh(new THREE.BoxGeometry(3000, 10, 2000), floorMaterial);
        floor.position.set(0, -10, 0);
        scene.add(floor);
        // Walls
        var wallMaterial = new THREE.MeshLambertMaterial();
        wallMaterial.color.setRGB(1, 1, 1);
        var wallLeft = new THREE.Mesh(new THREE.BoxGeometry(10, 2000, 2000), wallMaterial);
        wallLeft.position.set(1500, 1000, 0);
        scene.add(wallLeft);
        var wallRight = new THREE.Mesh(new THREE.BoxGeometry(10, 2000, 2000), wallMaterial);
        wallRight.position.set(-1500, 1000, 0);
        scene.add(wallRight);
        var wallBack = new THREE.Mesh(new THREE.BoxGeometry(3000, 2000, 10), wallMaterial);
        wallBack.position.set(0, 1000, 1000);
        scene.add(wallBack);
    }
    Tools.createRoom = createRoom;
    function fancyLighting() {
        var spotlight1 = new THREE.SpotLight(0xFF0000, 0.3);
        spotlight1.position.set(1500, 2000, 0);
        scene.add(spotlight1);
        var spotlight2 = new THREE.SpotLight(0x00FF00, 0.3);
        spotlight2.position.set(-1500, 2000, 0);
        scene.add(spotlight2);
    }
    Tools.fancyLighting = fancyLighting;
})(Tools || (Tools = {}));
