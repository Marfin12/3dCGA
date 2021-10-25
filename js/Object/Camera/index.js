class Camera {
    constructor(VRP, VPN, VUP, COP, Window, Front, Back) {
        this.VRP = VRP;
        this.VPN = VPN;
        this.VUP = VUP;
        this.COP = COP;
        this.Window = Window;
        this.F = Front;
        this.B = Back;
        this.uMaxMin = this.Window[2] + this.Window[0];
        this.vMaxMin = this.Window[3] + this.Window[1];
    }

    translateVRPtoOrigin() {
        return Math.T(-this.VRP.x, -this.VRP.y, -this.VRP.z);
    }

    alignVRC() {
        const up = Math.NormalizeVector(this.VUP);

        const n = Math.NormalizeVector(this.VPN);
        const upDotN = Math.DotProduct(up, n);
        const upDotNTimesN = new Vertex(upDotN * n.x, upDotN * n.y, upDotN * n.z);
        const v = Math.NormalizeVector(Math.SubstractionVector(up, upDotNTimesN));
        const u = Math.CrossProduct(v, n);

        const RVRC = [
            [u.x, u.y, u.z, 0],
            [v.x, v.y, v.z, 0],
            [n.x, n.y, n.z, 0],
            [0,    0,   0,  1]
        ];

        return RVRC;
    }

    shearDOP() {
        const CW = new Vertex(this.uMaxMin / 2, this.vMaxMin / 2, 0);
        const DOP = Math.SubstractionVector(CW, this.COP);
        const HX = (DOP.x * -1) / DOP.z;
        const HY = (DOP.y * -1) / DOP.z;
        const SHPAR = [
            [1, 0, HX, 0],
            [0, 1, HY, 0],
            [0, 0, 1,  0],
            [0, 0, 0,  1]
        ];

        return SHPAR;
    }

    translateToFrontCenter() {
        const TFRONT = [
            [1, 0, 0, -this.uMaxMin / 2],
            [0, 1, 0, -this.vMaxMin / 2],
            [0, 0, 1,      -this.F     ],
            [0, 0, 0,        0         ]
        ];

        return TFRONT;
    }

    scaleToCannocialVolume() {
        const Sx = 2 / (this.Window[2] - this.Window[0]);
        const Sy = 2 / (this.Window[3] - this.Window[1]);
        const Sz = 1 / (this.F - this.B);

        const TSPAR = [
            [Sx, 0,  0,  0],
            [0,  Sy, 0,  0],
            [0,  0,  Sz, 0],
            [0,  0,  0,  1]
        ];

        return TSPAR;
    }

}