module Emoji{
    export class TestEmoji{
        
        name:string;
        mesh:THREE.Mesh;
        emoji:THREE.Object3D;
        lEye:THREE.Mesh;
        xRotation = 0;
        yRotation = 0;
        zRotation = 0;
        
        constructor(name:string){
            this.name = name;
            this.createMesh();
        }

        private createMesh(){
            this.emoji = new THREE.Object3D;
            
            let testMaterial = new THREE.MeshPhongMaterial();
            testMaterial.color.setRGB(1, 0, 1);
            let newMesh = new THREE.Mesh(
                new THREE.BoxGeometry(200, 200, 200), testMaterial
            );
            newMesh.position.set(0, 300, 0);

            let eyeMat = new THREE.MeshPhongMaterial();
            eyeMat.color.setRGB(0, 0, 0);

            let eyePupilMat = new THREE.MeshPhongMaterial();
            eyePupilMat.color.setRGB(1, 1, 1);

            let leftEye = new THREE.Mesh(
                new THREE.CylinderGeometry(30, 30, 20), eyeMat
            );
            leftEye.position.set(35, 325, -100);
            this.emoji.add(leftEye);
            let rightEye = leftEye.clone();
            rightEye.position.set(-35, 325, -100);
            leftEye.rotateX(2*Math.PI*90/360);
            rightEye.rotateX(2*Math.PI*90/360);
            this.lEye = leftEye;

            scene.add(leftEye);
            scene.add(rightEye);
            this.emoji.add(newMesh);
            scene.add(newMesh);
            this.mesh = newMesh;
        }

        // Need to rotate then move eyes to correct position.
        // Max X-Y = 150-150?
        public rotateInX(degrees:number){
            if(Math.abs(degrees) < 15 && Math.abs(this.xRotation) < 30){
                this.mesh.rotateX(-2*Math.PI*degrees/360);
                this.xRotation += degrees;
            }
        }

        public rotateInY(degrees:number){
            if(Math.abs(degrees) < 15 && Math.abs(this.yRotation) < 30){
                this.mesh.rotateY(-2*Math.PI*degrees/360);
                this.yRotation += degrees;
            }
        }

        public rotateInZ(degrees:number){
            if(Math.abs(degrees) < 15 && Math.abs(this.zRotation) < 30){
                this.mesh.rotateZ(-2*Math.PI*degrees/360);
                this.zRotation += degrees;
            }
        }
    }
}