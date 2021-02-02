import React from 'react';
import { DialogContentText } from '@material-ui/core';
import BaseModal from './BaseModal';
import { useTranslation } from 'react-i18next';

type ConfirmationModalProps = {
  isOpen: boolean;
  onClose: (e?: any) => void;
  onConfirm: (e?: any) => void;
  title: string;
  text: string;
  namespace?: string;
};

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, text }: ConfirmationModalProps) => {
  const { t } = useTranslation('common');
  return (
    <BaseModal
      open={isOpen}
      title={title}
      onClose={onClose}
      actions={[
        { label: t('Cancel'), function: onClose, disabled: false },
        { label: t('Yes'), function: onConfirm, disabled: false },
      ]}
    >
      <DialogContentText id="alert-dialog-description">{text}</DialogContentText>
    </BaseModal>
  );
};

export default ConfirmationModal;
