var camera:THREE.PerspectiveCamera;
var cameraControls:THREE.OrbitControls;

var scene:THREE.Scene;
var renderer:THREE.WebGLRenderer;
var clock = new THREE.Clock();
var testEmoji:Emoji.TestEmoji;
 
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
	camera.position.set( -800, 600, -500);
	cameraControls.target.set(4,301,92);
	cameraControls.enablePan = false;

	// EventHandlers.keyDownHandler();
	// EventHandlers.keyUpHandler();
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
   	fillScene();
   	addToDOM();
   	animate();
} 
catch(error) {
	console.log(error);
}