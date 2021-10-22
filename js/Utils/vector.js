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

Math.MinusVector = function(vec) {
    return new Vertex(-vec.x, -vec.y, -vec.z);
}

Math.SubstractionVector = function(vec1, vec2) {
    return new Vertex(vec1.x - vec2.x, vec1.y - vec2.y, vec1.z - vec2.z);
}

Math.NormalizeVector = function(vec) {
    const unitVec = unitVector(vec);

    return new Vertex(vec.x/unitVec, vec.y/unitVec, vec.z/unitVec);
}

Math.DotProduct = function(vec1, vec2) {
    return (vec1.x * vec2.x) + (vec1.y * vec2.y) + (vec1.z * vec2.z);
};

Math.CrossProduct = function(vec1, vec2) {
    var cx = (vec1.y * vec2.z) - (vec1.z * vec2.y);
    var cy = (vec1.z * vec2.x) - (vec1.x * vec2.z);
    var cz = (vec1.x * vec2.y) - (vec1.y * vec2.x);

    return new Vertex(cx, cy, cz);
};
