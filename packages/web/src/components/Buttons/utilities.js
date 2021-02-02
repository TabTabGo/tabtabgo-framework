import _ from 'lodash';

export const getTooltip = (a, props) => {
  if (a.tooltip && typeof a.tooltip === 'function') {
    return a.tooltip(props);
  }
  if (a.tooltip && typeof a.tooltip === 'string') return a.tooltip;
  return getLabel(a, props);
};

export const getLabel = (a, props) => {
  if (a.label && typeof a.label === 'function') return a.label(props);
  return a.label || '';
};

export const mergeButtonSections = (buttonSections, defaultButtonSections) => {
  const finalActiveButtons = {};
  if (_.isEmpty(buttonSections) && _.isEmpty(defaultButtonSections)) {
    return {};
  } else if (!_.isEmpty(buttonSections) && _.isEmpty(defaultButtonSections)) {
    return buttonSections;
  } else if (_.isEmpty(buttonSections) && !_.isEmpty(defaultButtonSections)) {
    return defaultButtonSections;
  } else {
    let keys = _.uniq(Object.keys(buttonSections).concat(Object.keys(defaultButtonSections)));

    keys.forEach((buttonSectionKey) => {
      var section = buttonSections[buttonSectionKey];

      var defaultSection = defaultButtonSections[buttonSectionKey];
      if ((typeof section === 'boolean' && section === false) || !section) return;
      else if (typeof section === 'boolean' && section === true)
        finalActiveButtons[buttonSectionKey] = defaultSection;
      if (_.isEmpty(section) /*&& _.isEmpty(defaultSection)*/) {
        finalActiveButtons[buttonSectionKey] = {};
      } else if (!_.isEmpty(section) && _.isEmpty(defaultSection)) {
        finalActiveButtons[buttonSectionKey] = section;
        // } else if (_.isEmpty(section) && !_.isEmpty(defaultSection)) {
        //   finalActiveButtons[buttonSectionKey] = defaultSection;
      } else {
        finalActiveButtons[buttonSectionKey] = mergeButtons(section, defaultSection);
      }
    });
  }

  return finalActiveButtons;
};

export const mergeButtons = (buttons, defaultButtons) => {
  const finalActiveButtons = {};
  if (!buttons) return defaultButtons;
  Object.keys(buttons).forEach((buttonKey) => {
    var button = getButton(buttonKey, buttons, defaultButtons);
    if (button) {
      finalActiveButtons[buttonKey] = button;
    }
  });
  return finalActiveButtons;
};

export const getButton = (buttonName, buttons, defaultButtons) => {
  var button = null;

  if (typeof buttons[buttonName] === 'object') {
    if (defaultButtons[buttonName])
      button = Object.assign({}, defaultButtons[buttonName], buttons[buttonName]);
    else button = Object.assign({}, buttons[buttonName]);
  } else if (buttons[buttonName] === true) {
    button = Object.assign({}, defaultButtons[buttonName]);
  }
  return button;
};
