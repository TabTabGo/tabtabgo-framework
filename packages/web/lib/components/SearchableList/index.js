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
exports['default'] = void 0;

var _react = _interopRequireWildcard(require('react'));

var _propTypes = _interopRequireDefault(require('prop-types'));

var _core = require('@material-ui/core');

var _styles = require('@material-ui/core/styles');

var _reactInfiniteScroller = _interopRequireDefault(require('react-infinite-scroller'));

var _immutabilityHelper = _interopRequireDefault(require('immutability-helper'));

var _lodash = _interopRequireDefault(require('lodash'));

var _searchableListStyle = _interopRequireDefault(require('./searchableListStyle'));

var _utilities = require('ttg-react/core/utilities');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _getRequireWildcardCache() {
  if (typeof WeakMap !== 'function') return null;
  var cache = new WeakMap();
  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };
  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }
  if (obj === null || (_typeof(obj) !== 'object' && typeof obj !== 'function')) {
    return { default: obj };
  }
  var cache = _getRequireWildcardCache();
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj['default'] = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
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

var SearchableList = /*#__PURE__*/ (function (_Component) {
  _inherits(SearchableList, _Component);

  var _super = _createSuper(SearchableList);

  function SearchableList(props) {
    var _this;

    _classCallCheck(this, SearchableList);

    _this = _super.call(this, props);

    _this.handleSelectItem = function (value) {
      var _this$props = _this.props,
        isMulti = _this$props.isMulti,
        onItemsSelected = _this$props.onItemsSelected;
      var selectedItems = _this.state.selected;
      var existValueIndex = selectedItems.findIndex(function (s) {
        return _lodash['default'].isEqual(s, value);
      });

      if (existValueIndex === -1) {
        if (isMulti) {
          selectedItems = selectedItems.concat([value]);
        } else {
          selectedItems = [value];
        }

        _this.setState({
          selected: selectedItems,
        });

        if (onItemsSelected) {
          onItemsSelected(selectedItems);
        }
      } else {
        _this.handleDeleteSelected(value, existValueIndex);
      }
    };

    _this.isSelected = function (value) {
      var selected = _this.state.selected;
      return (
        selected.findIndex(function (s) {
          return _lodash['default'].isEqual(s, value);
        }) > -1
      );
    };

    _this.handleChangeSearchText = function (e) {
      _this.setState(
        {
          searchTextValue: e.target.value,
        },
        function () {
          return _this.handleSearch();
        },
      );
    };

    _this.handleSearch = function () {
      var getNextPage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var onSearch = _this.props.onSearch;
      var _this$state = _this.state,
        searchTextValue = _this$state.searchTextValue,
        searchKey = _this$state.searchKey;

      if (onSearch) {
        _this.setState({
          isLoading: true,
        });

        onSearch(searchTextValue, searchKey, page)
          .then(function (result) {
            _this.setState({
              items: getNextPage ? _this.state.items.concat(result.items) : result.items,
              hasNextPage: result.hasNextPage,
              currentPage: result.page,
              isLoading: false,
              errorMessage: null,
            });
          })
          ['catch'](function (error) {
            _this.setState({
              isLoading: false,
              errorMessage: error.message,
            });

            console.error(error);
          });
      }
    };

    _this.handleDeleteSelected = function (item, index) {
      var newSelectedItems = (0, _immutabilityHelper['default'])(_this.state.selected, {
        $splice: [[index, 1]],
      });

      _this.setState({
        selected: newSelectedItems,
      });

      if (_this.props.onItemsSelected) {
        _this.props.onItemsSelected(newSelectedItems);
      }
    };

    _this.handleNextPage = function (page) {
      // console.log("Load Next Page");
      _this.handleSearch(true, page);
    };

    _this.getProperty = function (propName, item) {
      var fields = _this.props.fields;
      var propPath = fields[propName];

      if (propPath) {
        if (typeof propPath === 'function') {
          return propPath(item);
        }

        if (typeof propPath === 'string') {
          return (0, _utilities.getPropertyValue)(item, propPath);
        }
      }

      return null;
    };

    _this.getAvatar = function (item) {
      return _this.getProperty('avatar', item);
    };

    _this.getLabel = function (item) {
      var label = _this.getProperty('label', item);

      if (label) return label;
      return _this.getPrimary(item);
    };

    _this.getPrimary = function (item) {
      return _this.getProperty('primary', item);
    };

    _this.getIcon = function (item) {
      return _this.getProperty('icon', item);
    };

    _this.getSecondary = function (item) {
      return _this.getProperty('secondary', item);
    };

    _this.state = {
      isLoading: false,
      selected: props.value
        ? _lodash['default'].isArray(props.value)
          ? props.value
          : [props.value]
        : [],
      items: [],
      searchKey: props.searchKey,
      searchTextValue: '',
      currentPage: 0,
      hasNextPage: true,
      errorMessage: null,
    };
    return _this;
  }

  _createClass(SearchableList, [
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        if (this.state.items.length === 0) this.handleSearch();
      },
    },
    {
      key: 'render',
      value: function render() {
        var _this2 = this;

        var _this$props2 = this.props,
          classes = _this$props2.classes,
          listItemAction = _this$props2.listItemAction,
          searchKey = _this$props2.searchKey,
          isMulti = _this$props2.isMulti;
        var _this$state2 = this.state,
          items = _this$state2.items,
          hasNextPage = _this$state2.hasNextPage,
          selected = _this$state2.selected,
          isLoading = _this$state2.isLoading;
        var ListItemAction = listItemAction;

        if (!ListItemAction && isMulti) {
          ListItemAction = _core.Checkbox;
        }

        return /*#__PURE__*/ _react['default'].createElement(
          _core.Grid,
          {
            container: true,
            direction: 'column',
          },
          /*#__PURE__*/ _react['default'].createElement(
            _core.Grid,
            {
              item: true,
            },
            /*#__PURE__*/ _react['default'].createElement(_core.TextField, {
              id: 'standard-name',
              label:
                searchKey && searchKey.field.label
                  ? 'Search in '.concat(searchKey.field.label, ' ')
                  : 'Search',
              className: classes.textField,
              value: this.state.searchTextValue,
              onChange: this.handleChangeSearchText.bind(this),
              fullWidth: true,
              autoFocus: true,
              margin: 'none',
              InputProps: {
                classes: {
                  root: classes.inputContainer,
                  input: classes.input,
                },
                startAdornment: /*#__PURE__*/ _react['default'].createElement(
                  _core.InputAdornment,
                  {
                    position: 'start',
                    className: classes.valueContainer,
                  },
                  selected
                    ? selected.map(function (item, index) {
                        var chipProps = {
                          key: index,
                          label: _this2.getLabel(item),
                        };

                        var avatar = _this2.getAvatar(item);

                        if (avatar) {
                          chipProps.avatar = /*#__PURE__*/ _react['default'].createElement(
                            _core.Avatar,
                            {
                              src: avatar,
                            },
                          );
                        }

                        return /*#__PURE__*/ _react['default'].createElement(
                          _core.Chip,
                          _extends(
                            {
                              key: index,
                              className: classes.chip,
                              color: 'primary',
                              onDelete: _this2.handleDeleteSelected.bind(_this2, item, index),
                            },
                            chipProps,
                          ),
                        );
                      })
                    : null,
                ),
              },
            }),
          ),
          /*#__PURE__*/ _react['default'].createElement(
            _core.Grid,
            {
              item: true,
            },
            /*#__PURE__*/ _react['default'].createElement(
              _core.List,
              {
                className: classes.list,
              },
              /*#__PURE__*/ _react['default'].createElement(
                _reactInfiniteScroller['default'],
                {
                  pageStart: 0, //dataLength={items.length} //This is important field to render the next data
                  loadMore: this.handleNextPage.bind(this),
                  initialLoad: false,
                  hasMore: hasNextPage,
                  loader: isLoading
                    ? /*#__PURE__*/ _react['default'].createElement(
                        'h4',
                        {
                          key: 0,
                        },
                        'Loading...',
                      )
                    : null,
                  useWindow: false,
                },
                items
                  ? items.map(function (item, index) {
                      return /*#__PURE__*/ _react['default'].createElement(
                        _core.ListItem,
                        {
                          key: index,
                          button: true,
                          onClick: function onClick() {
                            return _this2.handleSelectItem(item);
                          },
                        },
                        _this2.getAvatar(item) &&
                          /*#__PURE__*/ _react['default'].createElement(
                            _core.ListItemAvatar,
                            null,
                            /*#__PURE__*/ _react['default'].createElement(_core.Avatar, {
                              alt: _this2.getLabel(item),
                              src: _this2.getAvatar(item),
                            }),
                          ),
                        _this2.getIcon(item) &&
                          /*#__PURE__*/ _react['default'].createElement(
                            _core.ListItemIcon,
                            null,
                            _this2.getIcon(item),
                          ),
                        /*#__PURE__*/ _react['default'].createElement(_core.ListItemText, {
                          primary: _this2.getPrimary(item),
                          secondary: _this2.getSecondary(item),
                        }),
                        ListItemAction &&
                          /*#__PURE__*/ _react['default'].createElement(
                            _core.ListItemSecondaryAction,
                            null,
                            /*#__PURE__*/ _react['default'].createElement(ListItemAction, {
                              onChange: function onChange() {
                                return _this2.handleSelectItem(item);
                              },
                              checked: _this2.isSelected(item),
                            }),
                          ),
                      );
                    })
                  : /*#__PURE__*/ _react['default'].createElement('div', null),
              ),
            ),
          ),
        );
      },
    },
  ]);

  return SearchableList;
})(_react.Component);

SearchableList.propTypes = {
  classes: _propTypes['default'].any,
  isMulti: _propTypes['default'].bool,
  onItemsSelected: _propTypes['default'].func,
  listItemAction: _propTypes['default'].node,
  searchKey: _propTypes['default'].object,
  value: _propTypes['default'].oneOfType([
    _propTypes['default'].arrayOf(_propTypes['default'].object),
    _propTypes['default'].object,
  ]),
  fields: _propTypes['default'].shape({
    id: _propTypes['default'].oneOfType([_propTypes['default'].string, _propTypes['default'].func])
      .isRequired,
    label: _propTypes['default'].oneOfType([
      _propTypes['default'].string,
      _propTypes['default'].func,
    ]),
    avatar: _propTypes['default'].oneOfType([
      _propTypes['default'].string,
      _propTypes['default'].func,
    ]),
    primary: _propTypes['default'].oneOfType([
      _propTypes['default'].string,
      _propTypes['default'].func,
    ]),
    secondary: _propTypes['default'].oneOfType([
      _propTypes['default'].string,
      _propTypes['default'].func,
    ]),
  }),
  items: _propTypes['default'].arrayOf(
    _propTypes['default'].shape({
      id: _propTypes['default'].number.isRequired,
      primary: _propTypes['default'].string.isRequired,
      avatarLabel: _propTypes['default'].string,
      secondary: _propTypes['default'].string,
      avatar: _propTypes['default'].node,
      icon: _propTypes['default'].node,
      action: _propTypes['default'].node,
    }),
  ),
};

var _default = (0, _styles.withStyles)(_searchableListStyle['default'])(SearchableList);

exports['default'] = _default;
