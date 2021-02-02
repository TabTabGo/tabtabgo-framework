import React, { Component } from 'react';
import cx from 'classnames';
import LoadingTextShape from './LoadingTextShape';

import './styles/LoadingTextParagraph.scss';

class LoadingTextParagraph extends Component {
  render() {
    const classNames = cx('loading-text-paragraph', this.props.className);
    const rowCount = this.props.lines ? this.props.lines : 6;

    return (
      <div className={classNames}>
        {[...Array(rowCount)].map((row, index) => {
          return <LoadingTextShape key={index} />;
        })}
      </div>
    );
  }
}

export default LoadingTextParagraph;
