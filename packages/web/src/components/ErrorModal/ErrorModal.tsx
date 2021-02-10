import React from 'react';
import { useTranslation } from 'react-i18next';
//TODO link not working
import { AppSettings } from '@tabtabgo/core';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { TTGError } from '@tabtabgo/core/src/types/TTGError';
import { grey } from '@material-ui/core/colors';

export type ErrorModalProps = {
  isError: boolean;
  onClose: (e?: any) => void;
  error?: TTGError;
};

const useStyles = makeStyles((theme: any) => ({
  title: {
    backgroundColor: theme.palette.error.main,
    color: 'white',
  },
  errorMessage: {
    fontWeight: 'bold',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  errorContainer: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    borderRadius: 4,
    backgroundColor: grey[100],
  },
  errorText: {
    marginBottom: 0,
  },
  actions: {
    backgroundColor: grey[50],
  },
}));

export const ErrorModal = ({ isError, onClose, error }: ErrorModalProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { t } = useTranslation(AppSettings.translationNamespaces);
  console.log('error :', error);
  if (error) {
    return (
      <Dialog
        fullScreen={fullScreen}
        open={isError}
        onClose={onClose}
        aria-labelledby={t('common:An error has occurred')}
      >
        <DialogTitle className={classes.title} id="error-dialog-title">
          {error.title ? error.title : t('common:An error has occurred')}
        </DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.errorMessage}>{error.message}</DialogContentText>
          {error.errors
            ? Object.keys(error.errors).map((eKey, index) => (
                <div className={classes.errorContainer} key={index}>
                  <DialogContentText className={classes.errorText}>
                    <strong>{eKey}:</strong>{' '}
                    {typeof error.errors[eKey] === 'object'
                      ? JSON.stringify(error.errors[eKey])
                      : error.errors[eKey]}
                  </DialogContentText>
                </div>
              ))
            : null}
        </DialogContent>
        <DialogActions className={classes.actions}>
          <Button onClick={onClose} autoFocus>
            {t('common:Dismiss')}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  return null;
};
