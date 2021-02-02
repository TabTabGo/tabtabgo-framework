import React from 'react';
import './icon.scss';
import './errorIcon.scss';

class SuccessIcon extends React.Component {
  render() {
    return (
      <div className="swal-icon swal-icon--error">
        <div className="swal-icon--error__x-mark">
          <span className="swal-icon--error__line swal-icon--error__line--left" />
          <span className="swal-icon--error__line swal-icon--error__line--right" />
        </div>
      </div>
    );
  }
}

export default SuccessIcon;
