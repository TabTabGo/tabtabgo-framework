import { IExportService } from '../services/contracts';
import { ExportConfiguration, ExportColumnConfiguration } from '../types/ExportConfiguration';
export declare const ColumnConfiguration: ({ field, title, width, format, ...config }: ExportColumnConfiguration) => {
    title: string;
    field: string;
    width: string | number;
    export: string[];
    format: (v: any) => any;
};
export default class ExportService implements IExportService<any> {
    config: ExportConfiguration;
    constructor(config: ExportConfiguration);
    private getValue;
    private getConfig;
    _new: (config: any) => IExportService<any>;
    generateCsvFile: (entities: Array<any>) => string;
    downloadFile: (content: any, fileName: string, waitTime?: number | undefined) => Promise<void>;
    openFile: (content: any, fileName: string, waitTime?: number | undefined) => Promise<void>;
    exportCsv: (entities: Array<any>) => Promise<void>;
    exportPDF: (entities: Array<any>) => Promise<void>;
    print: (entities: Array<any>) => Promise<void>;
    destroy(): void;
}
