import { IEntity, BasicComponent } from '..';
import { ToolbarButtons } from './Buttons';
import { StandardProps } from '@material-ui/core';
import { Actions } from './Actions';
import { Column } from './Column';

export interface ToolbarProps<T>
  extends IEntity<T>,
    StandardProps<BasicComponent, ToolbarClassKey> {
  title: string;
  subTitle?: string;
  buttons: ToolbarButtons;
  columns: Array<Column<T>>;
  actions: Actions;
  [key: string]: any;
}

export type ToolbarClassKey = 'root' | 'spacer' | 'title' | 'gutters';
