import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class UserView extends Component {
  static propTypes = {
    user: PropTypes.any.isRequired,
    flags: PropTypes.any,
    location: PropTypes.string,
  };
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    //call action to get article data
  }
  render() {
    const { user, flags } = this.props;
    const { loading } = this.props;
    return <div />;
  }
}
export default UserView;
