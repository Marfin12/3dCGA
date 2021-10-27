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

    translateCOPtoOrigin() {
        const TCOP = [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1,  0],
            [-this.COP.x, -this.COP.y, -this.COP.z,  1]
        ];
        return TCOP;
    }

    shearDOP() {
        const CW = new Vertex(this.uMaxMin / 2, this.vMaxMin / 2, 0);
        const DOP = Math.SubstractionVector(CW, this.COP);
        const HX = -DOP.x / DOP.z;
        const HY = -DOP.y / DOP.z;
        const SHPAR = [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [HX, HY, 1,  0],
            [0, 0, 0,  1]
        ];

        return SHPAR;
    }

    translateToFrontCenter() {
        return Math.T(-(this.uMaxMin / 2), -(this.vMaxMin / 2), -this.F);
    }

    scaleToCannocialVolumeParallel() {
        const Sx = 2 / (this.Window[2] - this.Window[0]);
        const Sy = 2 / (this.Window[3] - this.Window[1]);
        const Sz = 1 / (this.F - this.B);

        return Math.S(Sx, Sy, Sz);
    }

    scaleToCannocialVolumePerspective() {
        const w = ((this.COP.z - this.B) * (this.Window[2] - this.Window[0])) / (2 * this.COP.z);
        const h = ((this.COP.z - this.B) * (this.Window[3] - this.Window[1])) / (2 * this.COP.z);
        const BP = this.B - this.COP.z;

        const Sx = 1 / w;
        const Sy = 1 / h;
        const Sz = 1 / BP;

        return Math.S(Sx, Sy, Sz);
    }

    translateVPbackToZ0() {
        const testZ = this.COP.z + 1;
        const VP = testZ / (this.B - testZ);
        const TVPZ0 = [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1,  -VP],
            [0, 0, 0,  1]
        ];

        return TVPZ0;
    }

    scaleVMax() {
        const vMax = (this.COP.z - this.B) / this.COP.z;

        return Math.S(vMax, vMax, 1);
    }

}