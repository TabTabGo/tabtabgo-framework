import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import {
  Paper,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import groupStyle from './panelGroupStyle';

class PanelGroup extends React.Component {
  state = {
    activePanel: undefined,
  };

  static propTypes = {
    panels: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        secondarylabel: PropTypes.string,
        key: PropTypes.string,
        component: PropTypes.node,
      }),
    ).isRequired,
    accordion: PropTypes.bool,
    theme: PropTypes.object,
    classes: PropTypes.object,
  };

  handlePanelChange = (activePanel) => {
    this.setState({ activePanel });
  };

  render() {
    const { panels, accordion, classes } = this.props;
    const { activePanel } = this.state;

    return (
      <Paper className={classes.root} elevation={0}>
        {panels.map((panel) => {
          const accordionProps =
            accordion === true
              ? {
                  expanded: activePanel === panel.key,
                  handlePanelChange: () => this.handlePanelChange(panel.key),
                }
              : {};

          return (
            <ExpansionPanel
              key={panel.key}
              {...accordionProps}
              classes={{ root: classes.panel, expanded: classes.expanded }}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="button" color="primary" className={classes.heading}>
                  {panel.label}
                </Typography>
                {panel.secondaryLabel && (
                  <Typography className={classes.secondaryHeading}>
                    {panel.secondaryLabel}
                  </Typography>
                )}
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>{panel.component}</ExpansionPanelDetails>
            </ExpansionPanel>
          );
        })}
      </Paper>
    );
  }
}

export default withStyles(groupStyle, { withTheme: true })(PanelGroup);
