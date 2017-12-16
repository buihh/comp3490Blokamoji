var EventHandlers;
(function (EventHandlers) {
    function keyDownHandler() {
        document.addEventListener("keydown", onDocumentKeyDown, false);
        function onDocumentKeyDown(event) {
            var keyCode = event.which;
            switch (keyCode) {
                default:
                    break;
            }
        }
        ;
    }
    EventHandlers.keyDownHandler = keyDownHandler;
    function keyUpHandler() {
        document.addEventListener("keyup", onDocumentKeyUp, false);
        function onDocumentKeyUp(event) {
            var keyCode = event.which;
            switch (keyCode) {
                default:
                    break;
            }
        }
        ;
    }
    EventHandlers.keyUpHandler = keyUpHandler;
})(EventHandlers || (EventHandlers = {}));
