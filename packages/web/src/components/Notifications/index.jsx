import React from 'react';
import { Button } from '@material-ui/core';
import swal from '@sweetalert/with-react';

import './styles/material-swal.scss';

export const showSnackbar = (enqueueSnackbar, success, message) => {
  if (success === true) {
    enqueueSnackbar(message, {
      variant: 'success',
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left',
      },
      action: (
        <Button size="small" style={{ color: 'white' }}>
          {'Dismiss'}
        </Button>
      ),
      autoHideDuration: 2000,
    });
  } else {
    enqueueSnackbar(message, {
      variant: 'error',
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left',
      },
    });
  }
};

export const showAlert = (type, message, title) => {
  swal({
    icon: type,
    content: (
      <div>
        <h1>{title ? title : ''}</h1>
        <p>{message}</p>
      </div>
    ),
  });
};

export const showSuccessAlert = (message, title) => {
  showAlert('success', message, title);
};

export const showErrorAlert = (message, title) => {
  showAlert('error', message, title);
};

export const showWarningAlert = (message, title) => {
  showAlert('warning', message, title);
};

export const showInfoAlert = (message, title) => {
  showAlert('info', message, title);
};
