import React from 'react';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { mergeButtons } from '../../Buttons/utilities';
import { getDisplayValue } from '@tabtabgo/core/Utilities';
import EditIcon from '@material-ui/icons/Edit';

export const rowButtons = {
  edit: {
    //label: "Edit",
    tooltip: ({ data, displayField, nameSingularText }) =>
      `Edit ${
        data && displayField
          ? getDisplayValue(data, displayField)
          : nameSingularText
          ? nameSingularText
          : ''
      } `,
    icon: <EditIcon />,
    onClick: (data, props) => {
      if (props.actions.onEdit) {
        props.actions.onEdit(data);
      }
    },
  },
  view: {
    //label: "View",
    tooltip: ({ data, displayField, nameSingularText }) =>
      `View ${
        data && displayField
          ? getDisplayValue(data, displayField)
          : nameSingularText
          ? nameSingularText
          : ''
      } details`,
    icon: <VisibilityIcon />,
    onClick: (data, props) => {
      if (props.history) {
        const { keyField } = props;
        props.history.push(`/${data[keyField]}`);
      }
    },
  },
};

export const getRowButtons = (buttons) => {
  let finialButtons = {};
  if (buttons) {
    finialButtons = mergeButtons(buttons, rowButtons);

    if (buttons.extraButtons) {
      for (const actionKey in buttons.extraButtons) {
        if (buttons.extraButtons[actionKey]) {
          finialButtons[actionKey] = buttons.extraButtons[actionKey];
        }
      }
    }
  }
  return finialButtons;
};
