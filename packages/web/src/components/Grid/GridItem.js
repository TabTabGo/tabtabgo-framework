import React from 'react';

// @material-ui/core components
import { withStyles, Grid } from '@material-ui/core';

const style = {
  grid: {
    padding: '0 15px !important',
  },
};

function GridItem({ ...props }) {
  const { classes, children, className, ...rest } = props;
  return (
    <Grid item {...rest} className={classes.grid + ' ' + className}>
      {children}
    </Grid>
  );
}

export default withStyles(style)(GridItem);
