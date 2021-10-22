// require "./draw.js";
// require "./model.js";
// require "../Utils/math.js";

class House {
    constructor(ctx, housePosition, len) {
        this.ctx = ctx;
        this.points = Point.generateHouse(housePosition, len);
        this.lines = Line.generateHouse();
    }
}
