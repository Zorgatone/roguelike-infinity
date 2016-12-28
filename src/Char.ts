import * as punycode from "punycode";

export default class Char {
  private _char: string;

  constructor(str: string) {
    if (typeof str !== "string" || str === "") {
      throw new Error("Cannot create character!");
    }

    this._char = String.fromCodePoint(punycode.ucs2.decode(str)[0]);
  }

  isASCII() {
    return Char.isASCII(this._char);
  }

  isPrintableASCII() {
    return Char.isPrintableASCII(this._char);
  }

  static isASCII(str: string) {
    const code = str.charCodeAt(0);

    return 0 <= code && code <= 127;
  }

  static isPrintableASCII(str: string) {
    const code = str.charCodeAt(0);

    return 32 <= code && code <= 126;
  }
}
