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

let scene, axisRotation;

canvas.width = window.innerWidth-15;
canvas.height = window.innerHeight-145;

function triggerScene(choosenAxis) {
	clearInterval(scene);
	scene = setInterval(simulateScene ,100);
	axisRotation = choosenAxis;
}

function pauseScene() {
	clearInterval(scene);
}

function simulateScene() {
	constructCube(context, cube, canvas);
	rotateCube(cube.cubeAngle, isParallel, axisRotation);
	cube.cubeAngle += 10;
}

function setProjection(isParallel) {
	this.isParallel = isParallel;
}
