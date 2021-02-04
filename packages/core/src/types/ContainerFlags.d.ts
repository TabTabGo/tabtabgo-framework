export interface ContainerFlags {
    add: boolean;
    edit: boolean;
    detail: boolean;
    loading: boolean;
    saving: boolean;
    exportingCsv: boolean;
    exportingExcel: boolean;
    exportingPdf: boolean;
    printing: boolean;
    forceRefresh: boolean;
    inProgress: number;
    pulling: number;
    pushing: number;
    [key: string]: boolean | number;
}
