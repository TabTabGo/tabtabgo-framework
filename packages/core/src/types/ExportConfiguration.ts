export interface ExportConfiguration {
  columns: Array<ExportColumnConfiguration>;
  fileName?: string;
  pageTitle?: string;
  namePlural?: string;
  [key: string]: any;
}

export interface ExportColumnConfiguration {
  field: string;
  title?: string;
  width?: number | string;
  format?: (entity: any) => string;
  export?: Array<string>;
}
