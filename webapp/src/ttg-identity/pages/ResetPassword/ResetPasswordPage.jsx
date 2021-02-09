/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

// @material-ui/core components
import { withStyles, withTheme } from '@material-ui/core/styles';

import GridContainer from '@tabtabgo/web/components/Grid/GridContainer';
import GridItem from '@tabtabgo/web/components/Grid/GridItem';

import SuccessIcon from '@tabtabgo/web/components/SweetAlertIcons/SuccessIcon';

import ValidationForm from '@tabtabgo/web/components/Validations/Form';
import ValidationInput from '@tabtabgo/web/components/Validations/Input';
import FormButton from '@tabtabgo/web/components/Validations/Button';

import { Button } from '@material-ui/core';

import Title from '@tabtabgo/web/components/Typography/Title';

import resetPasswordStyle from './ResetPasswordPageStyle';
import { Collapse } from '@material-ui/core';
import PasswordInput from '@tabtabgo/web/components/Input/PasswordInput';

import { getToken, getSearchParams } from '@tabtabgo/core/Utilities';
import { email } from '@tabtabgo/core/Validations';
import withAuthentication from '@tabtabgo/core/withAuthentication';
import { TTGError } from '@tabtabgo/core/types/TTGError';
import { regex } from '@tabtabgo/core/Validations';

// eslint-disable-next-line react/display-name
const RouterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

class ResetPassword extends React.Component {
  state = {
    isVerifyingLink: false,
    isBusy: false,
    email: '',
    password: null,
    confirmedPassword: null,
    isSuccess: false,
    isError: false,
    errorMessage: null,
  };

  componentDidMount() {
    //Get token
    const { history } = this.props;

    let token = getToken(history.location.search);
    let params = getSearchParams(history.location.search);

    if (params && params.email && token) {
      this.setState({ email: params.email, token: token });
    }
  }

  resetPassword = async () => {
    if (!this.state.password || this.state.password.length < 6) {
      this.setState({
        isBusy: false,
        isSuccess: false,
        isError: true,
        errorMessage: 'Password must be 6 characters or more',
      });

      return;
    }

    this.setState({ isBusy: true, isSuccess: false, isError: false, errorMessage: null });
    if (!email(this.state.email)) {
      this.setState({ isBusy: false, isError: true, errorMessage: 'Invalid email address' });
      return;
    }

    if (!this.state.token) {
      this.setState({ isBusy: false, isError: true, errorMessage: 'Invalid token' });
      return;
    }

    try {
      var result = await this.props.identity.resetPassword(
        this.state.email,
        this.state.token,
        this.state.password,
      );

      if (result.succeeded === true) {
        this.setState({ isBusy: false, isSuccess: true });
      } else {
        throw new TTGError(result.message, result.code);
      }
    } catch (error) {
      this.setState(
        {
          isBusy: false,
          isSuccess: false,
          isError: true,
          errorMessage: error.message,
        },
        () => {
          this.passwordInput.select();
          this.passwordInput.focus();
        },
      );
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem>
            <Collapse in={this.state.isSuccess === false} timeout="auto">
              <Title
                title="Choose a new password"
                subtitle="Password must include at least 6 characters"
              />

              <ValidationForm
                onSubmit={async (e) => {
                  await this.resetPassword(e);
                }}
              >
                <ValidationInput
                  label="Email"
                  id="email"
                  name="email"
                  isRequired={true}
                  validations={{ email: true }}
                  fullWidth
                  disabled={true}
                  value={this.state.email || ''}
                  type="email"
                  InputProps={{
                    classes: { input: classes.input },
                  }}
                />
                <PasswordInput
                  showRequirements={true}
                  label="New Password"
                  id="password"
                  name="password"
                  placeholder="New password"
                  validations={{
                    minLength: 6,
                    requiredNumber: (value) => regex(/^.*(?=.*\d).*$/, value),
                    requiredLowerAndUpperCase: (value) =>
                      regex(/^.*(?=.*[a-z])(?=.*[A-Z]).*$/, value),
                    requiredNonCharacter: (value) => regex(/^.*(?=.*\W).*$/, value),
                  }}
                  validationErrors={{
                    minLength: 'Requires at least 6 characters',
                    requiredNumber: 'Requires a number between 0-9 in the password',
                    requiredLowerAndUpperCase:
                      'Requires a lowercase and uppercase character in the password',
                    requiredNonCharacter: 'Requires a non-alphanumeric character in the password',
                  }}
                  inputRef={(ref) => (this.passwordInput = ref)}
                  isRequired={true}
                  fullWidth
                  onChange={(event) => this.setState({ password: event.target.value })}
                  disabled={this.state.isBusy}
                  value={this.state.password || ''}
                  InputProps={{
                    autoFocus: true,
                  }}
                />

                <GridContainer justify="center">
                  <Collapse in={this.state.isError}>
                    <GridItem xs={12} className={classes.textError}>
                      {this.state.errorMessage}
                    </GridItem>
                  </Collapse>
                </GridContainer>
                <GridContainer justify="center">
                  <FormButton
                    color="primary"
                    round
                    isBusy={this.state.isBusy}
                    disabled={this.state.isBusy}
                    type="submit"
                    className={classes.resetButton}
                  >
                    Submit
                  </FormButton>
                </GridContainer>
              </ValidationForm>
            </Collapse>
            <Collapse in={this.state.isSuccess === true}>
              <SuccessIcon />
              <Title title="Thank You" subtitle="Your password has been changed." gutterBottom />
              <div className={classes.textCenter}>
                <Button
                  variant="outlined"
                  color="primary"
                  component={RouterLink}
                  to="/login"
                  className={classes.goToButton}
                >
                  Go to Login
                </Button>
              </div>
            </Collapse>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

ResetPassword.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object,
  history: PropTypes.object,
  identity: PropTypes.shape({
    resetPassword: PropTypes.func,
  }),
};

export default withTheme(
  withRouter(withStyles(resetPasswordStyle)(withAuthentication(ResetPassword))),
);
