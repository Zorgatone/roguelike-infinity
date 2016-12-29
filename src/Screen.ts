export default class Screen {
  private static _instance: Screen | undefined;

  private _document: Document;
  private _window: Window;
  private _devicePixelRatio: number;
  private _body: HTMLBodyElement;
  private _parent: HTMLElement;
  private _canvas: HTMLCanvasElement;
  private _ctx: CanvasRenderingContext2D;

  private constructor(
    element: HTMLElement | undefined | null
  ) {
    if (!(element instanceof HTMLElement)) {
      throw new Error("Invalid element");
    }

    this._document = element.ownerDocument;
    this._window = this._document.defaultView || (<any>this._document).parentWindow
    this._devicePixelRatio = this._window.devicePixelRatio;
    this._body = <HTMLBodyElement> this._document.body;

    if (element instanceof HTMLCanvasElement) {
      this._parent = <HTMLElement> element.parentNode;
      this._canvas = element;
    } else {
      if (this._body.contains(element)) {
        this._parent = element;
      } else {
        this._parent = this._body;
      }

      this._canvas = <HTMLCanvasElement> document.createElement("canvas");
      this._canvas.style.width = "100%";
      this._canvas.style.height = "100%";
      this._canvas.innerHTML = "Your browser does not support HTML5 Canvas";

      this._parent.innerHTML = "";
      this._parent.appendChild(this._canvas);
    }

    const ctx: CanvasRenderingContext2D | null = this._canvas.getContext("2d");

    if (ctx === null) {
      throw new Error("Cannot get 2D canvas context");
    }

    this._ctx = ctx;

    this._init();
  }

  private _init() {
    this._register();
  }

  private _register() {
    this._window.addEventListener("resize", event => this._onResize());
    this._window.requestAnimationFrame(now => this._onPaint(now));
  }

  private _onResize() {
    Object.assign(this._canvas, {
      width: this._parent.offsetWidth * this._devicePixelRatio,
      height: this._parent.offsetHeight * this._devicePixelRatio
    });
  }

  private _onPaint(now: number) {
    this._window.requestAnimationFrame(now => this._onPaint(now));
  }

  public static getInstance(
    canvas: HTMLElement | undefined | null
  ): Screen {
    if (undefined !== this._instance) {
      return this._instance;
    }

    return this._instance = new Screen(canvas);
  }
}
