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
            var testMaterial = new THREE.MeshPhongMaterial();
            testMaterial.color.setRGB(1, 0, 1);
            var newMesh = new THREE.Mesh(new THREE.BoxGeometry(200, 200, 200), testMaterial);
            newMesh.position.set(0, 300, 0);
            scene.add(newMesh);
            this.mesh = newMesh;
        };
        TestEmoji.prototype.rotateInX = function (degrees) {
            this.mesh.rotateX(2 * Math.PI * degrees / 360);
            this.xRotation += degrees;
        };
        TestEmoji.prototype.rotateInY = function (degrees) {
            this.mesh.rotateY(2 * Math.PI * degrees / 360);
            this.yRotation += degrees;
        };
        TestEmoji.prototype.rotateInZ = function (degrees) {
            this.mesh.rotateZ(2 * Math.PI * degrees / 360);
            this.zRotation += degrees;
        };
        return TestEmoji;
    }());
    Emoji.TestEmoji = TestEmoji;
})(Emoji || (Emoji = {}));
