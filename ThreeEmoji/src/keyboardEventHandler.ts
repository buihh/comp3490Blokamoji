module EventHandlers{

    export function keyDownHandler(){
        document.addEventListener("keydown", onDocumentKeyDown, false);
        
        function onDocumentKeyDown(event:any) {
            var keyCode = event.which;
            switch(keyCode){
                // A
                case 65:
                    testEmoji.rotateInY(-10);
                    break;
                // D
                case 68:
                    testEmoji.rotateInY(10);
                    break;
                // S
                case 83:
                    testEmoji.rotateInX(-10);
                    break;
                // W
                case 87:
                    testEmoji.rotateInX(10);
                    break;
                default:
                    break;
            }
        };
    }
    
    export function keyUpHandler(){
        document.addEventListener("keyup", onDocumentKeyUp, false);
        
        function onDocumentKeyUp(event:any) {
            var keyCode = event.which;
            switch(keyCode){
                default:
                    break;
            }
        };
    }
}