/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Index = __webpack_require__(10);

var _Index2 = _interopRequireDefault(_Index);

var _Api = __webpack_require__(17);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = [{
  path: '/',
  exact: true,
  component: _Index2.default,
  fetchAmiiboType: function fetchAmiiboType() {
    var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return (0, _Api.fetchAmiiboType)();
  },
  fetchAmiiboUniverse: function fetchAmiiboUniverse() {
    var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return (0, _Api.fetchAmiiboUniverse)();
  },
  fetchAmiiboElements: function fetchAmiiboElements() {
    var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return (0, _Api.fetchAmiiboElements)();
  }
}];

exports.default = routes;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("isomorphic-fetch");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(5);

var _express2 = _interopRequireDefault(_express);

var _cors = __webpack_require__(6);

var _cors2 = _interopRequireDefault(_cors);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(7);

var _reactRouterDom = __webpack_require__(1);

var _serializeJavascript = __webpack_require__(8);

var _serializeJavascript2 = _interopRequireDefault(_serializeJavascript);

var _App = __webpack_require__(9);

var _App2 = _interopRequireDefault(_App);

var _Routes = __webpack_require__(2);

var _Routes2 = _interopRequireDefault(_Routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use((0, _cors2.default)());
app.use(_express2.default.static("public"));

app.get("*", function (req, res, next) {
  var activeRoute = _Routes2.default.find(function (route) {
    return (0, _reactRouterDom.matchPath)(req.url, route);
  }) || {};

  var promiseOne = activeRoute.fetchAmiiboElements ? activeRoute.fetchAmiiboElements() : Promise.resolve();

  var promiseTwo = activeRoute.fetchAmiiboType ? activeRoute.fetchAmiiboType() : Promise.resolve();

  var promiseThree = activeRoute.fetchAmiiboUniverse ? activeRoute.fetchAmiiboUniverse() : Promise.resolve();

  var contextOne = promiseOne;
  var contextTwo = promiseTwo;
  var contextThree = promiseThree;

  promiseOne.then(function (data) {
    contextOne = data;
  }).catch(next);

  promiseTwo.then(function (data) {
    contextTwo = data;
  }).catch(next);

  promiseThree.then(function (data) {
    contextThree = data;
  }).catch(next);

  Promise.all([promiseOne, promiseTwo, promiseThree]).then(function (values) {

    var context = { contextOne: contextOne, contextTwo: contextTwo, contextThree: contextThree };

    var markup = (0, _server.renderToString)(_react2.default.createElement(
      _reactRouterDom.StaticRouter,
      { location: req.url, context: context },
      _react2.default.createElement(_App2.default, null)
    ));

    res.send("\n      <!DOCTYPE html>\n      <html>\n        <head>\n          <title>Amiibo</title>\n          <meta charset=\"utf-8\">\n          <link rel=\"shortcut icon\" href=\"img/mario.ico\">\n          <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0\">\n          <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">\n\n          <link href=\"https://fonts.googleapis.com/css?family=Roboto+Condensed:300,400,400i,700|Roboto:100,300,400,400i,500,700&amp;subset=cyrillic\" rel=\"stylesheet\">\n          <link rel=\"stylesheet\" href=\"https://use.fontawesome.com/releases/v5.5.0/css/all.css\" integrity=\"sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU\" crossorigin=\"anonymous\">\n\n          <script src=\"/bundle.js\" defer></script>\n          <script>window.__INITIAL_DATA__ = " + (0, _serializeJavascript2.default)(context) + "</script>\n          <link rel=\"stylesheet\" type=\"text/css\" href=\"/css/style.css\">\n          <link rel=\"stylesheet\" type=\"text/css\" href=\"/css/animation.css\">\n        </head>\n\n        <body>\n          <div class=\"\" id=\"rootElementLoader\"></div>\n          <div id=\"app\">" + markup + "</div>\n        </body>\n      </html>\n    ");
  }).catch(next);
});

app.listen(3000, function () {
  console.log("Server is listening on port: 3000");
});

/*
  1) Just get shared App rendering to string on server then taking over on client.
  2) Pass data to <App /> on server. Show diff. Add data to window then pick it up on the client too.
  3) Instead of static data move to dynamic data (github gists)
  4) add in routing.
*/

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("serialize-javascript");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Routes = __webpack_require__(2);

var _Routes2 = _interopRequireDefault(_Routes);

var _reactRouterDom = __webpack_require__(1);

var _NoMatch = __webpack_require__(18);

var _NoMatch2 = _interopRequireDefault(_NoMatch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_Component) {
  _inherits(App, _Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _reactRouterDom.Switch,
          null,
          _Routes2.default.map(function (_ref) {
            var path = _ref.path,
                exact = _ref.exact,
                Component = _ref.component,
                rest = _objectWithoutProperties(_ref, ['path', 'exact', 'component']);

            return _react2.default.createElement(_reactRouterDom.Route, { key: path, path: path, exact: exact, render: function render(props) {
                return _react2.default.createElement(Component, _extends({}, props, rest));
              } });
          }),
          _react2.default.createElement(_reactRouterDom.Route, { render: function render(props) {
              return _react2.default.createElement(_NoMatch2.default, props);
            } })
        )
      );
    }
  }]);

  return App;
}(_react.Component);

exports.default = App;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _ElementTitle = __webpack_require__(11);

var _ElementTitle2 = _interopRequireDefault(_ElementTitle);

var _ElementSearch = __webpack_require__(12);

var _ElementSearch2 = _interopRequireDefault(_ElementSearch);

var _ElementData = __webpack_require__(13);

var _ElementData2 = _interopRequireDefault(_ElementData);

var _ElementFooter = __webpack_require__(14);

var _ElementFooter2 = _interopRequireDefault(_ElementFooter);

var _isomorphicFetch = __webpack_require__(3);

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _Languages = __webpack_require__(16);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var baseUrl = 'http://www.amiiboapi.com';

var Home = function (_Component) {
  _inherits(Home, _Component);

  function Home(props) {
    _classCallCheck(this, Home);

    var _this = _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).call(this, props));

    _this.fetchAmiiboStart = _this.fetchAmiiboStart.bind(_this);
    _this.fetchAmiiboElements = _this.fetchAmiiboElements.bind(_this);
    _this.handleChangeType = _this.handleChangeType.bind(_this);
    _this.handleChangeUniverse = _this.handleChangeUniverse.bind(_this);
    _this.handleChangeSearch = _this.handleChangeSearch.bind(_this);
    _this.handleChangeLanguage = _this.handleChangeLanguage.bind(_this);

    _this.funFetchAmiiboElements = _this.funFetchAmiiboElements.bind(_this);

    var amiiboType = void 0;
    var amiiboUniverse = void 0;
    var amiiboElements = void 0;

    var languages = (0, _Languages.catalogueLanguages)('es');

    _this.state = {
      languages: languages,
      loading: false,
      amiiboType: amiiboType,
      amiiboUniverse: amiiboUniverse,
      amiiboElements: amiiboElements,
      selectType: null,
      selectUniverse: null,
      selectName: null,
      nofFound: [{
        image: '/img/notfound.png',
        name: '-',
        gameSeries: '-',
        character: '-',
        type: '-',
        release: {
          'au': '-',
          'eu': '-',
          'jp': '-',
          'na': '-'
        }
      }]
    };

    return _this;
  }

  _createClass(Home, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.fetchAmiiboStart();
      this.fetchAmiiboElements();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {

      if (prevState.loading !== this.state.loading) {

        var loading = this.state.loading;

        setTimeout(function () {
          document.getElementById("rootElementLoader").classList.remove("RootElementLoader");
        }.bind(this), 500);
      }
    }
  }, {
    key: 'fetchAmiiboStart',
    value: function fetchAmiiboStart() {
      var _this2 = this;

      this.props.fetchAmiiboType().then(function (data) {
        return _this2.setState(function () {
          return {
            amiiboType: data.amiibo
          };
        });
      });

      this.props.fetchAmiiboUniverse().then(function (data) {
        return _this2.setState(function () {
          return {
            amiiboUniverse: data.amiibo
          };
        });
      });
    }
  }, {
    key: 'fetchAmiiboElements',
    value: function fetchAmiiboElements() {
      var _this3 = this;

      this.setState(function () {
        return {
          loading: true
        };
      });

      document.getElementById("rootElementLoader").classList.add("RootElementLoader");

      var amiiboType = this.state.selectType;
      var amiiboUniverse = this.state.selectUniverse;
      var amiiboName = this.state.selectName;

      this.funFetchAmiiboElements(amiiboType, amiiboUniverse, amiiboName).then(function (data) {
        return _this3.setState(function () {
          return {
            amiiboElements: typeof data.amiibo === 'undefined' ? _this3.state.nofFound : data.amiibo,
            loading: false
          };
        });
      }).catch(function (error) {
        return _this3.setState(function () {
          return {
            amiiboElements: _this3.state.nofFound,
            loading: false
          };
        });
      });
    }
  }, {
    key: 'handleChangeType',
    value: function handleChangeType(e) {

      var type = e.target.value;

      var state = this.state;
      state['selectType'] = type;
      this.setState(state);

      this.fetchAmiiboElements();
    }
  }, {
    key: 'handleChangeUniverse',
    value: function handleChangeUniverse(e) {

      var univers = e.target.value;

      var state = this.state;
      state['selectUniverse'] = univers;
      this.setState(state);

      this.fetchAmiiboElements();
    }
  }, {
    key: 'handleChangeSearch',
    value: function handleChangeSearch(value) {

      var name = value;

      var state = this.state;
      state['selectName'] = name;
      this.setState(state);

      this.fetchAmiiboElements();
    }
  }, {
    key: 'handleChangeLanguage',
    value: function handleChangeLanguage(e) {

      var state = this.state;
      state['languages'] = (0, _Languages.catalogueLanguages)(e.target.id);
      this.setState(state);
    }
  }, {
    key: 'funFetchAmiiboElements',
    value: function funFetchAmiiboElements() {
      var amiiboType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var amiiboUniverse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var amiiboName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;


      var params = '';

      if (amiiboType !== null && amiiboType !== '') {
        params += this.concatGet(params);
        params += 'type=' + amiiboType;
      }

      if (amiiboUniverse !== null && amiiboUniverse !== '') {
        params += this.concatGet(params);
        params += 'gameseries=' + amiiboUniverse;
      }

      if (amiiboName !== null && amiiboName !== '') {
        params += this.concatGet(params);
        params += 'name=' + amiiboName;
      }

      var encodedURI = encodeURI(baseUrl + '/api/amiibo/' + params);

      return (0, _isomorphicFetch2.default)(encodedURI).then(function (data) {
        return data.json();
      }).catch(function (error) {
        console.warn(error);
        return null;
      });
    }
  }, {
    key: 'concatGet',
    value: function concatGet(string) {

      var newParam = '&';

      if (string.length === 0) {
        newParam = '?';
      }

      return newParam;
    }
  }, {
    key: 'render',
    value: function render() {

      var staticContext = this.props.staticContext;

      var handleChangeLanguage = this.handleChangeLanguage;

      var amiiboType = this.state.amiiboType;
      var amiiboUniverse = this.state.amiiboUniverse;
      var amiiboElements = this.state.amiiboElements;
      var handleChangeType = this.handleChangeType;
      var handleChangeUniverse = this.handleChangeUniverse;
      var handleChangeSearch = this.handleChangeSearch;
      var loading = this.state.loading;

      var languages = this.state.languages;

      return _react2.default.createElement(
        'div',
        { className: 'container' },
        _react2.default.createElement(_ElementTitle2.default, {
          handleChangeLanguage: handleChangeLanguage
        }),
        _react2.default.createElement(_ElementSearch2.default, {
          staticContext: staticContext,
          amiiboType: amiiboType,
          amiiboUniverse: amiiboUniverse,
          handleChangeType: handleChangeType,
          handleChangeUniverse: handleChangeUniverse,
          handleChangeSearch: handleChangeSearch,
          languages: languages
        }),
        _react2.default.createElement(_ElementData2.default, {
          staticContext: staticContext,
          amiiboElements: amiiboElements,
          languages: languages
        }),
        _react2.default.createElement(_ElementFooter2.default, null)
      );
    }
  }]);

  return Home;
}(_react.Component);

exports.default = Home;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ElementTitle = function (_Component) {
  _inherits(ElementTitle, _Component);

  function ElementTitle(props) {
    _classCallCheck(this, ElementTitle);

    return _possibleConstructorReturn(this, (ElementTitle.__proto__ || Object.getPrototypeOf(ElementTitle)).call(this, props));
  }

  _createClass(ElementTitle, [{
    key: "render",
    value: function render() {

      var handleChangeLanguage = this.props.handleChangeLanguage;

      return _react2.default.createElement(
        "div",
        { className: "containerTitle" },
        _react2.default.createElement(
          "div",
          { className: "logo" },
          _react2.default.createElement(
            "a",
            { href: "https://www.nintendo.com/" },
            _react2.default.createElement("img", { src: "img/nintendo.png", className: "elementImg" })
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "languages" },
          _react2.default.createElement(
            "div",
            { className: "contentButtonLanguages" },
            _react2.default.createElement(
              "button",
              { className: "buttonLanguages", id: "es", onClick: handleChangeLanguage },
              "ES"
            ),
            _react2.default.createElement(
              "button",
              { className: "buttonLanguages", id: "en", onClick: handleChangeLanguage },
              "ENG"
            )
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "logo" },
          _react2.default.createElement(
            "a",
            { href: "https://www.nintendo.com/amiibo/" },
            _react2.default.createElement("img", { src: "img/amiibo.png", className: "elementImg" })
          )
        )
      );
    }
  }]);

  return ElementTitle;
}(_react.Component);

exports.default = ElementTitle;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ElementSearch = function (_Component) {
  _inherits(ElementSearch, _Component);

  function ElementSearch(props) {
    _classCallCheck(this, ElementSearch);

    var _this = _possibleConstructorReturn(this, (ElementSearch.__proto__ || Object.getPrototypeOf(ElementSearch)).call(this, props));

    var amiiboType = void 0;
    if (false) {
      var temp = window.__INITIAL_DATA__;
      amiiboType = temp.contextTwo.amiibo;
    } else {
      amiiboType = _this.props.staticContext.contextTwo.amiibo;
    }

    var amiiboUniverse = void 0;
    if (false) {
      var temp = window.__INITIAL_DATA__;
      amiiboUniverse = temp.contextThree.amiibo;
    } else {
      amiiboUniverse = _this.props.staticContext.contextThree.amiibo;
    }

    _this.state = {
      amiiboType: amiiboType,
      amiiboUniverse: amiiboUniverse
    };

    return _this;
  }

  _createClass(ElementSearch, [{
    key: "componentDidMount",
    value: function componentDidMount() {

      var handleChangeSearch = this.props.handleChangeSearch;

      var node = document.getElementById("idSearch");
      node.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
          handleChangeSearch(node.value);
        }
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevProps.amiiboType !== this.props.amiiboType) {
        this.setState({
          amiiboType: this.props.amiiboType
        });
      }
      if (prevProps.amiiboUniverse !== this.props.amiiboUniverse) {
        this.setState({
          amiiboUniverse: this.props.amiiboUniverse
        });
      }
    }
  }, {
    key: "render",
    value: function render() {

      var handleChangeType = this.props.handleChangeType;
      var handleChangeUniverse = this.props.handleChangeUniverse;

      var amiiboType = this.state.amiiboType;
      var amiiboUniverse = this.state.amiiboUniverse;

      var languages = this.props.languages;

      return _react2.default.createElement(
        "div",
        { className: "containerSearch" },
        _react2.default.createElement(
          "div",
          { className: "elementSearch" },
          _react2.default.createElement(
            "div",
            { className: "elementSearchContainer" },
            _react2.default.createElement("i", { className: "fas fa-search iconSearch" }),
            _react2.default.createElement("input", { className: "inputSearch", type: "text", name: "search", placeholder: languages.searchPlaceSerach, id: "idSearch" })
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "elementSearch elementSearchTag" },
          _react2.default.createElement(
            "span",
            null,
            languages.searchTagType,
            ": "
          ),
          _react2.default.createElement(
            "select",
            { className: "inputSelect", onChange: handleChangeType },
            _react2.default.createElement("option", null),
            amiiboType.map(function (_ref) {
              var key = _ref.key,
                  name = _ref.name;
              return _react2.default.createElement(
                "option",
                { value: key, key: key },
                name
              );
            })
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "elementSearch elementSearchTag" },
          _react2.default.createElement(
            "span",
            null,
            languages.searchTagUniverse,
            ": "
          ),
          _react2.default.createElement(
            "select",
            { className: "inputSelect", onChange: handleChangeUniverse },
            _react2.default.createElement("option", null),
            amiiboUniverse.map(function (_ref2) {
              var key = _ref2.key,
                  name = _ref2.name;
              return _react2.default.createElement(
                "option",
                { value: key, key: key },
                name
              );
            })
          )
        )
      );
    }
  }]);

  return ElementSearch;
}(_react.Component);

exports.default = ElementSearch;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ElementData = function (_Component) {
  _inherits(ElementData, _Component);

  function ElementData(props) {
    _classCallCheck(this, ElementData);

    var _this = _possibleConstructorReturn(this, (ElementData.__proto__ || Object.getPrototypeOf(ElementData)).call(this, props));

    _this.handleClickLeft = _this.handleClickLeft.bind(_this);
    _this.handleClickRight = _this.handleClickRight.bind(_this);

    var amiiboElements = void 0;
    if (false) {
      var temp = window.__INITIAL_DATA__;
      amiiboElements = temp.contextOne.amiibo;
    } else {
      amiiboElements = _this.props.staticContext.contextOne.amiibo;
    }

    var int = [{
      name: '-',
      gameSeries: '-',
      character: '-',
      type: '-',
      release: {
        'au': '-',
        'eu': '-',
        'jp': '-',
        'na': '-'
      }
    }];

    amiiboElements = Array.isArray(amiiboElements) ? amiiboElements : int;

    _this.state = {
      amiiboElements: amiiboElements,
      amiiboIndex: 0,
      animateClass: ''
    };
    return _this;
  }

  _createClass(ElementData, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {

      if (prevState.amiiboIndex !== this.state.amiiboIndex) {
        var state = this.state;
        state['animateClass'] = 'figure-animation';
        setTimeout(function () {
          this.setState(state);
        }.bind(this), 5);
      }

      if (prevProps.amiiboElements !== this.props.amiiboElements) {

        this.setState({
          amiiboElements: this.props.amiiboElements,
          amiiboIndex: 0
        });
      }
    }
  }, {
    key: 'handleClickLeft',
    value: function handleClickLeft() {

      var amiiboIndex = this.state.amiiboIndex - 1;
      var amiiboElements = this.state.amiiboElements;

      if (amiiboIndex < 0) {
        amiiboIndex = amiiboElements.length - 1;
      }

      this.setState(function () {
        return {
          amiiboIndex: amiiboIndex,
          animateClass: ''
        };
      });
    }
  }, {
    key: 'handleClickRight',
    value: function handleClickRight() {

      var amiiboIndex = this.state.amiiboIndex + 1;
      var amiiboElements = this.state.amiiboElements;

      if (amiiboIndex === amiiboElements.length) {
        amiiboIndex = 0;
      }

      this.setState(function () {
        return {
          amiiboIndex: amiiboIndex,
          animateClass: ''
        };
      });
    }
  }, {
    key: 'render',
    value: function render() {

      var animateClass = this.state.animateClass;

      var totalEle = this.state.amiiboElements.length;
      var index = this.state.amiiboIndex;
      var name = this.state.amiiboElements[index].name;
      var univers = this.state.amiiboElements[index].gameSeries;
      var character = this.state.amiiboElements[index].character;
      var release = this.state.amiiboElements[index].release;
      var type = this.state.amiiboElements[index].type;

      var image = this.state.amiiboElements[index].image;

      var languages = this.props.languages;

      return _react2.default.createElement(
        'div',
        { className: 'containerContent' },
        _react2.default.createElement(
          'div',
          { className: 'containerData' },
          _react2.default.createElement(
            'div',
            { className: 'tableData' },
            _react2.default.createElement(
              'figure',
              null,
              _react2.default.createElement(
                'div',
                { className: 'text' },
                _react2.default.createElement(
                  'div',
                  { className: 'name' },
                  languages.dataTagName,
                  ' :'
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'value' },
                  name
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'text' },
                _react2.default.createElement(
                  'div',
                  { className: 'name' },
                  languages.dataTagUniverse,
                  ' :'
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'value' },
                  univers
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'text' },
                _react2.default.createElement(
                  'div',
                  { className: 'name' },
                  languages.dataTagCharacter,
                  ' :'
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'value' },
                  character
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'text' },
                _react2.default.createElement(
                  'div',
                  { className: 'name' },
                  languages.dataTagType,
                  ' :'
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'value' },
                  type
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'text' },
                _react2.default.createElement(
                  'div',
                  { className: 'name' },
                  languages.dataTagRelease,
                  ' :'
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'value' },
                  _react2.default.createElement(
                    'div',
                    null,
                    'au : ',
                    release.au === null ? '-' : release.au
                  ),
                  _react2.default.createElement(
                    'div',
                    null,
                    'eu : ',
                    release.eu === null ? '-' : release.eu
                  ),
                  _react2.default.createElement(
                    'div',
                    null,
                    'jp : ',
                    release.jp === null ? '-' : release.jp
                  ),
                  _react2.default.createElement(
                    'div',
                    null,
                    'na : ',
                    release.na === null ? '-' : release.na
                  )
                )
              )
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'containerFigure' },
          _react2.default.createElement(
            'div',
            { className: 'containerCounter' },
            index + 1,
            ' / ',
            totalEle
          ),
          _react2.default.createElement(
            'div',
            { className: 'figureArrow figureArrowLeft', onClick: this.handleClickLeft },
            _react2.default.createElement('i', { className: 'fas fa-chevron-circle-left' })
          ),
          _react2.default.createElement(
            'div',
            { className: 'figureElement ' + animateClass, id: 'animateFigure' },
            _react2.default.createElement('img', { src: image })
          ),
          _react2.default.createElement(
            'div',
            { className: 'figureArrow figureArrowRight', onClick: this.handleClickRight },
            _react2.default.createElement('i', { className: 'fas fa-chevron-circle-right' })
          )
        )
      );
    }
  }]);

  return ElementData;
}(_react.Component);

exports.default = ElementData;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactSound = __webpack_require__(15);

var _reactSound2 = _interopRequireDefault(_reactSound);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ElementFooter = function (_Component) {
  _inherits(ElementFooter, _Component);

  function ElementFooter(props) {
    _classCallCheck(this, ElementFooter);

    var _this = _possibleConstructorReturn(this, (ElementFooter.__proto__ || Object.getPrototypeOf(ElementFooter)).call(this, props));

    _this.handleMuteSound = _this.handleMuteSound.bind(_this);

    _this.state = {
      flagAudio: null,
      volume: 100
    };

    return _this;
  }

  _createClass(ElementFooter, [{
    key: 'componentDidMount',
    value: function componentDidMount() {

      setTimeout(function () {
        //Start the timer
        document.getElementById("en").click();
        this.setState({ flagAudio: _reactSound2.default.status.PLAYING });
      }.bind(this), 5000);
    }
  }, {
    key: 'handleMuteSound',
    value: function handleMuteSound() {

      var volume = this.state.volume;

      if (volume === 100) {
        volume = 1;
      } else {
        volume = 100;
      }

      this.setState({ volume: volume });
    }
  }, {
    key: 'render',
    value: function render() {

      var flagAudio = this.state.flagAudio;
      var volume = this.state.volume;

      return _react2.default.createElement(
        'div',
        { className: 'containerFooter' },
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            { className: 'containerSound', onClick: this.handleMuteSound },
            volume !== 1 && _react2.default.createElement('i', { className: 'fas fa-volume-up' }),
            volume === 1 && _react2.default.createElement('i', { className: 'fas fa-volume-mute' })
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'containerBranch' },
          '\xA9 2018 Efryend corporation'
        ),
        _react2.default.createElement(
          'div',
          null,
          this.state.flagAudio != null && _react2.default.createElement(_reactSound2.default, {
            url: 'sound/main.mp3',
            playStatus: this.state.flagAudio,

            volume: this.state.volume,
            autoLoad: true
          })
        )
      );
    }
  }]);

  return ElementFooter;
}(_react.Component);

exports.default = ElementFooter;

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("react-sound");

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.catalogueLanguages = catalogueLanguages;
function catalogueLanguages(languages) {

	var response = null;

	var spanish = {
		searchPlaceSerach: 'Buscar',
		searchTagType: 'Tipo',
		searchTagUniverse: 'Universo',
		dataTagName: 'Nombre',
		dataTagUniverse: 'Universo',
		dataTagCharacter: 'Personaje',
		dataTagType: 'Tipo',
		dataTagRelease: 'Lanzamientos'
	};

	var english = {
		searchPlaceSerach: 'Search',
		searchTagType: 'Type',
		searchTagUniverse: 'Universe',
		dataTagName: 'Name',
		dataTagUniverse: 'Universe',
		dataTagCharacter: 'Character',
		dataTagType: 'Type',
		dataTagRelease: 'Releases'
	};

	if (languages === 'es') response = spanish;else if (languages === 'en') response = english;

	return response;
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.fetchAmiiboType = fetchAmiiboType;
exports.fetchAmiiboUniverse = fetchAmiiboUniverse;
exports.fetchAmiiboElements = fetchAmiiboElements;

var _isomorphicFetch = __webpack_require__(3);

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var baseUrl = 'http://www.amiiboapi.com';

function fetchAmiiboType() {
	var encodedURI = encodeURI(baseUrl + '/api/type');

	console.log(encodedURI);

	return (0, _isomorphicFetch2.default)(encodedURI).then(function (data) {
		return data.json();
	}).catch(function (error) {
		console.warn(error);
		return null;
	});
}

function fetchAmiiboUniverse() {
	var encodedURI = encodeURI(baseUrl + '/api/amiiboseries');

	console.log(encodedURI);

	return (0, _isomorphicFetch2.default)(encodedURI).then(function (data) {
		return data.json();
	}).catch(function (error) {
		console.warn(error);
		return null;
	});
}

function fetchAmiiboElements() {
	var amiiboType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	var amiiboUniverse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	var amiiboName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;


	var params = '';

	console.log('API');
	console.log(amiiboType);

	if (amiiboType !== null && amiiboType !== '') {
		params += concatGet(params);
		params += 'type=' + amiiboType;
	}

	var encodedURI = encodeURI(baseUrl + '/api/amiibo/' + params);

	console.log('hola');
	console.log(encodedURI);

	return (0, _isomorphicFetch2.default)(encodedURI).then(function (data) {
		return data.json();
	}).catch(function (error) {
		console.warn(error);
		return null;
	});
}

function concatGet(string) {

	var newParam = '&';

	if (string.length === 0) {
		newParam = '?';
	}

	return newParam;
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = NoMatch;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function NoMatch() {
  return _react2.default.createElement(
    'div',
    null,
    'Not found'
  );
}

/***/ })
/******/ ]);