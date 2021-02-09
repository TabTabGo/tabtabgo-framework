export declare class TTGError extends Error {
    name: string;
    stack?: string;
    [key: string]: any;
    message: string;
    codeNumber?: number;
    title?: string;
    constructor(message: string, name?: string, extraProperties?: any);
}
