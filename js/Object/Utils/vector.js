class Vertex {
	constructor(x, y, z) {
		this.x = parseFloat(x);
        this.y = parseFloat(y);
        this.z = parseFloat(z);
	}
}

function unitVector(vec) {
    var x = Math.pow(vec.x, 2);
    var y = Math.pow(vec.y, 2);
    var z = Math.pow(vec.z, 2);
    
    return Math.sqrt(x + y + z);
};

Math.minusVector = function(vec) {
    return new Vertex(-vec.x, -vec.y, -vec.z);
}

Math.SubstractionVector = function(vec1, vec2) {
    return new Vertex(vec1.x - vec2.x, vec1.y - vec2.y, vec1.z - vec2.z);
}

Math.NormalizeVector = function(vec) {
    const unitVec = unitVector(vec);

    return new Vertex(vec.x/unitVec, vec.y/unitVec, vec.z/unitVec);
}

Math.DotProduct = function(up, n) {
    return (up.x * n.x) + (up.y * n.y) + (up.z * n.z);
};

Math.CrossProduct = function(up, n) {
    var cx = (up.y * n.z) - (up.z * n.y);
    var cy = (up.z * n.x) - (up.x * n.z);
    var cz = (up.x * n.y) - (up.y * n.x);

    return new Vertex(cx, cy, cz);
};
