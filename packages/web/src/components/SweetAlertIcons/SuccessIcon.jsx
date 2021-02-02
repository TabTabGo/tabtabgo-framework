import React from 'react';
import './icon.scss';
import './successIcon.scss';

class SuccessIcon extends React.Component {
  render() {
    return (
      <div className="swal-icon swal-icon--success">
        <div className="swal-icon--success__line swal-icon--success__line--long" />
        <div className="swal-icon--success__line swal-icon--success__line--tip" />

        <div className="swal-icon--success__ring" />
        <div className="swal-icon--success__hide-corners" />
      </div>
    );
  }
}

export default SuccessIcon;
