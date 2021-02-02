/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
import { InputAdornment, Grid, Button, CircularProgress, Collapse } from '@material-ui/core';

// @material-ui/icons
import Email from '@material-ui/icons/Email';
import Person from '@material-ui/icons/Person';
// core components
import GridContainer from '@tabtabgo/web/components/Grid/GridContainer';
// TODO do we need Card
import Card from '@tabtabgo/web/components/Card/Card';
import CardBody from '@tabtabgo/web/components/Card/CardBody';
import CardHeader from '@tabtabgo/web/components/Card/CardHeader';
import CardFooter from '@tabtabgo/web/components/Card/CardFooter';

import ValidationForm from '@tabtabgo/web/components/Validations/Form';
import ValidationInput from '@tabtabgo/web/components/Validations/Input';
import FormButton from '@tabtabgo/web/components/Validations/Button';

import withAuthentication from 'ttg-identity/core/withAuthentication';
import loginStyle from './loginStyle';

//import logo from "assets/img/logo-white.png";
import PasswordInput from '@tabtabgo/web/components/Input/PasswordInput';

// eslint-disable-next-line react/display-name
const RouterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

class Login extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: 'cardHidden',
      loggingIn: false,
      userIdentification: null,
      showPassword: false,
      password: null,
    };
  }
  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    this.timeOutFunction = setTimeout(
      function () {
        this.setState({ cardAnimaton: '' });
      }.bind(this),
      300,
    );
  }
  componentWillUnmount() {
    clearTimeout(this.timeOutFunction);
    this.timeOutFunction = null;
  }
  handleChange = (event, field) => {
    this.setState({ [field]: event.target.value });
  };
  handleClickShowPassword = () => {
    this.setState((state) => ({ showPassword: !state.showPassword }));
  };

  login = async () => {
    const { userIdentification, password } = this.state;
    const {
      history,
      location,
      redirectPath,
      identity: { login },
    } = this.props;
    //TODO get redirect Url from hisory.location.state if not from locaiton params if not empty
    this.setState({ loggingIn: true });

    var result = await login(userIdentification, password);
    //console.log("login result :", result, redirectPath, location.state);
    this.setState({ loggingIn: false });

    if (result.isAuthenticated) {
      if (redirectPath) {
        history.push(redirectPath);
      } else if (location && location.state && location.state.from) {
        history.push(location.state.from.pathname);
      } else {
        history.push('/');
      }
    }
  };

  render() {
    const {
      classes,
      title,
      subtitle,
      canRegister,
      registerPath,
      canRecoverPassword,
      passwordRecoveryPath,
      logo,
      loginType,
      identity: { error },
    } = this.props;
    //console.log("location state :", location.state);
    return (
      <ValidationForm
        onSubmit={async (e) => {
          await this.login(e);
        }}
      >
        <Card login className={classes.loginCard + ' ' + classes[this.state.cardAnimaton]}>
          <CardHeader className={`${classes.cardHeader} ${classes.textCenter}`} color="primary">
            {logo ? (
              <img src={logo} alt="..." className={classes.logo} />
            ) : (
              <div className={`${classes.textCenter} ${classes.socialLine}`}>
                {title ? <h3>{title}</h3> : <h4>{subtitle ? subtitle : 'Log in'}</h4>}
              </div>
            )}
          </CardHeader>
          <CardBody className={canRegister ? classes.cardBodyCanRegister : ''}>
            {logo || title ? (
              <div className={classes.textCenter}>
                <h4 className={` ${classes.textBold} ${classes.mutedColor}`}>
                  {subtitle ? subtitle : 'Log in'}
                </h4>
              </div>
            ) : null}
            {loginType === 'emailPassword' && (
              <ValidationInput
                label="Email"
                id="email"
                name="email"
                isRequired={true}
                validations={{
                  email: true,
                }}
                fullWidth
                ignoreLabelSuffix
                type="email"
                disabled={this.state.loggingIn}
                value={this.state.userIdentification || ''}
                originalValue={''}
                onChange={(event) => this.handleChange(event, 'userIdentification')}
                InputProps={{
                  autoFocus: true,
                  classes: { input: classes.input },
                  endAdornment: (
                    <InputAdornment position="end">
                      <Email className={classes.inputAdornmentIcon} />
                    </InputAdornment>
                  ),
                }}
              />
            )}
            {loginType === 'usernamePassword' && (
              <ValidationInput
                label="Username"
                id="username"
                name="username"
                isRequired={true}
                fullWidth
                type="text"
                ignoreLabelSuffix
                disabled={this.state.loggingIn}
                value={this.state.userIdentification || ''}
                originalValue={''}
                onChange={(event) => this.handleChange(event, 'userIdentification')}
                InputProps={{
                  autoFocus: true,
                  classes: { input: classes.input },
                  endAdornment: (
                    <InputAdornment position="end">
                      <Person className={classes.inputAdornmentIcon} />
                    </InputAdornment>
                  ),
                }}
              />
            )}

            {(loginType === 'emailPassword' || loginType === 'usernamePassword') && (
              <PasswordInput
                label="Password"
                id="password"
                isRequired={true}
                name="password"
                ignoreLabelSuffix
                value={this.state.password || ''}
                originalValue={''}
                onChange={(event) => this.handleChange(event, 'password')}
                disabled={this.state.loggingIn}
                fullWidth
                InputProps={{
                  classes: { input: classes.input },
                }}
              />
            )}
            <Collapse in={error && !this.state.loggingIn}>
              <Grid item sm={12} className={classes.textError}>
                <div dangerouslySetInnerHTML={{ __html: error }} />
              </Grid>
            </Collapse>
            {canRecoverPassword && (
              <Grid item sm={12} className={classes.textRight}>
                <Button
                  size="small"
                  disabled={this.state.loggingIn}
                  component={RouterLink}
                  to={passwordRecoveryPath ? passwordRecoveryPath : '/auth/passwordRecovery'}
                  className={classes.mutedColor}
                >
                  FORGOT PASSWORD?
                </Button>
              </Grid>
            )}
            <GridContainer justify="center">
              <div className={classes.progressWrapper}>
                <FormButton
                  color="primary"
                  round
                  disabled={this.state.loggingIn}
                  type="submit"
                  className={classes.loginButton}
                >
                  Log in
                </FormButton>
                {this.state.loggingIn && (
                  <div className={classes.progressOverlay}>
                    <CircularProgress size={24} className={classes.buttonProgress} />
                  </div>
                )}
              </div>
            </GridContainer>
          </CardBody>

          {canRegister && (
            <CardFooter className={`${classes.cardFooter}`}>
              <Grid item sm={7}>
                {/* <Typography variant="body1">{"Don't have an account?"}</Typography> */}
                <Button
                  size="small"
                  disabled={this.state.loggingIn}
                  component={RouterLink}
                  to={registerPath ? registerPath : '/auth/register'}
                  className={classes.mutedColor}
                >
                  {"Don't have an account?"}
                </Button>
              </Grid>
              {/* <Grid item sm={5} className={classes.textRight}>
                <Button
                  size="small"
                  disabled={this.state.loggingIn}
                  component={RouterLink}
                  to={registerPath ? registerPath : "/auth/register"}
                  className={classes.mutedColor}
                >
                  REGISTER NOW
                </Button>
              </Grid> */}
            </CardFooter>
          )}
        </Card>
      </ValidationForm>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  logo: PropTypes.string,
  canRegister: PropTypes.bool,
  registerPath: PropTypes.string,
  canRecoverPassword: PropTypes.bool,
  passwordRecoveryPath: PropTypes.string,
  identity: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object,
  redirectPath: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  loginType: PropTypes.oneOf(['emailPassword', 'usernamePassword', 'phoneNumber']),
};

export default withRouter(withStyles(loginStyle)(withAuthentication(Login)));
