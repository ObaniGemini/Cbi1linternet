const imgSrc = ["images/image1.jpg", "images/image2.jpg"];
const lastF = 60, lastF2 = 120; //lastFrames
var pics = [];
var current = 0;
var animating = false;


var canvas;
var context;

var i = 0;
var W, H;
var cW, cH;
var cWn, cHn;



window.addEventListener("load", event => {
	console.log("loaded");
	main();
});


window.addEventListener("click", clickEvent );


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
	console.log(event.clientX);
	console.log(event.clientY);

	if( animating ) {
		//speed up
	} else {
		animating = true;
		current++;
		if( current == pics.length ) {
			current = 0;
		}

		window.requestAnimationFrame(draw);
	}
}



const draw = () => {
	console.log(pics[current].getAttribute("src")); //test
	if( i++ <= lastF ) {
		let imW = pics[current].naturalWidth/cWn;
		let imH = pics[current].naturalHeight/cHn;

		for( let j = 1; j <= cWn; j++ ) {
			for( let k = 1; k <= cHn; k++ ) {
				context.drawImage(pics[current], 
					j*imW - imW*i/lastF2 - imW/2, k*imH - imH*i/lastF2 - imH/2,
					i*imW/lastF, i*imH/lastF,
					j*cW - cW*i/lastF2 - cW/2, k*cH - cH*i/lastF2 - cH/2,
					i*cW/lastF, i*cH/lastF);
			};
		};

		window.requestAnimationFrame(draw);
	} else {
		animating = false;
		i = 0;
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