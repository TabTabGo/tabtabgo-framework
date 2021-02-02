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
exports.convertDraftToHtml = exports.convertHtmlToDraft = exports['default'] = void 0;

var _react = _interopRequireDefault(require('react'));

var _propTypes = _interopRequireDefault(require('prop-types'));

var _styles = require('@material-ui/core/styles');

var _draftJs = require('draft-js');

var _reactDraftWysiwyg = require('react-draft-wysiwyg');

var _draftjsToHtml = _interopRequireDefault(require('draftjs-to-html'));

var _htmlToDraftjs = _interopRequireDefault(require('html-to-draftjs'));

require('react-draft-wysiwyg/dist/react-draft-wysiwyg.css');

var _contentEditorStyle = _interopRequireDefault(require('./styles/contentEditorStyle.jsx'));

var _FormatBold = _interopRequireDefault(require('@material-ui/icons/FormatBold'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
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

var ContentEditor = /*#__PURE__*/ (function (_React$Component) {
  _inherits(ContentEditor, _React$Component);

  var _super = _createSuper(ContentEditor);

  function ContentEditor(props) {
    var _this;

    _classCallCheck(this, ContentEditor);

    _this = _super.call(this, props); //console.log("Content Editor", props);

    _this.setEditorReference = function (ref) {
      _this.editorReferece = ref;

      if (_this.props.autoFocus === true && ref) {
        ref.focus();
      }
    };

    _this.onEditorStateChange = function (editorState) {
      _this.setState(
        {
          editorState: editorState,
        },
        function () {
          if (_this.props.onChange && editorState) {
            _this.props.onChange(editorState);
          }
        },
      );
    };

    _this.state = {
      editorState: null,
    };
    return _this;
  }

  _createClass(
    ContentEditor,
    [
      {
        key: 'render',
        value: function render() {
          var classes = this.props.classes;
          var editorState = this.state.editorState;
          var optionToolbar = {
            // options: [
            //   "inline",
            //   "blockType",
            //   "list",
            //   "textAlign",
            //   'image',
            //   "remove",
            //   "history"
            // ],
            // blockType: {
            //   inDropdown: true,
            //   options: ["Normal", "H1", "H2", "H3", "H4", "H5", "H6", "Blockquote"]
            // }
            options: [
              'inline',
              'blockType',
              'fontSize',
              'fontFamily',
              'list',
              'textAlign',
              'colorPicker',
              'link',
              'embedded',
              'emoji',
              'image',
              'remove',
              'history',
            ],
            inline: {
              inDropdown: false,
              className: undefined,
              component: undefined,
              dropdownClassName: undefined,
              options: [
                'bold',
                'italic',
                'underline',
                'strikethrough',
                'monospace',
                'superscript',
                'subscript',
              ],
              bold: {
                icon: /*#__PURE__*/ _react['default'].createElement(_FormatBold['default'], null),
                className: undefined,
              }, //italic: { icon: italic, className: undefined },
              //underline: { icon: underline, className: undefined },
              //strikethrough: { icon: strikethrough, className: undefined },
              //monospace: { icon: monospace, className: undefined },
              //superscript: { icon: superscript, className: undefined },
              //subscript: { icon: subscript, className: undefined },
            },
            blockType: {
              inDropdown: true,
              options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
              className: undefined,
              component: undefined,
              dropdownClassName: undefined,
            },
            fontSize: {
              //icon: fontSize,
              options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
              className: undefined,
              component: undefined,
              dropdownClassName: undefined,
            },
            fontFamily: {
              options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'],
              className: undefined,
              component: undefined,
              dropdownClassName: undefined,
            },
            list: {
              inDropdown: false,
              className: undefined,
              component: undefined,
              dropdownClassName: undefined,
              options: ['unordered', 'ordered', 'indent', 'outdent'], //unordered: { icon: unordered, className: undefined },
              //ordered: { icon: ordered, className: undefined },
              //indent: { icon: indent, className: undefined },
              //outdent: { icon: outdent, className: undefined },
            },
            textAlign: {
              inDropdown: false,
              className: undefined,
              component: undefined,
              dropdownClassName: undefined,
              options: ['left', 'center', 'right', 'justify'], //left: { icon: left, className: undefined },
              //center: { icon: center, className: undefined },
              //right: { icon: right, className: undefined },
              //justify: { icon: justify, className: undefined },
            },
            colorPicker: {
              //icon: color,
              className: undefined,
              component: undefined,
              popupClassName: undefined,
              colors: [
                'rgb(97,189,109)',
                'rgb(26,188,156)',
                'rgb(84,172,210)',
                'rgb(44,130,201)',
                'rgb(147,101,184)',
                'rgb(71,85,119)',
                'rgb(204,204,204)',
                'rgb(65,168,95)',
                'rgb(0,168,133)',
                'rgb(61,142,185)',
                'rgb(41,105,176)',
                'rgb(85,57,130)',
                'rgb(40,50,78)',
                'rgb(0,0,0)',
                'rgb(247,218,100)',
                'rgb(251,160,38)',
                'rgb(235,107,86)',
                'rgb(226,80,65)',
                'rgb(163,143,132)',
                'rgb(239,239,239)',
                'rgb(255,255,255)',
                'rgb(250,197,28)',
                'rgb(243,121,52)',
                'rgb(209,72,65)',
                'rgb(184,49,47)',
                'rgb(124,112,107)',
                'rgb(209,213,216)',
              ],
            },
            link: {
              inDropdown: false,
              className: undefined,
              component: undefined,
              popupClassName: undefined,
              dropdownClassName: undefined,
              showOpenOptionOnHover: true,
              defaultTargetOption: '_self',
              options: ['link', 'unlink'],
              //link: { icon: link, className: undefined },
              //unlink: { icon: unlink, className: undefined },
              linkCallback: undefined,
            },
            emoji: {
              //icon: emoji,
              className: undefined,
              component: undefined,
              popupClassName: undefined,
              emojis: [
                '😀',
                '😁',
                '😂',
                '😃',
                '😉',
                '😋',
                '😎',
                '😍',
                '😗',
                '🤗',
                '🤔',
                '😣',
                '😫',
                '😴',
                '😌',
                '🤓',
                '😛',
                '😜',
                '😠',
                '😇',
                '😷',
                '😈',
                '👻',
                '😺',
                '😸',
                '😹',
                '😻',
                '😼',
                '😽',
                '🙀',
                '🙈',
                '🙉',
                '🙊',
                '👼',
                '👮',
                '🕵',
                '💂',
                '👳',
                '🎅',
                '👸',
                '👰',
                '👲',
                '🙍',
                '🙇',
                '🚶',
                '🏃',
                '💃',
                '⛷',
                '🏂',
                '🏌',
                '🏄',
                '🚣',
                '🏊',
                '⛹',
                '🏋',
                '🚴',
                '👫',
                '💪',
                '👈',
                '👉',
                '👉',
                '👆',
                '🖕',
                '👇',
                '🖖',
                '🤘',
                '🖐',
                '👌',
                '👍',
                '👎',
                '✊',
                '👊',
                '👏',
                '🙌',
                '🙏',
                '🐵',
                '🐶',
                '🐇',
                '🐥',
                '🐸',
                '🐌',
                '🐛',
                '🐜',
                '🐝',
                '🍉',
                '🍄',
                '🍔',
                '🍤',
                '🍨',
                '🍪',
                '🎂',
                '🍰',
                '🍾',
                '🍷',
                '🍸',
                '🍺',
                '🌍',
                '🚑',
                '⏰',
                '🌙',
                '🌝',
                '🌞',
                '⭐',
                '🌟',
                '🌠',
                '🌨',
                '🌩',
                '⛄',
                '🔥',
                '🎄',
                '🎈',
                '🎉',
                '🎊',
                '🎁',
                '🎗',
                '🏀',
                '🏈',
                '🎲',
                '🔇',
                '🔈',
                '📣',
                '🔔',
                '🎵',
                '🎷',
                '💰',
                '🖊',
                '📅',
                '✅',
                '❎',
                '💯',
              ],
            },
            embedded: {
              //icon: embedded,
              className: undefined,
              component: undefined,
              popupClassName: undefined,
              embedCallback: undefined,
              defaultSize: {
                height: 'auto',
                width: 'auto',
              },
            },
            image: {
              //icon: image,
              className: undefined,
              component: undefined,
              popupClassName: undefined,
              urlEnabled: true,
              uploadEnabled: true,
              alignmentEnabled: true,
              uploadCallback: function uploadCallback() {
                return {};
              },
              previewImage: false,
              inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
              alt: {
                present: false,
                mandatory: false,
              },
              defaultSize: {
                height: 'auto',
                width: 'auto',
              },
            },
            remove: {
              //icon: eraser,
              className: undefined,
              component: undefined,
            },
            history: {
              inDropdown: false,
              className: undefined,
              component: undefined,
              dropdownClassName: undefined,
              options: ['undo', 'redo'],
              undo: {
                //  icon: undo,
                className: undefined,
              },
              redo: {
                //icon: redo,
                className: undefined,
              },
            },
          };
          return /*#__PURE__*/ _react['default'].createElement(_reactDraftWysiwyg.Editor, {
            editorRef: this.setEditorReference,
            className: classes.root,
            editorState: editorState,
            wrapperClassName: classes.wrapper,
            editorClassName: classes.editor,
            toolbarClassName: classes.toolbar,
            toolbar: optionToolbar,
            textAlignment: 'left',
            stripPastedStyles: true,
            onEditorStateChange: this.onEditorStateChange.bind(this),
          });
        },
      },
    ],
    [
      {
        key: 'getDerivedStateFromProps',
        value: function getDerivedStateFromProps(props, state) {
          if (!state.editorState && props.content) {
            return {
              editorState: _draftJs.EditorState.createWithContent(
                (0, _draftJs.convertFromRaw)(props.content),
              ),
            };
          }

          return null;
        },
      },
    ],
  );

  return ContentEditor;
})(_react['default'].Component);

ContentEditor.propTypes = {
  content: _propTypes['default'].object,
  classes: _propTypes['default'].object,
  autoFocus: _propTypes['default'].bool,
  onChange: _propTypes['default'].func,
};

var _default = (0, _styles.withStyles)(_contentEditorStyle['default'])(ContentEditor);

exports['default'] = _default;

var convertHtmlToDraft = function convertHtmlToDraft(content) {
  if (content) {
    if (typeof content === 'string') {
      var contentBlock = (0, _htmlToDraftjs['default'])(content);
      return contentBlock
        ? _draftJs.EditorState.createWithContent(
            _draftJs.ContentState.createFromBlockArray(contentBlock),
          )
        : _draftJs.EditorState.createEmpty();
    } else {
      return content;
    }
  }

  return _draftJs.EditorState.createEmpty();
};

exports.convertHtmlToDraft = convertHtmlToDraft;

var convertDraftToHtml = function convertDraftToHtml(editorState) {
  var content = editorState.getCurrentContent();
  if (content) return (0, _draftjsToHtml['default'])((0, _draftJs.convertToRaw)(content));
  return '<p></p>';
};

exports.convertDraftToHtml = convertDraftToHtml;
