const imgSrc = ["images/image1.jpg", "images/image2.jpg"];
const lastF = 60, lastF2 = 120; //lastFrames
var pics = [];
var canvas;
var context;

var current = 0;
var f = lastF2 + 1;
var step = 1;

var W, H;
var cW, cH;
var cWn, cHn;
var clientX, clientY;



window.addEventListener("load", event => {
	main();
});


window.addEventListener("click", clickEvent );
window.addEventListener("mousedown", event => { step = 2; } );
window.addEventListener("mouseup", event => { step = 1; } );


window.addEventListener("resize", event => { updateImg(); } );



const main = event => {
	imgSrc.forEach( (element) => {
		let img = document.createElement("img");
		img.setAttribute("src", element);
		pics.push(img);
	})


	canvas = document.createElement("canvas");
	canvas.setAttribute("id", "canvas");
	context = canvas.getContext("2d");
	document.body.appendChild(canvas);

	updateImg();
}


function clickEvent( event ) {
	clientX = Math.round(event.clientX/cW);
	clientY = Math.round(event.clientY/cH);

	if( f >= lastF2 ) {
		f = 0;
		current++;
		if( current == pics.length ) {
			current = 0;
		}

		window.requestAnimationFrame(draw);
	}
}



const draw = () => {
	if( f < lastF2 ) {
		let imW = pics[current].naturalWidth/cWn;
		let imH = pics[current].naturalHeight/cHn;

		for( let posX = clientX - f; posX <= (clientX + f) && posX <= cWn ; posX++ ) {
			if( posX < 0 ) {
				continue;
			}

			let sizeX = f - Math.abs(posX - clientX)*3;

			for( let posY = clientY - f - 1; posY <= (clientY + f) && posY <= cHn; posY++ ) {
				if( posY < 0 ) {
					continue;
				}

				let sizeY = f - Math.abs(posY - clientY)*3;

				if( sizeY < sizeX ) { //make the progression squarish
					sizeY = sizeX;
				}

				if( sizeY > lastF+step || sizeY <= 0 ) { //if already drawn or not to be drawn
					continue;
				}

				context.drawImage(pics[current], 
					posX*imW - imW*sizeY/lastF2 - imW/2, posY*imH - imH*sizeY/lastF2 - imH/2,
					sizeY*imW/lastF, sizeY*imH/lastF,
					posX*cW - cW*sizeY/lastF2 - cW/2, posY*cH - cH*sizeY/lastF2 - cH/2,
					sizeY*cW/lastF, sizeY*cH/lastF);
			};
		};

		f += step;

		window.requestAnimationFrame(draw);
	}
}

const updateImg = event => {
	W = window.innerWidth;
	H = window.innerHeight;

	
	function setCScale( fact, maxSizeFact, maxSize ) {
		let i = 0;
		let tmp = maxSizeFact/fact
		while( (++i)*tmp < maxSize );
		return Math.abs(i*tmp - maxSize) < Math.abs((i-1)*tmp - maxSize) ? i : i-1;
	}


	if( W > H ) {
		cWn = 20;
		cHn = setCScale( cWn, W, H );
	} else {
		cHn = 20;
		cWn = setCScale( cHn, H, W );
	}

	cW = W/cWn;
	cH = H/cHn;

	canvas.setAttribute("width", W);
	canvas.setAttribute("height", H);
	context.drawImage(pics[current], 0, 0, W, H);
}