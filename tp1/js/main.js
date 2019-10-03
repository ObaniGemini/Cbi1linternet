var imgSrc = ["images/image1.jpg", "images/image2.jpg"];
var pics = [];
var current = 0;
var animating = false;

var i = 0;
var W, H;
var cW, cH;
var cWn, cHn;



window.addEventListener("load", event => {
	console.log("loaded");
	main();
});


window.addEventListener("click", clickEvent );


window.addEventListener("resize", updateImg );



const main = event => {
	imgSrc.forEach( (element) => {
		let image = document.createElement("img");
		image.setAttribute("src", element);
		pics.push(image);
	})


	let square = document.createElement("canvas");
	square.setAttribute("id", "canvas");
	document.body.appendChild(square);

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
	if( i++ < 60 ) {
		let canvas = document.getElementById("canvas");
		let context = canvas.getContext("2d");

		let imW = pics[current].naturalWidth;
		let imH = pics[current].naturalHeight;

		for( let j = 1; j <= cWn; j++ ) {
			for( let k = 1; k <= cHn; k++ ) {
				context.drawImgage(pics[current], 
					j*(imW/cWn) - (imW/cWn)*i/120, k*(imH/cHn) - (imW/cHn)*i/120,
					i*(imW/cWn), i*(imH/cHn),
					j*cW - cW*i/120, k*cH - cH*i/120,
					i*cW/60, i*cH/60);
			};
		};

		/*context.drawImage(pics[current], imW/2 - i*imW/120, imH/2 - i*imH/120,
										 i*imW/60, i*imH/60,
										 W/2 - i*W/120, H/2 - i*H/120,
										 i*W/60, i*H/60);*/

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

	let canvas = document.getElementById("canvas");
	canvas.setAttribute("width", W);
	canvas.setAttribute("height", H);
	let context = canvas.getContext("2d");
	context.drawImage(pics[current], 0, 0, W, H);
}