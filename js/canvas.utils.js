// require "./Object/index.js";

let assignedHouse, assignedCamera, canvasWidth, canvasHeight;

function constructHouse(ctx, house, canvas, camera) {
	canvasWidth = canvas.width;
	canvasHeight = canvas.height;
	
	assignedHouse = new House(ctx, house.housePosition, house.houseLen);
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
	assignedHouse.generateWCS(assignedCamera);
	assignedHouse.generateVCS(isParallel);
	assignedHouse.generateScreen(canvasWidth, canvasHeight);
	assignedHouse.draw(canvasWidth, canvasHeight);
}
