import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import cx from 'classnames';

import sectionTitleStyle from './sectionTitleStyle';

const SectionTitle = ({ children, classes, className, style }) => {
  const classNames = cx({
    [classes.root]: true,
    className,
  });

  return (
    <Typography variant="subtitle2" style={style} className={classNames}>
      {children}
    </Typography>
  );
};

SectionTitle.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default withStyles(sectionTitleStyle)(SectionTitle);
