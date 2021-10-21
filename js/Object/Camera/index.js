class Camera {
    constructor(VRP, VPN, VUP, PRP, Window, Front, Back) {
        this.VRP = Math.ConvertVectorToMatrix(VRP);
        this.VPN = Math.ConvertVectorToMatrix(VPN);
        this.VUP = Math.ConvertVectorToMatrix(VUP);
        this.PRP = Math.ConvertVectorToMatrix(PRP);
        this.Window = Window;
        this.Front = Front;
        this.Back = Back;
        this.uMaxMin = this.Window[0] + this.Window[1];
        this.vMaxMin = this.Window[2] + this.Window[3];
    }

    translateVRPtoOrigin(cube) {
        var res = [];
        const TVRP = Math.T(Math.minusVector(this.VRP));

        for(var i=0;i<cube.length;i++) {
            res[i] = Math.multiplyMatrix1x4(cube[i], TVRP);
        }

        return res;
    }

    alignVRC(cube) {
        const n = Math.NormalizeVector(VPN);
        const u = Math.NormalizeVector(Math.crossProduct(VUP, n));
        const v = Math.crossProduct(n, u);

        const RVRC = [
            [u.x, u.y, u.z, 0],
            [v.x, v.y, v.z, 0],
            [n.x, n.y, n.z, 0],
            [0,    0,   0,  1]
        ];
        var res = [];

        for(var i=0;i<cube.length;i++) {
            res[i] = Math.multiplyMatrix1x4(cube[i], RVRC);
        }

        return res;
    }

    shearDOP(cube) {
        const CW = new Vertex(this.uMaxMin / 2, this.vMaxMin / 2, 0);
        const DOP = Math.SubstractionVector(CW, PRP);
        const HX = (DOP.x * -1) / DOP.z;
        const HY = (DOP.y * -1) / DOP.z;
        const TDOP = [
            [1, 0, HX, 0],
            [0, 1, HY, 0],
            [0, 0, 1,  0],
            [0, 0, 0,  1]
        ];
        var res = [];

        for(var i=0;i<cube.length;i++) {
            res[i] = Math.multiplyMatrix1x4(cube[i], TDOP);
        }

        return res;
    }

    translateToFrontCenter(cube) {
        var res = [];
        const TFRONT = [
            [1, 0, 0, -this.uMaxMin / 2],
            [0, 1, 0, -this.vMaxMin / 2],
            [0, 0, 1,       -F     ],
            [0, 0, 0,        0     ]
        ];

        for(var i=0;i<cube.length;i++) {
            res[i] = Math.multiplyMatrix1x4(cube[i], TFRONT);
        }

        return res;
    }

    scaleToCannocialVolume(cube) {
        const Sx = 2 / (this.Window[1] - this.Window[0]);
        const Sy = 2 / (this.Window[3] - this.Window[2]);
        const Sz = 1 / (this.F - this.B);

        const TSPAR = [
            [Sx, 0,  0,  0],
            [0,  Sy, 0,  0],
            [0,  0,  Sz, 0],
            [0,  0,  0,  1]
        ];

        var res = [];

        for(var i=0;i<cube.length;i++) {
            res[i] = Math.multiplyMatrix1x4(cube[i], TSPAR);
        }

        return res;
    }

}