  Point.generateWindow = function(x1, y1, x2, y2) {
	  let point = {};

	  point.A = [x1, y1, 0];
	  point.B = [x2, y1, 0];
	  point.C = [x2, y2, 0];
	  point.D = [x1, y2, 0];

	  return point;
  }

  Point.getCenterPosition = function(pos) {
	const xEnd = pos.x + cubeLength;
	const yEnd = pos.y + cubeLength;
	const zEnd = pos.z + cubeLength;
	const xCenter = (xEnd + pos.x) / 2;
	const yCenter = (yEnd + pos.y) / 2;
	const zCenter = (zEnd + pos.y) / 2;

	return {
		xCenter,
		yCenter,
		zCenter
	};
}
  
  Line.generateWindow = function() {
	  let line = new Array();

	  line[0] = new TLine('A', 'B');
	  line[1] = new TLine('B', 'C');
	  line[2] = new TLine('C', 'D');
	  line[3] = new TLine('D', 'A');

	  return line;
  }