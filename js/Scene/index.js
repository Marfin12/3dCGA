// require "./draw.js";
// require "./model.js";
// require "../Utils/math.js";

class Scene {
    constructor(ctx, objects) {
        this.ctx = ctx;
        this.objects = objects;

        this.homogeneousObject = new Array();
        this.normalizeObject = new Array();
        this.vector3d = new Array();
        this.vt = new Array();
        this.MVV3DV = new Array();
        this.renderedAllObjects = new Array();
    }

    extend3dToHomogeneous() {
        let homogeneousObject = new Array();

        this.objects.forEach(function(obj) {
            let collectionPointOfObject = new Array();

            for(var point in obj.points) {
                collectionPointOfObject.push([obj.points[point][0], obj.points[point][1], obj.points[point][2], 1]);
            }

            homogeneousObject.push(
                {
                    points: collectionPointOfObject,
                    lines: Math.ConvertLineKeyToIndex(obj.lines)
                }
            );
        })

        this.homogeneousObject = homogeneousObject
    };

    renderViewVolume(camera, isParallel) {
        if (isParallel) {
            const normalizeObject = normalizeParallel(camera, this.homogeneousObject);
            this.vt = performParallelProjection(normalizeObject);
        } else {
            const normalizeObject = normalizePerspective(camera, this.homogeneousObject);
            this.vt = performPerspectiveProjection(normalizeObject, camera);
        }
    }

    goTo2dCoordinate(width, height) {
        this.vt.forEach(function(obj) {
            obj.points.forEach(function(point) {
                point = Math.divideW(point);
            })
        })

        const MScreen = Math.St(width, height, 200, 200);
        const MWindow = Math.St(width, height, 100, 100);

        let renderedAllObjects = new Array();
        let once = true;

        this.vt.forEach(function(obj) {
            let collectionPointObj = new Array();

            obj.points.forEach(function(point) {
                if (once) collectionPointObj.push(Math.MatrixMultiply1x4(point, MScreen));
                else collectionPointObj.push(Math.MatrixMultiply1x4(point, MWindow));
            })

            once = false;

            renderedAllObjects.push(
                {
                    points: collectionPointObj,
                    lines: obj.lines
                }
            );
        })
        this.renderedAllObjects = renderedAllObjects
    }

    draw(width, height) {
        const ctx = this.ctx;

        ctx.clearRect(0, 0, width, height);

        let once = false;

        this.renderedAllObjects.forEach(function(renderedObj) {
            renderedObj.lines.forEach(function(line) {
                let pos = {
                    x1: renderedObj.points[line.p1][0],
                    y1: renderedObj.points[line.p1][1],
                    x2: renderedObj.points[line.p2][0],
                    y2: renderedObj.points[line.p2][1]
                };
                if (once) {
                    drawLine(ctx, pos, 5, "#000000");
                } else {
                    drawLine(ctx, pos, 5, "#FFF000");
                }
            })
            once = true;
        })
    }
}
