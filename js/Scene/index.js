// require "./draw.js";
// require "./model.js";
// require "../Utils/math.js";

class Scene {
    constructor(ctx, objects, len) {
        this.ctx = ctx;
        
    	this.point = new Array();
    	this.line = new Array();

        this.point = Point.generate(housePosition, len);
        this.centerPosition = Point.getCenterPosition(housePosition);
        this.line = Line.generate(this.line);

        this.wt = new Array();
    	this.vt = new Array();
    	this.st = new Array();

        this.MView = new Array();
        this.MScreen = new Array();
        this.MRot = new Array();
        this.MVV3DV = new Array();

        this.objects = objects;
        this.objectPoint = new Array();
        this.objectLine = new Array();
        this.firstHomogeneous = new Array();
        this.secondHomogeneous = new Array();

        this.nPar = new Array();

        let index = 0;
        objects.forEach(function(obj) {
            obj.points = Point.generate(obj.objPosition, len);
            obj.lines = Line.geenrate();
            obj.index = index;
            index++;
        });
    }

    extend3dToHomogeneous() {
        this.objects.forEach(function(obj) {
            obj.points.forEach(function(point) {
                this.firstHomogeneous[obj.index].push([point[0], point[1], point[2], 1]);
            })
        })
    };

    normalize(camera) {
        let index = 0;

        this.firstHomogeneous.forEach(function(objPoint) {
            const TVRP = camera.translateVRPtoOrigin(objPoint);
            const RVRC = camera.alignVRC(TVRP);
            const TDOP = camera.shearDOP(RVRC);
            const TPAR = camera.translateToFrontCenter(TDOP);
            this.nPar[index].push(camera.scaleToCannocialVolume(TPAR));
            index++;
        })
    }

    goBackTo3dCoordinate() {
        let index = 0;

        this.nPar.forEach(function(nParPoint) {
            let res = new Array();

            nParPoint.forEach(function(point) {
                res.push(Math.ConvertMatrixToVector(Math.divideW(point)));
            })
            objects[index].points = res;
            index++;
        });
    }

    clip3d() {
        this.objects.forEach(function(obj) {
            obj.lines.forEach(function(ln) {
                let newClippedLine = Math.cohenShutterland3d(ln, obj.point);
                obj.point[ln.p1] = newClippedLine.point1;
                obj.point[ln.p2] = newClippedLine.point2;
            })
        })
    };

    goBackExtend3dHomogeneous() {
        this.objects.forEach(function(obj) {
            obj.point.forEach(function(point) {
                this.secondHomogeneous[obj.index].push([point[0], point[1], point[2], 1]);
            })
        })
    }

    performParallelProjection() {
        this.MView = Math.ParallelVt();
        this.secondHomogeneous.forEach(function(obj) {
            for(var i=0;i<obj.point.length;i++) {
                this.vt[obj.index].points.push(Math.matrixMultiply1x4(obj[i], this.MView));
            }
        })
    }

    translateAndScaleDeviceCoordinate(canvas, camera) {
        const XvMAX = canvas.width;
        const XvMIN = 0;
        const YvMAX = canvas.height;
        const YvMIN = 0;
        const ZvMAX = camera.F - camera.B;
        const ZvMIN = 0;
        
        var resTVV = []; 
        var resSVV3DV = [];

        const TVV = Math.T(XvMIN, YvMIN, ZvMIN);

        this.vt.forEach(function(obj) {
            for(var i=0;i<obj.points.length;i++) {
                resTVV[i].points.push(Math.multiplyMatrix1x4(obj.points[i], TVV));
            }
        });

        const sx = (XvMAX - XvMIN) / 2;
        const sy = (YvMAX - YvMIN) / 2;
        const sz = ZvMAX - ZvMIN;

        const SVV3DV = Math.S(sx, sy, sz);

        resTVV.forEach(function(obj) {
            for(var i=0;i<obj.points.length;i++) {
                resSVV3DV[i].points.push(Math.multiplyMatrix1x4(obj.points[i], SVV3DV));
            }
        });

        const TLLCV = Math.T(1, 1, 1);

        resSVV3DV.forEach(function(obj) {
            for(var i=0;i<obj.points.length;i++) {
                this.MVV3DV[i].points.push(Math.multiplyMatrix1x4(obj.points[i], TLLCV));
            }
        });
    }

    goTo2dCoordinate(width, height) {
        this.MVV3DV.forEach(function(obj) {
            obj.points.forEach(function(point) {
                point = Math.divideW(point);
            })
        })
        this.MScreen = Math.St(width, height);
        this.MVV3DV.forEach(function(obj) {
            for(var i=0;i<obj.points.length;i++) {
                this.st[obj.index].push(Math.matrixMultiply1x4(obj.points[i], this.MScreen));
            }
        })
    }

    draw(width, height) {
        this.ctx.clearRect(0, 0, width, height);
        this.objects.forEach(function(obj) {
            for(var i=0;i<obj.lines.length;i++) {
                let pos = {
                    x1:this.st[obj.index][obj.lines[i].p1][0],
                    y1:this.st[obj.index][obj.lines[i].p1][1],
                    x2:this.st[obj.index][obj.lines[i].p2][0],
                    y2:this.st[obj.index][obj.lines[i].p2][1]
                };
    
                drawLine(this.ctx,pos,5,"#FFF000");
            }
        })
    }
}