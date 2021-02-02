import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class InstanceForm extends Component {
  static propTypes = {
    mode: PropTypes.oneOf(['add', 'edit']),
    instance: PropTypes.any.isRequired,
    flags: PropTypes.any,
    onChangeProperty: PropTypes.func,
  };
  render() {
    return <div />;
  }
}
export default InstanceForm;
