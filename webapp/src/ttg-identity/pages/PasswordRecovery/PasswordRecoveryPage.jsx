/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

// @material-ui/core components
import { withStyles, withTheme } from '@material-ui/core/styles';

import GridContainer from 'ttg-identity/components/Login/node_modules/@tabtabgo/web/components/Grid/GridContainer';
import GridItem from '@tabtabgo/web/components/Grid/GridItem';

import SuccessIcon from '@tabtabgo/web/components/SweetAlertIcons/SuccessIcon';

import ValidationForm from 'ttg-identity/components/Login/node_modules/@tabtabgo/web/components/Validations/Form';
import ValidationInput from 'ttg-identity/components/Login/node_modules/@tabtabgo/web/components/Validations/Input';
import FormButton from 'ttg-identity/components/Login/node_modules/@tabtabgo/web/components/Validations/Button';

import Title from '@tabtabgo/web/components/Typography/Title';

import recoverPasswordStyle from './PasswordRecoveryPageStyle';
import { Collapse, Button } from '@material-ui/core';
import withAuthentication from 'ttg-identity/components/Login/node_modules/ttg-identity/core/withAuthentication';
import { TTGError } from '@tabtabgo/core/types/TTGError';

// eslint-disable-next-line react/display-name
const RouterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

class RecoverPassword extends React.Component {
  state = { isBusy: false, email: null, isSuccess: false, isError: false, errorMessage: null };

  recoverPassword = async () => {
    const { email } = this.state;

    this.setState({ isBusy: true, isSuccess: false, isError: false, errorMessage: null });

    try {
      var result = await this.props.identity.recoverPassword(email);

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
          this.emailInput.select();
          this.emailInput.focus();
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
            <Collapse in={this.state.isSuccess === false}>
              <Title
                title="Recover your password"
                subtitle="Type your email address and we will send you an email to reset your password"
              />

              <ValidationForm
                onSubmit={async (e) => {
                  await this.recoverPassword(e);
                }}
              >
                <ValidationInput
                  label="Email"
                  id="email"
                  name="email"
                  placeholder="name@domain.com"
                  inputRef={(ref) => (this.emailInput = ref)}
                  isRequired={true}
                  validations={{ email: true }}
                  fullWidth
                  disabled={this.state.isBusy}
                  onChange={(event) => this.setState({ email: event.target.value })}
                  value={this.state.email || ''}
                  type="email"
                  InputProps={{
                    autoComplete: 'off',
                    autoFocus: true,
                    classes: { input: classes.input },
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
                    className={classes.recoverButton}
                  >
                    Submit
                  </FormButton>
                </GridContainer>
              </ValidationForm>
            </Collapse>
            <Collapse in={this.state.isSuccess === true}>
              <SuccessIcon />
              <Title
                title="Thank You"
                subtitle="A reset password link has been sent to your email address."
                gutterBottom
              />
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

RecoverPassword.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object,
  identity: PropTypes.shape({
    recoverPassword: PropTypes.func,
  }),
};

export default withTheme(
  withRouter(withStyles(recoverPasswordStyle)(withAuthentication(RecoverPassword))),
);
