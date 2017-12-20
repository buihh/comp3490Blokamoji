var Emoji;
var MAX_ROTATION = 20;

(function (Emoji) {
    var TestEmoji = /** @class */ (function () {
        function TestEmoji(name) {
            this.xRotation = 0;
            this.yRotation = 0;
            this.zRotation = 0;
            this.name = name;
            // this.createMesh();
            this.createLionEmoji();
        }
        TestEmoji.prototype.createLionEmoji = function() {
            this.emoji = new THREE.Object3D;
            this.maneParts = [];
            this.threegroup = new THREE.Group();
            this.yellowMat = new THREE.MeshLambertMaterial ({
                color: 0xfdd276,
                shading:THREE.FlatShading
            });
            this.redMat = new THREE.MeshLambertMaterial ({
                color: 0xad3525,
                shading:THREE.FlatShading
              });

            this.pinkMat = new THREE.MeshLambertMaterial ({
                color: 0xe55d2b,
                shading:THREE.FlatShading
              });

            this.whiteMat = new THREE.MeshLambertMaterial ({
                color: 0xffffff,
                shading:THREE.FlatShading
              });

            this.purpleMat = new THREE.MeshLambertMaterial ({
                color: 0x451954,
                shading:THREE.FlatShading
              });

            this.greyMat = new THREE.MeshLambertMaterial ({
                color: 0x653f4c,
                shading:THREE.FlatShading
              });

            this.blackMat = new THREE.MeshLambertMaterial ({
                color: 0x302925,
                shading:THREE.FlatShading
              });

            var maneGeom = new THREE.BoxGeometry(40,40,15);
            var faceGeom = new THREE.BoxGeometry(80,80,80);
            var spotGeom = new THREE.BoxGeometry(4,4,4);
            var mustacheGeom = new THREE.BoxGeometry(30,2,1);
              mustacheGeom.applyMatrix( new THREE.Matrix4().makeTranslation( 15, 0, 0 ) );

            var earGeom = new THREE.BoxGeometry(20,20,20);
            var noseGeom = new THREE.BoxGeometry(40,40,20);
            var eyeGeom = new THREE.BoxGeometry(5,30,30);
            var irisGeom = new THREE.BoxGeometry(4,10,10);
            var mouthGeom = new THREE.BoxGeometry(20,20,10);
            var smileGeom = new THREE.TorusGeometry( 12, 4, 2, 10, Math.PI );
            var lipsGeom = new THREE.BoxGeometry(40,15,20);

            // mane

            this.mane = new THREE.Group();

              for (var j=0; j<4; j++){
                for (var k=0; k<4; k++){
                  var manePart = new THREE.Mesh(maneGeom, this.redMat);
                  manePart.position.x = (j*40)-60;
                  manePart.position.y = (k*40)-60;

                  var amp;
                  var zOffset;
                  var periodOffset = Math.random()*Math.PI*2;
                  // var angleOffsetY, angleOffsetX;
                  // var angleAmpY, angleAmpX;
                  // var xInit, yInit;


                  if ((j==0 && k==0) || (j==0 && k==3) || (j==3 && k==0) || (j==3 && k==3)){
                    amp = -10-Math.floor(Math.random()*5);
                    zOffset = -5;
                  }else if (j==0 || k ==0 || j==3 || k==3){
                    amp = -5-Math.floor(Math.random()*5);
                    zOffset = 0;
                  }else{
                    amp = 0;
                    zOffset = 0;
                  }

                  this.maneParts.push({mesh:manePart, amp:amp, zOffset:zOffset, periodOffset:periodOffset, xInit:manePart.position.x, yInit:manePart.position.y});
                  this.mane.add(manePart);
                }
              }

              this.mane.position.y = -10;
              this.mane.position.z = 80;
              //this.mane.rotation.z = Math.PI/4;

              // face
              this.face = new THREE.Mesh(faceGeom, this.yellowMat);
              this.face.position.z = 135;

              // Mustaches

              this.mustaches = [];

              this.mustache1 = new THREE.Mesh(mustacheGeom, this.greyMat);
              this.mustache1.position.x = 30;
              this.mustache1.position.y = -5;
              this.mustache1.position.z = 175;
              this.mustache2 = this.mustache1.clone();
              this.mustache2.position.x = 35;
              this.mustache2.position.y = -12;
              this.mustache3 = this.mustache1.clone();
              this.mustache3.position.y = -19;
              this.mustache3.position.x = 30;
              this.mustache4 = this.mustache1.clone();
              this.mustache4.rotation.z = Math.PI;
              this.mustache4.position.x = -30;
              this.mustache5 = new THREE.Mesh(mustacheGeom, this.blackMat);
              this.mustache5 = this.mustache2.clone();
              this.mustache5.rotation.z = Math.PI;
              this.mustache5.position.x = -35;
              this.mustache6 = new THREE.Mesh(mustacheGeom, this.blackMat);
              this.mustache6 = this.mustache3.clone();
              this.mustache6.rotation.z = Math.PI;
              this.mustache6.position.x = -30;

              this.mustaches.push(this.mustache1);
              this.mustaches.push(this.mustache2);
              this.mustaches.push(this.mustache3);
              this.mustaches.push(this.mustache4);
              this.mustaches.push(this.mustache5);
              this.mustaches.push(this.mustache6);

              // spots
              this.spot1 = new THREE.Mesh(spotGeom, this.redMat);
              this.spot1.position.x = 39;
              this.spot1.position.z = 150;

              this.spot2 = this.spot1.clone();
              this.spot2.position.z = 160;
              this.spot2.position.y = -10;

              this.spot3 = this.spot1.clone();
              this.spot3.position.z = 140;
              this.spot3.position.y = -15;

              this.spot4 = this.spot1.clone();
              this.spot4.position.z = 150;
              this.spot4.position.y = -20;

              this.spot5 = this.spot1.clone();
              this.spot5.position.x = -39;
              this.spot6 = this.spot2.clone();
              this.spot6.position.x = -39;
              this.spot7 = this.spot3.clone();
              this.spot7.position.x = -39;
              this.spot8 = this.spot4.clone();
              this.spot8.position.x = -39;

              // eyes
              this.leftEye = new THREE.Mesh(eyeGeom, this.whiteMat);
              this.leftEye.position.x = 40;
              this.leftEye.position.z = 120;
              this.leftEye.position.y = 25;

              this.rightEye = new THREE.Mesh(eyeGeom, this.whiteMat);
              this.rightEye.position.x = -40;
              this.rightEye.position.z = 120;
              this.rightEye.position.y = 25;

              // iris
              this.leftIris = new THREE.Mesh(irisGeom, this.purpleMat);
              this.leftIris.position.x = 42;
              this.leftIris.position.z = 120;
              this.leftIris.position.y = 25;

              this.rightIris = new THREE.Mesh(irisGeom, this.purpleMat);
              this.rightIris.position.x = -42;
              this.rightIris.position.z = 120;
              this.rightIris.position.y = 25;

              // mouth
              this.mouth = new THREE.Mesh(mouthGeom, this.blackMat);
              this.mouth.position.z = 171;
              this.mouth.position.y = -30;
              this.mouth.scale.set(.5,.5,1);

              // smile
              this.smile = new THREE.Mesh(smileGeom, this.greyMat);
              this.smile.position.z = 173;
              this.smile.position.y = -15;
              this.smile.rotation.z = -Math.PI;

              // lips
              this.lips = new THREE.Mesh(lipsGeom, this.yellowMat);
              this.lips.position.z = 165;
              this.lips.position.y = -45;


              // ear
              this.rightEar = new THREE.Mesh(earGeom, this.yellowMat);
              this.rightEar.position.x = -50;
              this.rightEar.position.y = 50;
              this.rightEar.position.z = 105;

              this.leftEar = new THREE.Mesh(earGeom, this.yellowMat);
              this.leftEar.position.x = 50;
              this.leftEar.position.y = 50;
              this.leftEar.position.z = 105;

              // nose
              this.nose = new THREE.Mesh(noseGeom, this.greyMat);
              this.nose.position.z = 170;
              this.nose.position.y = 25;

              // head
              this.head = new THREE.Group();
              this.head.add(this.face);
              this.head.add(this.mane);
              this.head.add(this.rightEar);
              this.head.add(this.leftEar);
              this.head.add(this.nose);
              this.head.add(this.leftEye);
              this.head.add(this.rightEye);
              this.head.add(this.leftIris);
              this.head.add(this.rightIris);
              this.head.add(this.mouth);
              this.head.add(this.smile);
              this.head.add(this.lips);
              this.head.add(this.spot1);
              this.head.add(this.spot2);
              this.head.add(this.spot3);
              this.head.add(this.spot4);
              this.head.add(this.spot5);
              this.head.add(this.spot6);
              this.head.add(this.spot7);
              this.head.add(this.spot8);
              this.head.add(this.mustache1);
              this.head.add(this.mustache2);
              this.head.add(this.mustache3);
              this.head.add(this.mustache4);
              this.head.add(this.mustache5);
              this.head.add(this.mustache6);


              this.head.position.y = 300;
              this.head.rotateY(2 * Math.PI * 180 / 360);
              this.threegroup.add(this.head);
              this.emoji.add(this.head);
              scene.add(this.head);

              this.threegroup.traverse( function ( object ) {
                    if ( object instanceof THREE.Mesh ) {
                        object.castShadow = true;
                        object.receiveShadow = true;
                    }
                } );
        }

        // TestEmoji.prototype.createMesh = function () {
        //     this.emoji = new THREE.Object3D;
        //     var testMaterial = new THREE.MeshPhongMaterial();
        //     testMaterial.color.setRGB(1, 0, 1);
        //     var emojiFace = new THREE.Mesh(new THREE.BoxGeometry(200, 200, 200), testMaterial);
        //     this.emoji.add(emojiFace);
        //     emojiFace.position.set(0, 300, 0);
        //     this.mesh = emojiFace;
        //
        //
        //     var eyeMat = new THREE.MeshPhongMaterial();
        //     eyeMat.color.setRGB(0, 0, 0);
        //     var eyePupilMat = new THREE.MeshPhongMaterial();
        //     eyePupilMat.color.setRGB(1, 1, 1);
        //
        //     var leftEye = new THREE.Mesh(new THREE.CylinderGeometry(30, 30, 20), eyeMat);
        //     emojiFace.add(leftEye);
        //     var rightEye = leftEye.clone();
        //     emojiFace.add(rightEye)
        //
        //     leftEye.position.set(35, 25, -100);
        //     rightEye.position.set(-35, 25, -100);
        //
        //     leftEye.rotateX(2 * Math.PI * 90 / 360);
        //     rightEye.rotateX(2 * Math.PI * 90 / 360);
        //     // scene.add(leftEye);
        //     // scene.add(rightEye);
        //      scene.add(emojiFace);
        //
        //
        // };
        //

        TestEmoji.prototype.rotateInX = function (distanceInY, originalPositionY) {

            if (distanceInY < -2) { //Head move up and limit the shaky of the detector
                if (this.xRotation < (-distanceInY / originalPositionY * MAX_ROTATION)) {//Limit the rotation at 20 degree
                    this.head.rotateX(2 * Math.PI * (-3) / 360);
                    this.xRotation += 1;
                }
            }
            else if (distanceInY > 2) { //Head move down
                if (this.xRotation > (-distanceInY / originalPositionY * MAX_ROTATION)){//Limit the rotation at 20 degree
                    this.head.rotateX(2 * Math.PI * (3) / 360);
                    this.xRotation -= 1;
                    }
            }

        };

        TestEmoji.prototype.rotateInY = function (distanceInX, originalPositionX) {
            // console.log(distanceInX)
            if (distanceInX < -2) { //Head move to the right and limit the shaky of the detector
                if ( this.yRotation < (-distanceInX/ originalPositionX * MAX_ROTATION) ) {//Limit the rotation at 20 degree
                    this.head.rotateY(2 * Math.PI * (3) / 360);
                    this.yRotation += 1;
                }
            }
            else if (distanceInX > 2) { //Head move right
                if (this.yRotation > (-distanceInX/ originalPositionX * MAX_ROTATION)){//Limit the rotation at 20 degree
                    this.head.rotateY(2 * Math.PI * (-3) / 360);
                    this.yRotation -= 1;
                    }
            }

        };
        // TestEmoji.prototype.rotateInZ = function (degrees) {
        //     if (Math.abs(degrees) < 15) {
        //         if (degrees > 0 && this.zRotation < 20) {
        //             this.mesh.rotateZ(-2 * Math.PI * degrees / 360);
        //             this.zRotation += degrees;
        //         }
        //         else if (degrees < 0 && this.zRotation > -20) {
        //             this.mesh.rotateZ(-2 * Math.PI * degrees / 360);
        //             this.zRotation += degrees;
        //         }
        //     }
        // };
        return TestEmoji;
    }());
    Emoji.TestEmoji = TestEmoji;
})(Emoji || (Emoji = {}));
