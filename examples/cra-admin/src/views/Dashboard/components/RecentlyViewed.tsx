import React, { useContext } from 'react';
import CardHeader from '@tabtabgo/web/components/CardHeader';
import CustomDivider from '@tabtabgo/web/components/Divider';
import { BoxedContainer } from '@tabtabgo/web/components/Containers';
import { makeStyles, Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useTranslation } from 'react-i18next';

import RecentViewCard from './RecentViewCard';
import { UserSettingsContext } from '@tabtabgo/core/contexts/UserSettingsContext';

const useStyles = makeStyles((theme: any) => ({
  flex: {
    ...theme.custom.styles.flex,
    ...theme.custom.styles.vMiddle,
    flexWrap: 'nowrap',
  },
  heading3: {
    ...theme.custom.styles.heading3,
    marginTop: 16,
    textAlign: 'left',
    color: theme.palette.text.hint,
  },
  loadingContainer: {
    ...theme.custom.styles.flex,
    ...theme.custom.styles.vMiddle,
    ...theme.custom.styles.hMiddle,
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  emptyItemsContainer: {
    ...theme.custom.styles.flex,
    ...theme.custom.styles.vMiddle,
    ...theme.custom.styles.hMiddle,
    color: theme.palette.text.hint,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  boxedContainer: {
    margin: 0,
    overflowX: 'auto',
  },
}));

type RecentlyViewedProps = {
  loading: boolean;
};

const RecentlyViewed = ({ loading = false }: RecentlyViewedProps) => {
  const classes = useStyles();
  const { t } = useTranslation('information');
  const recentReviewContext = useContext(UserSettingsContext);

  return (
    <BoxedContainer className={classes.boxedContainer}>
      <CardHeader namespace="information" title={t('Recently Viewed')} hasInfo={false} />
      <CustomDivider />

      {loading ? (
        <div className={classes.loadingContainer}>
          <CircularProgress size={20} />
        </div>
      ) : (
        <div className={classes.flex}>
          {recentReviewContext.recentViews && recentReviewContext.recentViews.length > 0 ? (
            recentReviewContext.recentViews.map((view, index) => (
              <RecentViewCard
                key={index}
                type={view.type}
                path={view.path}
                name={view.name}
                id={view.id}
              />
            ))
          ) : (
            <div className={classes.emptyItemsContainer}>
              <Typography>No recently viewed items</Typography>
            </div>
          )}
        </div>
      )}
    </BoxedContainer>
  );
};

export default RecentlyViewed;
