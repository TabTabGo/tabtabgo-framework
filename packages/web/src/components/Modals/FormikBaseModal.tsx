import React from 'react';

import { Button, CircularProgress } from '@material-ui/core';

import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

type ModalAction = {
  requireValidation?: boolean;
  ignoreDirty?: boolean;
  disabled?: boolean;
  label: string;
  function?: (item: any) => any;
  [key: string]: any;
  component?: (props: any) => any;
};

type BaseModalProps = DialogProps & {
  loading?: boolean;
  title: string;
  actions?: Array<ModalAction>;
  children: any;
  onSubmit?: (event?: React.FormEvent<HTMLFormElement>) => void;
  formRef?: (ref: any) => void;
};

const BaseModal = ({
  title,
  actions,
  children,
  loading,
  onSubmit,
  formRef,
  ...dialogProps
}: BaseModalProps) => {
  //console.log("Dialog Props", dialogProps);
  return (
    <Dialog {...dialogProps}>
      <DialogTitle>{title}</DialogTitle>
      <form onSubmit={onSubmit} ref={formRef}>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          {actions
            ? actions.map((action, index: number) => {
                if (action.component) return action.component({ loading, index });
                else
                  return (
                    <Button
                      key={`${index}-${action.label}`}
                      disabled={action.disabled}
                      onClick={action.function}
                      type={action.type}
                    >
                      {(() => {
                        if (loading && index === 1) {
                          return <CircularProgress size={16} variant="indeterminate" />;
                        } else {
                          return action.label;
                        }
                      })()}
                    </Button>
                  );
              })
            : null}
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default BaseModal;
