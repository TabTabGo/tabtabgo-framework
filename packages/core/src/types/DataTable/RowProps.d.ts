import { RowButtons } from './Buttons';
import { Column } from '..';
import { Padding } from '@material-ui/core';
export interface RowProps<T> extends RowOptions<T> {
    index: number;
    rowData: T;
    isSelected: boolean;
    enableSelection: boolean;
    rowButtons: RowButtons;
    padding?: Padding;
    columns: Array<Column<T>>;
}
export declare enum SelectionMode {
    Checkbox = "checkbox",
    Click = "click"
}
export interface RowOptions<T> {
    mode?: SelectionMode;
    selectOneRow?: boolean;
    checkIsSelected?: (key: any) => boolean;
    onRowClick?: (data: T, index: number, event: any) => void;
    onRowDoubleClick?: (data: T, index: number, event: any) => void;
    onRowTouch?: (data: T, index: number, event: any) => void;
    onSelect?: (checked: boolean, item: T, index: number, event: any) => void;
    onRowSelectionChange?: (selections: Array<T>) => void;
    [key: string]: any;
}
