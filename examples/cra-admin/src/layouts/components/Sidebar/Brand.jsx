import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default class Brand extends Component {
  static propTypes = {
    classes: PropTypes.object,
    bgColor: PropTypes.oneOf(['white', 'black', 'blue']),
    miniActive: PropTypes.bool,
    logo: PropTypes.string,
    logoText: PropTypes.string,
    logoAltText: PropTypes.string,
    url: PropTypes.string,
  };

  render() {
    const { classes, logo, logoText, logoAltText, bgColor, miniActive, url } = this.props;
    const logoNormal =
      classes.logoNormal +
      ' ' +
      cx({
        [classes.logoNormalSidebarMini]: miniActive,
      });
    const logoMini = classes.logoMini;
    const logoClasses =
      classes.logo +
      ' ' +
      cx({
        [classes.whiteAfter]: bgColor === 'white',
      });
    return (
      <div className={logoClasses}>
        <a href={url} target="_blank" rel="noopener noreferrer" className={logoMini}>
          {logo ? (
            <img src={logo} alt="logo" className={classes.img} />
          ) : (
            <div className={classes.logoTextAlt}>{logoAltText}</div>
          )}
        </a>
        <a href={url} target="_blank" rel="noopener noreferrer" className={logoNormal}>
          {logoText}
        </a>
      </div>
    );
  }
}
