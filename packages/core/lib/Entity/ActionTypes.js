'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

/**
 *
 * @param {string} module {module name in plural}
 * @param {string} subModule {subModule}
 */
var EntityActionTypes = function EntityActionTypes() {
  var module = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Items';
  var subModule = arguments.length > 1 ? arguments[1] : undefined;
  var uppercaseModule = module.toUpperCase();

  if (subModule) {
    var ucSubModule = subModule.toUpperCase();
    uppercaseModule += '/' + ucSubModule;
  }

  return {
    search: ''.concat(uppercaseModule, '/SEARCH'),
    searchUpdatePage: ''.concat(uppercaseModule, '/SEARCH/CHANGE_PAGE'),
    preSearch: ''.concat(uppercaseModule, '/SEARCH/PRE'),
    searching: ''.concat(uppercaseModule, '/SEARCHING'),
    updateSearchResult: ''.concat(uppercaseModule, '/SEARCH/CHANGE/RESULT'),
    load: ''.concat(uppercaseModule, '/LOAD'),
    select: ''.concat(uppercaseModule, '/SELECT'),
    unselect: ''.concat(uppercaseModule, '/UNSELECT'),
    selectMultiple: ''.concat(uppercaseModule, '/SELECT/MULTIPLE'),
    unselectMultiple: ''.concat(uppercaseModule, '/UNSELECT/MULTIPLE'),
    selectAll: ''.concat(uppercaseModule, '/SELECT/ALL'),
    resetSelected: ''.concat(uppercaseModule, '/SELECT/RESET'),
    update: ''.concat(uppercaseModule, '/UPDATE'),
    add: ''.concat(uppercaseModule, '/CREATE'),
    save: ''.concat(uppercaseModule, '/SAVE'),
    delete: ''.concat(uppercaseModule, '/DELETE'),
    order: ''.concat(uppercaseModule, '/SEARCH/ORDER'),
    activation: ''.concat(uppercaseModule, '/POST/ACTIVATE/ENTITIES'),
    printing: ''.concat(uppercaseModule, '/PRINTING'),
    exporting: ''.concat(uppercaseModule, '/POST/EXPORTING'),
    print: ''.concat(uppercaseModule, '/POST/PRINTED'),
    exportingPDF: ''.concat(uppercaseModule, '/POST/EXPORTING/PDF'),
    exportingExcel: ''.concat(uppercaseModule, '/POST/EXPORTING/EXCEL'),
    exportingCsv: ''.concat(uppercaseModule, '/POST/EXPORTING/CSV'),
    printSelected: ''.concat(uppercaseModule, '/POST/PRINT/SELECTED'),
    flag: function flag(action) {
      return action
        ? ''.concat(uppercaseModule, '/FLAG/').concat(action.toUpperCase())
        : ''.concat(uppercaseModule, '/FLAG/UPDATE');
    },
    error: function error(action) {
      return action
        ? ''.concat(uppercaseModule, '/ERROR/').concat(action.toUpperCase())
        : ''.concat(uppercaseModule, '/FLAG/ERROR');
    },
    updateProperty: ''.concat(uppercaseModule, '/UPDATE/PROPERTY'),
    resetData: ''.concat(uppercaseModule, '/RESET'),
  };
};

var _default = EntityActionTypes;
exports['default'] = _default;
