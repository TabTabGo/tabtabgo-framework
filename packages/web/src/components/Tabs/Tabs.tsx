import React from 'react';
import { Tabs, TabsProps, withStyles } from '@material-ui/core';

const StyledTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
  },
})((props: TabsProps) => <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />);

export default StyledTabs;
