module EventHandlers{

    export function keyDownHandler(){
        document.addEventListener("keydown", onDocumentKeyDown, false);
        
        function onDocumentKeyDown(event:any) {
            var keyCode = event.which;
            switch(keyCode){
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