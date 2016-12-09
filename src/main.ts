const {body} = document;
const canvas = getCanvas();

window.addEventListener("resize", event => {
  if(!event.isTrusted) {
    return;
  }

  adjustCanvas(canvas);
}, true);

adjustCanvas(canvas);

let ctx = canvas.getContext("2d");

function paint() {
  if (ctx === null) {
    return;
  }

  const tileSize = 32;
  const box = getBoxSize(canvas, tileSize);

  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#FFFFFF";
  ctx.lineWidth = 1;
  ctx.strokeRect(box.x, box.y, box.width, box.height);

  window.requestAnimationFrame(paint);
}

function getBoxSize(canvas: HTMLCanvasElement, tileSize: number): {
  x: number;
  y: number;
  width: number;
  height: number;
} {
  const offset = {
    width: canvas.width % tileSize,
    height: canvas.height % tileSize
  };

  return {
    x: Math.ceil(offset.width / 2),
    y: Math.ceil(offset.height / 2),
    width: canvas.width - offset.width,
    height: canvas.height - offset.height
  }
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
