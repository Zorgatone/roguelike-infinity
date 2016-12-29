import * as punycode from "punycode";

export default class Char implements Iterable<string> {
  [key: string]: any;
  [key: number]: string;

  private _char: string;
  private _proxy: any;

  constructor(str: string) {
    const that = this;

    if (typeof str !== "string" || str === "") {
      throw new Error("Cannot create character!");
    }

    const decoded: number[] = punycode.ucs2.decode(str);

    if (decoded.length > 1) {
      console.warn(
        "Creating a 'Char' using only the first character of string"
      );
    }

    this._char = String.fromCodePoint(decoded[0]);

    return <Char>new Proxy(this, {
      get(target, prop, receiver) {
        if (prop === "0") {
          return that._char;
        } else {
          return (<any>that)[prop];
        }
      }
    });
  }

  [Symbol.iterator]() {
    return [this._char][Symbol.iterator]();
  }

  static isASCII(str: string) {
    const code = str.charCodeAt(0);

    return 0 <= code && code <= 127;
  }

  static isPrintableASCII(str: string) {
    const code = str.charCodeAt(0);

    return 32 <= code && code <= 126;
  }

  get char() {
    return this._char;
  }

  get charCode() {
    return this._char.charCodeAt(0);
  }

  get codePoint() {
    return this._char.codePointAt(0);
  }

  get isASCII() {
    return Char.isASCII(this._char);
  }

  get isPrintableASCII() {
    return Char.isPrintableASCII(this._char);
  }

  get length() {
    return 1;
  }

  toString() {
    return this._char;
  }

  valueOf() {
    return this._char;
  }
}
