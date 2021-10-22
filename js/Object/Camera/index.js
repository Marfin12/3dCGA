class Camera {
    constructor(VRP, VPN, VUP, PRP, Window, Front, Back) {
        this.VRP = VRP;
        this.VPN = VPN;
        this.VUP = VUP;
        this.PRP = PRP;
        this.Window = Window;
        this.F = Front;
        this.B = Back;
        this.uMaxMin = this.Window[0] + this.Window[1];
        this.vMaxMin = this.Window[2] + this.Window[3];
    }

    translateVRPtoOrigin(cube) {
        var res = [];
        const TVRP = Math.T(-this.VRP.x, -this.VRP.y, -this.VRP.z);

        for(var i=0;i<cube.length;i++) {
            res[i] = Math.MatrixMultiply1x4(cube[i], TVRP);
        }

        return res;
    }

    alignVRC(cube) {
        const n = Math.NormalizeVector(this.VPN);
        const u = Math.NormalizeVector(Math.CrossProduct(this.VUP, n));
        const v = Math.CrossProduct(n, u);

        const RVRC = [
            [u.x, u.y, u.z, 0],
            [v.x, v.y, v.z, 0],
            [n.x, n.y, n.z, 0],
            [0,    0,   0,  1]
        ];
        var res = [];

        for(var i=0;i<cube.length;i++) {
            res[i] = Math.MatrixMultiply1x4(cube[i], RVRC);
        }

        return res;
    }

    shearDOP(cube) {
        const CW = new Vertex(this.uMaxMin / 2, this.vMaxMin / 2, 0);
        const DOP = Math.SubstractionVector(CW, this.PRP);
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
            res[i] = Math.MatrixMultiply1x4(cube[i], TDOP);
        }

        return res;
    }

    translateToFrontCenter(cube) {
        var res = [];
        const TFRONT = [
            [1, 0, 0, -this.uMaxMin / 2],
            [0, 1, 0, -this.vMaxMin / 2],
            [0, 0, 1,      -this.F     ],
            [0, 0, 0,        0         ]
        ];

        for(var i=0;i<cube.length;i++) {
            res[i] = Math.MatrixMultiply1x4(cube[i], TFRONT);
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
            res[i] = Math.MatrixMultiply1x4(cube[i], TSPAR);
        }

        return res;
    }

}