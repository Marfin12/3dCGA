// require "./canvas.utils.js";

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const axisEnum = Object.freeze({"rotateX": 1, "rotateY": 2, "rotateZ": 3});
const cube = {
	cubePosition: {
		x:50,
		y:50,
		z:50
	},
	cubeAngle: 10,
	cubeLen: 100
};

var isParallel = true;

let scene, axisRotation, camera;

canvas.width = window.innerWidth-15;
canvas.height = window.innerHeight-145;

function simulateScene() {
	camera = getCamera();
	constructCube(context, cube, canvas, camera);
	renderHouse(isParallel);
}

function setProjection(isParallel) {
	this.isParallel = isParallel;
}

function getCamera() {
	let camera = {
		VRP: {
			x: document.getElementById('vrpX').innerHTML,
			y: document.getElementById('vrpY').innerHTML,
			z: document.getElementById('vrpZ').innerHTML
		},
		VPN: {
			x: document.getElementById('vpnX').innerHTML,
			y: document.getElementById('vpnY').innerHTML,
			z: document.getElementById('vpnZ').innerHTML
		},
		VUP: {
			x: document.getElementById('vupX').innerHTML,
			y: document.getElementById('vupY').innerHTML,
			z: document.getElementById('vupZ').innerHTML
		},
		PRP: {
			x: document.getElementById('prpX').innerHTML,
			y: document.getElementById('prpY').innerHTML,
			z: document.getElementById('prpZ').innerHTML
		},
		Window: [
			document.getElementById('windowX1').innerHTML,
			document.getElementById('windowY1').innerHTML,
			document.getElementById('windowX2').innerHTML,
			document.getElementById('windowY2').innerHTML
		],
		F: document.getElementById('front').innerHTML,
		B: document.getElementById('back').innerHTML
	};
	
	return camera;
}
