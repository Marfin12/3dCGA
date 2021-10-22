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
        this.objects.forEach(function(obj) {
            let collectionPointOfObject = new Array();

            obj.points.forEach(function(point) {
                collectionPointOfObject.push([point[0], point[1], point[2], 1]);
            })

            this.homogeneousObject.push(
                {
                    points: collectionPointOfObject,
                    lines: obj.lines
                }
            );
        })
    };

    normalize(camera) {
        this.homogeneousObject(function(obj) {
            let SPAR = new Array();

            obj.points.forEach(function(point) {
                const TVRP = camera.translateVRPtoOrigin(point);
                const RVRC = camera.alignVRC(TVRP);
                const TDOP = camera.shearDOP(RVRC);
                const TPAR = camera.translateToFrontCenter(TDOP);
                SPAR.push(camera.scaleToCannocialVolume(TPAR));
            })

            this.normalizeObject.push(
                {
                    points: SPAR,
                    lines: obj.lines
                }
            );
        })
    }

    goBackTo3dCoordinate() {
        this.normalizeObject.forEach(function(obj) {
            let collectionVectorOfObj = new Array();

            obj.points.forEach(function(point) {
                collectionMatrixOfObj.push(Math.ConvertMatrixToVector(Math.divideW(point)));
            })

            this.vector3d.push(
                {
                    vectorPoints: collectionVectorOfObj,
                    lines: obj.lines
                }
            );
        })
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
        this.homogeneousObject = new Array();

        this.vector3d.forEach(function(obj) {
            let collectionPointOfObject = new Array();

            obj.points.forEach(function(point) {
                collectionPointOfObject.push([point[0], point[1], point[2], 1]);
            })
            
            this.homogeneousObject.push(
                {
                    points: collectionPointOfObject,
                    lines: obj.lines
                }
            );
        })
    }

    performParallelProjection() {
        this.MView = Math.ParallelVt();
        this.homogeneousObject.forEach(function(obj) {
            let collectionVTObj = new Array();

            obj.points.forEach(function(point) {
                collectionVTObj.push(Math.matrixMultiply1x4(obj[point], this.MView));
            })

            this.vt.push(
                {
                    points: collectionPointOfObject,
                    lines: obj.line
                }
            );
        })
    }

    translateAndScaleDeviceCoordinate(canvas, camera) {
        const XvMAX = canvas.width;
        const XvMIN = 0;
        const YvMAX = canvas.height;
        const YvMIN = 0;
        const ZvMAX = camera.F - camera.B;
        const ZvMIN = 0;
        
        var resTVV = new Array(); 
        var resSVV3DV = new Array();

        const TVV = Math.T(XvMIN, YvMIN, ZvMIN);

        this.vt.forEach(function(obj) {
            let collectionPointObj = new Array();

            obj.points.forEach(function(point) {
                collectionPointObj.push(Math.multiplyMatrix1x4(point, TVV));
            })

            resTVV.push(
                {
                    points: collectionPointOfObject,
                    lines: obj.lines
                }
            );            
        });

        const sx = (XvMAX - XvMIN) / 2;
        const sy = (YvMAX - YvMIN) / 2;
        const sz = ZvMAX - ZvMIN;

        const SVV3DV = Math.S(sx, sy, sz);

        resTVV.forEach(function(obj) {
            let collectionPointObj = new Array();

            obj.points.forEach(function(point) {
                collectionPointObj.push(Math.multiplyMatrix1x4(point, SVV3DV));
            })

            resSVV3DV.push(
                {
                    points: collectionPointOfObject,
                    lines: obj.lines
                }
            );            
        });

        const TLLCV = Math.T(1, 1, 1);

        resSVV3DV.forEach(function(obj) {
            let collectionPointObj = new Array();

            obj.points.forEach(function(point) {
                collectionPointObj.push(Math.multiplyMatrix1x4(point, TLLCV));
            })

            this.MVV3DV.push(
                {
                    points: collectionPointOfObject,
                    lines: obj.lines
                }
            );            
        });
    }

    goTo2dCoordinate(width, height) {
        this.MVV3DV.forEach(function(obj) {
            obj.points.forEach(function(point) {
                point = Math.divideW(point);
            })
        })

        const MScreen = Math.St(width, height);

        this.MVV3DV.forEach(function(obj) {
            let collectionPointObj = new Array();

            obj.points.forEach(function(point) {
                collectionPointObj.push(Math.multiplyMatrix1x4(point, MScreen));
            })

            this.renderedAllObjects.push(
                {
                    points: collectionPointOfObject,
                    lines: obj.lines
                }
            );
        })
    }

    draw(width, height) {
        this.ctx.clearRect(0, 0, width, height);
        this.renderedAllObjects.forEach(function(renderedObj) {
            renderedObj.lines.forEach(function(line) {
                let pos = {
                    x1: renderedObj[line.p1][0],
                    y1: renderedObj[line.p1][1],
                    x2: renderedObj[line.p2][0],
                    y2: renderedObj[line.p2][1]
                };

                drawLine(this.ctx,pos,5,"#FFF000");
            })
        })
    }
}
