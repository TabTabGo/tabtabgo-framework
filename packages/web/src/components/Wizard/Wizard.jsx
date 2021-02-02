import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
// core components
import Button from 'components/CustomButtons/Button.jsx';

import { Step, Stepper, StepLabel, StepButton, Typography, Grid } from '@material-ui/core';
import wizardStyle from './wizardStyle';
import _ from 'lodash';
import ValidationButton from '../Validations/Button';

//#region render Components
export const DefaultNavTitle = ({ step, value, classes }) => {
  if (!step) return <div />;
  let title = step.title;
  let subtitle = step.subtitle;
  if (typeof step.title === 'function') {
    title = step.title(value);
  }
  if (typeof step.subtitle === 'function') {
    subtitle = step.subtitle(value);
  }

  return (
    <React.Fragment>
      <Typography
        align="center"
        variant="h6"
        classes={{ h6: classes && classes.title }}
        className={classes && classes.title}
      >
        {title}
      </Typography>
      {subtitle ? (
        <Typography align="center" variant="caption" className={classes && classes.subtitle}>
          {subtitle}
        </Typography>
      ) : null}
    </React.Fragment>
  );
};
DefaultNavTitle.propTypes = {
  step: PropTypes.any,
  value: PropTypes.object,
};
//#endregion
class Wizard extends React.Component {
  constructor(props) {
    super(props);
    var width = '100%';

    this.state = {
      currentStep: null,
      currentStepId: null,
      width: width,
      movingTabStyle: {
        transition: 'transform 0s',
      },
      allStates: {},
      completed: new Set(),
      skipped: new Set(),
      touched: new Set(),
    };

    // this.navigationStepChange = this.navigationStepChange.bind(this);
    this.refreshAnimation = this.refreshAnimation.bind(this);
    // this.previousButtonClick = this.previousButtonClick.bind(this);
    // this.finishButtonClick = this.finishButtonClick.bind(this);
    this.updateWidth = this.updateWidth.bind(this);

    this.defaultButtons = {
      reset: {
        label: 'Reset',
        alignment: 'left',
        component: Button,
        onClick: this.reset.bind(this),
      },
      next: {
        label: 'Next Step',
        type: 'submit',
        color: 'primary',
        alignment: 'right',
        component: Button,
        onClick: this.complete.bind(this),
      },
      skip: {
        label: 'Skip',
        alignment: 'right',
        color: 'transparent',
        component: Button,
        onClick: this.skipStep.bind(this),
      },
    };

    if (props.wizardRef && typeof props.wizardRef === 'function') {
      props.wizardRef(this);
    }
  }
  componentDidMount() {
    this.goToStep(this.props.startStepId);
    if (this.nav) {
      this.nav.addEventListener('resize', this.updateMovingTab);
    }
    window.addEventListener('resize', this.updateWidth);
  }

  componentWillUnmount() {
    if (this.nav) {
      this.nav.removeEventListener('resize', this.updateMovingTab);
    }
    window.removeEventListener('resize', this.updateWidth);
  }

  componentDidUpdate(prevProps, prevState) {
    const { value } = this.props;

    if (
      !_.isEqual(prevProps.value, value) &&
      prevState.currentStepId === this.state.currentStepId
    ) {
      var currentStepObj = this.getStepById(this.state.currentStepId);
      if (!this.isStepActive(currentStepObj, value)) {
        var firstActiveStep = this.getNextActiveStep(this.state.currentStepId);
        //console.log("firstActiveStep", firstActiveStep);

        this.goToStep(firstActiveStep.stepId);
      }
    }
  }
  updateWidth() {
    this.refreshAnimation(this.state.currentStep);
  }
  updateMovingTab() {
    //('this.nav.height :', this.nav);
    if (this.movingTab) {
      this.movingTab.style = {
        height: this.nav.height + 10,
      };
    }
  }
  // navigationStepChange(key) {
  //   if (this.props.steps) {
  //     var validationState = true;
  //     if (key > this.state.currentStep) {
  //       for (var i = this.state.currentStep; i < key; i++) {
  //         if (this[this.props.steps[i].stepId].sendState !== undefined) {
  //           this.setState({
  //             allStates: [
  //               ...this.state.allStates,
  //               {
  //                 [this.props.steps[i].stepId]: this[this.props.steps[i].stepId].sendState()
  //               }
  //             ]
  //           });
  //         }
  //         if (
  //           this[this.props.steps[i].stepId].isValidated !== undefined &&
  //           this[this.props.steps[i].stepId].isValidated() === false
  //         ) {
  //           validationState = false;
  //           break;
  //         }
  //       }
  //     }
  //     if (validationState) {
  //       this.setState({
  //         currentStep: key,
  //         nextButton: this.props.steps.length > key + 1 ? true : false,
  //         previousButton: key > 0 ? true : false,
  //         finishButton: this.props.steps.length === key + 1 ? true : false
  //       });
  //       this.refreshAnimation(key);
  //     }
  //   }
  // }
  // nextButtonClick() {
  //   if (
  //     (this.props.validate &&
  //       ((this[this.props.steps[this.state.currentStep].stepId].isValidated !== undefined &&
  //         this[this.props.steps[this.state.currentStep].stepId].isValidated()) ||
  //         this[this.props.steps[this.state.currentStep].stepId].isValidated === undefined)) ||
  //     this.props.validate === undefined
  //   ) {
  //     if (this[this.props.steps[this.state.currentStep].stepId].sendState !== undefined) {
  //       this.setState({
  //         allStates: [
  //           ...this.state.allStates,
  //           {
  //             [this.props.steps[this.state.currentStep].stepId]: this[
  //               this.props.steps[this.state.currentStep].stepId
  //             ].sendState()
  //           }
  //         ]
  //       });
  //     }
  //     var key = this.state.currentStep + 1;
  //     this.setState({
  //       currentStep: key,
  //       nextButton: this.props.steps.length > key + 1 ? true : false,
  //       previousButton: key > 0 ? true : false,
  //       finishButton: this.props.steps.length === key + 1 ? true : false
  //     });
  //     this.refreshAnimation(key);
  //   }
  // }
  // previousButtonClick() {
  //   if (this[this.props.steps[this.state.currentStep].stepId].sendState !== undefined) {
  //     this.setState({
  //       allStates: [
  //         ...this.state.allStates,
  //         {
  //           [this.props.steps[this.state.currentStep].stepId]: this[
  //             this.props.steps[this.state.currentStep].stepId
  //           ].sendState()
  //         }
  //       ]
  //     });
  //   }
  //   var key = this.state.currentStep - 1;
  //   if (key >= 0) {
  //     this.setState({
  //       currentStep: key,
  //       nextButton: this.props.steps.length > key + 1 ? true : false,
  //       previousButton: key > 0 ? true : false,
  //       finishButton: this.props.steps.length === key + 1 ? true : false
  //     });
  //     this.refreshAnimation(key);
  //   }
  // }
  // finishButtonClick() {
  //   if (
  //     this.props.validate &&
  //     ((this[this.props.steps[this.state.currentStep].stepId].isValidated !== undefined &&
  //       this[this.props.steps[this.state.currentStep].stepId].isValidated()) ||
  //       this[this.props.steps[this.state.currentStep].stepId].isValidated === undefined) &&
  //     this.props.finishButtonClick !== undefined
  //   ) {
  //     this.props.finishButtonClick();
  //   }
  // }
  refreshAnimation(index) {
    const activeSteps = this.getActiveSteps();
    var total = activeSteps.length;
    var li_width = 100 / total;
    var total_steps = activeSteps.length;
    var move_distance = this.wizard.children[0].offsetWidth / total_steps;
    var index_temp = index;
    var vertical_level = 0;

    var mobile_device = window.innerWidth < 600 && total > 3;

    if (mobile_device) {
      move_distance = this.wizard.children[0].offsetWidth / 2;
      index_temp = index % 2;
      li_width = 50;
    }

    this.setState({ width: li_width + '%' });

    var step_width = move_distance;
    move_distance = move_distance * index_temp;

    var current = index + 1;

    if (current === 1 || (mobile_device === true && index % 2 === 0)) {
      move_distance -= 8;
    } else if (current === total_steps || (mobile_device === true && index % 2 === 1)) {
      move_distance += 8;
    }

    if (mobile_device) {
      vertical_level = parseInt(index / 2, 10);
      vertical_level = vertical_level * 38;
    }
    //console.log('this.nav :', this.nav);
    var movingTabStyle = {
      width: step_width,
      height: this.nav.height,
      transform: 'translate3d(' + move_distance + 'px, ' + vertical_level + 'px, 0)',
      transition: 'all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)',
    };
    this.setState({ movingTabStyle: movingTabStyle });
  }

  //#region handle step events/actions
  skipStep = () => {
    const { currentStepId } = this.state;
    if (!this.isStepOptional(currentStepId)) {
      // You probably want to guard against something like this
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }
    const skipped = new Set(this.state.skipped.values());
    skipped.add(currentStepId);
    let nextStep = this.getNextStep();
    this.setState({
      skipped,
      currentStepId: nextStep.stepId,
    });
  };

  goToStep = (stepId) => {
    const activeSteps = this.getActiveSteps();

    let touched = new Set(this.state.touched);
    touched.add(stepId);

    var activeIndex = activeSteps.findIndex((s) => s.stepId === stepId);
    if (
      activeIndex > -1 &&
      activeIndex < activeSteps.length &&
      stepId !== this.state.currentStepId
    ) {
      const { onStepChange } = this.props;

      this.setState({ currentStep: activeIndex, currentStepId: stepId, touched }, () => {
        this.refreshAnimation(activeIndex);
        if (onStepChange) {
          var step = activeSteps[activeIndex];

          onStepChange(activeIndex, step, { ...this.defaultButtons, ...step.buttons });
        }
      });
    }
  };

  nextStep = () => {
    let nextStep;

    if (this.isLastStep() && !this.allStepsCompleted()) {
      // It's the last step, but not all steps have been completed
      // find the first step that has been completed
      const activeSteps = this.getActiveSteps();
      nextStep = activeSteps.find((step) => !this.state.completed.has(step.stepId));
    } else {
      nextStep = this.getNextStep();
    }
    this.goToStep(nextStep.stepId);
  };

  prevStep = () => {
    var prevStep = this.getPrevStep();
    this.setState({
      currentStepId: prevStep.stepId,
    });
  };

  complete = () => {
    // eslint-disable-next-line react/no-access-state-in-setstate
    const completed = new Set(this.state.completed);
    completed.add(this.state.currentStepId);

    this.setState({
      completed,
    });

    /**
     * Sigh... it would be much nicer to replace the following if conditional with
     * `if (!this.allStepsComplete())` however state is not set when we do this,
     * thus we have to resort to not being very DRY.
     */
    if (completed.size !== this.totalSteps() - this.skippedSteps()) {
      this.nextStep();
    }
  };

  reset = () => {
    this.setState(
      {
        currentStep: null,
        currentStepId: null,
        completed: new Set(),
        skipped: new Set(),
        touched: new Set(),
      },
      () => {
        this.goToStep(this.props.startStepId);
      },
    );
  };
  //#endregion

  //#region step state functions
  getNextStep = () => {
    let nextStep;
    // handle next will be based on 2 factors
    // 1- if nextStep Id is provided
    let currentStep = this.getStepById(this.state.currentStepId);
    if (currentStep.nextStep) {
      if (typeof currentStep.nextStep === 'string') {
        nextStep = this.getStepById(currentStep.nextStep);
      }
      if (typeof currentStep.nextStep === 'function') {
        let nextStepId = currentStep.nextStep(this.props.value);
        if (nextStepId) {
          nextStep = this.getStepById(nextStepId);
        }
      }
    }
    // 2- next active step
    if (!nextStep) {
      nextStep = this.getNextActiveStep(this.state.currentStepId);
    }
    return nextStep;
  };

  getPrevStep = () => {
    let prevStep;
    // handle go step back will be based on 2 factors
    // 1- if prevStep Id is provided
    let currentStep = this.getStepById(this.state.currentStepId);
    if (currentStep.prevStep) {
      if (typeof currentStep.prevStep === 'string') {
        prevStep = this.getStepById(currentStep.prevStep);
      }
      if (typeof currentStep.prevStep === 'function') {
        let prevStepId = currentStep.prevStep(this.props.value);
        if (prevStepId) {
          prevStep = this.getStepById(prevStepId);
        }
      }
    }
    // 2- prev active step
    if (!prevStep) {
      prevStep = this.getPrevActiveStep(this.state.currentStepId);
    }
    return prevStep;
  };
  getActiveSteps = (valueToValidate) => {
    const { steps, value } = this.props;
    if (valueToValidate === undefined) valueToValidate = value;
    //console.group("getActiveSteps");
    //console.log("valueToValidate :", valueToValidate);
    //console.groupEnd();
    return steps.filter((s) => this.isStepActive(s, valueToValidate));
  };

  getNextActiveStep = (currentStepId = null) => {
    var activeSteps = this.getActiveSteps();
    if (currentStepId === null) return activeSteps ? activeSteps[0] : null;
    const { steps, value } = this.props;
    let currentStepIndex = steps.findIndex((s) => s.stepId === currentStepId);
    let nextStepObj = steps[++currentStepIndex];

    while (!this.isStepActive(nextStepObj, value) && currentStepIndex < activeSteps.length - 1) {
      nextStepObj = steps[++currentStepIndex];
    }

    return nextStepObj || null;
  };

  getPrevActiveStep = (currentStepId = null) => {
    var activeSteps = this.getActiveSteps();
    if (currentStepId === null) return activeSteps ? activeSteps[0] : null;
    const { steps, value } = this.props;
    let currentStepIndex = steps.findIndex((s) => s.stepId === currentStepId);
    let prevStepObj = steps[--currentStepIndex];

    while (!this.isStepActive(prevStepObj, value) && currentStepIndex > 0) {
      prevStepObj = steps[--currentStepIndex];
    }

    return prevStepObj || null;
  };

  getStepById = (stepId) => {
    const { steps } = this.props;
    return steps.find((s) => s.stepId === stepId);
  };

  isStepActive = (step, value) => {
    return (
      step.isActive === undefined ||
      step.isActive === true ||
      (typeof step.isActive === 'function' && step.isActive(value))
    );
  };
  isStepOptional = (stepId) => {
    const { steps } = this.props;
    var step = steps.find((s) => s.stepId === stepId);
    return step.isOptional;
  };

  isStepDisable = (stepId) => {
    const { enableStepNavigation } = this.props;
    if (enableStepNavigation) return false;

    return !this.state.touched.has(stepId);
  };

  totalSteps = () => {
    const { steps, value } = this.props;
    return steps.filter((s) => this.isStepActive(s, value)).length;
  };

  isStepSkipped(stepId) {
    return this.state.skipped.has(stepId);
  }

  isStepComplete(stepId) {
    return this.state.completed.has(stepId);
  }

  skippedSteps() {
    return this.state.skipped.size;
  }

  completedSteps() {
    return this.state.completed.size;
  }

  allStepsCompleted() {
    return this.completedSteps() === this.totalSteps() - this.skippedSteps();
  }

  isLastStep() {
    let activeSteps = this.getActiveSteps();
    let lastStep = activeSteps[activeSteps.length - 1];
    return this.state.currentStepId === lastStep.stepId;
  }

  //#endregion

  render() {
    const {
      classes,
      steps,
      value,
      enableStepNavigation,
      useStepper,
      onChange,
      components,
    } = this.props;
    const { currentStepId } = this.state;
    let currentStepObj = this.getStepById(currentStepId);
    let NavTitle = DefaultNavTitle;
    if (components && components.navTitle) {
      NavTitle = components.navTitle;
    }
    //var stepDisplayIndex = 1;
    let { color } = this.props;
    return (
      <div className={classes.root} ref={(ref) => (this.wizard = ref)}>
        {useStepper ? (
          <Stepper alternativeLabel>
            {steps.map((step, index) => {
              if (this.isStepActive(step, value)) {
                return (
                  <Step
                    key={index}
                    disabled={this.isStepDisable(step.stepId)}
                    completed={this.isStepComplete(step.stepId)}
                    active={step.stepId === this.state.currentStepId}
                  >
                    {step.error || enableStepNavigation ? (
                      <StepLabel
                        error={step.error}
                        disabled={this.isStepDisable(step.stepId)}
                        completed={this.isStepComplete(step.stepId)}
                        //classes={classes.stepLabel}
                        {...step.labelProps}
                      >
                        <NavTitle step={step} value={value} />
                      </StepLabel>
                    ) : (
                      <StepButton
                        disabled={this.isStepDisable(step.stepId)}
                        completed={this.isStepComplete(step.stepId)}
                        onClick={this.goToStep.bind(this, step.stepId)}
                        //classes={classes.stepButton}
                        {...step.buttonProps}
                      >
                        <NavTitle step={step} value={value} />
                      </StepButton>
                    )}
                  </Step>
                );
              }
              return null;
            })}
          </Stepper>
        ) : (
          <div className={classes.wizardNavigation}>
            <ul className={classes.nav} ref={(node) => (this.nav = node)}>
              {steps.map((step, key) => {
                if (this.isStepActive(step, value)) {
                  return (
                    <li
                      className={classes.steps}
                      key={key}
                      style={{ width: this.state.width }}
                      disabled={this.isStepDisable(step.stepId)}
                    >
                      {this.isStepDisable(step.stepId) ? (
                        <span className={classes.stepsDisabledAnchor}>
                          <NavTitle
                            step={step}
                            value={value}
                            classes={{ title: classes.navTitle, subtitle: classes.navSubtitle }}
                          />
                        </span>
                      ) : (
                        <a
                          className={classes.stepsAnchor}
                          onClick={() => this.goToStep(step.stepId)}
                        >
                          <NavTitle
                            step={step}
                            value={value}
                            classes={{ title: classes.navTitle, subtitle: classes.navSubtitle }}
                          />
                        </a>
                      )}
                    </li>
                  );
                }
                return null;
              })}
            </ul>
            <div
              // TODO if error set error color
              className={classes.movingTab + ' ' + classes[color || 'primary']}
              style={this.state.movingTabStyle}
              ref={(node) => (this.movingTab = node)}
            >
              <NavTitle
                step={currentStepObj}
                value={value}
                classes={{ title: classes.movingTabTitle, subtitle: classes.movingTabSubtitle }}
              />
            </div>
          </div>
        )}
        <div className={classes.content}>
          {steps.map((step, index) => {
            if (this.isStepActive(step, value)) {
              const stepContentClasses = cx({
                [classes.stepContentActive]: currentStepId === step.stepId,
                [classes.stepContent]: currentStepId !== step.stepId,
              });
              return (
                <div className={stepContentClasses} key={index}>
                  <step.stepComponent
                    innerRef={(node) => (this[step.stepId] = node)}
                    allStates={this.state.allStates}
                    value={value}
                    onChange={onChange}
                  />
                </div>
              );
            }
            return null;
          })}
        </div>
        {/*<div className={classes.footer}>
          <div className={classes.left}>
            {this.state.previousButton ? (
              <Button
                className={this.props.previousButtonClasses}
                onClick={() => this.previousButtonClick()}
              >
                {this.props.previousButtonText}
              </Button>
            ) : null}
          </div>
          <div className={classes.right}>
            {this.state.nextButton ? (
              <Button
                color="rose"
                className={this.props.nextButtonClasses}
                onClick={() => this.nextButtonClick()}
              >
                {this.props.nextButtonText}
              </Button>
            ) : null}
            {this.state.finishButton ? (
              <Button
                color="rose"
                className={this.finishButtonClasses}
                onClick={() => this.finishButtonClick()}
              >
                {this.props.finishButtonText}
              </Button>
            ) : null}
          </div>
          <div className={classes.clearfix} />
            </div> */}
      </div>
    );
  }
}

Wizard.defaultProps = {};

Wizard.propTypes = {
  classes: PropTypes.object.isRequired,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.oneOfType([PropTypes.string | PropTypes.func]).isRequired,
      subtitle: PropTypes.oneOfType([PropTypes.string | PropTypes.func]),
      icon: PropTypes.node,
      error: PropTypes.bool,
      isActive: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
      stepComponent: PropTypes.func.isRequired,
      stepId: PropTypes.string.isRequired,
      StepIconComponent: PropTypes.func,
      StepIconProps: PropTypes.object,
      StepButtons: PropTypes.object,
    }),
  ).isRequired,
  value: PropTypes.object.isRequired,
  previousButtonClasses: PropTypes.string,
  previousButtonText: PropTypes.string,
  nextButtonClasses: PropTypes.string,
  nextButtonText: PropTypes.string,
  finishButtonClasses: PropTypes.string,
  finishButtonText: PropTypes.string,
  finishButtonClick: PropTypes.func,
  validate: PropTypes.bool,
  enableStepNavigation: PropTypes.bool,
};

export default withStyles(wizardStyle, { withTheme: true })(Wizard);
