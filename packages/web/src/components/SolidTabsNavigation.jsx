import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const StyledTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />);

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
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme) => ({
  root: {},
  padding: {
    padding: theme.spacing(3),
  },
}));

const TabNavigation = ({ className = '', tabs, updateParent }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    updateParent(newValue);
  };

  return (
    <div className={classes.root + ' ' + className}>
      <div>
        <StyledTabs value={value} onChange={handleChange} aria-label="styled tabs">
          {tabs.map((tab, index) => (
            <StyledTab key={index} label={tab.label} />
          ))}
        </StyledTabs>
      </div>
    </div>
  );
};

TabNavigation.propTypes = {
  className: PropTypes.string,
  tabs: PropTypes.array,
  updateParent: PropTypes.func,
};

export default TabNavigation;
