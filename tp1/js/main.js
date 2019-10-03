var imgSrc = ["images/image1.jpg", "images/image2.jpg"];
var pics = [];
var current = 0;
var animating = false;

var i = 0;



window.addEventListener("load", event => {
	console.log("loaded");
	main();
});


window.addEventListener("click", clickEvent );



const main = event => {
	imgSrc.forEach( (element) => {
		let image = document.createElement("img");
		image.setAttribute("src", element);
		pics.push(image);
	})


	let square = document.createElement("canvas");
	square.setAttribute("id", "canvas");
	square.setAttribute("width", window.innerWidth);
	square.setAttribute("height", window.innerHeight);
	document.body.appendChild(square);
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
	let W = window.innerWidth;
	let H = window.innerHeight;
	if( ++i < 60 ) {
		let canvas = document.getElementById("canvas");
		let context = canvas.getContext("2d");
		let imW = pics[current].naturalWidth;
		let imH = pics[current].naturalHeight;
		console.log(imW);
		console.log(imH);


		context.drawImage(pics[current], imW/2 - i*imW/120, imH/2 - i*imH/120,
										 i*imW/60, i*imH/60,
										 W/2 - i*W/120, H/2 - i*H/120,
										 i*W/60, i*H/60);

		window.requestAnimationFrame(draw);
	} else {
		let canvas = document.getElementById("canvas");
		let context = canvas.getContext("2d");
		context.drawImage(pics[current], 0, 0, W, H);
		animating = false
		i = 0
	}
}