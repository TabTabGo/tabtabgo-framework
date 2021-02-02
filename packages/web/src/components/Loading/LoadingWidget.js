import React, { Component } from 'react';

import LoadingTextShape from './LoadingTextShape';
import LoadingTextParagraph from './LoadingTextParagraph';

import { Media } from 'react-bootstrap';
import cx from 'classnames';
import './styles/LoadingWidget.scss';

class LoadingWidget extends Component {
  render() {
    const mediaBodyClassNames = cx('media-body');
    return (
      <div
        className={
          this.props.className
            ? 'text-left content-widget ' + this.props.className
            : 'text-left content-widget'
        }
      >
        <div className="content-widget-body">
          <Media>
            <Media.Body className={mediaBodyClassNames}>
              <h2>
                <LoadingTextShape />
              </h2>
              <h3>
                <LoadingTextShape />
              </h3>
              <div>
                <LoadingTextParagraph lines={3} />
              </div>
            </Media.Body>
          </Media>
        </div>
      </div>
    );
  }
}

export default LoadingWidget;
