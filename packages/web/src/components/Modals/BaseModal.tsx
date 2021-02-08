import React from 'react';

import { CircularProgress } from '@material-ui/core';
//import Button from "@material-ui/core/Button";
import ValidationForm from '../Validations/Index';
import ValidationButton from '../Validations/Button';

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
  onSubmit?: (event: any, callback?: () => void) => void;
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
      <ValidationForm onSubmit={onSubmit} ref={formRef}>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          {actions
            ? actions.map((action, index: number) => {
                if (action.component) return action.component({ loading, index });
                else
                  return (
                    <ValidationButton
                      key={`${index}-${action.label}`}
                      disabled={action.disabled}
                      onClick={action.function}
                      type={action.type}
                      ignoreValidation={!action.requireValidation}
                      ignoreDirty={!action.requireValidation || action.ignoreDirty === true}
                    >
                      {(() => {
                        if (loading && index === 1) {
                          return <CircularProgress size={16} variant="indeterminate" />;
                        } else {
                          return action.label;
                        }
                      })()}
                    </ValidationButton>
                  );
              })
            : null}
        </DialogActions>
      </ValidationForm>
    </Dialog>
  );
};

export default BaseModal;
