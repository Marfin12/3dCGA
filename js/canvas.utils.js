// require "./Object/index.js";

let assignedScene, assignedCamera, canvasWidth, canvasHeight, objects;

function constructScene(ctx, canvas, camera) {
	canvasWidth = canvas.width;
	canvasHeight = canvas.height;
	
	assignedHouse = new House(ctx);
	assignedCamera = new Camera(
		Math.ConvertPropertyToNumber(camera.VRP),
		Math.ConvertPropertyToNumber(camera.VPN),
		Math.ConvertPropertyToNumber(camera.VUP),
		Math.ConvertPropertyToNumber(camera.COP),
		Math.ConvertElementArrayToNumber(camera.Window),
		parseInt(camera.F),
		parseInt(camera.B)
	)
	assignedScene = new Scene(ctx, [assignedHouse]);
}

function renderViewVolume() {
	assignedScene.extend3dToHomogeneous();
	assignedScene.normalize(assignedCamera);
	assignedScene.goBackTo3dCoordinate();
	assignedScene.clip3d();
	assignedScene.goBackExtend3dHomogeneous();
	assignedScene.performParallelProjection();
	assignedScene.translateAndScaleDeviceCoordinate(canvasWidth, canvasHeight, assignedCamera);
	assignedScene.goTo2dCoordinate(canvasWidth, canvasHeight);
	assignedScene.draw(canvasWidth, canvasHeight);
}
