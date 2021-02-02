import { FunctionComponent } from 'react';
import { BooleanFunc, StringFunc } from './Common';

export interface Button<T> {
  label?: string;
  disabled?: boolean | BooleanFunc<T>;
  hide?: boolean | BooleanFunc<T>;
  toolTip?: string | StringFunc<T>;
  color?: string;
  icon?: any;
  [key: string]: any;

  onClick?(props: any, e: MouseEvent): void;
  onTouch?(props: any, e: TouchEvent): void;
  component?(props: T, index: number): FunctionComponent<T>;
}
