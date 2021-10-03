// require "./draw.js";
// require "./model.js";
// require "../Utils/math.js";

class TLine {
	constructor(p1, p2) {
		this.p1 = p1;
		this.p2 = p2;
	}
}

class Cube {
    constructor(ctx, cubePosition, len) {
        this.ctx = ctx;
        
    	this.point = new Array();
    	this.line = new Array();

        this.point = Point.generateCube(cubePosition, len);
        this.cubeCenterPosition = Point.getCubeCenterPosition(cubePosition);
        this.line = Line.generateCube(this.line);

        this.wt = new Array();
    	this.vt = new Array();
    	this.st = new Array();

        this.MView = new Array();
        this.MScreen = new Array();
        this.MRot = new Array();
    }

    rotateX(alfa) {
        this.MRot = Math.Rx(alfa);
    }

    rotateY(alfa) {
        this.MRot = Math.Ry(alfa);
    }

    rotateZ(alfa) {
        this.MRot = Math.Rz(alfa);
    }

    generateWCS() {
        let currentCubePosition = {
            x: 0,
            y: 0,
            z: 0
        };
        let currentCubeCenterPosition, cubeCenterX, cubeCenterY, cubeCenterZ;
    	for(var i=0;i<=7;i++) {
            this.wt[i] = Math.matrixMultiply1x4(this.point[i], this.MRot);
            
            if (i == 0) {
                currentCubePosition.x = this.wt[i][0];
                currentCubePosition.y = this.wt[i][1];
                currentCubePosition.z = this.wt[i][2];
                
                currentCubeCenterPosition = Point.getCubeCenterPosition(currentCubePosition);

                cubeCenterX = (currentCubeCenterPosition.xCenter - this.cubeCenterPosition.xCenter) * 2;
                cubeCenterY = (currentCubeCenterPosition.yCenter - this.cubeCenterPosition.yCenter) * 2;
                cubeCenterZ = (currentCubeCenterPosition.zCenter - this.cubeCenterPosition.zCenter) * 2;
            };
            this.wt[i] = Math.matrixMultiply1x4(this.wt[i], Math.T(-cubeCenterX, -cubeCenterY, -cubeCenterZ));
        }
    }

    generateVCS(isParallel) {
        this.MView = isParallel ? Math.ParallelVt() : Math.PerspectiveVt();
        for(var i=0;i<=7;i++) {
            this.vt[i] = Math.matrixMultiply1x4(this.wt[i], this.MView);
            this.vt[i] = Math.converge(this.vt[i]);
        }
    }

    generateScreen(width, height) {
        this.MScreen = Math.St(width,height);
        for(var i=0;i<=7;i++) this.st[i] = Math.matrixMultiply1x4(this.vt[i], this.MScreen);
    }

    draw(width, height) {
        this.ctx.clearRect(0, 0, width, height);
        
        for(var i=0;i<=11;i++) {
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