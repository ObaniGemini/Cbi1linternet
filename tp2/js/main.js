const PI2 = 2*3.14159;

class Point {
	constructor(x, y) {
	    this.x = x;
	    this.y = y;
	}
}

class Circle {
	constructor( cx, cy, r ) {
		this.cx = cx;
		this.cy = cy;
		this.r = r;
	}
}


function sq( x ) { return x * x; }

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}



const main = () => {
	let canvas = document.createElement("canvas");
	canvas.id = "canvas";
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	let P1 = new Point( getRandomInt(canvas.width), getRandomInt(canvas.height) );
	let P2 = new Point( getRandomInt(canvas.width), getRandomInt(canvas.height) );
	let P3 = new Point( getRandomInt(canvas.width), getRandomInt(canvas.height) );
	let circle = findCircle( P1, P2, P3 );

	let context = canvas.getContext("2d");
	context.fillStyle = '#000';
	context.beginPath();
	context.arc(circle.cx, circle.cy, circle.r, 0, PI2, false);
	context.fill();

	context.fillStyle = '#f00';
	context.fillRect( P1.x - 10, P1.y - 10, 20, 20 );
	context.fillStyle = '#0f0';
	context.fillRect( P2.x - 10, P2.y - 10, 20, 20 );
	context.fillStyle = '#00f';
	context.fillRect( P3.x - 10, P3.y - 10, 20, 20 );
	document.body.appendChild(canvas);
}




function findCircle( p1, p2, p3 ) {
	let cx = (
				((sq(p3.x) - sq(p2.x) + sq(p3.y) - sq(p2.y))/(2*(p3.y - p2.y))) - ((sq(p2.x) - sq(p1.x) + sq(p2.y) - sq(p1.y))/(2*(p2.y - p1.y)))
			 ) /
			 ( 
				(p3.x - p2.x)/(p3.y - p2.y) - (p2.x - p1.x)/(p2.y - p1.y)
			 );

	let cy = ((sq(p2.x) - sq(p1.x) + sq(p2.y) - sq(p1.y))/(2*(p2.y - p1.y))) - ((p2.x - p1.x)/(p2.y - p1.y))*cx;
	


	let r = Math.sqrt(sq(p1.x - cx) + sq(p1.y - cy));

	return new Circle( cx, cy, r );
}


window.addEventListener("load", main );