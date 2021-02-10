import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class UserForm extends Component {
  static propTypes = {
    mode: PropTypes.oneOf(['add', 'edit']),
    user: PropTypes.any.isRequired,
    flags: PropTypes.any,
    onChangeProperty: PropTypes.func,
  };
  render() {
    return <div />;
  }
}
export default UserForm;
