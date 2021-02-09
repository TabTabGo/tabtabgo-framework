import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import { AppBar, Toolbar, Fab } from '@material-ui/core';

// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
import { Paper, Hidden } from '@material-ui/core';

import { LayoutContext } from '../../LayoutContext';

import contentWrapperStyle from '../styles/contentWrapperStyle';

const ContentWrapper = ({
  children,
  classes,
  title,
  subtitle,
  showHeader,
  flatten,
  plain,
  actionComponent,
  contextButtons,
  showFab,
  fabProps,
  fabIcon,
  fabLabel,
}) => {
  const [layout, setLayout] = useContext(LayoutContext);

  useEffect(() => {
    //if (layout.title !== title) when change actionComponent  or subtitle too
    {
      const updatedState = { ...layout, title, subtitle, actionComponent };
      setLayout(() => updatedState);
    }
  }, [title, actionComponent]);

  const FabIcon = fabIcon;

  const containerClassNames = classNames({
    [classes.container]: true,
    [classes.containerNoHeader]: !showHeader,
  });

  const contentClassName = classNames({
    [classes.content]: true,
    [classes.contentFlatten]: flatten,
  });

  const ContentBody = plain === true ? 'div' : Paper;

  return (
    <div className={contentClassName}>
      <div className={containerClassNames}>
        {showHeader && (
          <div className={classes.contentHeader}>
            <Hidden className={classes.title} smDown implementation="css">
              <h3>
                <small>
                  <strong>{subtitle}</strong>
                </small>
                {title}
              </h3>
            </Hidden>

            {actionComponent}
          </div>
        )}

        <ContentBody className={plain === true ? '' : classes.contentBody}>
          {children}
          {showFab && (
            <Fab
              aria-label="FabAction"
              className={classes.fabButton}
              variant={fabLabel ? 'extended' : 'round'}
              {...fabProps}
            >
              <FabIcon className={fabLabel ? classes.fabExtendedIcon : undefined} />
              {fabLabel}
            </Fab>
          )}
          {contextButtons && (
            <AppBar position="relative" color="default" className={classes.appBar}>
              <Toolbar className={classes.toolbar}>{contextButtons}</Toolbar>
            </AppBar>
          )}
        </ContentBody>
      </div>
    </div>
  );
};

ContentWrapper.defaultProps = {
  showHeader: true,
  flatten: false,
  plain: false,
};

ContentWrapper.propTypes = {
  children: PropTypes.any,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  subtitle: PropTypes.string,
  showHeader: PropTypes.bool,
  flatten: PropTypes.bool,
  plain: PropTypes.bool,
  actionComponent: PropTypes.node,
  contextButtons: PropTypes.node,
  showFab: PropTypes.bool,
  fabProps: PropTypes.object,
  fabIcon: PropTypes.node,
  fabLabel: PropTypes.string,
  classes: PropTypes.object.isRequired,
  layout: PropTypes.shape({
    setLayoutProperties: PropTypes.func,
  }),
};

export default withStyles(contentWrapperStyle)(ContentWrapper);
