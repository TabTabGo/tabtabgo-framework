export interface IExportService<T> {
    _new: (config?: any) => IExportService<T>;
    generateCsvFile: (entities: Array<T>) => string;
    downloadFile: (content: any, fileName: string, waitTime?: number) => Promise<void>;
    openFile: (content: any, fileName: string, waitTime?: number) => Promise<void>;
    exportCsv: (entities: Array<T>) => Promise<void>;
    exportPDF: (entities: Array<T>) => Promise<void>;
    print: (entities: Array<T>) => Promise<void>;
    destroy(): void;
}