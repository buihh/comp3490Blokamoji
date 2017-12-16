module Emoji{
    export class TestEmoji{
        
        name:string;
        mesh:THREE.Mesh;
        
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
    }
}