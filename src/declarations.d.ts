declare namespace punycode {
  export interface ucs2 {
    decode: (str: string) => number[];
    encode: (codePoints: number[]) => string;
  }

  export interface punycode {
    decode: (str: string) => string;
    encode: (str: string) => string;
    toUnicode: (str: string) => string;
    toASCII: (str: string) => string;
    ucs2: ucs2;
    version: string;
  }
}

declare module "punycode" {
  const punycode: punycode.punycode;

  export = punycode;
}

//declare interface Window {
//  punycode: punycode.punycode;
//}
