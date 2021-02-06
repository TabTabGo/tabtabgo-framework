import React, { useContext, useState } from 'react';
import { makeStyles, IconButton } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

import { BoxedContainer } from '@tabtabgo/web/components/Containers';
import RecentViewHeaderCard from './RecentViewHeaderCard';
import { UserSettingsContext } from '@tabtabgo/core/contexts/UserSettingsContext';
import { withConfirmation } from '@tabtabgo/web/contexts/ConfirmationContext';
import CloseIcon from '@material-ui/icons/Close';

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
  boxedContainer: {
    border: 'none',
    margin: 0,
    padding: 0,
    marginTop: theme.spacing(1),
    background: 'transparent',
    overflowX: 'auto',
  },
  card: {},
  closeButton: {
    //position: 'absolute',
    //right: theme.spacing(1),
    //top: theme.spacing(1),
    //color: theme.palette.grey[500],
  },
}));

type RecentlyViewedProps = {
  loading: boolean;
  confirmationContext: any;
};

const RecentlyViewedHeader = ({ loading = false, confirmationContext }: RecentlyViewedProps) => {
  const classes = useStyles();
  const [isHover, setIsHover] = useState(false);

  //const { t } = useTranslation("information");
  const userSettingsContext = useContext(UserSettingsContext);
  const handleClearRecentUserSettingsContextView = () => {
    if (userSettingsContext.clearRecentViews) {
      confirmationContext.confirmAction(
        `Clear Recent Views`,
        `Are you sure you want to clear recently viewed items?`,
        () => userSettingsContext.clearRecentViews(),
      );
    }
  };

  if (loading) {
    return (
      <div className={classes.loadingContainer}>
        <CircularProgress size={20} />
      </div>
    );
  } else if (!userSettingsContext.recentViews || userSettingsContext.recentViews.length === 0) {
    return null;
  } else {
    return (
      <div onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
        <BoxedContainer className={classes.boxedContainer}>
          <div className={classes.flex}>
            {userSettingsContext.recentViews.map((view, index) => (
              <RecentViewHeaderCard
                className={classes.card}
                key={index}
                type={view.type}
                path={view.path}
                name={view.name}
                id={view.id}
              />
            ))}
            {isHover && userSettingsContext.recentViews.length > 0 ? (
              <IconButton
                size="small"
                key={'clearBtn'}
                kearia-label="clear"
                className={classes.closeButton}
                onClick={handleClearRecentUserSettingsContextView}
              >
                <CloseIcon />
              </IconButton>
            ) : null}
          </div>
        </BoxedContainer>
      </div>
    );
  }
};

export default withConfirmation(RecentlyViewedHeader);
