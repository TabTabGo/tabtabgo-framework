import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import withAuthentication from '../../core/withAuthentication';
class Logout extends Component {
  static propTypes = {
    identity: PropTypes.shape({
      logout: PropTypes.func,
    }),
    redirectPath: PropTypes.string,
  };
  state = {
    processing: false,
  };
  componentDidMount() {
    this.setState({ processing: true });

    this.props.identity
      .logout()
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log('logout error', error);
      })
      .finally(() => {
        this.setState({ processing: false });
      });
  }
  render() {
    const { redirectPath } = this.props;
    if (this.state.processing) {
      return <div>Logout..</div>;
    }

    return <Redirect to={redirectPath ? redirectPath : '/login'} />;
  }
}
export default withAuthentication(Logout);
