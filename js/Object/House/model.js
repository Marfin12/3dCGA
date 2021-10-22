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

  Point.generateHouse = function(pos, len) {
	  cubeLength = len;
	  const xEnd = pos.x + cubeLength;
	  const yEnd = pos.y + cubeLength;
	  const zEnd = pos.z + cubeLength;
	  const xRoof = (xEnd + pos.x) / 2;
	  const yRoof = yEnd + 40;
	  
	  let point = [];

	  point[0] = [pos.x, pos.y, pos.z];
	  point[1] = [xEnd, pos.y, pos.z];
	  point[2] = [xEnd, yEnd, pos.z];
	  point[3] = [pos.x, yEnd, pos.z];
	  point[4] = [pos.x, pos.y, zEnd];
	  point[5] = [xEnd, pos.y, zEnd];
	  point[6] = [xEnd, yEnd, zEnd];
	  point[7] = [pos.x, yEnd, zEnd];
	  point[8] = [xRoof, yRoof, pos.z];
	  point[9] = [xRoof, yRoof, zEnd];

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

	  line[0] = new TLine(0, 1);
	  line[1] = new TLine(1, 2);
	  line[2] = new TLine(3, 0);
	  line[3] = new TLine(0, 4);
	  line[4] = new TLine(4, 5);
	  line[5] = new TLine(5, 1);
	  line[6] = new TLine(4, 7);
	  line[7] = new TLine(6, 5);
	  line[8] = new TLine(3, 7);
	  line[9] = new TLine(6, 2);
	  line[10] = new TLine(2, 8);
	  line[11] = new TLine(8, 3);
	  line[12] = new TLine(6, 9);
	  line[13] = new TLine(9, 7);

	  return line;
  }