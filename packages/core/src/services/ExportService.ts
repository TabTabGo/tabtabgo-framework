import moment from 'moment';
import { datetimeFormat } from '../DateFormats';
import { IExportService } from '../services/contracts';
import { ExportConfiguration, ExportColumnConfiguration } from '../types/ExportConfiguration';

//TODO user lazy loading
//import pdfMake from "pdfmake/build/pdfmake";
//import pdfFonts from "pdfmake/build/vfs_fonts";
// The size of PDF library is huge need to have to loaded in separate chunk
//pdfMake.vfs = pdfFonts.pdfMake.vfs;
const getTitle = (value: string) => {
  const regex = /([A-Z]{1})/g;
  let str = value.replace(regex, (match, p1) => {
    return ' ' + p1;
  });
  str = str.substr(0, 1).toUpperCase() + str.substr(1, str.length);
  return str;
};

export const ColumnConfiguration = ({
  field,
  title,
  width,
  format,
  ...config
}: ExportColumnConfiguration) => {
  return {
    title: title ? title : getTitle(field),
    field,
    width: width || 'auto',
    export: config.export || ['all'],
    format: format
      ? format
      : (v: any) => {
          const dateRegex = /^\d{4}-\d{2}-\d{2}.*/g;
          if (dateRegex.test(v)) {
            return datetimeFormat(v);
          }
          return v;
        },
  };
};

export default class ExportService implements IExportService<any> {
  config: ExportConfiguration;
  constructor(config: ExportConfiguration) {
    this.config = config;
    if (!this.config.fileName)
      this.config.fileName = config.namePlural + '_' + moment().format('YYYYMMDDhhmmss');
  }

  //#region private functions
  private getValue = (entity: any, columnConfig: any) => {
    if (entity) {
      let properties = columnConfig.field.split('.');
      let value = {};
      for (let pIndex in properties) {
        value = entity[properties[pIndex]];
      }
      return columnConfig.format(value);
    }
    return '';
  };

  private getConfig = (entity: any) => {
    if (this.config.columns) {
      return this.config;
    }

    let headers = [];
    for (let prop in entity) {
      if (typeof entity[prop] !== 'object' && typeof entity[prop] !== 'function') {
        headers.push(prop);
      }
    }

    this.config.columns =
      this.config.columns ||
      headers.map((h) => {
        return ColumnConfiguration({ field: h.toString() });
      });
    return this.config;
  };
  //#endregion

  _new = (config: any): IExportService<any> => {
    return new ExportService(config);
  };

  generateCsvFile = (entities: Array<any>) => {
    if (!entities || entities.length === 0) return '';

    let config = this.getConfig(entities[0]);
    let lines = [];

    var columns = config.columns.filter(
      (c) => c.export && (c.export.includes('csv') || c.export.includes('all')),
    );
    //Add column
    lines.push(columns.map((c) => c.title).join(','));
    //Add Values
    for (let entityIndex in entities) {
      lines.push(columns.map((c) => this.getValue(entities[entityIndex], c)).join(','));
    }
    return lines.join('\n');
  };

  downloadFile = (content: any, fileName: string, waitTime?: number): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(
        () => {
          var link = document.createElement('a');
          link.name = fileName;
          link.setAttribute('href', content);
          link.setAttribute('download', fileName);
          document.body.appendChild(link); // Required for FF
          link.target = '_blank';
          link.click(); // This will download the data file named "my_data.csv".
          //return resolve(link);
        },
        waitTime ? waitTime : 1,
      );
    });
  };

  openFile = (content: any, fileName: string, waitTime?: number): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(
        () => {
          var link = document.createElement('a');
          link.name = fileName;
          link.setAttribute('href', content);
          link.setAttribute('download', fileName);
          document.body.appendChild(link); // Required for FF
          link.click(); // This will download the data file named "my_data.csv".
          link.target = '_tab';
        },
        waitTime ? waitTime : 1,
      );
    });
  };

  exportCsv = (entities: Array<any>): Promise<void> => {
    let config = this.getConfig(entities[0]);
    const content = this.generateCsvFile(entities);
    let csvContent = 'data:text/csv;charset=utf-8,' + encodeURIComponent(content);
    //var encodedUri = encodeURI(csvContent);

    return this.downloadFile(csvContent, config.fileName + '.csv');
  };

  exportPDF = (entities: Array<any>): Promise<void> => {
    let config = this.getConfig(entities[0]);
    let content = [];
    if (config.pageTitle) {
      content.push({ text: config.pageTitle, style: 'header' });
    }

    var columns = config.columns.filter(
      (c) => c.export && (c.export.includes('pdf') || c.export.includes('all')),
    );
    if (columns) {
      let body = [],
        row = [];
      body.push(
        columns.map((c) => {
          return { text: c.title, style: 'tableHeader' };
        }),
      );

      for (let index = 0; index < entities.length; index++) {
        row = columns.map((c) => this.getValue(entities[index], c));
        body.push(row);
      }

      content.push({
        style: 'tableStandard',
        table: {
          widths: columns.map((c) => c.width),
          headerRows: 1,
          body: body,
        },
        layout: 'lightHorizontalLines',
      });
    }
    //TODO use pdfMake if required
    return new Promise(() => {});
    // var docDefinition = {
    //   content: content,
    //   styles: {
    //     header: {
    //       fontSize: 18,
    //       bold: true,
    //       margin: [0, 0, 0, 10]
    //     },
    //     subheader: {
    //       fontSize: 16,
    //       bold: true,
    //       margin: [0, 10, 0, 5]
    //     },
    //     tableStandard: {
    //       margin: [0, 5, 0, 15]
    //     },
    //     tableHeader: {
    //       bold: true,
    //       fontSize: 13,
    //       color: "black"
    //     }
    //   },
    //   pageOrientation: "landscape",
    //   defaultStyle: {}
    // };

    // pdfMake.createPdf(docDefinition).download(config.fileName+".pdf");
  };

  print = (entities: Array<any>): Promise<void> => {
    let config = this.getConfig(entities[0]);

    let strHeader = this.config.columns
      .map((c) => {
        return `<th>${c.title}</th>`;
      })
      .join('');

    let strBody = entities
      .map((row) => {
        return (
          '<tr>' + config.columns.map((c) => `<td>${this.getValue(row, c)}</td>`).join('') + '</tr>'
        );
      })
      .join('');
    let html = `
                    <html>
                    <head>
                        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
                        <style>
                        @page {
                            size:landscape;
                        }
                        </style>
                    </head>
                    <body>
                        <table className="table table-bordered">
                            <thead>
                                <tr>${strHeader}</tr>
                            </thead>
                            <tbody>
                                ${strBody}            
                            </tbody>
                        
                        </table>
                    </body>
                    </html>
                    `;
    var iFrameComponent = document.getElementById('ifmcontentstoprint');
    var pri = (iFrameComponent as any).contentWindow;
    pri.document.open();
    pri.document.write(html);
    pri.document.close();
    return new Promise((resolve) => {
      setTimeout(() => {
        pri.focus();
        pri.print();
      }, 1000);
    });
  };

  destroy() {}
}
