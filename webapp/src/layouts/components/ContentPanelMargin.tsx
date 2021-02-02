import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { UserSettingsContext } from '@tabtabgo/core/contexts/UserSettingsContext';

const useStyles = makeStyles((theme: any) => ({
  root: {
    marginTop: 70,
  },
  noMargin: {
    marginTop: 0,
  },
}));

type ContentPanelMarginProps = {};

const ContentPanelMargin = ({ ...props }: ContentPanelMarginProps) => {
  const classes = useStyles();
  //const { t } = useTranslation("information");
  const userSettingsContext = useContext(UserSettingsContext);

  const [hasCards, setHasCards] = useState(
    userSettingsContext.recentViews && userSettingsContext.recentViews.length > 0,
  );

  useEffect(() => {
    setHasCards(userSettingsContext.recentViews && userSettingsContext.recentViews.length > 0);
  }, [userSettingsContext.recentViews]);

  return <div className={hasCards ? classes.root : classes.noMargin} />;
};

export default ContentPanelMargin;
