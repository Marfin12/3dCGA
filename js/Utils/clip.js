const REGION_BETWEEN_NEAR_FAR = {
    MIDDLE: 0,
    LEFT: 1,
    RIGHT: 2,
    BOTTOM: 4,
    TOP: 8
};

const REGION_IN_FRONT_OF_NEAR = {
    MIDDLE: 16,
    LEFT: 17,
    RIGHT: 18,
    BOTTOM: 20,
    TOP: 24
};

const REGION_BEHIND_OF_FAR = {
    MIDDLE: 32,
    LEFT: 33,
    RIGHT: 34,
    BOTTOM: 36,
    TOP: 40
};

const XMAX = 1;
const XMIN = -1;
const YMAX = 1;
const YMIN = -1;
const ZMAX = 0;
const ZMIN = -1;

function determineRegion(point) {
    if (point.z > ZMAX) return REGION_IN_FRONT_OF_NEAR;
    if (point.z < ZMIN) return REGION_BEHIND_OF_FAR
    return REGION_BETWEEN_NEAR_FAR;
};

function determineCodeArea(point) {
    const SELECTED_REGION = determineRegion(point);
    const res = SELECTED_REGION.MIDDLE;

    if (point.x < XMIN) res |= SELECTED_REGION.LEFT;
    else if (point.x > XMAX) res |= SELECTED_REGION.RIGHT;

    if (point.y < YMIN) res |= SELECTED_REGION.BOTTOM;
    else if (point.y > YMAX) res |= SELECTED_REGION.TOP;

    return res;
};

function clippingIntersection3d(codeArea, region, point1, point2) {
    let clippedPoint, x, y, z, t;

    if (codeArea & region.TOP) {
        t = (YMAX - point1.y) / (point2.y - point1.y);
        x = point1.x + ( t * (point2.x - point1.x));
        z = point1.z + ( t * (point2.z - point1.z));
        y = YMAX;
    } else if (codeArea & region.BOTTOM) {
        t = (YMIN - point1.y) / (point2.y - point1.y);
        x = point.x + ( t * (point2.x - point1.x));
        z = point.z + ( t * (point2.z - point1.z));
        y = YMIN;
    } else if (codeArea & region.RIGHT) {
        t = (XMAX - point1.x) / (point2.x - point1.x);
        y = point.y + ( t * (point2.y - point1.y));
        z = point.z + ( t * (point2.z - point1.z));
        x = XMAX;
    } else if (codeArea & region.LEFT) {
        t = (XMIN - point1.x) / (point2.x - point1.x);
        y = point.y + ( t * (point2.y - point1.y));
        z = point.z + ( t * (point2.z - point1.z));
        x = XMIN;
    } else if (region.REGION_IN_FRONT_OF_NEAR) {
        t = (ZMAX - point1.z) / (point2.z - point1.z);
        x = point.x + ( t * (point2.x - point1.x));
        y = point.y + ( t * (point2.y - point1.y));
        z = ZMAX;
    } else if (region.REGION_BETWEEN_NEAR_FAR) {
        t = (ZMIN - point1.z) / (point2.z - point1.z);
        x = point.x + ( t * (point2.x - point1.x));
        y = point.y + ( t * (point2.y - point1.y));
        z = ZMIN;
    }

    return clippedPoint(x, y, z);
}

Math.cohenShutterland3d = function(line, point) {
    const clippedLine = { point1: point[line.p1], point2: point[line.p2] };

    let codeArea1 = determineCodeArea(clippedLine.point1);
    let codeArea2 = determineCodeArea(clippedLine.point2);

    while (true) {
        if (codeArea1 == 0 && codeArea2 == 0) return clippedLine;
        else if (codeArea1 && codeArea2) return {};
        else {
            let clippedPoint, outOfArea, region, newPoint, newCodeArea;
            outOfArea = codeArea1 !== 0 ? codeArea1 : codeArea2;
            newPoint = codeArea1 !== 0 ? point1 : point2;

            region = determineRegion(newPoint);
            clippedPoint = clippingIntersection3d(outOfArea, region, point1, point2);

            if (codeArea1 !== 0) {
                point1 = clippedPoint;
                codeArea1 = determineCodeArea(point1);
            } else {
                point2 = clippedPoint;
                codeArea2 = determineCodeArea(point2);
            }
            clippedLine = { point1, point2 };
        }
    }
}