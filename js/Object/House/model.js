  if(typeof(Point)==="undefined"){
	  Point={};
	  Line={};
	  cubeLength=0;
  }

class TLine {
	constructor(p1, p2) {
		this.p1 = p1;
		this.p2 = p2;
	}
}

  Point.generateHouse = function() {
	  let point = {};

	  point.A = [-1, -1, 1];
	  point.B = [1, -1, 1];
	  point.C = [1, 0, 1];
	  point.D = [0, 1, 1];
	  point.E = [-1, 0, 1];
	  point.F = [-1, -1, -1];
	  point.G = [1, -1, -1];
	  point.H = [1, 0, -1];
	  point.I = [0, 1, -1];
	  point.J = [-1, 0, -1];

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
  
  Line.generateHouse = function() {
	  let line = new Array();

	  line[0] = new TLine('A', 'B');
	  line[1] = new TLine('B', 'C');
	  line[2] = new TLine('C', 'D');
	  line[3] = new TLine('D', 'E');
	  line[4] = new TLine('E', 'A');

	  line[5] = new TLine('B', 'G');
	  line[6] = new TLine('G', 'F');
	  line[7] = new TLine('F', 'A');

	  line[8] = new TLine('E', 'J');
	  line[9] = new TLine('D', 'I');
	  line[10] = new TLine('C', 'H');

	  line[11] = new TLine('F', 'J');
	  line[12] = new TLine('J', 'I');
	  line[13] = new TLine('I', 'H');
	  line[14] = new TLine('H', 'G');

	  return line;
  }