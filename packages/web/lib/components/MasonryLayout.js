'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _react = _interopRequireDefault(require('react'));

var _propTypes = _interopRequireDefault(require('prop-types'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var MasonryLayout = function MasonryLayout(props) {
  var columnWrapper = {};
  var result = [];

  for (var i = 0; i < props.columns; i++) {
    columnWrapper['column'.concat(i)] = [];
  }

  for (var _i = 0; _i < props.children.length; _i++) {
    var columnIndex = _i % props.columns;
    columnWrapper['column'.concat(columnIndex)].push(
      /*#__PURE__*/ _react['default'].createElement(
        'div',
        {
          key: 'column'.concat(_i),
          style: {
            marginBottom: ''.concat(props.gap, 'px'),
          },
        },
        props.children[_i],
      ),
    );
  }

  for (var _i2 = 0; _i2 < props.columns; _i2++) {
    result.push(
      /*#__PURE__*/ _react['default'].createElement(
        'div',
        {
          key: 'result'.concat(_i2),
          style: {
            marginLeft: ''.concat(_i2 > 0 ? props.gap : 0, 'px'),
            flex: '1 1 100%',
          },
        },
        columnWrapper['column'.concat(_i2)],
      ),
    );
  }

  return /*#__PURE__*/ _react['default'].createElement(
    'div',
    {
      style: {
        display: 'flex',
      },
    },
    result,
  );
};

MasonryLayout.propTypes = {
  columns: _propTypes['default'].number.isRequired,
  gap: _propTypes['default'].number.isRequired,
  children: _propTypes['default'].arrayOf(_propTypes['default'].element),
};
MasonryLayout.defaultProps = {
  columns: 2,
  gap: 20,
};
var _default = MasonryLayout;
exports['default'] = _default;
