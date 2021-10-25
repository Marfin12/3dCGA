// require "./draw.js";
// require "./model.js";
// require "../Utils/math.js";

class House {
    constructor(ctx) {
        this.ctx = ctx;
        this.points = Point.generateHouse();
        this.lines = Line.generateHouse();
    }
}
