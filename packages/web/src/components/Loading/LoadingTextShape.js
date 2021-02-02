import React, { Component } from 'react';
import cx from 'classnames';
import './styles/LoadingTextShape.scss';

class LoadingTextShape extends Component {
  render() {
    const classNames = cx('loading-text-shape', this.props.className);
    return <div className={classNames}>ب</div>;
  }
}

export default LoadingTextShape;
