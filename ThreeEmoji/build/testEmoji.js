var Emoji;
(function (Emoji) {
    var TestEmoji = /** @class */ (function () {
        function TestEmoji(name) {
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
        return TestEmoji;
    }());
    Emoji.TestEmoji = TestEmoji;
})(Emoji || (Emoji = {}));
