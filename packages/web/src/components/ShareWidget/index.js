import React, { Component } from 'react';
import { FacebookShareButton, TwitterShareButton, EmailShareButton } from 'react-share';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faShareSquare } from '@fortawesome/fontawesome-free-solid';
import { faFacebookF, faTwitter } from '@fortawesome/fontawesome-free-brands';

import './ShareWidget.scss';

class ShareWidget extends Component {
  getCurrentUrl() {
    return window.location.href;
  }

  render() {
    return (
      <div
        className={this.props.className ? 'share-widget ' + this.props.className : 'share-widget'}
      >
        <FacebookShareButton url={this.getCurrentUrl()}>
          <FontAwesomeIcon icon={faFacebookF} />
        </FacebookShareButton>
        <TwitterShareButton url={this.getCurrentUrl()}>
          <FontAwesomeIcon icon={faTwitter} />
        </TwitterShareButton>
        <EmailShareButton url={this.getCurrentUrl()}>
          <FontAwesomeIcon icon={faShareSquare} />
        </EmailShareButton>
      </div>
    );
  }
}

export default ShareWidget;
