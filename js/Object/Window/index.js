// require "./draw.js";
// require "./model.js";
// require "../Utils/math.js";

class WindowLine {
    constructor(ctx, x1, y1, x2, y2) {
        this.ctx = ctx;
        this.points = Point.generateWindow(x1, y1, x2, y2);
        this.lines = Line.generateWindow();
    }
}
