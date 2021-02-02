import React from 'react';
import { makeStyles } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  divider: {
    marginTop: theme.spacing(1),
  },
}));
type CustomDividerType = {
  className?: string;
};
const CustomDivider = ({ className = '' }: CustomDividerType) => {
  const classes = useStyles();
  return <Divider className={className + ' ' + classes.divider} />;
};

export default CustomDivider;
