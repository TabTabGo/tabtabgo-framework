import { Property } from '../Property';
import { StringFunc } from '../Common';
import { FunctionComponent } from 'react';

export interface Column<T> extends Property {
  isSortable?: boolean;
  isNumeric?: boolean;
  padding?: 'default' | 'checkbox' | 'none';
  hide?: boolean;
  dataAlign?: DataAlign;
  cellProperties?: any;
  tooltip?: string | StringFunc<T>;

  extends?: Array<string>;
  [key: string]: any;

  dataFormat?: (cellValue: any, row: T, rowKey: any) => string | JSX.Element;
  customCell?: (cell: any, row: T) => FunctionComponent<any>;
  headerFormat?: (cell: any, row: T) => string;
  customHeader?: (cell: any, row: T) => FunctionComponent<any>;
}

export enum DataAlign {
  Left = 'left',
  Center = 'center',
  Right = 'right',
  Justify = 'justify',
  Inherit = 'inherit',
}
