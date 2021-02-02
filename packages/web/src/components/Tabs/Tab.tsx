import React from 'react';
import { Tab, TabProps, withStyles } from '@material-ui/core';

const StyledTab = withStyles((theme) => ({
  root: {
    minWidth: 0,
    color: theme.palette.text.hint,
    fontWeight: theme.typography.fontWeightBold,
    textTransform: 'uppercase',
    fontSize: theme.typography.pxToRem(14),
    marginRight: theme.spacing(1.5),
    marginLeft: 0,
    paddingLeft: 0,
    opacity: 1,
    '&$selected': {
      opacity: 1,
      color: theme.palette.primary.main,
    },
    '& .MuiTab-wrapper': {
      alignItems: 'flex-start !important',
    },
  },
  selected: {},
}))((props: TabProps) => <Tab disableRipple {...props} />);

export default StyledTab;
