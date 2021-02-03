import React from 'react';
import { makeStyles, Grid } from '@material-ui/core';
//import CustomDivider from "../Divider";
import { useTranslation } from 'react-i18next';
import WrapText from '../WrapText/WrapText';

const useStyles = makeStyles((theme: any) => ({
  base: {
    fontSize: theme.typography.pxToRem(14),
    margin: '6px 0',
  },
  title: {
    whiteSpace: 'nowrap',
    paddingLeft: theme.spacing(1),
  },
  value: {
    fontWeight: 500,
    flex: 1,
    textAlign: 'right',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(6),
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

type ResponsiveTableDataProps = {
  namespace?: String;
  title?: string;
  data?: Array<any>;
  emptyMessage?: string;
};

const ResponsiveTableData = ({
  namespace = 'common',
  title,
  data = [],
  emptyMessage,
}: ResponsiveTableDataProps) => {
  const classes = useStyles();
  const { t } = useTranslation(['information', 'internet', 'economy']);

  //console.log("data :", data);

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
          <Grid container spacing={0}>
            {data.map((item, index) => (
              <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
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
                {/* <CustomDivider className={classes.divider} /> */}
              </Grid>
            ))}
          </Grid>
        );
      })()}
    </div>
  );
};

export default ResponsiveTableData;
