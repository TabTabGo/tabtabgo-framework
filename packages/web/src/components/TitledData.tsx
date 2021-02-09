import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { UserSettingsContext } from '@tabtabgo/core/contexts/UserSettingsContext';
import WrapText from './WrapText/WrapText';
import cx from 'classnames';
const useStyles = makeStyles((theme: any) => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(1),
    textAlign: 'left',
  },
  title: {
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 500,
    color: theme.palette.grey[900],
    margin: 0,
  },
  value: {
    fontSize: theme.typography.pxToRem(16),
    color: '#3b3b3b',
    margin: '2px 0 0',
  },
  clickable: {
    cursor: 'pointer',
    //"& h5, h3": { color: theme.palette.primary.main },
    '&:hover': {
      opacity: 0.5,
    },
  },
}));

type TitledDataProps = {
  title: string;
  value?: any;
  className?: any;
  namespace: string;
  maxLength?: number;
  hideByShowIdSettings?: boolean;
  onClick?: (event?: any) => void;
};

const TitledData = ({
  title,
  value,
  className = '',
  namespace = 'common',
  maxLength,
  hideByShowIdSettings,
  onClick,
}: TitledDataProps) => {
  const classes = useStyles();
  const { t } = useTranslation(['information', 'internet', 'economy']);
  const settings : any = useContext(UserSettingsContext);
  //TODO need to refactor it. add param showBasedOnSettings to check status for enable it
  const id = title.toLowerCase();
  const hide = id.indexOf('id') !== -1;
  // console.log('hide :', hide , id);
  if (!settings?.showIds && hide && hideByShowIdSettings) {
    return <div style={{ display: 'none' }} />;
  }
  const classNames = cx({
    flex: true,
    'flex-col': true,
    'justify-start': true,
    [className]: true,
    [classes['root']]: true,
    [classes['clickable']]: onClick !== undefined,
  });
  return (
    <div className={classNames} onClick={onClick}>
      <h5 className={classes.title}>{t(`${namespace}:${title}`)}</h5>
      <h3 className={classes.value}>
        {value ? <WrapText text={value} maxLength={maxLength} /> : '-'}
      </h3>
    </div>
  );
};

export default TitledData;
