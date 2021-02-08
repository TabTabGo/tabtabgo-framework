import { Button } from '../Button';

export interface Buttons {
  headerButtons?: boolean | ToolbarButtons;
  selectionButtons: boolean | SelectionButtons;
  rowButtons: boolean | RowButtons;
  editButtons?: EditButtons;
  contentButtons?: boolean | ContentButtons;
}
export interface ToolbarButtons {
  download?: boolean | Button<any>;
  print?: boolean | Button<any>;
  pdf?: boolean | Button<any>;
  columnsView?: boolean | Button<any>;
  filter?: boolean | Button<any>;
  search?: boolean | Button<any>;
  add?: boolean | Button<any>;
  refresh?: boolean | Button<any>;
  [button: string]: any | Button<any>;
}

export interface SelectionButtons {
  download?: boolean | Button<any>;
  print?: boolean | Button<any>;
  pdf?: boolean | Button<any>;
  delete?: boolean | Button<any>;
  [button: string]: any | Button<any>;
}

export interface RowButtons {
  edit?: boolean | Button<any>;
  view?: boolean | Button<any>;
}

export interface EditButtons {
  save?: boolean | Button<any>;
  cancel?: boolean | Button<any>;
  saveAndClose: boolean | Button<any>;
}

export interface ContentButtons {
  add?: boolean | Button<any>;
}
