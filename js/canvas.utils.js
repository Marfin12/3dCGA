// require "./Object/index.js";

let assignedScene, assignedCamera, canvasWidth, canvasHeight, objects;

function constructScene(ctx, house, canvas, camera) {
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
	assignedScene = new Scene(ctx, [assignedHouse]);
}

function renderViewVolume() {
	assignedScene.extend3dToHomogeneous();
	assignedScene.normalize(camera);
	assignedScene.goBackTo3dCoordinate();
	assignedScene.clip3d();
	assignedScene.goBackExtend3dHomogeneous();
	assignedScene.performParallelProjection();
	assignedScene.translateAndScaleDeviceCoordinate();
	assignedScene.goTo2dCoordinate(canvasWidth, canvasHeight);
	assignedScene.draw(canvasWidth, canvasHeight);
}
