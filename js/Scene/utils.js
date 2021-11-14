function normalizeParallel(camera, homogeneousObject) {
    const normalizeObject = new Array();

    let onlyHouse = true;

    homogeneousObject.forEach(function(obj) {
        let res = new Array();

        if (onlyHouse) {
            const T1 = camera.translateVRPtoOrigin();
            const T2 = camera.alignVRC();
            const T3 = camera.shearDOP();
            const T4 = camera.translateToFrontCenter();
            const T5 = camera.scaleToCannocialVolumeParallel();

            const T1xT2 = Math.MatrixMultiply4x4(T1, T2);
            const T1xT2xT3 = Math.MatrixMultiply4x4(T1xT2, T3);
            const T1xT2xT3xT4 = Math.MatrixMultiply4x4(T1xT2xT3, T4);
            const NPAR = Math.MatrixMultiply4x4(T1xT2xT3xT4, T5);

            obj.points.forEach(function(point) {
                res.push(Math.MatrixMultiply1x4(point, NPAR));
            })
            onlyHouse = false;
        }

        normalizeObject.push(
            {
                points: res.length == 0 ? obj.points : res,
                lines: obj.lines
            }
        );
    });

    return normalizeObject;
}

function performParallelProjection(normalizeObject) {
    const MView = Math.ParallelVt();
    const vt = new Array();

    let onlyHouse = true;

    normalizeObject.forEach(function(obj) {
        let collectionVTObj = new Array();
        if (onlyHouse) {

        obj.points.forEach(function(point) {
            collectionVTObj.push(Math.MatrixMultiply1x4(point, MView));
        })

        onlyHouse = false;
    }

        vt.push(
            {
                points: collectionVTObj.length == 0 ? obj.points : collectionVTObj,
                lines: obj.lines
            }
        );
    })

    return vt;
}

function normalizePerspective(camera, homogeneousObject) {
    const normalizeObject = new Array();

    let onlyHouse = true;

    homogeneousObject.forEach(function(obj) {
        const res = new Array();
        const C6 = new Array();

        if (onlyHouse) {
            const T1 = camera.translateVRPtoOrigin();
            const T2 = camera.alignVRC();
            const T3 = camera.translateCOPtoOrigin();
            const T4 = camera.shearDOP();
            const T5 = camera.scaleToCannocialVolumePerspective();
            const T7 = camera.translateVPbackToZ0();
            const T8 = camera.scaleVMax();

            const T1xT2 = Math.MatrixMultiply4x4(T1, T2);
            const T1xT2xT3 = Math.MatrixMultiply4x4(T1xT2, T3);
            const T1xT2xT3xT4 = Math.MatrixMultiply4x4(T1xT2xT3, T4);
            const T1xT2xT3xT4xT5 = Math.MatrixMultiply4x4(T1xT2xT3xT4, T5);
            const T7xT8 = Math.MatrixMultiply4x4(T7, T8);
            // const T1xT2xT3xT4xT5xT7 = Math.MatrixMultiply4x4(T1xT2xT3xT4xT5, T7);
            // const NPER = Math.MatrixMultiply4x4(T1xT2xT3xT4xT5xT7, T8);

            obj.points.forEach(function(point) {
                let vectorPoint = Math.MatrixMultiply1x4(point, T1xT2xT3xT4xT5);
                vectorPoint = Math.ConvertMatrixToVector(vectorPoint);
                C6.push(vectorPoint);
            })
            let newLine = new Array();

            obj.lines.forEach(function(line, index, object) {
                let newClippedLine = Math.cohenShutterland3d(line, C6, camera.Window, camera.F, camera.B);
                if (newClippedLine.intersectionStatus == 0) {
                    newLine.push(new TLine(line.p1, line.p2));
                }
                else if (newClippedLine.intersectionStatus == 2) {
                    if (newClippedLine.point1 !== obj.points[line.p1] && newClippedLine.point1 !== obj.points[line.p2]) {
                        obj.points.push(newClippedLine.point1);
                        obj.points.push(newClippedLine.point2);
                        newLine.push(new TLine(obj.points.length - 2, obj.points.length - 1));
                    }
                    else if (newClippedLine.point1 !== obj.point[line.p1]) {
                        obj.points.push(newClippedLine.point1);
                        newLine.push(new TLine(obj.points.length - 1, line.p2));
                    }
                    else if (newClippedLine.point2 !== obj.point[line.p2]) {
                        obj.points.push(newClippedLine.point2);
                        newLine.push(new TLine(line.p1, obj.points.length - 1));
                    }
                }
            })

            obj.lines = newLine;
            
            C6.forEach(function(vectorPoint) {
                const point = Math.ConvertVectorToMatrix(vectorPoint);
                res.push(Math.MatrixMultiply1x4(point, T7xT8));
            })

            onlyHouse = false;
        }

        normalizeObject.push(
            {
                points: res.length == 0 ? obj.points : res,
                lines: obj.lines
            }
        );
    });

    return normalizeObject;
}

function performPerspectiveProjection(normalizeObject, camera) {
    const MView = Math.PerspectiveVt(camera.COP.z, camera.B);
    const vt = new Array();

    let onlyHouse = true;

    normalizeObject.forEach(function(obj) {
        let collectionVTObj = new Array();
        if (onlyHouse) {

        obj.points.forEach(function(point) {
            collectionVTObj.push(Math.MatrixMultiply1x4(point, MView));
        })

        onlyHouse = false;
    }

        vt.push(
            {
                points: collectionVTObj.length == 0 ? obj.points : collectionVTObj,
                lines: obj.lines
            }
        );
    })

    return vt;
}
