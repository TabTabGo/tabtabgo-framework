import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Chip, ChipProps, colors } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: { borderRadius: theme.spacing(1) },
  default: {},
  medium: { fontWeight: 500 },
  primary: {
    color: theme.palette.common.white,
    background: theme.palette.primary.main,
  },
  secondary: {
    color: theme.palette.common.white,
    background: theme.palette.secondary.main,
  },
  info: {
    color: theme.palette.common.white,
    background: theme.palette.info.main,
  },
  success: {
    color: theme.palette.common.white,
    background: theme.palette.success.main,
  },
  warning: {
    color: theme.palette.common.white,
    background: theme.palette.warning.main,
  },
  error: {
    color: theme.palette.common.white,
    background: theme.palette.error.main,
  },
  processing: {
    color: colors.green[500],
    background: theme.palette.common.white,
    border: 'dotted',
    //fontWeight : "bold"
  },
}));

export type Ref = HTMLDivElement;
export type StatusClipType =
  | 'primary'
  | 'secondary'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'processing';
export type StatusChipProps = ChipProps & {
  type?: StatusClipType;
};
const StatusChip = React.forwardRef<Ref, StatusChipProps>((props, ref) => {
  const { type, size, className, ...rest } = props;
  const classes = useStyles();
  let chipClassName = `${classes.root} ${type ? ' ' + classes[type] : ''} ${
    size === 'medium' ? ' ' + classes.medium : ''
  }`;
  return <Chip className={chipClassName + ' ' + className} size={size} {...rest} ref={ref} />;
});

StatusChip.displayName = 'StatusChip';

export default StatusChip;
