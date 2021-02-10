import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
import { List, ListItem } from '@material-ui/core';

import footerStyle from '../styles/footerStyle';

function Footer({ ...props }) {
  const { classes, routes, brand, fluid, centered, light } = props;

  var container = cx({
    [classes.container]: !fluid,
    [classes.containerFluid]: fluid,
    [classes.lightColor]: light,
    [classes.centeredContainer]: centered,
  });

  var anchor =
    classes.a +
    cx({
      [' ' + classes.lightColor]: light,
    });

  var block = cx({
    [classes.block]: true,
    [classes.lightColor]: light,
  });

  return (
    <footer className={classes.footer}>
      <div className={container}>
        <div className={classes.left}>
          <List className={classes.list}>
            {routes &&
              routes.map((route) => (
                <ListItem key={route.name} className={classes.inlineBlock}>
                  <a href={route.path} target={route.target} className={block}>
                    {route.name}
                  </a>
                </ListItem>
              ))}
          </List>
        </div>
        <p className={classes.right}>
          &copy; {1900 + new Date().getYear()}{' '}
          <a href={brand.companyLink} target="blank" className={anchor}>
            <b>{brand ? brand.company : ''}</b>
          </a>
          {brand ? brand.motto : null}
          {' v. '}
          {process.env.REACT_APP_VERSION}
        </p>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  routes: PropTypes.array,
  fluid: PropTypes.bool,
  light: PropTypes.bool,
  centered: PropTypes.bool,
  brand: PropTypes.shape({
    company: PropTypes.string,
    companyLink: PropTypes.string,
    motto: PropTypes.string,
  }),
};

export default withStyles(footerStyle)(Footer);
