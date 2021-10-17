// require "./draw.js";
// require "./model.js";
// require "../Utils/math.js";

class House {
    constructor(ctx, housePosition, len) {
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
    }

    generateWCS(camera) {
        const TVRP = camera.translateVRPtoOrigin(this.point);
        const RVRC = camera.alignVRC(TVRP);
        const TDOP = camera.shearDOP(RVRC);
        const TPAR = camera.translateToFrontCenter(TDOP);
        this.MView = camera.scaleToCannocialVolume(TPAR);
    }

    generateVCS(isParallel) {
        this.MView = isParallel ? Math.ParallelVt() : Math.PerspectiveVt();
        for(var i=0;i<this.point.length;i++) {
            this.vt[i] = Math.matrixMultiply1x4(this.wt[i], this.MView);
            this.vt[i] = Math.converge(this.vt[i]);
        }
    }

    generateScreen(width, height) {
        this.MScreen = Math.St(width,height);
        for(var i=0;i<this.point.length;i++) this.st[i] = Math.matrixMultiply1x4(this.vt[i], this.MScreen);
    }

    draw(width, height) {
        this.ctx.clearRect(0, 0, width, height);
        
        for(var i=0;i<this.line.length;i++) {
            let pos = {
                x1:this.st[this.line[i].p1][0],
                y1:this.st[this.line[i].p1][1],
                x2:this.st[this.line[i].p2][0],
                y2:this.st[this.line[i].p2][1]
            };

            drawLine(this.ctx,pos,5,"#FFF000");
        }
    }
}