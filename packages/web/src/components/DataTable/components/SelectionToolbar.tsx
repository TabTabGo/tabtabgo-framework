import React from 'react';
import classNames from 'classnames';

import { Toolbar, Typography, makeStyles, createStyles, Theme } from '@material-ui/core';

import { lighten } from '@material-ui/core/styles/colorManipulator';
import { ToolbarButtons } from '../../Buttons';
import { SelectionToolbarProps } from 'ttg-react/core/types/DataTable';

const DataTableSelectionToolbar = (props: SelectionToolbarProps<any>) => {
  const classes = useToolbarStyles(props);
  const { selectedItems, ...rest } = props;
  var numSelected = selectedItems ? selectedItems.length : 0;
  return (
    <Toolbar className={classNames(classes.root, classes.highlight)}>
      <div className={classes.title}>
        <Typography color="inherit" variant="subtitle1">
          {numSelected} selected
        </Typography>
      </div>
      <div className={classes.spacer} />
      <ToolbarButtons selected={selectedItems} {...rest} />
    </Toolbar>
  );
};

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    spacer: {
      flex: '1 1 100%',
    },
    buttons: {
      color: theme.palette.text.secondary,
      flex: '0 0 45%',
      textAlign: 'right',
    },
    title: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      flex: '0 0 auto',
    },
  }),
);

export default DataTableSelectionToolbar;
