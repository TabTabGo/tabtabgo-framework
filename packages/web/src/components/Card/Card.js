import React from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// nodejs library to set properties for components
import PropTypes from 'prop-types';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// @material-ui/icons

import LinearProgress from '@material-ui/core/LinearProgress';

// core components
import cardStyle from './cardStyle';

function Card({ ...props }) {
  const {
    classes,
    className,
    children,
    loading,
    plain,
    profile,
    blog,
    raised,
    background,
    pricing,
    color,
    product,
    testimonial,
    chart,
    login,
    ...rest
  } = props;
  const cardClasses = classNames({
    [classes.card]: true,
    [classes.cardPlain]: plain,
    [classes.cardProfile]: profile || testimonial,
    [classes.cardBlog]: blog,
    [classes.cardRaised]: raised,
    [classes.cardBackground]: background,
    [classes.cardPricingColor]:
      (pricing && color !== undefined) || (pricing && background !== undefined),
    [classes[color]]: color,
    [classes.cardPricing]: pricing,
    [classes.cardProduct]: product,
    [classes.cardChart]: chart,
    [classes.cardLogin]: login,
    [className]: className !== undefined,
  });
  return (
    <div className={cardClasses} {...rest}>
      {loading && <LinearProgress className={classes.cardProgress} />}
      {children}
    </div>
  );
}

Card.propTypes = {
  classes: PropTypes.object.isRequired,
  style: PropTypes.object,
  className: PropTypes.string,
  loading: PropTypes.bool,
  plain: PropTypes.bool,
  profile: PropTypes.bool,
  blog: PropTypes.bool,
  raised: PropTypes.bool,
  background: PropTypes.bool,
  pricing: PropTypes.bool,
  testimonial: PropTypes.bool,
  color: PropTypes.oneOf(['primary', 'info', 'success', 'warning', 'error', 'rose']),
  product: PropTypes.bool,
  chart: PropTypes.bool,
  login: PropTypes.bool,
  children: PropTypes.node,
};

export default withStyles(cardStyle)(Card);
