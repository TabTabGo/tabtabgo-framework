import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { Tabs, Paper, Tab } from '@material-ui/core';

import SwipeableViews from 'react-swipeable-views';

import tabsStyle from './tabsStyle';

export class SwipeableTabsContainer extends React.Component {
  state = {
    activeTab: 0,
  };

  static propTypes = {
    tabs: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        key: PropTypes.string,
        component: PropTypes.node,
      }),
    ).isRequired,
    swipeable: PropTypes.bool,
    theme: PropTypes.object,
    classes: PropTypes.object,
  };

  static defaultProps = {
    swipeable: false,
  };

  handleTabChange = (event, activeTab) => {
    this.setState({ activeTab });
  };

  handleTabIndexChange = (index) => {
    this.setState({ activeTab: index });
  };

  render() {
    const { tabs, classes, theme, swipeable } = this.props;
    const { activeTab } = this.state;

    return (
      <Paper className={classes.root} elevation={0}>
        <Tabs
          value={this.state.activeTab}
          onChange={this.handleTabChange}
          indicatorColor="primary"
          textColor="primary"
        >
          {tabs.map((tab) => (
            <Tab key={tab.key} label={tab.label} classes={{ selected: classes.selectedTab }} />
          ))}
        </Tabs>

        <div style={{ backgroundColor: 'white', padding: theme.spacing(2) }}>
          {swipeable ? (
            <SwipeableViews
              className={classes.container}
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={this.state.activeTab}
              onChangeIndex={this.handleTabIndexChange}
            >
              {tabs.map((tab) => (
                <div key={tab.key} dir={theme.direction}>
                  {tab.component}
                </div>
              ))}
            </SwipeableViews>
          ) : (
            <div className={classes.container}>{tabs[activeTab].component}</div>
          )}
        </div>
      </Paper>
    );
  }
}

export default withStyles(tabsStyle, { withTheme: true })(TabsContainer);
