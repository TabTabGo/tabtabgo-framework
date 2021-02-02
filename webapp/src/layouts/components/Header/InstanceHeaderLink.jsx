import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
// import { Manager, Target, Popper } from "react-popper";

// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
import {
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  CircularProgress,
} from '@material-ui/core';

// @material-ui/icons
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';

import headerLinksStyle from '../styles/headerLinksStyle';

/// Links that will be displayed in the Header of Layout components
class InstanceHeaderLink extends React.Component {
  state = {
    instanceAnchorEl: null,
    instanceConfirmationOpen: false,
    instanceToChangeTo: null,
    changingInstance: false,
  };
  handleInstanceMenuClick = (event) => {
    this.setState({ instanceAnchorEl: event.currentTarget });
  };
  handleInstanceMenuClose = (event, reason, instanceName) => {
    if (instanceName) {
      this.setState({
        instanceAnchorEl: null,
        instanceToChangeTo: instanceName,
        instanceConfirmationOpen: true,
      });
    } else {
      this.setState({
        instanceAnchorEl: null,
      });
    }
  };
  handleInstanceConfirmationClick = () => {
    this.setState({ instanceConfirmationOpen: true });
  };
  changeInstance = async () => {
    if (this.props.changeInstance) {
      this.setState({ changingInstance: true });
      await this.props.changeInstance(this.state.instanceToChangeTo.id);
      this.setState({ instanceConfirmationOpen: false, changingInstance: false });
    }
  };
  handleInstanceConfirmationClose = () => {
    this.setState({ instanceConfirmationOpen: false });
  };

  render() {
    const { classes, instance, instances } = this.props;
    const { instanceAnchorEl } = this.state;
    const managerClasses = classNames({
      [classes.managerClasses]: true,
    });
    const instanceButtonClasses = classNames({
      [classes.textButtonLink]: true,
      [classes.buttonLink]: true,
    });

    return (
      <div className={managerClasses}>
        <Button
          aria-owns={instanceAnchorEl ? 'instance-menu' : undefined}
          aria-haspopup="true"
          className={instanceButtonClasses}
          color="inherit"
          onClick={this.handleInstanceMenuClick}
        >
          {instance.name}
          <ArrowDropDown className={classes.rightIcon} />
        </Button>
        <Menu
          id="instance-menu"
          anchorEl={instanceAnchorEl}
          open={Boolean(instanceAnchorEl)}
          onClose={this.handleInstanceMenuClose}
        >
          {instances &&
            instances.map((inst) => (
              <MenuItem
                key={inst.id}
                disabled={instance.id === inst.id}
                onClick={(e) => this.handleInstanceMenuClose(e, 'Instance Selected', inst)}
              >
                {inst.name}
              </MenuItem>
            ))}
        </Menu>
        <Dialog
          open={this.state.instanceConfirmationOpen}
          onClose={this.handleInstanceConfirmationClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'Change instance?'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This will change your current selected instance to{' '}
              <b>{this.state.instanceToChangeTo ? this.state.instanceToChangeTo.name : ''}</b>. All
              unsaved changes will be lost.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <div className={classes.actionButtonWrapper}>
              <Button
                disabled={this.state.changingInstance}
                onClick={() => this.handleInstanceConfirmationClose()}
                color="primary"
              >
                Cancel
              </Button>
              <Button
                disabled={this.state.changingInstance}
                onClick={() => this.changeInstance()}
                color="primary"
                autoFocus
              >
                Change Instance
                {this.state.changingInstance && (
                  <div className={classes.progressWrapper}>
                    <CircularProgress size={24} />
                  </div>
                )}
              </Button>
            </div>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

InstanceHeaderLink.propTypes = {
  classes: PropTypes.object.isRequired,
  instances: PropTypes.array.isRequired,
  instance: PropTypes.object.isRequired,
  changeInstance: PropTypes.func,
};

export default withStyles(headerLinksStyle)(InstanceHeaderLink);
