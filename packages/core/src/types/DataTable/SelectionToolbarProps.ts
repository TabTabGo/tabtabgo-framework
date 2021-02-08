import { IEntity } from '..';
import { SelectionButtons } from './Buttons';
import { Actions } from './Actions';
import { Column } from './Column';
export interface SelectionToolbarProps<T> extends IEntity<T> {
  selectionTitle?: string;
  selectedItems: Array<T>;
  buttons: SelectionButtons;
  columns: Array<Column<T>>;
  actions: Actions;
}
