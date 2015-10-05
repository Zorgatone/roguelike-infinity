window.devicePixelRatio = window.devicePixelRatio || 1;

var canvas = document.getElementsByTagName("canvas")[0];

canvas.width = window.innerWidth * window.devicePixelRatio;
canvas.height = window.innerHeight * window.devicePixelRatio;
canvas.style.width = window.innerWidth + "px";
canvas.style.height = window.innerHeight + "px";

var img = new Image();
img.onload = function() {
	var ctx = canvas.getContext("2d");
	ctx.drawImage(this, (canvas.width - this.width) / 2, (canvas.height - this.height) / 2);
};
img.src = "/images/Title.png";