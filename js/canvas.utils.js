// require "./Object/index.js";

let assignedCube, canvasWidth, canvasHeight;

function constructCube(ctx, cube, canvas) {
	canvasWidth = canvas.width;
	canvasHeight = canvas.height;
	
	assignedCube = new Cube(ctx, cube.cubePosition, cube.cubeLen);
}

function rotateCube(angle, isParallel, axisRotation) {
	switch(axisRotation) {
		case axisEnum.rotateX:
			assignedCube.rotateX(angle);
			break;
		case axisEnum.rotateY:
			assignedCube.rotateY(angle);
			break;
		case axisEnum.rotateZ:
			assignedCube.rotateZ(angle);
			break;
		default:
			alert("something wrong");
	}

	assignedCube.generateWCS();
	assignedCube.generateVCS(isParallel);
	assignedCube.generateScreen(canvasWidth, canvasHeight);
	assignedCube.draw(canvasWidth, canvasHeight);
}
