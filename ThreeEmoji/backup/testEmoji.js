var Emoji;
(function (Emoji) {
    var TestEmoji = /** @class */ (function () {
        function TestEmoji(name) {
            this.xRotation = 0;
            this.yRotation = 0;
            // this.zRotation = 0;
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

        // Rotate on X axis
        TestEmoji.prototype.rotateInX = function (degrees) {
            // Check if it want to face up or face down and only to certain degree
            if (degrees > 0 && this.xRotation < 20){   // if this gonna turn right
                this.mesh.rotateX(2 * Math.PI * degrees / 360);
                this.xRotation += degrees;
                }
             else if(degrees <0 && this.xRotation > (-20)){   // else if this gonna turn left
                this.mesh.rotateX(2 * Math.PI * degrees / 360);
                this.xRotation += degrees;
             }
        };

        // Rotate on Y axis
        TestEmoji.prototype.rotateInY = function (degrees) {
            // Check if its turn left or right and only to certain degree
            if (degrees > 0 && this.yRotation < 20){   // if this gonna face up
                this.mesh.rotateY(2 * Math.PI * degrees / 360);
                this.yRotation += degrees;
                }
             else if(degrees <0 && this.yRotation > (-20)){   // else if this gonna face down
                this.mesh.rotateY(2 * Math.PI * degrees / 360);
                this.yRotation += degrees;
             }

        };

        // // Rotate on Z axis, for completness
        // TestEmoji.prototype.rotateInZ = function (degrees) {
        //     this.mesh.rotateZ(2 * Math.PI * degrees / 360);
        //     this.zRotation += degrees;
        // };

        return TestEmoji;
    }());
    Emoji.TestEmoji = TestEmoji;
})(Emoji || (Emoji = {}));
