const pi = 3.141592653589 / 180;

function setThisMatrix(P1, index, col1, col2, col3, col4) {
    var column = [col1, col2, col3, col4]; 
    P1[index] = [];

    for (var i=0;i<4;i++) P1[index][i] = column[i];
}

Math.Rx = function(alfa) {
    var MRotx = new Array();

    setThisMatrix(MRotx, 0, 1, 0, 0, 0);
    setThisMatrix(MRotx, 1, 0, Math.cos(alfa * pi), -Math.sin(alfa * pi), 0);
    setThisMatrix(MRotx, 2, 0, Math.sin(alfa * pi), Math.cos(alfa * pi), 0);
    setThisMatrix(MRotx, 3, 0, 0, 0, 1);

    return MRotx;
};

Math.Ry = function(alfa) {
    var MRoty = new Array();

    setThisMatrix(MRoty, 0, Math.cos(alfa * pi), 0, Math.sin(alfa * pi), 0);
    setThisMatrix(MRoty, 1, 0, 1, 0, 0);
    setThisMatrix(MRoty, 2, -Math.sin(alfa * pi), 0, Math.cos(alfa * pi), 0);
    setThisMatrix(MRoty, 3, 0, 0, 0, 1);

    return MRoty;
};

Math.Rz = function(alfa) {
    var MRotz = new Array();
    
    setThisMatrix(MRotz, 0, Math.cos(alfa * pi), Math.sin(alfa * pi), 0, 0)
    setThisMatrix(MRotz, 1, -Math.sin(alfa * pi), Math.cos(alfa * pi), 0, 0)
    setThisMatrix(MRotz, 2, 0, 0, 1, 0)
    setThisMatrix(MRotz, 3, 0, 0, 0, 1)

    return MRotz;
};

Math.ParallelVt = function() {
    var MRotx = new Array();

    setThisMatrix(MRotx, 0, 1, 0, 0, 0);
    setThisMatrix(MRotx, 1, 0, 1, 0, 0);
    setThisMatrix(MRotx, 2, 0, 0, 0, 0);
    setThisMatrix(MRotx, 3, 0, 0, 0, 1);

    return MRotx;
};

Math.PerspectiveVt = function(copZ, B) {
    var MRotx = new Array();
    const COPz = copZ / (copZ - B);

    setThisMatrix(MRotx, 0, 1, 0, 0, 0);
    setThisMatrix(MRotx, 1, 0, 1, 0, 0);
    setThisMatrix(MRotx, 2, 0, 0, 0, -1 / (COPz));
    setThisMatrix(MRotx, 3, 0, 0, 0, 1);

    return MRotx;
};

Math.St = function(w,h, sx, sy) {
    var MRotx = new Array();

    setThisMatrix(MRotx, 0, sx, 0, 0, 0);
    setThisMatrix(MRotx, 1, 0, -sy, 0, 0);
    setThisMatrix(MRotx, 2, 0, 0, 0, 0);
    setThisMatrix(MRotx, 3, w/2, h/2, 0, 1);

    return MRotx;
}

Math.T = function(dx = 0, dy = 0, dz = 0) {
    var MTranz = new Array();

    setThisMatrix(MTranz, 0, 1, 0, 0, 0);
    setThisMatrix(MTranz, 1, 0, 1, 0, 0);
    setThisMatrix(MTranz, 2, 0, 0, 1, 0);
    setThisMatrix(MTranz, 3, dx, dy, dz, 1);

    return MTranz;
};

Math.S = function(sx = 0, sy = 0, sz = 0) {
    var MScale = new Array();

    setThisMatrix(MScale, 0, sx, 0, 0, 0);
    setThisMatrix(MScale, 1, 0, sy, 0, 0);
    setThisMatrix(MScale, 2, 0, 0, sz, 0);
    setThisMatrix(MScale, 3, 0, 0, 0, 1);

    return MScale
}

Math.divideW = function(mat1) {
    for (var i=0;i<4;i++) mat1[i] = mat1[i]/mat1[3];
    
    return mat1;
};

Math.MatrixMultiply4x4 = function(mat1, mat2) {
    var res = [];

    for (var i = 0; i < mat1.length; i++) 
    { 
        res[i] = [];
        for (j = 0; j < mat2[0].length; j++) 
        { 
            res[i][j] = 0;
            for (k = 0; k < mat1[0].length; k++) {
                res[i][j] += mat1[i][k] *  
                             mat2[k][j];
            }
        } 
    }

    return res;
};

Math.MatrixMultiply1x4 = function(mat1, mat2) {
    var res = [];

    for (var i=0;i<4;i++) res[i] = 
        mat1[0] * mat2[0][i] + mat1[1] * mat2[1][i] + 
        mat1[2] * mat2[2][i] + mat1[3] * mat2[3][i];

    return res;
};
