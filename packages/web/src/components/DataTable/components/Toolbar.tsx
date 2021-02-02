import React from 'react';
import { Toolbar, Typography, makeStyles, Theme, createStyles } from '@material-ui/core';
import { ToolbarButtons } from '../../Buttons';
import { ToolbarProps } from '@tabtabgo/core/types/DataTable';
import classNames from 'classnames';

const usToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingRight: theme.spacing(1),
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
      flex: '0 0 auto',
    },
    gutters: {
      paddingLeft: 0,
    },
  }),
);

const DataTableToolbar = (props: ToolbarProps<any>) => {
  const defaultClasses = usToolbarStyles(props);
  const { title, classes, ...rest } = props;
  return (
    <Toolbar
      className={classNames(defaultClasses.root, classes && classes.root ? classes.root : {})}
      classes={{ gutters: classes && classes.gutters ? classes.gutters : defaultClasses.gutters }}
    >
      <div
        className={classNames(defaultClasses.title, classes && classes.title ? classes.title : {})}
      >
        <Typography variant="h6" id="tableTitle">
          {title}
        </Typography>
      </div>
      <div
        className={classNames(
          defaultClasses.spacer,
          classes && classes.spacer ? classes.spacer : {},
        )}
      />
      <ToolbarButtons {...rest} />
    </Toolbar>
  );
};

export default DataTableToolbar;
