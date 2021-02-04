import { RowButtons } from './Buttons';
import { Padding } from '@material-ui/core';
import { OrderDirection } from '../enums';
import { Property, Column } from '..';
export interface HeaderProps<T> {
    numSelected: number;
    rowButtons: RowButtons;
    enableSelection?: boolean;
    rowCount: number;
    padding?: Padding;
    order?: OrderDirection;
    orderBy?: string;
    columns: Array<Column<T>>;
    onSelectAll(isChecked: boolean): void;
    onSort?(orderBy: Property, order: OrderDirection): void;
}
