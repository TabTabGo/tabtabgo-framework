import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withRouter } from 'react-router-dom';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

// @material-ui/icons
import Refresh from '@material-ui/icons/Refresh';

// core components
import ContentWrapper from 'layouts/components/Content/ContentWrapper';
import { ToolbarButtons } from '@tabtabgo/web/components/Buttons';
import RecentlyViewed from './components/RecentlyViewed';

const dashboardStyle = (theme) => ({});

class Dashboard extends React.Component {
  componentDidMount() {
    this.refresh();
  }

  refresh() {}

  getActions = (classes) => {
    const buttons = {
      refresh: {
        onClick: this.refresh.bind(this),
        //label: props => `Add ${props.nameSingularText}`,
        icon: <Refresh />,
        className: '',
        disabled: false,
      },
    };
    return <ToolbarButtons buttons={buttons} />;
  };

  render() {
    const { classes } = this.props;

    return (
      <ContentWrapper
        title="Dashboard"
        actionComponent={this.getActions(classes)}
        showHeader={false}
      >
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <RecentlyViewed />
          </Grid>
        </Grid>
      </ContentWrapper>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const matchActionToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

const mapStateToProps = (state) => {
  return {};
};

export default withStyles(dashboardStyle)(
  withRouter(connect(mapStateToProps, matchActionToProps)(Dashboard)),
);
