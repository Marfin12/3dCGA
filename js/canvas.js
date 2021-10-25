// require "./canvas.utils.js";

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const axisEnum = Object.freeze({"rotateX": 1, "rotateY": 2, "rotateZ": 3});

var isParallel = true;

let scene, camera;

canvas.width = window.innerWidth-15;
canvas.height = window.innerHeight-145;

function getCamera() {
	let camera = {
		VRP: {
			x: document.getElementById('vrpX').value,
			y: document.getElementById('vrpY').value,
			z: document.getElementById('vrpZ').value
		},
		VPN: {
			x: document.getElementById('vpnX').value,
			y: document.getElementById('vpnY').value,
			z: document.getElementById('vpnZ').value
		},
		VUP: {
			x: document.getElementById('vupX').value,
			y: document.getElementById('vupY').value,
			z: document.getElementById('vupZ').value
		},
		COP: {
			x: document.getElementById('copX').value,
			y: document.getElementById('copY').value,
			z: document.getElementById('copZ').value
		},
		Window: [
			document.getElementById('windowX1').value,
			document.getElementById('windowY1').value,
			document.getElementById('windowX2').value,
			document.getElementById('windowY2').value
		],
		F: document.getElementById('front').value,
		B: document.getElementById('back').value
	};
	
	return camera;
}

function simulateScene() {
	camera = getCamera();
	constructScene(context, canvas, camera);
	renderViewVolume();
}

function setProjection(isParallel) {
	this.isParallel = isParallel;
}
