/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

// @material-ui/core components
import { withStyles, withTheme } from '@material-ui/core/styles';
import { Collapse, CircularProgress, Typography, Button } from '@material-ui/core';

import GridContainer from '@tabtabgo/web/components/Grid/GridContainer';
import GridItem from '@tabtabgo/web/components/Grid/GridItem';
import SuccessIcon from '@tabtabgo/web/components/SweetAlertIcons/SuccessIcon';
import ErrorIcon from '@tabtabgo/web/components/SweetAlertIcons/ErrorIcon';
import emailConfirmationStyle from './EmailConfirmationPageStyle';
import withAuthentication from '@tabtabgo/core/withAuthentication';

import Title from '@tabtabgo/web/components/Typography/Title';

import { getToken, getSearchParams } from '@tabtabgo/core/utilities';

// eslint-disable-next-line react/display-name
const RouterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

class EmailConfirmation extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    identity: PropTypes.object,
  };

  state = {
    confirming: false,
    succeeded: false,
    errorMessage: null,
    isError: false,
  };

  componentDidMount() {
    //Get token
    const {
      history,
      identity: { confirmEmail },
    } = this.props;

    let token = getToken(history.location.search);
    let params = getSearchParams(history.location.search);

    if (params && params.email && token && confirmEmail) {
      this.setState({ confirming: true });
      confirmEmail(params.email, token)
        .then(() => {
          //console.log("result", result);
          this.setState({ confirming: false, succeeded: true });
        })
        .catch((error) => {
          this.setState({
            confirming: false,
            succeeded: false,
            isError: true,
            errorMessage: error.message,
          });
        });
    }
  }
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={10} lg={8}>
            <Collapse in={this.state.confirming}>
              <div className={classes.textCenter}>
                <CircularProgress className={classes.progress} size={60} />
                <Typography variant="h6" className={classes.mutedText}>
                  Confirming Email...
                </Typography>
              </div>
            </Collapse>
            <Collapse in={this.state.succeeded}>
              <SuccessIcon />
              <Title title="Thank You" subtitle="Your email is verified." gutterBottom />
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
            <Collapse in={this.state.isError}>
              <ErrorIcon />
              <Title
                title="Email Verification Failed"
                subtitle={this.state.errorMessage}
                gutterBottom
              />
            </Collapse>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

EmailConfirmation.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object,
};

export default withTheme(
  withRouter(withStyles(emailConfirmationStyle)(withAuthentication(EmailConfirmation))),
);
