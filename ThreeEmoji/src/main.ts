var camera:THREE.PerspectiveCamera;
var cameraControls:THREE.OrbitControls;

var scene:THREE.Scene;
var renderer:THREE.WebGLRenderer;
var clock = new THREE.Clock();
var testEmoji:Emoji.TestEmoji;

var positionArray:any[] = [];
var lastPosition:any;
var diffMove:any;
var ping = 0;
var STABILIZER = 6;
 
function fillScene() {
	scene = new THREE.Scene();
	// scene.fog = new THREE.Fog( 0x808080, 2000, 4000 );
 
	scene.add( new THREE.AmbientLight( 0x222222 ) );

	Tools.createRoom();
	Tools.fancyLighting();
	testEmoji = new Emoji.TestEmoji("Test");
}
 
function init() {
	renderer = new THREE.WebGLRenderer( { antialias: true } );
 
	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	renderer.setSize(window.innerWidth, window.innerHeight);
	var canvasRatio = window.innerWidth/window.innerHeight;
	renderer.setClearColor( 0xAAAAAA, 1.0 );
 
	camera = new THREE.PerspectiveCamera( 45, canvasRatio, 1, 40000 );

	cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
	camera.position.set( 0, 600, -500);
	cameraControls.target.set(4,301,92);
	cameraControls.enablePan = false;

	EventHandlers.keyDownHandler();
	// EventHandlers.keyUpHandler();
}

function initWebSocket(){
	var ws = new WebSocket('ws://localhost:9000');
	ws.onopen = function() {
		console.log('onopen');
	};
	ws.onmessage = function (event) {
		var msg = JSON.parse(event.data);
		// console.log(msg);
		// Control the emoji through position of object captured from webcam here
        positionArray.push({
            x: msg.X,
            y: msg.Y
        })

        if (positionArray.length > 10){
            positionArray.shift(); // reduce the memory for array
        }

        // Push it to new x and y coordinate array for computation purpose
        var xCoords = [], yCoords = [];
        for (var i = Math.max(positionArray.length-2, 0); i < positionArray.length; i++){
            xCoords.push(positionArray[i].x);
            yCoords.push(positionArray[i].y);
        }

        var posX = math.mean(xCoords);
        var posY = math.mean(yCoords);

        // Calculate the current position of the face
        var targetPos = [posX, posY];
        if(!lastPosition){
            lastPosition = targetPos;
        }

        //Calculate different in face position
        diffMove = [(targetPos[0] - lastPosition[0])/STABILIZER,
            (targetPos[1] - lastPosition[1])/STABILIZER];
        ping = 0;
        update();
    };   
};

function update(){
    if (positionArray.length === 0){
        return;
    }

    ping++;
    if(ping<10){
        lastPosition[0] += diffMove[0];
        lastPosition[1] += diffMove[1];
    }
    console.log(diffMove[0], diffMove[1]);
    // Check on X axis if the head move to the left or right
    if(diffMove[0] >0){
        testEmoji.rotateInX(1);
    }
    else if(diffMove[0] < 0){
        testEmoji.rotateInX(-1);
    }

    // Check on Y axis if the head move up or down
    if(diffMove[1] >0){
        testEmoji.rotateInY(1);
    }
    else if(diffMove[1] <0){
        testEmoji.rotateInY(-1);
    }
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
catch(error) {
	console.log(error);
}