'use strict';

function _typeof(obj) {
  '@babel/helpers - typeof';
  if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === 'function' &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? 'symbol'
        : typeof obj;
    };
  }
  return _typeof(obj);
}

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = exports.DefaultNavTitle = void 0;

var _react = _interopRequireDefault(require('react'));

var _classnames = _interopRequireDefault(require('classnames'));

var _propTypes = _interopRequireDefault(require('prop-types'));

var _styles = require('@material-ui/core/styles');

var _Button = _interopRequireDefault(require('components/CustomButtons/Button.jsx'));

var _core = require('@material-ui/core');

var _wizardStyle = _interopRequireDefault(require('./wizardStyle'));

var _lodash = _interopRequireDefault(require('lodash'));

var _Button2 = _interopRequireDefault(require('../Validations/Button'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _extends() {
  _extends =
    Object.assign ||
    function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
  return _extends.apply(this, arguments);
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ('value' in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function');
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true },
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
  return _setPrototypeOf(o, p);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
    return call;
  }
  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === 'function') return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
  return _getPrototypeOf(o);
}

//#region render Components
var DefaultNavTitle = function DefaultNavTitle(_ref) {
  var step = _ref.step,
    value = _ref.value,
    classes = _ref.classes;
  if (!step) return /*#__PURE__*/ _react['default'].createElement('div', null);
  var title = step.title;
  var subtitle = step.subtitle;

  if (typeof step.title === 'function') {
    title = step.title(value);
  }

  if (typeof step.subtitle === 'function') {
    subtitle = step.subtitle(value);
  }

  return /*#__PURE__*/ _react['default'].createElement(
    _react['default'].Fragment,
    null,
    /*#__PURE__*/ _react['default'].createElement(
      _core.Typography,
      {
        align: 'center',
        variant: 'h6',
        classes: {
          h6: classes && classes.title,
        },
        className: classes && classes.title,
      },
      title,
    ),
    subtitle
      ? /*#__PURE__*/ _react['default'].createElement(
          _core.Typography,
          {
            align: 'center',
            variant: 'caption',
            className: classes && classes.subtitle,
          },
          subtitle,
        )
      : null,
  );
};

exports.DefaultNavTitle = DefaultNavTitle;
DefaultNavTitle.propTypes = {
  step: _propTypes['default'].any,
  value: _propTypes['default'].object,
}; //#endregion

var Wizard = /*#__PURE__*/ (function (_React$Component) {
  _inherits(Wizard, _React$Component);

  var _super = _createSuper(Wizard);

  function Wizard(props) {
    var _this;

    _classCallCheck(this, Wizard);

    _this = _super.call(this, props);

    _this.skipStep = function () {
      var currentStepId = _this.state.currentStepId;

      if (!_this.isStepOptional(currentStepId)) {
        // You probably want to guard against something like this
        // it should never occur unless someone's actively trying to break something.
        throw new Error("You can't skip a step that isn't optional.");
      }

      var skipped = new Set(_this.state.skipped.values());
      skipped.add(currentStepId);

      var nextStep = _this.getNextStep();

      _this.setState({
        skipped: skipped,
        currentStepId: nextStep.stepId,
      });
    };

    _this.goToStep = function (stepId) {
      var activeSteps = _this.getActiveSteps();

      var touched = new Set(_this.state.touched);
      touched.add(stepId);
      var activeIndex = activeSteps.findIndex(function (s) {
        return s.stepId === stepId;
      });

      if (
        activeIndex > -1 &&
        activeIndex < activeSteps.length &&
        stepId !== _this.state.currentStepId
      ) {
        var onStepChange = _this.props.onStepChange;

        _this.setState(
          {
            currentStep: activeIndex,
            currentStepId: stepId,
            touched: touched,
          },
          function () {
            _this.refreshAnimation(activeIndex);

            if (onStepChange) {
              var step = activeSteps[activeIndex];
              onStepChange(
                activeIndex,
                step,
                _objectSpread(_objectSpread({}, _this.defaultButtons), step.buttons),
              );
            }
          },
        );
      }
    };

    _this.nextStep = function () {
      var nextStep;

      if (_this.isLastStep() && !_this.allStepsCompleted()) {
        // It's the last step, but not all steps have been completed
        // find the first step that has been completed
        var activeSteps = _this.getActiveSteps();

        nextStep = activeSteps.find(function (step) {
          return !_this.state.completed.has(step.stepId);
        });
      } else {
        nextStep = _this.getNextStep();
      }

      _this.goToStep(nextStep.stepId);
    };

    _this.prevStep = function () {
      var prevStep = _this.getPrevStep();

      _this.setState({
        currentStepId: prevStep.stepId,
      });
    };

    _this.complete = function () {
      // eslint-disable-next-line react/no-access-state-in-setstate
      var completed = new Set(_this.state.completed);
      completed.add(_this.state.currentStepId);

      _this.setState({
        completed: completed,
      });
      /**
       * Sigh... it would be much nicer to replace the following if conditional with
       * `if (!this.allStepsComplete())` however state is not set when we do this,
       * thus we have to resort to not being very DRY.
       */

      if (completed.size !== _this.totalSteps() - _this.skippedSteps()) {
        _this.nextStep();
      }
    };

    _this.reset = function () {
      _this.setState(
        {
          currentStep: null,
          currentStepId: null,
          completed: new Set(),
          skipped: new Set(),
          touched: new Set(),
        },
        function () {
          _this.goToStep(_this.props.startStepId);
        },
      );
    };

    _this.getNextStep = function () {
      var nextStep; // handle next will be based on 2 factors
      // 1- if nextStep Id is provided

      var currentStep = _this.getStepById(_this.state.currentStepId);

      if (currentStep.nextStep) {
        if (typeof currentStep.nextStep === 'string') {
          nextStep = _this.getStepById(currentStep.nextStep);
        }

        if (typeof currentStep.nextStep === 'function') {
          var nextStepId = currentStep.nextStep(_this.props.value);

          if (nextStepId) {
            nextStep = _this.getStepById(nextStepId);
          }
        }
      } // 2- next active step

      if (!nextStep) {
        nextStep = _this.getNextActiveStep(_this.state.currentStepId);
      }

      return nextStep;
    };

    _this.getPrevStep = function () {
      var prevStep; // handle go step back will be based on 2 factors
      // 1- if prevStep Id is provided

      var currentStep = _this.getStepById(_this.state.currentStepId);

      if (currentStep.prevStep) {
        if (typeof currentStep.prevStep === 'string') {
          prevStep = _this.getStepById(currentStep.prevStep);
        }

        if (typeof currentStep.prevStep === 'function') {
          var prevStepId = currentStep.prevStep(_this.props.value);

          if (prevStepId) {
            prevStep = _this.getStepById(prevStepId);
          }
        }
      } // 2- prev active step

      if (!prevStep) {
        prevStep = _this.getPrevActiveStep(_this.state.currentStepId);
      }

      return prevStep;
    };

    _this.getActiveSteps = function (valueToValidate) {
      var _this$props = _this.props,
        steps = _this$props.steps,
        value = _this$props.value;
      if (valueToValidate === undefined) valueToValidate = value; //console.group("getActiveSteps");
      //console.log("valueToValidate :", valueToValidate);
      //console.groupEnd();

      return steps.filter(function (s) {
        return _this.isStepActive(s, valueToValidate);
      });
    };

    _this.getNextActiveStep = function () {
      var currentStepId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      var activeSteps = _this.getActiveSteps();

      if (currentStepId === null) return activeSteps ? activeSteps[0] : null;
      var _this$props2 = _this.props,
        steps = _this$props2.steps,
        value = _this$props2.value;
      var currentStepIndex = steps.findIndex(function (s) {
        return s.stepId === currentStepId;
      });
      var nextStepObj = steps[++currentStepIndex];

      while (!_this.isStepActive(nextStepObj, value) && currentStepIndex < activeSteps.length - 1) {
        nextStepObj = steps[++currentStepIndex];
      }

      return nextStepObj || null;
    };

    _this.getPrevActiveStep = function () {
      var currentStepId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      var activeSteps = _this.getActiveSteps();

      if (currentStepId === null) return activeSteps ? activeSteps[0] : null;
      var _this$props3 = _this.props,
        steps = _this$props3.steps,
        value = _this$props3.value;
      var currentStepIndex = steps.findIndex(function (s) {
        return s.stepId === currentStepId;
      });
      var prevStepObj = steps[--currentStepIndex];

      while (!_this.isStepActive(prevStepObj, value) && currentStepIndex > 0) {
        prevStepObj = steps[--currentStepIndex];
      }

      return prevStepObj || null;
    };

    _this.getStepById = function (stepId) {
      var steps = _this.props.steps;
      return steps.find(function (s) {
        return s.stepId === stepId;
      });
    };

    _this.isStepActive = function (step, value) {
      return (
        step.isActive === undefined ||
        step.isActive === true ||
        (typeof step.isActive === 'function' && step.isActive(value))
      );
    };

    _this.isStepOptional = function (stepId) {
      var steps = _this.props.steps;
      var step = steps.find(function (s) {
        return s.stepId === stepId;
      });
      return step.isOptional;
    };

    _this.isStepDisable = function (stepId) {
      var enableStepNavigation = _this.props.enableStepNavigation;
      if (enableStepNavigation) return false;
      return !_this.state.touched.has(stepId);
    };

    _this.totalSteps = function () {
      var _this$props4 = _this.props,
        steps = _this$props4.steps,
        value = _this$props4.value;
      return steps.filter(function (s) {
        return _this.isStepActive(s, value);
      }).length;
    };

    var width = '100%';
    _this.state = {
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
    }; // this.navigationStepChange = this.navigationStepChange.bind(this);

    _this.refreshAnimation = _this.refreshAnimation.bind(_assertThisInitialized(_this)); // this.previousButtonClick = this.previousButtonClick.bind(this);
    // this.finishButtonClick = this.finishButtonClick.bind(this);

    _this.updateWidth = _this.updateWidth.bind(_assertThisInitialized(_this));
    _this.defaultButtons = {
      reset: {
        label: 'Reset',
        alignment: 'left',
        component: _Button['default'],
        onClick: _this.reset.bind(_assertThisInitialized(_this)),
      },
      next: {
        label: 'Next Step',
        type: 'submit',
        color: 'primary',
        alignment: 'right',
        component: _Button['default'],
        onClick: _this.complete.bind(_assertThisInitialized(_this)),
      },
      skip: {
        label: 'Skip',
        alignment: 'right',
        color: 'transparent',
        component: _Button['default'],
        onClick: _this.skipStep.bind(_assertThisInitialized(_this)),
      },
    };

    if (props.wizardRef && typeof props.wizardRef === 'function') {
      props.wizardRef(_assertThisInitialized(_this));
    }

    return _this;
  }

  _createClass(Wizard, [
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.goToStep(this.props.startStepId);

        if (this.nav) {
          this.nav.addEventListener('resize', this.updateMovingTab);
        }

        window.addEventListener('resize', this.updateWidth);
      },
    },
    {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        if (this.nav) {
          this.nav.removeEventListener('resize', this.updateMovingTab);
        }

        window.removeEventListener('resize', this.updateWidth);
      },
    },
    {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps, prevState) {
        var value = this.props.value;

        if (
          !_lodash['default'].isEqual(prevProps.value, value) &&
          prevState.currentStepId === this.state.currentStepId
        ) {
          var currentStepObj = this.getStepById(this.state.currentStepId);

          if (!this.isStepActive(currentStepObj, value)) {
            var firstActiveStep = this.getNextActiveStep(this.state.currentStepId); //console.log("firstActiveStep", firstActiveStep);

            this.goToStep(firstActiveStep.stepId);
          }
        }
      },
    },
    {
      key: 'updateWidth',
      value: function updateWidth() {
        this.refreshAnimation(this.state.currentStep);
      },
    },
    {
      key: 'updateMovingTab',
      value: function updateMovingTab() {
        //('this.nav.height :', this.nav);
        if (this.movingTab) {
          this.movingTab.style = {
            height: this.nav.height + 10,
          };
        }
      }, // navigationStepChange(key) {
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
    },
    {
      key: 'refreshAnimation',
      value: function refreshAnimation(index) {
        var activeSteps = this.getActiveSteps();
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

        this.setState({
          width: li_width + '%',
        });
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
        } //console.log('this.nav :', this.nav);

        var movingTabStyle = {
          width: step_width,
          height: this.nav.height,
          transform: 'translate3d(' + move_distance + 'px, ' + vertical_level + 'px, 0)',
          transition: 'all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)',
        };
        this.setState({
          movingTabStyle: movingTabStyle,
        });
      }, //#region handle step events/actions
    },
    {
      key: 'isStepSkipped',
      value: function isStepSkipped(stepId) {
        return this.state.skipped.has(stepId);
      },
    },
    {
      key: 'isStepComplete',
      value: function isStepComplete(stepId) {
        return this.state.completed.has(stepId);
      },
    },
    {
      key: 'skippedSteps',
      value: function skippedSteps() {
        return this.state.skipped.size;
      },
    },
    {
      key: 'completedSteps',
      value: function completedSteps() {
        return this.state.completed.size;
      },
    },
    {
      key: 'allStepsCompleted',
      value: function allStepsCompleted() {
        return this.completedSteps() === this.totalSteps() - this.skippedSteps();
      },
    },
    {
      key: 'isLastStep',
      value: function isLastStep() {
        var activeSteps = this.getActiveSteps();
        var lastStep = activeSteps[activeSteps.length - 1];
        return this.state.currentStepId === lastStep.stepId;
      }, //#endregion
    },
    {
      key: 'render',
      value: function render() {
        var _this2 = this;

        var _this$props5 = this.props,
          classes = _this$props5.classes,
          steps = _this$props5.steps,
          value = _this$props5.value,
          enableStepNavigation = _this$props5.enableStepNavigation,
          useStepper = _this$props5.useStepper,
          onChange = _this$props5.onChange,
          components = _this$props5.components;
        var currentStepId = this.state.currentStepId;
        var currentStepObj = this.getStepById(currentStepId);
        var NavTitle = DefaultNavTitle;

        if (components && components.navTitle) {
          NavTitle = components.navTitle;
        } //var stepDisplayIndex = 1;

        var color = this.props.color;
        return /*#__PURE__*/ _react['default'].createElement(
          'div',
          {
            className: classes.root,
            ref: function ref(_ref2) {
              return (_this2.wizard = _ref2);
            },
          },
          useStepper
            ? /*#__PURE__*/ _react['default'].createElement(
                _core.Stepper,
                {
                  alternativeLabel: true,
                },
                steps.map(function (step, index) {
                  if (_this2.isStepActive(step, value)) {
                    return /*#__PURE__*/ _react['default'].createElement(
                      _core.Step,
                      {
                        key: index,
                        disabled: _this2.isStepDisable(step.stepId),
                        completed: _this2.isStepComplete(step.stepId),
                        active: step.stepId === _this2.state.currentStepId,
                      },
                      step.error || enableStepNavigation
                        ? /*#__PURE__*/ _react['default'].createElement(
                            _core.StepLabel,
                            _extends(
                              {
                                error: step.error,
                                disabled: _this2.isStepDisable(step.stepId),
                                completed: _this2.isStepComplete(step.stepId), //classes={classes.stepLabel}
                              },
                              step.labelProps,
                            ),
                            /*#__PURE__*/ _react['default'].createElement(NavTitle, {
                              step: step,
                              value: value,
                            }),
                          )
                        : /*#__PURE__*/ _react['default'].createElement(
                            _core.StepButton,
                            _extends(
                              {
                                disabled: _this2.isStepDisable(step.stepId),
                                completed: _this2.isStepComplete(step.stepId),
                                onClick: _this2.goToStep.bind(_this2, step.stepId), //classes={classes.stepButton}
                              },
                              step.buttonProps,
                            ),
                            /*#__PURE__*/ _react['default'].createElement(NavTitle, {
                              step: step,
                              value: value,
                            }),
                          ),
                    );
                  }

                  return null;
                }),
              )
            : /*#__PURE__*/ _react['default'].createElement(
                'div',
                {
                  className: classes.wizardNavigation,
                },
                /*#__PURE__*/ _react['default'].createElement(
                  'ul',
                  {
                    className: classes.nav,
                    ref: function ref(node) {
                      return (_this2.nav = node);
                    },
                  },
                  steps.map(function (step, key) {
                    if (_this2.isStepActive(step, value)) {
                      return /*#__PURE__*/ _react['default'].createElement(
                        'li',
                        {
                          className: classes.steps,
                          key: key,
                          style: {
                            width: _this2.state.width,
                          },
                          disabled: _this2.isStepDisable(step.stepId),
                        },
                        _this2.isStepDisable(step.stepId)
                          ? /*#__PURE__*/ _react['default'].createElement(
                              'span',
                              {
                                className: classes.stepsDisabledAnchor,
                              },
                              /*#__PURE__*/ _react['default'].createElement(NavTitle, {
                                step: step,
                                value: value,
                                classes: {
                                  title: classes.navTitle,
                                  subtitle: classes.navSubtitle,
                                },
                              }),
                            )
                          : /*#__PURE__*/ _react['default'].createElement(
                              'a',
                              {
                                className: classes.stepsAnchor,
                                onClick: function onClick() {
                                  return _this2.goToStep(step.stepId);
                                },
                              },
                              /*#__PURE__*/ _react['default'].createElement(NavTitle, {
                                step: step,
                                value: value,
                                classes: {
                                  title: classes.navTitle,
                                  subtitle: classes.navSubtitle,
                                },
                              }),
                            ),
                      );
                    }

                    return null;
                  }),
                ),
                /*#__PURE__*/ _react['default'].createElement(
                  'div',
                  {
                    // TODO if error set error color
                    className: classes.movingTab + ' ' + classes[color || 'primary'],
                    style: this.state.movingTabStyle,
                    ref: function ref(node) {
                      return (_this2.movingTab = node);
                    },
                  },
                  /*#__PURE__*/ _react['default'].createElement(NavTitle, {
                    step: currentStepObj,
                    value: value,
                    classes: {
                      title: classes.movingTabTitle,
                      subtitle: classes.movingTabSubtitle,
                    },
                  }),
                ),
              ),
          /*#__PURE__*/ _react['default'].createElement(
            'div',
            {
              className: classes.content,
            },
            steps.map(function (step, index) {
              if (_this2.isStepActive(step, value)) {
                var _cx;

                var stepContentClasses = (0, _classnames['default'])(
                  ((_cx = {}),
                  _defineProperty(_cx, classes.stepContentActive, currentStepId === step.stepId),
                  _defineProperty(_cx, classes.stepContent, currentStepId !== step.stepId),
                  _cx),
                );
                return /*#__PURE__*/ _react['default'].createElement(
                  'div',
                  {
                    className: stepContentClasses,
                    key: index,
                  },
                  /*#__PURE__*/ _react['default'].createElement(step.stepComponent, {
                    innerRef: function innerRef(node) {
                      return (_this2[step.stepId] = node);
                    },
                    allStates: _this2.state.allStates,
                    value: value,
                    onChange: onChange,
                  }),
                );
              }

              return null;
            }),
          ),
        );
      },
    },
  ]);

  return Wizard;
})(_react['default'].Component);

Wizard.defaultProps = {};
Wizard.propTypes = {
  classes: _propTypes['default'].object.isRequired,
  steps: _propTypes['default'].arrayOf(
    _propTypes['default'].shape({
      title: _propTypes['default'].oneOfType([
        _propTypes['default'].string | _propTypes['default'].func,
      ]).isRequired,
      subtitle: _propTypes['default'].oneOfType([
        _propTypes['default'].string | _propTypes['default'].func,
      ]),
      icon: _propTypes['default'].node,
      error: _propTypes['default'].bool,
      isActive: _propTypes['default'].oneOfType([
        _propTypes['default'].bool,
        _propTypes['default'].func,
      ]),
      stepComponent: _propTypes['default'].func.isRequired,
      stepId: _propTypes['default'].string.isRequired,
      StepIconComponent: _propTypes['default'].func,
      StepIconProps: _propTypes['default'].object,
      StepButtons: _propTypes['default'].object,
    }),
  ).isRequired,
  value: _propTypes['default'].object.isRequired,
  previousButtonClasses: _propTypes['default'].string,
  previousButtonText: _propTypes['default'].string,
  nextButtonClasses: _propTypes['default'].string,
  nextButtonText: _propTypes['default'].string,
  finishButtonClasses: _propTypes['default'].string,
  finishButtonText: _propTypes['default'].string,
  finishButtonClick: _propTypes['default'].func,
  validate: _propTypes['default'].bool,
  enableStepNavigation: _propTypes['default'].bool,
};

var _default = (0, _styles.withStyles)(_wizardStyle['default'], {
  withTheme: true,
})(Wizard);

exports['default'] = _default;
