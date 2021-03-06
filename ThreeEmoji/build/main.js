var camera;
var cameraControls;
var scene;
var renderer;
var clock = new THREE.Clock();
var testEmoji;
var positionArray = [];
var initPosition;
var currentPosition;
var responsiveXcoord = 1;
var responsiveYcoord = 1;

function fillScene() {
    scene = new THREE.Scene();
    // scene.fog = new THREE.Fog( 0x808080, 2000, 4000 );
    scene.add(new THREE.AmbientLight(0x222222));
    Tools.createRoom();
    Tools.fancyLighting();
    testEmoji = new Emoji.TestEmoji("Test");
}
function init() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    var canvasRatio = window.innerWidth / window.innerHeight;
    renderer.setClearColor(0xAAAAAA, 1.0);
    camera = new THREE.PerspectiveCamera(45, canvasRatio, 1, 40000);
    cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
    camera.position.set(0, 500, -700);
    cameraControls.target.set(4, 301, 92);
    cameraControls.enablePan = false;
    EventHandlers.keyDownHandler();
    // EventHandlers.keyUpHandler();
}
function initWebSocket() {
    var ws = new WebSocket('ws://localhost:9000');
    ws.onopen = function () {
        console.log('onopen');
    };
    ws.onmessage = function (event) {
        var msg = JSON.parse(event.data);
        // console.log(msg);
        // Control the emoji through position of object captured from webcam here
        positionArray.push({
            x: msg.X,
            y: msg.Y
        });
        if (positionArray.length > 5) {
            positionArray.shift(); // reduce the memory for array
        }
        // Push it to new x and y coordinate array for computation purpose
        var xCoords = [], yCoords = [];
        for (var i = Math.max(positionArray.length - 2, 0); i < positionArray.length; i++) {
            xCoords.push(positionArray[i].x);
            yCoords.push(positionArray[i].y);
        }
        var posX = math.mean(xCoords);
        var posY = math.mean(yCoords);
        // Calculate the current position of the face
        currentPosition = [posX , posY];
        // currentPosition = [posX/responsiveXcoord , posY/ responsiveYcoord];
        if (!initPosition) {
            initPosition = currentPosition;
            // responsiveXcoord = initPosition[0]/75; // adjust the coordinate to focus on center
            // responsiveYcoord = initPosition[1]/75; // adjust the coordinate to focus on center
        }
        update();
    };
}
;
function update() {
    if (positionArray.length === 0) {
        return;
    }
    // Check on X axis if the head move to the left or right

    //Calculate different in face position
    //deltaX,deltaY

    var deltaX = currentPosition[0] - initPosition[0];
    var deltaY = currentPosition[1] - initPosition[1];
    testEmoji.rotateInX(deltaY, initPosition[1]);
    testEmoji.rotateInY(deltaX, initPosition[0]);

}
function addToDOM() {
    var canvas = document.getElementById('canvas');
    canvas.appendChild(renderer.domElement);
}
function animate() {
    window.requestAnimationFrame(animate);
    render();
}
function render() {
    var delta = clock.getDelta();
    cameraControls.update();
    renderer.render(scene, camera);
}
try {
    init();
    initWebSocket();
    fillScene();
    addToDOM();
    animate();
}
catch (error) {
    console.log(error);
}
