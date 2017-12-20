var Emoji;
(function (Emoji) {
    var TestEmoji = /** @class */ (function () {
        function TestEmoji(name) {
            this.xRotation = 0;
            this.yRotation = 0;
            this.zRotation = 0;
            this.name = name;
            this.createMesh();
        }
        TestEmoji.prototype.createMesh = function () {
            this.emoji = new THREE.Object3D;
            var testMaterial = new THREE.MeshPhongMaterial();
            testMaterial.color.setRGB(1, 0, 1);
            var newMesh = new THREE.Mesh(new THREE.BoxGeometry(200, 200, 200), testMaterial);
            newMesh.position.set(0, 300, 0);
            var eyeMat = new THREE.MeshPhongMaterial();
            eyeMat.color.setRGB(0, 0, 0);
            var eyePupilMat = new THREE.MeshPhongMaterial();
            eyePupilMat.color.setRGB(1, 1, 1);
            var leftEye = new THREE.Mesh(new THREE.CylinderGeometry(30, 30, 20), eyeMat);
            leftEye.position.set(35, 325, -100);
            this.emoji.add(leftEye);
            var rightEye = leftEye.clone();
            rightEye.position.set(-35, 325, -100);
            leftEye.rotateX(2 * Math.PI * 90 / 360);
            rightEye.rotateX(2 * Math.PI * 90 / 360);
            this.lEye = leftEye;
            scene.add(leftEye);
            scene.add(rightEye);
            this.emoji.add(newMesh);
            scene.add(newMesh);
            this.mesh = newMesh;
        };
        // Need to rotate then move eyes to correct position.
        // Max X-Y = 150-150?
        TestEmoji.prototype.rotateInX = function (degrees) {
            if (Math.abs(degrees) < 15 && Math.abs(this.xRotation) < 30) {
                this.mesh.rotateX(-2 * Math.PI * degrees / 360);
                this.xRotation += degrees;
            }
        };
        TestEmoji.prototype.rotateInY = function (degrees) {
            if (Math.abs(degrees) < 15 && Math.abs(this.yRotation) < 30) {
                this.mesh.rotateY(-2 * Math.PI * degrees / 360);
                this.yRotation += degrees;
            }
        };
        TestEmoji.prototype.rotateInZ = function (degrees) {
            if (Math.abs(degrees) < 15 && Math.abs(this.zRotation) < 30) {
                this.mesh.rotateZ(-2 * Math.PI * degrees / 360);
                this.zRotation += degrees;
            }
        };
        return TestEmoji;
    }());
    Emoji.TestEmoji = TestEmoji;
})(Emoji || (Emoji = {}));
