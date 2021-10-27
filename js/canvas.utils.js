// require "./Object/index.js";

let assignedScene, assignedCamera, canvasWidth, canvasHeight, objects;

function constructScene(ctx, canvas, camera) {
	canvasWidth = canvas.width;
	canvasHeight = canvas.height;
	
	assignedHouse = new House(ctx);
	const convertedWindow = Math.ConvertElementArrayToNumber(camera.Window);
	let assignedWindow = new WindowLine(ctx, convertedWindow[0], convertedWindow[1], convertedWindow[2], convertedWindow[3]);
	assignedCamera = new Camera(
		Math.ConvertPropertyToNumber(camera.VRP),
		Math.ConvertPropertyToNumber(camera.VPN),
		Math.ConvertPropertyToNumber(camera.VUP),
		Math.ConvertPropertyToNumber(camera.COP),
		convertedWindow,
		parseInt(camera.F),
		parseInt(camera.B)
	)
	assignedScene = new Scene(ctx, [assignedHouse, assignedWindow]);
}

function renderViewVolume(isParallel) {
	assignedScene.extend3dToHomogeneous();
	assignedScene.renderViewVolume(assignedCamera, isParallel);
	assignedScene.goTo2dCoordinate(canvasWidth, canvasHeight);
	assignedScene.draw(canvasWidth, canvasHeight);
}
