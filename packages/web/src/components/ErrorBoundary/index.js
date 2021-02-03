import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { enqueueSnackbar } from '../Notifications/actions';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidCatch(error, info) {
    console.error('Unhandled Error :', error, info);
    this.props.notify({
      message: 'Unhandled Error occurred.',
      option: {
        variant: 'error',
        error,
        info,
      },
    });
    this.props.history.goBack();
  }

  render() {
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.any.isRequired,
  history: PropTypes.any,
  notify: PropTypes.func,
};

const mapStateToprops = () => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    notify: (notification) => dispatch(enqueueSnackbar(notification)),
  };
};

export default connect(mapStateToprops, mapDispatchToProps)(withRouter(ErrorBoundary));
