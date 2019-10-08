const imgSrc = ["images/image1.jpg", "images/image2.jpg", "images/image3.jpg", "images/image4.jpg", "images/image5.jpg", "images/image6.jpg", "images/image7.jpg"];
const lastF = 60, lastF2 = 120; //lastFrames

var pics = [];
var current = 0;	//current pic index

var f = lastF2; //frame number
var step = 1;		//frame step

var cW, cH;				//cell Width, Height
var cWn, cHn;			//cell number in screen ( for widht and height )
var clientX, clientY;	//client mouse click

var canvas;			//canvas object
var context;		//canvas's context




const main = () => {
	canvas = document.createElement("canvas");					//create canvas and add it to the page
	canvas.setAttribute("id", "canvas");
	context = canvas.getContext("2d");
	context.fillStyle = '#000';
	document.body.appendChild(canvas);


	imgSrc.forEach( (element) => {								//add picture objects to array
		let img = document.createElement("img");
		img.setAttribute("src", element);
		pics.push(img);
	})

	updateImg();
	clickEvent(new MouseEvent("click", {"clientX": window.innerWidth/2, "clientY":window.innerHeight/2}));												//update canvas parameters
}




function clickEvent( event ) {
	if( f < lastF || f >= lastF2 ) {
		clientX = Math.round(event.clientX/cW);
		clientY = Math.round(event.clientY/cH);
	}

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
		let finished = true;


		for( let posX = clientX - f; posX <= (clientX + f) && posX <= cWn ; posX++ ) {
			if( posX < 0 ) {
				continue;
			}

			let sizeX = f - Math.abs(posX - clientX)*3;

			for( let posY = clientY - f; posY <= (clientY + f) && posY <= cHn; posY++ ) {
				if( posY < 0 ) {
					continue;
				}

				let sizeY = f - Math.abs(posY - clientY)*3;

				if( sizeY < sizeX ) { //make the progression squarish
					sizeY = sizeX;
				}

				if( (sizeY/(lastF+step)) > 1 || sizeY <= 0 ) { //if already drawn or not to be drawn
					continue;
				}

				if( (sizeY/((lastF+step)*0.6) <= 1 ) ) { //draw black rectangles
					context.fillRect(	posX*cW - cW*sizeY/(lastF2*0.6) - cW/2,
										posY*cH - cH*sizeY/(lastF2*0.6) - cH/2,
										sizeY*cW/(lastF*0.6),
										sizeY*cH/(lastF*0.6) );
				}

				context.drawImage(pics[current], 
					posX*imW - imW*sizeY/lastF2 - imW/2, posY*imH - imH*sizeY/lastF2 - imH/2,
					sizeY*imW/lastF, sizeY*imH/lastF,
					posX*cW - cW*sizeY/lastF2 - cW/2, posY*cH - cH*sizeY/lastF2 - cH/2,
					sizeY*cW/lastF, sizeY*cH/lastF);

				finished = false;
			};
		};


		if( finished && f > 1 ) {
			f = lastF2;
		} else {
			f += step;
			window.requestAnimationFrame(draw);
		}
	}
}




const updateImg = () => {
	function setNumCells( otherAxisCellNum, maxSizeOtherAxis, maxSizeAxis ) {		//Set the number of an axis depending of the other axis and of its axis's size
		let i = 0;
		let tmp = maxSizeOtherAxis/otherAxisCellNum;
		while( (++i)*tmp < maxSizeAxis );
		return Math.abs(i*tmp - maxSizeAxis) < Math.abs((i-1)*tmp - maxSizeAxis) ? i : i-1;
	}


	if( window.innerWidth > window.innerHeight ) {	//20 cells maximum per axis, in height or width
		cWn = 20;
		cHn = setNumCells( cWn, window.innerWidth, window.innerHeight );
	} else {
		cHn = 20;
		cWn = setNumCells( cHn, window.innerHeight, window.innerWidth );
	}

	cW = window.innerWidth/cWn;		//Set cells size
	cH = window.innerHeight/cHn;

	canvas.setAttribute("width", window.innerWidth);	//Set canvas size
	canvas.setAttribute("height", window.innerHeight);

	context.drawImage(pics[current], 0, 0, window.innerWidth, window.innerHeight);	//Draw image if resize, this will messup animation anyway if we care about it
}





window.addEventListener("load", main );			//page load
window.addEventListener("mousedown", (event) => { step = 2; clickEvent(event) } );	//Speed up animation
window.addEventListener("mouseup", () => { step = 1; } );	//Slow down animation
window.addEventListener("resize", updateImg );	//resize image
