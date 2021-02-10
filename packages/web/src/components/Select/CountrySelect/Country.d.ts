export declare interface Country {
    name: string;
    regions: Array<string>;
    iso2: string;
    dialCode: string;
    format?: string;
    order?: number; //(if >1 country with same dial code),
    areaCodes?: Array<string>; // (if >1 country with same dial code)
  }
  