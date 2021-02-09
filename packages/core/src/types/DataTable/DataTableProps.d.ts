/// <reference types="react" />
import { Column } from './Column';
import { Buttons } from './Buttons';
import { IEntity } from '..';
import { FilterOptions } from './FilterProps';
import { TableOptions } from './TableProps';
import { DataTableComponents } from './DataTableComponents';
import { RowOptions } from './RowProps';
import { Actions } from './Actions';
import { PagingProps } from './PagingProps';
export declare type DisplayField = (item: any) => string;
export interface DataTableProperties<T> extends IEntity<T> {
    components?: DataTableComponents<T>;
    title: string;
    styles?: React.CSSProperties;
    items?: Array<T>;
    isLoading?: boolean;
    pagingOptions: PagingProps;
    columns: Array<Column<any>>;
    filterOptions?: FilterOptions;
    enableSelection?: boolean;
    rowOptions?: RowOptions<T>;
    buttons?: Buttons;
    tableOptions?: TableOptions;
    actions?: Actions;
    [key: string]: any;
}
