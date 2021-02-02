import * as React from 'react';
import { makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import StatusChip from './StatusChip';

const useStyles = makeStyles((theme: any) => ({
  root: {
    ...theme.custom.styles.vMiddle,
    ...theme.custom.styles.flex,
    justifyContent: 'space-between',
    height: 36,
  },
  heading3: {
    ...theme.custom.styles.heading3,
  },
  info: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    fontWeight: 500,
  },
  title: {
    fontSize: theme.typography.pxToRem(16),
    marginRight: theme.spacing(1.5),
    marginBottom: 0,
    marginTop: 0,
    fontWeight: 500,
  },
}));

type CardHeaderProps = {
  title: string | React.ReactNode;
  namespace?: string;
  hasInfo?: boolean;
  infoIcon?: any;
  infoText?: string;
  infoType?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' | 'processing';
  translatedInfo?: boolean;
  onClickTitle?: (e?: any) => void;
  action?: any;
};
const CardHeader = ({
  title,
  namespace = 'common',
  hasInfo = false,
  infoIcon = null,
  infoText = '',
  infoType = undefined,
  translatedInfo = true,
  action,
  onClickTitle,
}: CardHeaderProps) => {
  const classes = useStyles();
  const { t } = useTranslation(['information', 'internet', 'economy']);

  let infoComponent = <span>{translatedInfo ? infoText : t(`${namespace}:${infoText}`)}</span>;

  return (
    <div className={classes.root}>
      <h3 className={classes.heading3} onClick={onClickTitle}>
        {typeof title === 'string' ? t(`${namespace}:${title}`) : title}
      </h3>
      {hasInfo && (
        <div className={classes.info}>
          <StatusChip size="small" label={infoComponent} icon={infoIcon} type={infoType} />
        </div>
      )}
      {action && <div className={classes.info}>{action}</div>}
    </div>
  );
};

export default CardHeader;
