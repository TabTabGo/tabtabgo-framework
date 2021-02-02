import React from 'react';
import { makeStyles } from '@material-ui/core';
import CustomDivider from '../Divider';
import { useTranslation } from 'react-i18next';
import WrapText from '../components/WrapText/WrapText';
import { AppSettings } from '@tabtabgo/core/Appsettings';

const useStyles = makeStyles((theme: any) => ({
  base: {
    fontSize: theme.typography.pxToRem(14),
    margin: '6px 0',
  },
  title: {
    color: '#8a8a8a',
  },
  value: {
    fontWeight: 500,
  },
  heading: { ...theme.custom.styles.heading3, marginBottom: theme.spacing(1) },
  flexBetween: {
    ...theme.custom.styles.flex,
    ...theme.custom.styles.vMiddle,
    ...theme.custom.styles.hBetween,
  },
  flexCol: {
    ...theme.custom.styles.flexCol,
  },
  divider: {
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
  },
  tooltip: {
    fontSize: '0.875rem',
  },
}));

type VerticalTableDataProps = {
  namespace?: String;
  title?: string;
  data?: Array<any>;
  emptyMessage?: string;
};

const VerticalTableData = ({
  namespace = 'common',
  title,
  data = [],
  emptyMessage,
}: VerticalTableDataProps) => {
  const classes = useStyles();
  const { t } = useTranslation(AppSettings.translationNamespaces);
  //console.log('data :', data);
  return (
    <div className={classes.flexCol}>
      {title && <h3 className={classes.heading}>{title}</h3>}
      {data.length === 0 && emptyMessage && (
        <div className={classes.flexBetween}>
          <h4 className={`${classes.base} ${classes.title}`}>
            {t(`${namespace}:${emptyMessage}`)}
          </h4>
        </div>
      )}
      {(() => {
        return (
          <React.Fragment>
            {data.map((item, index) => (
              <React.Fragment key={index}>
                <div key={`${item.title}-${index}`} className={classes.flexBetween}>
                  <h4 className={`${classes.base} ${classes.title}`}>
                    {t(`${namespace}:${item.title}`)}
                  </h4>
                  <h4 className={`${classes.base} ${classes.value}`}>
                    {(() => {
                      if (!!item && item.value !== null && item.value !== undefined) {
                        return <WrapText text={item.value} maxLength={item.maxLength} />;
                      }
                      return '-';
                    })()}
                  </h4>
                </div>
                {(() => {
                  if (index !== data.length - 1) {
                    return <CustomDivider className={classes.divider} />;
                  }
                })()}
              </React.Fragment>
            ))}
          </React.Fragment>
        );
      })()}
    </div>
  );
};

export default VerticalTableData;
