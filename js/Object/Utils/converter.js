Math.ConvertVectorToMatrix = function(vec) {
    return [vec.x, vec.y, vec.z, 1];
};

Math.ConvertPropertyToNumber = function(obj) {
    var res = {};

    for (const property in obj) {
        res[property] = parseInt(property);
    }

    return res;
}

Math.ConvertElementArrayToNumber = function(arr) {
    return arr.map(function(element) {
        return parseInt(element);
    })
}
