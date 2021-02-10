import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

// @material-ui/core components
import { withStyles, withTheme } from '@material-ui/core/styles';

import GridContainer from '@tabtabgo/web/components/Grid/GridContainer';
import GridItem from '@tabtabgo/web/components/Grid/GridItem';

import loginPageStyle from './LoginPageStyle';
import Login from '../../components/Login/Login';
import queryString from 'query-string';
class LoginPage extends React.Component {
  render() {
    const {
      classes,
      canRegister,
      canRecoverPassword,
      title,
      subtitle,
      theme,
      loginType,
      redirectPath,
      location,
    } = this.props;
    const logo = theme.custom.media.logo.login;
    const { redirectUrl } = queryString.parse(location.search);
    return (
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={8} md={5} lg={4}>
            <Login
              title={title}
              subtitle={subtitle}
              canRegister={canRegister}
              canRecoverPassword={canRecoverPassword}
              logo={logo}
              redirectPath={redirectUrl || redirectPath}
              loginType={loginType || 'emailPassword'}
            />
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  canRegister: PropTypes.bool,
  canRecoverPassword: PropTypes.bool,
  redirectPath: PropTypes.string,
  loginType: PropTypes.oneOf(['emailPassword', 'usernamePassword', 'phoneNumber']),
  location: PropTypes.object,
};

export default withTheme(withRouter(withStyles(loginPageStyle)(LoginPage)));
