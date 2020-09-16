'use strict';

exports.__esModule = true;

var _splitAt2 = require('ramda/src/splitAt');

var _splitAt3 = _interopRequireDefault(_splitAt2);

var _zipObj2 = require('ramda/src/zipObj');

var _zipObj3 = _interopRequireDefault(_zipObj2);

var _lift2 = require('ramda/src/lift');

var _lift3 = _interopRequireDefault(_lift2);

var _apply2 = require('ramda/src/apply');

var _apply3 = _interopRequireDefault(_apply2);

var _compose2 = require('ramda/src/compose');

var _compose3 = _interopRequireDefault(_compose2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _papaparse = require('papaparse');

var _papaparse2 = _interopRequireDefault(_papaparse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CsvParse = function (_React$Component) {
  _inherits(CsvParse, _React$Component);

  function CsvParse() {
    var _temp, _this, _ret;

    _classCallCheck(this, CsvParse);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.handleFile = function (event) {
      var file = event.target.files[0];
      var keys = _this.props.keys;
      var onDataUploaded = _this.props.onDataUploaded;
      var onError = _this.props.onError;

      _papaparse2.default.parse(file, {
        skipEmptyLines: true,
        error: function error(err, file, inputElem, reason) {
          onError({ err: err, file: file, inputElem: inputElem, reason: reason });
        },
        complete: function complete(results) {
          var data = results.data;

          // remove display headers
          data.shift();

          // add api headers
          data.unshift(keys);

          // convert arrays to objects
          var formatedResult = (0, _compose3.default)((0, _apply3.default)((0, _lift3.default)(_zipObj3.default)), (0, _splitAt3.default)(1))(data);

          // send result to state
          onDataUploaded(formatedResult);
        }
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  CsvParse.prototype.render = function render() {
    return this.props.render(this.handleFile);
  };

  return CsvParse;
}(_react2.default.Component);

CsvParse.propTypes = process.env.NODE_ENV !== "production" ? {
  keys: _propTypes2.default.array.isRequired,
  onDataUploaded: _propTypes2.default.func.isRequired,
  onError: _propTypes2.default.func
} : {};

exports.default = CsvParse;
module.exports = exports['default'];