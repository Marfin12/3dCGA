Math.ConvertVectorToMatrix = function(vec) {
    return [vec.x, vec.y, vec.z, 1];
};

Math.ConvertMatrixToVector = function(mat) {
    return new Vertex(mat[0], mat[1], mat[2]);
}

Math.ConvertPropertyToNumber = function(obj) {
    var res = {};

    for (const property in obj) {
        res[property] = parseInt(obj[property]);
    }

    return res;
}

Math.ConvertElementArrayToNumber = function(arr) {
    return arr.map(function(element) {
        return parseInt(element);
    })
}

Math.ConvertArrayToVector = function(arr) {
    return new Vertex(arr[0], arr[1], arr[2])
}
