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

            obj.points.forEach(function(point) {
                collectionPointOfObject.push([point[0], point[1], point[2], 1]);
            })
            homogeneousObject.push(
                {
                    points: collectionPointOfObject,
                    lines: obj.lines
                }
            );
        })
        this.homogeneousObject = homogeneousObject;
    };

    normalize(camera) {
        let normalizeObject = new Array();

        this.homogeneousObject.forEach(function(obj) {
            const TVRP = camera.translateVRPtoOrigin();
            const RVRC = camera.alignVRC();
            const SHPAR = camera.shearDOP();
            const TPAR = camera.translateToFrontCenter();
            const SPAR = camera.scaleToCannocialVolume();

            const RVRCxTVRP = Math.MatrixMultiply4x4(RVRC, TVRP);
            const SHPARxRVRCxTVRP = Math.MatrixMultiply4x4(SHPAR, RVRCxTVRP);
            const TPARxSHPARxRVRCxTVRP = Math.MatrixMultiply4x4(TPAR, SHPARxRVRCxTVRP);
            const NPAR = Math.MatrixMultiply4x4(SPAR, TPARxSHPARxRVRCxTVRP);

            let res = new Array();

            obj.points.forEach(function(point) {
                res.push(Math.MatrixMultiply1x4(point, NPAR));
            })

            normalizeObject.push(
                {
                    points: res,
                    lines: obj.lines
                }
            );
        })
        this.normalizeObject = normalizeObject;
    }

    goBackTo3dCoordinate() {
        let vector3d = new Array();

        this.normalizeObject.forEach(function(obj) {
            let collectionMatrixOfObj = new Array();

            obj.points.forEach(function(point) {
                collectionMatrixOfObj.push(Math.ConvertMatrixToVector(Math.divideW(point)));
            })

            vector3d.push(
                {
                    vectorPoints: collectionMatrixOfObj,
                    lines: obj.lines
                }
            );
        })
        this.vector3d = vector3d;
    }

    clip3d() {
        this.vector3d.forEach(function(obj) {
            obj.lines.forEach(function(line) {
                let newClippedLine = Math.cohenShutterland3d(line, obj.vectorPoints);
                obj.vectorPoints[line.p1] = newClippedLine.point1;
                obj.vectorPoints[line.p2] = newClippedLine.point2;
            })
        })
    };

    goBackExtend3dHomogeneous() {
        let homogeneousObject = new Array();
        console.log(this.vector3d[0].vectorPoints);

        this.vector3d.forEach(function(obj) {
            let collectionPointOfObject = new Array();

            obj.vectorPoints.forEach(function(vectorPoint) {
                collectionPointOfObject.push([vectorPoint.x, vectorPoint.y, vectorPoint.z, 1]);
            })
            
            homogeneousObject.push(
                {
                    points: collectionPointOfObject,
                    lines: obj.lines
                }
            );
        })
        this.homogeneousObject = homogeneousObject;
    }

    performParallelProjection() {
        const MView = Math.ParallelVt();
        let vt = new Array();

        this.homogeneousObject.forEach(function(obj) {
            let collectionVTObj = new Array();

            obj.points.forEach(function(point) {
                collectionVTObj.push(Math.MatrixMultiply1x4(point, MView));
            })

            vt.push(
                {
                    points: collectionVTObj,
                    lines: obj.lines
                }
            );
        })
        this.vt = vt;
    }

    translateAndScaleDeviceCoordinate(canvasWidth, canvasHeight, camera) {
        const XvMAX = canvasWidth;
        const XvMIN = 0;
        const YvMAX = canvasHeight;
        const YvMIN = 0;
        const ZvMAX = camera.F - camera.B;
        const ZvMIN = 0;

        const sx = (XvMAX - XvMIN) / 2;
        const sy = (YvMAX - YvMIN) / 2;
        const sz = ZvMAX - ZvMIN;

        const TVV = Math.T(XvMIN, YvMIN, ZvMIN);
        const SVV3DV = Math.S(sx, sy, sz);
        const TLLCV = Math.T(1, 1, 1);

        const SVV3DVxTLLCV = Math.MatrixMultiply4x4(SVV3DV, TLLCV);
        const MVV3DV = Math.MatrixMultiply4x4(TVV, SVV3DVxTLLCV);
        
        const res = new Array();

        this.vt.forEach(function(obj) {
            let collectionPointObj = new Array();

            obj.points.forEach(function(point) {
                collectionPointObj.push(Math.MatrixMultiply1x4(point, MVV3DV));
            })

            res.push(
                {
                    points: collectionPointObj,
                    lines: obj.lines
                }
            );            
        });
        this.MVV3DV = res;
    }

    goTo2dCoordinate(width, height) {
        this.MVV3DV.forEach(function(obj) {
            obj.points.forEach(function(point) {
                point = Math.divideW(point);
            })
        })

        const MScreen = Math.St(width, height);
        let renderedAllObjects = new Array();

        this.MVV3DV.forEach(function(obj) {
            let collectionPointObj = new Array();

            obj.points.forEach(function(point) {
                collectionPointObj.push(Math.MatrixMultiply1x4(point, MScreen));
            })

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
        this.renderedAllObjects.forEach(function(renderedObj) {
            console.log(renderedObj);
            renderedObj.lines.forEach(function(line) {
                let pos = {
                    x1: renderedObj.points[line.p1][0],
                    y1: renderedObj.points[line.p1][1],
                    x2: renderedObj.points[line.p2][0],
                    y2: renderedObj.points[line.p2][1]
                };

                drawLine(ctx, pos, 5, "#FFF000");
            })
        })
    }
}
