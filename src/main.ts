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

if (null === ctx) {
  throw new Error("Cannot get 2D canvas context");
}

paint();

function paint() {
  if (ctx === null) {
    return;
  }

  const tileSize = 32 * devicePixelRatio;
  const box = getBoxSize(canvas, tileSize);

  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#FFFFFF";
  ctx.lineWidth = 1;

  // ctx.beginPath();
  // ctx.moveTo(box.x + 0.5, box.y + 0.5);
  // ctx.lineTo(box.x + box.width + 0.5, box.y + 0.5);
  // ctx.lineTo(box.x + box.width + 0.5, box.y + box.height + 0.5);
  // ctx.lineTo(box.x + 0.5, box.y + box.height + 0.5);
  // ctx.lineTo(box.x + 0.5, box.y + 0.5);
  // ctx.closePath();
  // ctx.stroke();

  ctx.strokeRect(box.x + 0.5, box.y + 0.5, box.width, box.height);

  window.requestAnimationFrame(paint);
}

function getBoxSize(canvas: HTMLCanvasElement, tileSize: number): {
  x: number;
  y: number;
  width: number;
  height: number;
} {
  const factor = 6 * devicePixelRatio;

  const box = {
    width: Math.ceil(canvas.width - factor),
    height: Math.ceil(canvas.height - factor)
  };

  const offset = {
    width: Math.ceil(box.width % tileSize),
    height: Math.ceil(box.height % tileSize)
  };

  return {
    x: Math.ceil(factor / 2) + Math.ceil(offset.width / 2),
    y: Math.ceil(factor / 2) + Math.ceil(offset.height / 2),
    width: Math.ceil(box.width - offset.width),
    height: Math.ceil(box.height - offset.height)
  }
}

function adjustCanvas(canvas: HTMLCanvasElement) {
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
