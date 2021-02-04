import { PagingList } from './types';
export declare const getImageUrl: (mediaFileId: number, imageSize?: string) => string;
export declare const isEqual: (value: any, other: any) => boolean;
export declare const camelCase: (str: string) => string;
export declare const parseDataUrl: (url: string) => {
    mediaType: string;
    base64: boolean;
    data: string;
} | {
    data: string;
    mediaType?: undefined;
    base64?: undefined;
};
export declare const hexToRgb: (hex: string) => {
    r: number;
    g: number;
    b: number;
};
export declare const getInputValue: (e: any) => any;
export declare const arrayUnique: (array: Array<any>, equalCompare?: ((a: any, b: any) => boolean) | undefined) => any[];
export declare const getPropertyValue: (entity: any, propertyPath: string) => any;
declare type GetDisplayField = (entity: any) => string;
export declare const getDisplayValue: (entity: any, displayField: string | GetDisplayField) => any;
export declare const getPersonName: (entity: any) => string;
export declare const getPersonInitials: (entity: any) => any;
/**
 * Deep diff between two object, using lodash
 * @param  {Object} object Object compared
 * @param  {Object} base   Object to compare with
 * @return {Object}        Return a new object who represent the diff
 */
export declare function difference(object: any, base: any): any;
export declare function getToken(hash: string): string | null;
export declare function getSearchParams(query: string): any;
export declare function isEmpty(value?: any): boolean;
export declare function populatePageList<TEntity, TOutput>(result: PagingList<TEntity>, map: (item: TEntity, index?: number, array?: Array<TEntity>) => Array<TOutput>): TOutput[];
export declare const getFriendlyString: (word: string) => string;
export declare const getUniqueId: (index: number) => string;
export declare const getJsonPatchDocument: (originalValue: any, newValue: any, path: string) => {
    op: string;
    path: string;
    value: any;
} | null;
export {};
