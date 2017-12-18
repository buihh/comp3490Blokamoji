module Emoji{
    export class TestEmoji{
        
        name:string;
        mesh:THREE.Mesh;
        xRotation = 0;
        yRotation = 0;
        zRotation = 0;
        
        constructor(name:string){
            this.name = name;
            this.createMesh();
        }

        private createMesh(){
            let testMaterial = new THREE.MeshPhongMaterial();
            testMaterial.color.setRGB(1, 0, 1);
            let newMesh = new THREE.Mesh(
                new THREE.BoxGeometry(200, 200, 200), testMaterial
            );

            newMesh.position.set(0, 300, 0);
            scene.add(newMesh);
            this.mesh = newMesh;
        }

        public rotateInX(degrees:number){
            this.mesh.rotateX(2*Math.PI*degrees/360);
            this.xRotation += degrees;
        }

        public rotateInY(degrees:number){
            this.mesh.rotateY(2*Math.PI*degrees/360);
            this.yRotation += degrees;
        }

        public rotateInZ(degrees:number){
            this.mesh.rotateZ(2*Math.PI*degrees/360);
            this.zRotation += degrees;
        }
    }
}