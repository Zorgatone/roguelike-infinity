const {body} = document;
const canvas = getCanvas();

window.addEventListener("resize", event => {
  if(event.isTrusted) {
    adjustCanvas(canvas);
  }
}, true);

adjustCanvas(canvas);

let ctx = canvas.getContext("2d");

function paint() {
  if (ctx !== null) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  window.requestAnimationFrame(paint);
}

paint();

function adjustCanvas(canvas: HTMLCanvasElement) {
  const {devicePixelRatio} = window;

  Object.assign(canvas, {
    width: body.offsetWidth * devicePixelRatio,
    height: body.offsetHeight * devicePixelRatio
  });
}

function getCanvas(): HTMLCanvasElement {
  const tmp = document.getElementById("game");

  if (!(tmp instanceof HTMLCanvasElement)) {
    throw new Error("Cannot find game canvas");
  }

  return tmp;
}
