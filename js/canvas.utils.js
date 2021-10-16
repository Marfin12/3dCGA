// require "./Object/index.js";

let assignedCube, assignedCamera, canvasWidth, canvasHeight;

function constructCube(ctx, cube, canvas, camera) {
	canvasWidth = canvas.width;
	canvasHeight = canvas.height;
	
	assignedCube = new Cube(ctx, cube.cubePosition, cube.cubeLen);
	assignedCamera = new Camera(
		ConvertPropertyToNumber(camera.VRP),
		ConvertPropertyToNumber(camera.VPN),
		ConvertPropertyToNumber(camera.VUP),
		ConvertPropertyToNumber(camera.PRP),
		ConvertElementArrayToNumber(camera.Window),
		parseInt(camera.F),
		parseint(camera.B)
	)
}

function renderHouse(isParallel) {
	assignedCube.generateWCS(assignedCamera);
	assignedCube.generateVCS(isParallel);
	assignedCube.generateScreen(canvasWidth, canvasHeight);
	assignedCube.draw(canvasWidth, canvasHeight);
}
