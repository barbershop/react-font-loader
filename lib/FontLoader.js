'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var createFontQuery = function createFontQuery(fontFamilyName, stylesArray) {
	var stylesString = stylesArray.join(',');
	var fontQuery = fontFamilyName + ':' + stylesString;
	if (stylesString.length === 0) return false;
	return fontQuery;
};

var checkLoadedFonts = function checkLoadedFonts(family, fonts) {
	var familyName = family.split(':')[0];
	var styles = family.split(':')[1].split(',');
	var stylesToLoad = [];
	styles.forEach(function (style, index) {
		var weight = style.charAt(0);
		var classification = style.charAt(3) || 'n';
		var styleToCheck = classification + weight;
		if (!(familyName + ' ' + styleToCheck in fonts) || familyName + ' ' + styleToCheck in fonts && fonts[familyName + ' ' + styleToCheck].subset) {
			stylesToLoad.push(styles[index]);
		}
	});
	var fontQuery = createFontQuery(familyName, stylesToLoad);
	return fontQuery;
};

var FontLoader = (function (_Component) {
	_inherits(FontLoader, _Component);

	function FontLoader() {
		_classCallCheck(this, FontLoader);

		_get(Object.getPrototypeOf(FontLoader.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(FontLoader, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _props = this.props;
			var fonts = _props.fonts;
			var fontProvider = _props.fontProvider;
			var fontFamilies = _props.fontFamilies;

			var stylesToLoad = [];

			if (fontFamilies) {
				fontFamilies.forEach(function (family) {
					var inactiveFonts = checkLoadedFonts(family, fonts);
					if (inactiveFonts) stylesToLoad.push(inactiveFonts);
				});
				if (stylesToLoad && stylesToLoad.length > 0) {
					this.loadFonts(fontProvider, stylesToLoad);
				}
			} else {
				this.loadFonts(fontProvider);
			}
		}
	}, {
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate() {
			return false;
		}
	}, {
		key: 'loadFonts',
		value: function loadFonts(fontProvider, stylesToLoad) {
			var _WebFont$load;

			var _props2 = this.props;
			var fontIsLoaded = _props2.fontIsLoaded;
			var fontLoadFailed = _props2.fontLoadFailed;
			var typekitId = _props2.typekitId;
			var customUrls = _props2.customUrls;
			var timeout = _props2.timeout;
			var text = _props2.text;

			var WebFont = require('webfontloader');

			WebFont.load((_WebFont$load = {}, _defineProperty(_WebFont$load, fontProvider, {
				families: stylesToLoad,
				id: typekitId,
				urls: customUrls || {},
				text: text
			}), _defineProperty(_WebFont$load, 'fontactive', function fontactive(familyName, fvd) {
				return fontIsLoaded(familyName, fvd, text);
			}), _defineProperty(_WebFont$load, 'fontinactive', function fontinactive(familyName, fvd) {
				return fontLoadFailed(familyName, fvd);
			}), _defineProperty(_WebFont$load, 'classes', false), _defineProperty(_WebFont$load, 'timeout', timeout || 3000), _WebFont$load));
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2['default'].createElement(
				'h1',
				null,
				'HALLO!'
			);
		}
	}]);

	return FontLoader;
})(_react.Component);

exports['default'] = FontLoader;

FontLoader.propTypes = {
	customUrls: _react.PropTypes.array,
	fontFamilies: _react.PropTypes.array,
	fontIsLoaded: _react.PropTypes.func,
	fontLoadFailed: _react.PropTypes.func,
	fontProvider: _react.PropTypes.string,
	fonts: _react.PropTypes.object,
	text: _react.PropTypes.string,
	timeout: _react.PropTypes.number,
	typekitId: _react.PropTypes.string
};
module.exports = exports['default'];