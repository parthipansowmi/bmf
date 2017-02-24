require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  __webpack_require__(3);
  
  var _path = __webpack_require__(4);
  
  var _path2 = _interopRequireDefault(_path);
  
  var _express = __webpack_require__(5);
  
  var _express2 = _interopRequireDefault(_express);
  
  var _cookieParser = __webpack_require__(6);
  
  var _cookieParser2 = _interopRequireDefault(_cookieParser);
  
  var _bodyParser = __webpack_require__(7);
  
  var _bodyParser2 = _interopRequireDefault(_bodyParser);
  
  var _expressJwt = __webpack_require__(8);
  
  var _expressJwt2 = _interopRequireDefault(_expressJwt);
  
  var _expressGraphql = __webpack_require__(9);
  
  var _expressGraphql2 = _interopRequireDefault(_expressGraphql);
  
  var _jsonwebtoken = __webpack_require__(10);
  
  var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
  
  var _server = __webpack_require__(11);
  
  var _server2 = _interopRequireDefault(_server);
  
  var _universalRouter = __webpack_require__(12);
  
  var _prettyError = __webpack_require__(13);
  
  var _prettyError2 = _interopRequireDefault(_prettyError);
  
  var _passport = __webpack_require__(14);
  
  var _passport2 = _interopRequireDefault(_passport);
  
  var _models = __webpack_require__(17);
  
  var _models2 = _interopRequireDefault(_models);
  
  var _schema = __webpack_require__(25);
  
  var _schema2 = _interopRequireDefault(_schema);
  
  var _routes = __webpack_require__(42);
  
  var _routes2 = _interopRequireDefault(_routes);
  
  var _assets = __webpack_require__(235);
  
  var _assets2 = _interopRequireDefault(_assets);
  
  var _config = __webpack_require__(20);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var mongodb = __webpack_require__(256); // eslint-disable-line import/no-unresolved
  
  //import UniversalRouter from 'universal-router';
  
  var session = __webpack_require__(257);
  
  var app = (0, _express2.default)();
  app.use(session({
    secret: '1234567890QWERTY',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }));
  
  //
  // Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
  // user agent is not known.
  // -----------------------------------------------------------------------------
  global.navigator = global.navigator || {};
  global.navigator.userAgent = global.navigator.userAgent || 'all';
  
  //
  // Register Node.js middleware
  // -----------------------------------------------------------------------------
  app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));
  app.use((0, _cookieParser2.default)());
  app.use(_bodyParser2.default.urlencoded({ extended: true }));
  app.use(_bodyParser2.default.json());
  
  //
  // Authentication
  // -----------------------------------------------------------------------------
  app.use((0, _expressJwt2.default)({
    secret: _config.auth.jwt.secret,
    credentialsRequired: false,
    /* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */
    getToken: function getToken(req) {
      return req.cookies.id_token;
    }
  }));
  app.use(_passport2.default.initialize());
  
  app.get('/login/facebook', _passport2.default.authenticate('facebook', { scope: ['email', 'user_location'], session: false }));
  app.get('/login/facebook/return', _passport2.default.authenticate('facebook', { failureRedirect: '/login', session: false }), function (req, res) {
    var expiresIn = 60 * 60 * 24 * 180; // 180 days
    var token = _jsonwebtoken2.default.sign(req.user, _config.auth.jwt.secret, { expiresIn: expiresIn });
    res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
    res.redirect('/');
  });
  
  //
  // Register API middleware
  // -----------------------------------------------------------------------------
  app.use('/graphql', (0, _expressGraphql2.default)(function (req) {
    return {
      schema: _schema2.default,
      graphiql: true,
      rootValue: { request: req },
      pretty: ("production") !== 'production'
    };
  }));
  
  //
  // Register server-side rendering middleware
  // -----------------------------------------------------------------------------
  app.get('*', function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res, next) {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              return _context2.delegateYield(_regenerator2.default.mark(function _callee() {
                var css, statusCode, template, data;
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        css = [];
                        statusCode = 200;
                        template = __webpack_require__(258); // eslint-disable-line global-require
  
                        data = { title: '', description: '', user: '', css: '', body: '', entry: 'assets.main.js' }; //assets.main.js
                        //var sess = req.session;
  
                        if (true) {
                          data.trackingId = _config.analytics.google.trackingId;
                        }
  
                        _context.next = 7;
                        return (0, _universalRouter.resolve)(_routes2.default, {
                          path: req.path,
                          query: req.query,
  
                          context: {
                            insertCss: function insertCss(styles) {
                              return css.push(styles._getCss());
                            }, // eslint-disable-line no-underscore-dangle
                            setTitle: function setTitle(value) {
                              return data.title = value;
                            },
                            setUser: function setUser(value) {
                              return data.user = value;
                            },
                            setMeta: function setMeta(key, value) {
                              return data[key] = value;
                            },
                            getUser: function getUser(key) {
                              return data[key];
                            }
                          },
                          render: function render(component) {
                            var status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;
  
                            css = [];
                            statusCode = status;
                            data.body = _server2.default.renderToString(component);
                            data.css = css.join('');
                            return true;
                          }
                        });
  
                      case 7:
  
                        res.status(statusCode);
                        res.send(template(data));
  
                      case 9:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              })(), 't0', 2);
  
            case 2:
              _context2.next = 7;
              break;
  
            case 4:
              _context2.prev = 4;
              _context2.t1 = _context2['catch'](0);
  
              next(_context2.t1);
  
            case 7:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined, [[0, 4]]);
    }));
  
    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }());
  
  //
  // Error handling
  // -----------------------------------------------------------------------------
  var pe = new _prettyError2.default();
  pe.skipNodeFiles();
  pe.skipPackage('express');
  
  app.use(function (err, req, res, next) {
    // eslint-disable-line no-unused-vars
    console.log(pe.render(err)); // eslint-disable-line no-console
    var template = __webpack_require__(260); // eslint-disable-line global-require
    var statusCode = err.status || 500;
    res.status(statusCode);
    res.send(template({
      message: err.message,
      stack:  true ? '' : err.stack
    }));
  });
  
  // Launch the server
  // -----------------------------------------------------------------------------
  /* eslint-disable no-console */
  _models2.default.sync().catch(function (err) {
    return console.error(err.stack);
  }).then(function () {
    app.listen(_config.port, function () {
      console.log('The server is running at http://localhost:' + _config.port + '/');
    });
  });
  /* eslint-enable no-console */

/***/ },
/* 1 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/regenerator");

/***/ },
/* 2 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/asyncToGenerator");

/***/ },
/* 3 */
/***/ function(module, exports) {

  module.exports = require("babel-polyfill");

/***/ },
/* 4 */
/***/ function(module, exports) {

  module.exports = require("path");

/***/ },
/* 5 */
/***/ function(module, exports) {

  module.exports = require("express");

/***/ },
/* 6 */
/***/ function(module, exports) {

  module.exports = require("cookie-parser");

/***/ },
/* 7 */
/***/ function(module, exports) {

  module.exports = require("body-parser");

/***/ },
/* 8 */
/***/ function(module, exports) {

  module.exports = require("express-jwt");

/***/ },
/* 9 */
/***/ function(module, exports) {

  module.exports = require("express-graphql");

/***/ },
/* 10 */
/***/ function(module, exports) {

  module.exports = require("jsonwebtoken");

/***/ },
/* 11 */
/***/ function(module, exports) {

  module.exports = require("react-dom/server");

/***/ },
/* 12 */
/***/ function(module, exports) {

  module.exports = require("universal-router");

/***/ },
/* 13 */
/***/ function(module, exports) {

  module.exports = require("pretty-error");

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _passport = __webpack_require__(15);
  
  var _passport2 = _interopRequireDefault(_passport);
  
  var _passportFacebook = __webpack_require__(16);
  
  var _models = __webpack_require__(17);
  
  var _config = __webpack_require__(20);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * Sign in with Facebook.
   */
  
  
  /**
   * Passport.js reference implementation.
   * The database schema used in this sample is available at
   * https://github.com/membership/membership.db/tree/master/postgres
   */
  
  _passport2.default.use(new _passportFacebook.Strategy({
    clientID: _config.auth.facebook.id,
    clientSecret: _config.auth.facebook.secret,
    callbackURL: '/login/facebook/return',
    profileFields: ['name', 'email', 'link', 'locale', 'timezone'],
    passReqToCallback: true
  }, function (req, accessToken, refreshToken, profile, done) {
    /* eslint-disable no-underscore-dangle */
    var loginName = 'facebook';
    var claimType = 'urn:facebook:access_token';
    var fooBar = function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var userLogin, user, users, _user;
  
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!req.user) {
                  _context.next = 14;
                  break;
                }
  
                _context.next = 3;
                return _models.UserLogin.findOne({
                  attributes: ['name', 'key'],
                  where: { name: loginName, key: profile.id }
                });
  
              case 3:
                userLogin = _context.sent;
  
                if (!userLogin) {
                  _context.next = 8;
                  break;
                }
  
                // There is already a Facebook account that belongs to you.
                // Sign in with that account or delete it, then link it with your current account.
                done();
                _context.next = 12;
                break;
  
              case 8:
                _context.next = 10;
                return _models.User.create({
                  id: req.user.id,
                  email: profile._json.email,
                  logins: [{ name: loginName, key: profile.id }],
                  claims: [{ type: claimType, value: profile.id }],
                  profile: {
                    displayName: profile.displayName,
                    gender: profile._json.gender,
                    picture: 'https://graph.facebook.com/' + profile.id + '/picture?type=large'
                  }
                }, {
                  include: [{ model: _models.UserLogin, as: 'logins' }, { model: _models.UserClaim, as: 'claims' }, { model: _models.UserProfile, as: 'profile' }]
                });
  
              case 10:
                user = _context.sent;
  
                done(null, {
                  id: user.id,
                  email: user.email
                });
  
              case 12:
                _context.next = 32;
                break;
  
              case 14:
                _context.next = 16;
                return _models.User.findAll({
                  attributes: ['id', 'email'],
                  where: { '$logins.name$': loginName, '$logins.key$': profile.id },
                  include: [{
                    attributes: ['name', 'key'],
                    model: _models.UserLogin,
                    as: 'logins',
                    required: true
                  }]
                });
  
              case 16:
                users = _context.sent;
  
                if (!users.length) {
                  _context.next = 21;
                  break;
                }
  
                done(null, users[0]);
                _context.next = 32;
                break;
  
              case 21:
                _context.next = 23;
                return _models.User.findOne({ where: { email: profile._json.email } });
  
              case 23:
                _user = _context.sent;
  
                if (!_user) {
                  _context.next = 28;
                  break;
                }
  
                // There is already an account using this email address. Sign in to
                // that account and link it with Facebook manually from Account Settings.
                done(null);
                _context.next = 32;
                break;
  
              case 28:
                _context.next = 30;
                return _models.User.create({
                  email: profile._json.email,
                  emailVerified: true,
                  logins: [{ name: loginName, key: profile.id }],
                  claims: [{ type: claimType, value: accessToken }],
                  profile: {
                    displaynName: profile.displayName,
                    gender: profile._json.gender,
                    picture: 'https://graph.facebook.com/' + profile.id + '/picture?type=large'
                  }
                }, {
                  include: [{ model: _models.UserLogin, as: 'logins' }, { model: _models.UserClaim, as: 'claims' }, { model: _models.UserProfile, as: 'profile' }]
                });
  
              case 30:
                _user = _context.sent;
  
                done(null, {
                  id: _user.id,
                  email: _user.email
                });
  
              case 32:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));
  
      return function fooBar() {
        return _ref.apply(this, arguments);
      };
    }();
  
    fooBar().catch(done);
  }));
  
  exports.default = _passport2.default;

/***/ },
/* 15 */
/***/ function(module, exports) {

  module.exports = require("passport");

/***/ },
/* 16 */
/***/ function(module, exports) {

  module.exports = require("passport-facebook");

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.UserProfile = exports.UserClaim = exports.UserLogin = exports.User = undefined;
  
  var _sequelize = __webpack_require__(18);
  
  var _sequelize2 = _interopRequireDefault(_sequelize);
  
  var _User = __webpack_require__(21);
  
  var _User2 = _interopRequireDefault(_User);
  
  var _UserLogin = __webpack_require__(22);
  
  var _UserLogin2 = _interopRequireDefault(_UserLogin);
  
  var _UserClaim = __webpack_require__(23);
  
  var _UserClaim2 = _interopRequireDefault(_UserClaim);
  
  var _UserProfile = __webpack_require__(24);
  
  var _UserProfile2 = _interopRequireDefault(_UserProfile);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  _User2.default.hasMany(_UserLogin2.default, {
    foreignKey: 'userId',
    as: 'logins',
    onUpdate: 'cascade',
    onDelete: 'cascade'
  });
  
  _User2.default.hasMany(_UserClaim2.default, {
    foreignKey: 'userId',
    as: 'claims',
    onUpdate: 'cascade',
    onDelete: 'cascade'
  });
  
  _User2.default.hasOne(_UserProfile2.default, {
    foreignKey: 'userId',
    as: 'profile',
    onUpdate: 'cascade',
    onDelete: 'cascade'
  });
  
  function sync() {
    return _sequelize2.default.sync.apply(_sequelize2.default, arguments);
  }
  
  exports.default = { sync: sync };
  exports.User = _User2.default;
  exports.UserLogin = _UserLogin2.default;
  exports.UserClaim = _UserClaim2.default;
  exports.UserProfile = _UserProfile2.default;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _sequelize = __webpack_require__(19);
  
  var _sequelize2 = _interopRequireDefault(_sequelize);
  
  var _config = __webpack_require__(20);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var sequelize = new _sequelize2.default(_config.databaseUrl, {
    define: {
      freezeTableName: true
    }
  });
  
  exports.default = sequelize;

/***/ },
/* 19 */
/***/ function(module, exports) {

  module.exports = require("sequelize");

/***/ },
/* 20 */
/***/ function(module, exports) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var port = exports.port = process.env.PORT || 3006;
  var host = exports.host = process.env.WEBSITE_HOSTNAME || 'localhost:' + port;
  
  var apiport = exports.apiport = process.env.PORT || 3002;
  var apihost = exports.apihost = process.env.WEBSITE_HOSTNAME || 'localhost:' + apiport;
  
  var databaseUrl = exports.databaseUrl = process.env.DATABASE_URL || 'sqlite:database.sqlite';
  var mongodbUrl = exports.mongodbUrl = process.env.mongo_URL || 'mongodb://localhost:27017/bmf';
  var smsAPIKey = exports.smsAPIKey = process.env.sms_APIKEY || '123775A0EfpcTgrR57c6a923';
  var SMSmessage = exports.SMSmessage = process.env.sms_message || 'Thank you for booking the event';
  var analytics = exports.analytics = {
  
    // https://analytics.google.com/
    google: { trackingId: process.env.GOOGLE_TRACKING_ID || 'UA-XXXXX-X' }
  
  };
  
  var auth = exports.auth = {
  
    jwt: { secret: process.env.JWT_SECRET || 'React Starter Kit' },
  
    // https://developers.facebook.com/
    facebook: {
      id: process.env.FACEBOOK_APP_ID || '282046005472557',
      secret: process.env.FACEBOOK_APP_SECRET || '20c4eb700f9064f3e2fe1449e04fd672'
    },
  
    // https://cloud.google.com/console/project
    google: {
      id: process.env.GOOGLE_CLIENT_ID || '251410730550-ahcg0ou5mgfhl8hlui1urru7jn5s12km.apps.googleusercontent.com',
      secret: process.env.GOOGLE_CLIENT_SECRET || 'Y8yR9yZAhm9jQ8FKAL8QIEcd'
    },
  
    // https://apps.twitter.com/
    twitter: {
      key: process.env.TWITTER_CONSUMER_KEY || 'Ie20AZvLJI2lQD5Dsgxgjauns',
      secret: process.env.TWITTER_CONSUMER_SECRET || 'KTZ6cxoKnEakQCeSpZlaUCJWGAlTEBJj0y2EMkUBujA7zWSvaQ'
    }
  
  };

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _sequelize = __webpack_require__(19);
  
  var _sequelize2 = _interopRequireDefault(_sequelize);
  
  var _sequelize3 = __webpack_require__(18);
  
  var _sequelize4 = _interopRequireDefault(_sequelize3);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var User = _sequelize4.default.define('User', {
  
    id: {
      type: _sequelize2.default.UUID,
      defaultValue: _sequelize2.default.UUIDV1,
      primaryKey: true
    },
  
    email: {
      type: _sequelize2.default.STRING(256),
      validate: { isEmail: true }
    },
  
    emailConfirmed: {
      type: _sequelize2.default.BOOLEAN,
      defaultValue: false
    }
  
  }, {
  
    indexes: [{ fields: ['email'] }]
  
  });
  
  exports.default = User;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _sequelize = __webpack_require__(19);
  
  var _sequelize2 = _interopRequireDefault(_sequelize);
  
  var _sequelize3 = __webpack_require__(18);
  
  var _sequelize4 = _interopRequireDefault(_sequelize3);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var UserLogin = _sequelize4.default.define('UserLogin', {
  
    name: {
      type: _sequelize2.default.STRING(50),
      primaryKey: true
    },
  
    key: {
      type: _sequelize2.default.STRING(100),
      primaryKey: true
    }
  
  });
  
  exports.default = UserLogin;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _sequelize = __webpack_require__(19);
  
  var _sequelize2 = _interopRequireDefault(_sequelize);
  
  var _sequelize3 = __webpack_require__(18);
  
  var _sequelize4 = _interopRequireDefault(_sequelize3);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var UserClaim = _sequelize4.default.define('UserClaim', {
  
    type: {
      type: _sequelize2.default.STRING
    },
  
    value: {
      type: _sequelize2.default.STRING
    }
  
  });
  
  exports.default = UserClaim;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _sequelize = __webpack_require__(19);
  
  var _sequelize2 = _interopRequireDefault(_sequelize);
  
  var _sequelize3 = __webpack_require__(18);
  
  var _sequelize4 = _interopRequireDefault(_sequelize3);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var UserProfile = _sequelize4.default.define('UserProfile', {
  
    userId: {
      type: _sequelize2.default.UUID,
      primaryKey: true
    },
  
    displayName: {
      type: _sequelize2.default.STRING(100)
    },
  
    picture: {
      type: _sequelize2.default.STRING(256)
    },
  
    gender: {
      type: _sequelize2.default.STRING(50)
    },
  
    location: {
      type: _sequelize2.default.STRING(100)
    },
  
    website: {
      type: _sequelize2.default.STRING(256)
    }
  
  });
  
  exports.default = UserProfile;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(26);
  
  var _me = __webpack_require__(27);
  
  var _me2 = _interopRequireDefault(_me);
  
  var _content = __webpack_require__(29);
  
  var _content2 = _interopRequireDefault(_content);
  
  var _news = __webpack_require__(38);
  
  var _news2 = _interopRequireDefault(_news);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var schema = new _graphql.GraphQLSchema({
    query: new _graphql.GraphQLObjectType({
      name: 'Query',
      fields: {
        me: _me2.default,
        content: _content2.default,
        news: _news2.default
      }
    })
  });
  
  exports.default = schema;

/***/ },
/* 26 */
/***/ function(module, exports) {

  module.exports = require("graphql");

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _UserType = __webpack_require__(28);
  
  var _UserType2 = _interopRequireDefault(_UserType);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var me = {
    type: _UserType2.default,
    resolve: function resolve(_ref) {
      var request = _ref.request;
  
      return request.user && {
        id: request.user.id,
        email: request.user.email
      };
    }
  }; /**
      * React Starter Kit (https://www.reactstarterkit.com/)
      *
      * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
      *
      * This source code is licensed under the MIT license found in the
      * LICENSE.txt file in the root directory of this source tree.
      */
  
  exports.default = me;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(26);
  
  var UserType = new _graphql.GraphQLObjectType({
    name: 'User',
    fields: {
      id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) },
      email: { type: _graphql.GraphQLString }
    }
  }); /**
       * React Starter Kit (https://www.reactstarterkit.com/)
       *
       * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE.txt file in the root directory of this source tree.
       */
  
  exports.default = UserType;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getIterator2 = __webpack_require__(30);
  
  var _getIterator3 = _interopRequireDefault(_getIterator2);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _assign = __webpack_require__(31);
  
  var _assign2 = _interopRequireDefault(_assign);
  
  var resolveExtension = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(path, extension) {
      var fileNameBase, ext, fileName;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              fileNameBase = (0, _path.join)(CONTENT_DIR, '' + (path === '/' ? '/index' : path));
              ext = extension;
  
              if (!ext.startsWith('.')) {
                ext = '.' + extension;
              }
  
              fileName = fileNameBase + ext;
              _context.next = 6;
              return fileExists(fileName);
  
            case 6:
              if (_context.sent) {
                _context.next = 9;
                break;
              }
  
              fileNameBase = (0, _path.join)(CONTENT_DIR, path + '/index');
              fileName = fileNameBase + ext;
  
            case 9:
              _context.next = 11;
              return fileExists(fileName);
  
            case 11:
              if (_context.sent) {
                _context.next = 13;
                break;
              }
  
              return _context.abrupt('return', { success: false });
  
            case 13:
              return _context.abrupt('return', { success: true, fileName: fileName });
  
            case 14:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));
  
    return function resolveExtension(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
  
  var resolveFileName = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(path) {
      var extensions, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, extension, maybeFileName;
  
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              extensions = ['.jade', '.md', '.html'];
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context2.prev = 4;
              _iterator = (0, _getIterator3.default)(extensions);
  
            case 6:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context2.next = 16;
                break;
              }
  
              extension = _step.value;
              _context2.next = 10;
              return resolveExtension(path, extension);
  
            case 10:
              maybeFileName = _context2.sent;
  
              if (!maybeFileName.success) {
                _context2.next = 13;
                break;
              }
  
              return _context2.abrupt('return', { success: true, fileName: maybeFileName.fileName, extension: extension });
  
            case 13:
              _iteratorNormalCompletion = true;
              _context2.next = 6;
              break;
  
            case 16:
              _context2.next = 22;
              break;
  
            case 18:
              _context2.prev = 18;
              _context2.t0 = _context2['catch'](4);
              _didIteratorError = true;
              _iteratorError = _context2.t0;
  
            case 22:
              _context2.prev = 22;
              _context2.prev = 23;
  
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
  
            case 25:
              _context2.prev = 25;
  
              if (!_didIteratorError) {
                _context2.next = 28;
                break;
              }
  
              throw _iteratorError;
  
            case 28:
              return _context2.finish(25);
  
            case 29:
              return _context2.finish(22);
  
            case 30:
              return _context2.abrupt('return', { success: false, fileName: null, extension: null });
  
            case 31:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this, [[4, 18, 22, 30], [23,, 25, 29]]);
    }));
  
    return function resolveFileName(_x3) {
      return _ref2.apply(this, arguments);
    };
  }();
  
  var _fs = __webpack_require__(32);
  
  var _fs2 = _interopRequireDefault(_fs);
  
  var _path = __webpack_require__(4);
  
  var _bluebird = __webpack_require__(33);
  
  var _bluebird2 = _interopRequireDefault(_bluebird);
  
  var _jade = __webpack_require__(34);
  
  var _jade2 = _interopRequireDefault(_jade);
  
  var _frontMatter = __webpack_require__(35);
  
  var _frontMatter2 = _interopRequireDefault(_frontMatter);
  
  var _markdownIt = __webpack_require__(36);
  
  var _markdownIt2 = _interopRequireDefault(_markdownIt);
  
  var _graphql = __webpack_require__(26);
  
  var _ContentType = __webpack_require__(37);
  
  var _ContentType2 = _interopRequireDefault(_ContentType);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var md = new _markdownIt2.default();
  
  // A folder with Jade/Markdown/HTML content pages
  var CONTENT_DIR = (0, _path.join)(__dirname, './content');
  
  // Extract 'front matter' metadata and generate HTML
  var parseContent = function parseContent(path, fileContent, extension) {
    var fmContent = (0, _frontMatter2.default)(fileContent);
    var htmlContent = void 0;
    switch (extension) {
      case '.jade':
        htmlContent = _jade2.default.render(fmContent.body);
        break;
      case '.md':
        htmlContent = md.render(fmContent.body);
        break;
      case '.html':
        htmlContent = fmContent.body;
        break;
      default:
        return null;
    }
    return (0, _assign2.default)({ path: path, content: htmlContent }, fmContent.attributes);
  };
  
  var readFile = _bluebird2.default.promisify(_fs2.default.readFile);
  var fileExists = function fileExists(filename) {
    return new _bluebird2.default(function (resolve) {
      _fs2.default.exists(filename, resolve);
    });
  };
  
  var content = {
    type: _ContentType2.default,
    args: {
      path: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
    },
    resolve: function resolve(_ref3, _ref4) {
      var _this = this;
  
      var request = _ref3.request;
      var path = _ref4.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
        var _ref5, success, fileName, extension, source;
  
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return resolveFileName(path);
  
              case 2:
                _ref5 = _context3.sent;
                success = _ref5.success;
                fileName = _ref5.fileName;
                extension = _ref5.extension;
  
                if (success) {
                  _context3.next = 8;
                  break;
                }
  
                return _context3.abrupt('return', null);
  
              case 8:
                _context3.next = 10;
                return readFile(fileName, { encoding: 'utf8' });
  
              case 10:
                source = _context3.sent;
                return _context3.abrupt('return', parseContent(path, source, extension));
  
              case 12:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, _this);
      }))();
    }
  };
  
  exports.default = content;

/***/ },
/* 30 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/get-iterator");

/***/ },
/* 31 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/object/assign");

/***/ },
/* 32 */
/***/ function(module, exports) {

  module.exports = require("fs");

/***/ },
/* 33 */
/***/ function(module, exports) {

  module.exports = require("bluebird");

/***/ },
/* 34 */
/***/ function(module, exports) {

  module.exports = require("jade");

/***/ },
/* 35 */
/***/ function(module, exports) {

  module.exports = require("front-matter");

/***/ },
/* 36 */
/***/ function(module, exports) {

  module.exports = require("markdown-it");

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(26);
  
  var ContentType = new _graphql.GraphQLObjectType({
    name: 'Content',
    fields: {
      path: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      title: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      content: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      component: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
    }
  }); /**
       * React Starter Kit (https://www.reactstarterkit.com/)
       *
       * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE.txt file in the root directory of this source tree.
       */
  
  exports.default = ContentType;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(26);
  
  var _fetch = __webpack_require__(39);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  var _NewsItemType = __webpack_require__(41);
  
  var _NewsItemType2 = _interopRequireDefault(_NewsItemType);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  // React.js News Feed (RSS)
  var url = 'http://ajax.googleapis.com/ajax/services/feed/load' + '?v=1.0&num=10&q=https://reactjsnews.com/feed.xml'; /**
                                                                                                                        * React Starter Kit (https://www.reactstarterkit.com/)
                                                                                                                        *
                                                                                                                        * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                                                                                                        *
                                                                                                                        * This source code is licensed under the MIT license found in the
                                                                                                                        * LICENSE.txt file in the root directory of this source tree.
                                                                                                                        */
  
  var items = [];
  var lastFetchTask = void 0;
  var lastFetchTime = new Date(1970, 0, 1);
  
  var news = {
    type: new _graphql.GraphQLList(_NewsItemType2.default),
    resolve: function resolve() {
      if (lastFetchTask) {
        return lastFetchTask;
      }
  
      if (new Date() - lastFetchTime > 1000 * 60 * 10 /* 10 mins */) {
          lastFetchTime = new Date();
          lastFetchTask = (0, _fetch2.default)(url).then(function (response) {
            return response.json();
          }).then(function (data) {
            if (data.responseStatus === 200) {
              items = data.responseData.feed.entries;
            }
  
            return items;
          }).finally(function () {
            lastFetchTask = null;
          });
  
          if (items.length) {
            return items;
          }
  
          return lastFetchTask;
        }
  
      return items;
    }
  };
  
  exports.default = news;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Response = exports.Headers = exports.Request = exports.default = undefined;
  
  var _bluebird = __webpack_require__(33);
  
  var _bluebird2 = _interopRequireDefault(_bluebird);
  
  var _nodeFetch = __webpack_require__(40);
  
  var _nodeFetch2 = _interopRequireDefault(_nodeFetch);
  
  var _config = __webpack_require__(20);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  _nodeFetch2.default.Promise = _bluebird2.default; /**
                                                     * React Starter Kit (https://www.reactstarterkit.com/)
                                                     *
                                                     * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                                     *
                                                     * This source code is licensed under the MIT license found in the
                                                     * LICENSE.txt file in the root directory of this source tree.
                                                     */
  
  _nodeFetch.Response.Promise = _bluebird2.default;
  
  function localUrl(url) {
    if (url.startsWith('//')) {
      return 'https:' + url;
    }
  
    if (url.startsWith('http')) {
      return url;
    }
  
    return 'http://' + _config.host + url;
  }
  
  function localFetch(url, options) {
    return (0, _nodeFetch2.default)(localUrl(url), options);
  }
  
  exports.default = localFetch;
  exports.Request = _nodeFetch.Request;
  exports.Headers = _nodeFetch.Headers;
  exports.Response = _nodeFetch.Response;

/***/ },
/* 40 */
/***/ function(module, exports) {

  module.exports = require("node-fetch");

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(26);
  
  var NewsItemType = new _graphql.GraphQLObjectType({
    name: 'NewsItem',
    fields: {
      title: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      link: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      author: { type: _graphql.GraphQLString },
      publishedDate: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      contentSnippet: { type: _graphql.GraphQLString }
    }
  }); /**
       * React Starter Kit (https://www.reactstarterkit.com/)
       *
       * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE.txt file in the root directory of this source tree.
       */
  
  exports.default = NewsItemType;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _App = __webpack_require__(45);
  
  var _App2 = _interopRequireDefault(_App);
  
  var _home = __webpack_require__(83);
  
  var _home2 = _interopRequireDefault(_home);
  
  var _searchprovider = __webpack_require__(95);
  
  var _searchprovider2 = _interopRequireDefault(_searchprovider);
  
  var _contact = __webpack_require__(102);
  
  var _contact2 = _interopRequireDefault(_contact);
  
  var _login = __webpack_require__(106);
  
  var _login2 = _interopRequireDefault(_login);
  
  var _register = __webpack_require__(107);
  
  var _register2 = _interopRequireDefault(_register);
  
  var _forgotpass = __webpack_require__(111);
  
  var _forgotpass2 = _interopRequireDefault(_forgotpass);
  
  var _savecustomer = __webpack_require__(115);
  
  var _savecustomer2 = _interopRequireDefault(_savecustomer);
  
  var _content = __webpack_require__(123);
  
  var _content2 = _interopRequireDefault(_content);
  
  var _error = __webpack_require__(127);
  
  var _error2 = _interopRequireDefault(_error);
  
  var _verifypass = __webpack_require__(131);
  
  var _verifypass2 = _interopRequireDefault(_verifypass);
  
  var _changepassword = __webpack_require__(135);
  
  var _changepassword2 = _interopRequireDefault(_changepassword);
  
  var _updatepass = __webpack_require__(139);
  
  var _updatepass2 = _interopRequireDefault(_updatepass);
  
  var _serviceprovider = __webpack_require__(143);
  
  var _serviceprovider2 = _interopRequireDefault(_serviceprovider);
  
  var _saveprovider = __webpack_require__(147);
  
  var _saveprovider2 = _interopRequireDefault(_saveprovider);
  
  var _booking = __webpack_require__(151);
  
  var _booking2 = _interopRequireDefault(_booking);
  
  var _savebooking = __webpack_require__(155);
  
  var _savebooking2 = _interopRequireDefault(_savebooking);
  
  var _providerlogin = __webpack_require__(159);
  
  var _providerlogin2 = _interopRequireDefault(_providerlogin);
  
  var _providerforgotpass = __webpack_require__(163);
  
  var _providerforgotpass2 = _interopRequireDefault(_providerforgotpass);
  
  var _providerchangepassword = __webpack_require__(168);
  
  var _providerchangepassword2 = _interopRequireDefault(_providerchangepassword);
  
  var _updateproviderpass = __webpack_require__(172);
  
  var _updateproviderpass2 = _interopRequireDefault(_updateproviderpass);
  
  var _linkprovider = __webpack_require__(176);
  
  var _linkprovider2 = _interopRequireDefault(_linkprovider);
  
  var _verifyproviderlogin = __webpack_require__(180);
  
  var _verifyproviderlogin2 = _interopRequireDefault(_verifyproviderlogin);
  
  var _providerlist = __webpack_require__(184);
  
  var _providerlist2 = _interopRequireDefault(_providerlist);
  
  var _logout = __webpack_require__(185);
  
  var _logout2 = _interopRequireDefault(_logout);
  
  var _bookinglist = __webpack_require__(189);
  
  var _bookinglist2 = _interopRequireDefault(_bookinglist);
  
  var _cancelbooking = __webpack_require__(193);
  
  var _cancelbooking2 = _interopRequireDefault(_cancelbooking);
  
  var _changebookingdate = __webpack_require__(198);
  
  var _changebookingdate2 = _interopRequireDefault(_changebookingdate);
  
  var _managebooking = __webpack_require__(202);
  
  var _managebooking2 = _interopRequireDefault(_managebooking);
  
  var _providerhome = __webpack_require__(206);
  
  var _providerhome2 = _interopRequireDefault(_providerhome);
  
  var _providerlogout = __webpack_require__(207);
  
  var _providerlogout2 = _interopRequireDefault(_providerlogout);
  
  var _changeprovideremail = __webpack_require__(211);
  
  var _changeprovideremail2 = _interopRequireDefault(_changeprovideremail);
  
  var _changeproviderphone = __webpack_require__(215);
  
  var _changeproviderphone2 = _interopRequireDefault(_changeproviderphone);
  
  var _updateprovideremail = __webpack_require__(219);
  
  var _updateprovideremail2 = _interopRequireDefault(_updateprovideremail);
  
  var _updateproviderphone = __webpack_require__(223);
  
  var _updateproviderphone2 = _interopRequireDefault(_updateproviderphone);
  
  var _confirmOTP = __webpack_require__(227);
  
  var _confirmOTP2 = _interopRequireDefault(_confirmOTP);
  
  var _cateringbooking = __webpack_require__(231);
  
  var _cateringbooking2 = _interopRequireDefault(_cateringbooking);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  // Child routes
  exports.default = {
  
    path: '/',
  
    children: [_home2.default, _searchprovider2.default, _logout2.default, _bookinglist2.default, _contact2.default, _login2.default, _providerlogin2.default, _providerhome2.default, _providerlogout2.default, _verifypass2.default, _verifyproviderlogin2.default, _forgotpass2.default, _changepassword2.default, _providerforgotpass2.default, _providerchangepassword2.default, _changeprovideremail2.default, _changeproviderphone2.default, _updatepass2.default, _updateproviderpass2.default, _updateprovideremail2.default, _confirmOTP2.default, _updateproviderphone2.default, _register2.default, _savecustomer2.default, _serviceprovider2.default, _saveprovider2.default, _booking2.default, _managebooking2.default, _cancelbooking2.default, _changebookingdate2.default, _providerlist2.default, _savebooking2.default, _linkprovider2.default, _cateringbooking2.default, _content2.default, _error2.default],
  
    action: function action(_ref) {
      var _this = this;
  
      var next = _ref.next,
          render = _ref.render,
          context = _ref.context;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var component;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return next();
  
              case 2:
                component = _context.sent;
  
                if (!(component === undefined)) {
                  _context.next = 5;
                  break;
                }
  
                return _context.abrupt('return', component);
  
              case 5:
                return _context.abrupt('return', render((0, _jsx3.default)(_App2.default, {
                  context: context
                }, void 0, component)));
  
              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };

/***/ },
/* 43 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/jsx");

/***/ },
/* 44 */
/***/ function(module, exports) {

  module.exports = require("react");

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _getPrototypeOf = __webpack_require__(46);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(47);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(48);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(49);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(50);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _emptyFunction = __webpack_require__(51);
  
  var _emptyFunction2 = _interopRequireDefault(_emptyFunction);
  
  var _App = __webpack_require__(52);
  
  var _App2 = _interopRequireDefault(_App);
  
  var _Header = __webpack_require__(58);
  
  var _Header2 = _interopRequireDefault(_Header);
  
  var _Feedback = __webpack_require__(74);
  
  var _Feedback2 = _interopRequireDefault(_Feedback);
  
  var _Footer = __webpack_require__(77);
  
  var _Footer2 = _interopRequireDefault(_Footer);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var _ref = (0, _jsx3.default)(_Header2.default, {});
  
  var _ref2 = (0, _jsx3.default)(_Footer2.default, {});
  
  var App = function (_Component) {
    (0, _inherits3.default)(App, _Component);
  
    function App() {
      (0, _classCallCheck3.default)(this, App);
      return (0, _possibleConstructorReturn3.default)(this, (App.__proto__ || (0, _getPrototypeOf2.default)(App)).apply(this, arguments));
    }
  
    (0, _createClass3.default)(App, [{
      key: 'getChildContext',
      value: function getChildContext() {
        var context = this.props.context;
        return {
          insertCss: context.insertCss || _emptyFunction2.default,
          setTitle: context.setTitle || _emptyFunction2.default,
          setUser: context.setUser || _emptyFunction2.default,
          setMeta: context.setMeta || _emptyFunction2.default,
          getUser: context.getUser || _emptyFunction2.default
        };
      }
    }, {
      key: 'componentWillMount',
      value: function componentWillMount() {
        var insertCss = this.props.context.insertCss;
  
        this.removeCss = insertCss(_App2.default);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.removeCss();
      }
    }, {
      key: 'render',
      value: function render() {
  
        //console.log( "this.props: "+this.props);
        return !this.props.error ? (0, _jsx3.default)('div', {}, void 0, _ref, this.props.children, _ref2) : this.props.children;
      }
    }]);
    return App;
  }(_react.Component);
  
  App.childContextTypes = {
    insertCss: _react.PropTypes.func.isRequired,
    setTitle: _react.PropTypes.func.isRequired,
    setUser: _react.PropTypes.func.isRequired,
    setMeta: _react.PropTypes.func.isRequired,
    getUser: _react.PropTypes.func.isRequired
  };
  exports.default = App;

/***/ },
/* 46 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/object/get-prototype-of");

/***/ },
/* 47 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/classCallCheck");

/***/ },
/* 48 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/createClass");

/***/ },
/* 49 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/possibleConstructorReturn");

/***/ },
/* 50 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/inherits");

/***/ },
/* 51 */
/***/ function(module, exports) {

  module.exports = require("fbjs/lib/emptyFunction");

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(53);
      var insertCss = __webpack_require__(55);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(54)();
  // imports
  
  
  // module
  exports.push([module.id, "/*! normalize.css v4.1.1 | MIT License | github.com/necolas/normalize.css */html{font-family:sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0}article,aside,details,figcaption,figure,footer,header,main,menu,nav,section,summary{display:block}audio,canvas,progress,video{display:inline-block}audio:not([controls]){display:none;height:0}progress{vertical-align:baseline}[hidden],template{display:none}a{background-color:transparent;-webkit-text-decoration-skip:objects}a:active,a:hover{outline-width:0}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:inherit;font-weight:bolder}dfn{font-style:italic}h1{font-size:2em;margin:.67em 0}mark{background-color:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none}svg:not(:root){overflow:hidden}code,kbd,pre,samp{font-family:monospace,monospace;font-size:1em}figure{margin:1em 40px}hr{box-sizing:content-box;height:0;overflow:visible}button,input,select,textarea{font:inherit;margin:0}optgroup{font-weight:700}button,input{overflow:visible}button,select{text-transform:none}[type=reset],[type=submit],button,html [type=button]{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText}fieldset{border:1px solid silver;margin:0 2px;padding:.35em .625em .75em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-cancel-button,[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-input-placeholder{color:inherit;opacity:.54}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}html{color:#222;font-weight:100;font-size:1em;font-family:Segoe UI,HelveticaNeue-Light,sans-serif;line-height:1.375}a{color:#0074c2}::-moz-selection{background:#b3d4fc;text-shadow:none}::selection{background:#b3d4fc;text-shadow:none}hr{display:block;height:1px;border:0;border-top:1px solid #ccc;margin:1em 0;padding:0}audio,canvas,iframe,img,svg,video{vertical-align:middle}fieldset{border:0;margin:0;padding:0}textarea{resize:vertical}.browserupgrade{margin:.2em 0;background:#ccc;color:#000;padding:.2em 0}@media print{*,:after,:before{background:transparent!important;color:#000!important;box-shadow:none!important;text-shadow:none!important}a,a:visited{text-decoration:underline}a[href]:after{content:' (' attr(href) ')'}abbr[title]:after{content:' (' attr(title) ')'}a[href^='#']:after,a[href^='javascript:']:after{content:''}blockquote,pre{border:1px solid #999;page-break-inside:avoid}thead{display:table-header-group}img,tr{page-break-inside:avoid}img{max-width:100%!important}h2,h3,p{orphans:3;widows:3}h2,h3{page-break-after:avoid}}", ""]);
  
  // exports


/***/ },
/* 54 */
/***/ function(module, exports) {

  /*
  	MIT License http://www.opensource.org/licenses/mit-license.php
  	Author Tobias Koppers @sokra
  */
  // css base code, injected by the css-loader
  module.exports = function() {
  	var list = [];
  
  	// return the list of modules as css string
  	list.toString = function toString() {
  		var result = [];
  		for(var i = 0; i < this.length; i++) {
  			var item = this[i];
  			if(item[2]) {
  				result.push("@media " + item[2] + "{" + item[1] + "}");
  			} else {
  				result.push(item[1]);
  			}
  		}
  		return result.join("");
  	};
  
  	// import a list of modules into the list
  	list.i = function(modules, mediaQuery) {
  		if(typeof modules === "string")
  			modules = [[null, modules, ""]];
  		var alreadyImportedModules = {};
  		for(var i = 0; i < this.length; i++) {
  			var id = this[i][0];
  			if(typeof id === "number")
  				alreadyImportedModules[id] = true;
  		}
  		for(i = 0; i < modules.length; i++) {
  			var item = modules[i];
  			// skip already imported module
  			// this implementation is not 100% perfect for weird media query combinations
  			//  when a module is imported multiple times with different media queries.
  			//  I hope this will never occur (Hey this way we have smaller bundles)
  			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
  				if(mediaQuery && !item[2]) {
  					item[2] = mediaQuery;
  				} else if(mediaQuery) {
  					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
  				}
  				list.push(item);
  			}
  		}
  	};
  	return list;
  };


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  var _assign = __webpack_require__(31);
  
  var _assign2 = _interopRequireDefault(_assign);
  
  var _stringify = __webpack_require__(56);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _slicedToArray2 = __webpack_require__(57);
  
  var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
  
  var _getIterator2 = __webpack_require__(30);
  
  var _getIterator3 = _interopRequireDefault(_getIterator2);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * Isomorphic CSS style loader for Webpack
   *
   * Copyright © 2015-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var prefix = 's';
  var inserted = {};
  
  // Base64 encoding and decoding - The "Unicode Problem"
  // https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
  function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
      return String.fromCharCode('0x' + p1);
    }));
  }
  
  /**
   * Remove style/link elements for specified node IDs
   * if they are no longer referenced by UI components.
   */
  function removeCss(ids) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;
  
    try {
      for (var _iterator = (0, _getIterator3.default)(ids), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var id = _step.value;
  
        if (--inserted[id] <= 0) {
          var elem = document.getElementById(prefix + id);
          if (elem) {
            elem.parentNode.removeChild(elem);
          }
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }
  
  /**
   * Example:
   *   // Insert CSS styles object generated by `css-loader` into DOM
   *   var removeCss = insertCss([[1, 'body { color: red; }']]);
   *
   *   // Remove it from the DOM
   *   removeCss();
   */
  function insertCss(styles, options) {
    var _Object$assign = (0, _assign2.default)({
      replace: false,
      prepend: false
    }, options);
  
    var replace = _Object$assign.replace;
    var prepend = _Object$assign.prepend;
  
  
    var ids = [];
    for (var i = 0; i < styles.length; i++) {
      var _styles$i = (0, _slicedToArray3.default)(styles[i], 4);
  
      var moduleId = _styles$i[0];
      var css = _styles$i[1];
      var media = _styles$i[2];
      var sourceMap = _styles$i[3];
  
      var id = moduleId + '-' + i;
  
      ids.push(id);
  
      if (inserted[id]) {
        if (!replace) {
          inserted[id]++;
          continue;
        }
      }
  
      inserted[id] = 1;
  
      var elem = document.getElementById(prefix + id);
      var create = false;
  
      if (!elem) {
        create = true;
  
        elem = document.createElement('style');
        elem.setAttribute('type', 'text/css');
        elem.id = prefix + id;
  
        if (media) {
          elem.setAttribute('media', media);
        }
      }
  
      var cssText = css;
      if (sourceMap) {
        cssText += '\n/*# sourceMappingURL=data:application/json;base64,' + b64EncodeUnicode((0, _stringify2.default)(sourceMap)) + '*/';
        cssText += '\n/*# sourceURL=' + sourceMap.file + '*/';
      }
  
      if ('textContent' in elem) {
        elem.textContent = cssText;
      } else {
        elem.styleSheet.cssText = cssText;
      }
  
      if (create) {
        if (prepend) {
          document.head.insertBefore(elem, document.head.childNodes[0]);
        } else {
          document.head.appendChild(elem);
        }
      }
    }
  
    return removeCss.bind(null, ids);
  }
  
  module.exports = insertCss;

/***/ },
/* 56 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/json/stringify");

/***/ },
/* 57 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/slicedToArray");

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(59);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Header = __webpack_require__(60);
  
  var _Header2 = _interopRequireDefault(_Header);
  
  var _Link = __webpack_require__(62);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  var _Navigation = __webpack_require__(69);
  
  var _Navigation2 = _interopRequireDefault(_Navigation);
  
  var _bmf = __webpack_require__(73);
  
  var _bmf2 = _interopRequireDefault(_bmf);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var _ref = (0, _jsx3.default)('img', {
    src: _bmf2.default,
    width: '38',
    height: '38',
    align: 'left',
    alt: 'React'
  });
  
  function Header() {
    //console.log("HTTP QUERY: "+query);
    return (0, _jsx3.default)('div', {
      className: _Header2.default.root
    }, void 0, (0, _jsx3.default)('div', {
      className: _Header2.default.container
    }, void 0, (0, _jsx3.default)(_Link2.default, {
      className: _Header2.default.brand,
      to: '/'
    }, void 0, _ref, (0, _jsx3.default)('span', {
      className: _Header2.default.brandTxt
    }, void 0, 'Dream True Solutions')), (0, _jsx3.default)(_Navigation2.default, {
      className: _Header2.default.nav
    })));
  }
  
  exports.default = (0, _withStyles2.default)(_Header2.default)(Header);

/***/ },
/* 59 */
/***/ function(module, exports) {

  module.exports = require("isomorphic-style-loader/lib/withStyles");

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(61);
      var insertCss = __webpack_require__(55);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(54)();
  // imports
  
  
  // module
  exports.push([module.id, ".AA5I{background:#008b8b;color:#fff}._2ArD{margin:0 auto;padding:20px 0;max-width:1000px}.w2lz{color:#92e5fc;text-decoration:none;font-size:1.1em}.Qj7O{margin-left:1px}._2n3q{float:right;margin-top:2px;margin-right:0;padding-right:2px}._2t0S{text-align:center}._3HrP{margin:0;padding:5px;font-weight:400;font-size:2em;line-height:1em}._32d5{padding:0;color:hsla(0,0%,100%,.5);font-size:1.25em;margin:0}", ""]);
  
  // exports
  exports.locals = {
  	"root": "AA5I",
  	"container": "_2ArD",
  	"brand": "w2lz",
  	"brandTxt": "Qj7O",
  	"nav": "_2n3q",
  	"banner": "_2t0S",
  	"bannerTitle": "_3HrP",
  	"bannerDesc": "_32d5"
  };

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _extends2 = __webpack_require__(63);
  
  var _extends3 = _interopRequireDefault(_extends2);
  
  var _objectWithoutProperties2 = __webpack_require__(64);
  
  var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
  
  var _getPrototypeOf = __webpack_require__(46);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(47);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(48);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(49);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(50);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _history = __webpack_require__(65);
  
  var _history2 = _interopRequireDefault(_history);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function isLeftClickEvent(event) {
    return event.button === 0;
  }
  
  function isModifiedEvent(event) {
    return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
  }
  
  var Link = function (_Component) {
    (0, _inherits3.default)(Link, _Component);
  
    function Link() {
      var _ref;
  
      var _temp, _this, _ret;
  
      (0, _classCallCheck3.default)(this, Link);
  
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
  
      return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Link.__proto__ || (0, _getPrototypeOf2.default)(Link)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function (event) {
        var allowTransition = true;
  
        if (_this.props.onClick) {
          _this.props.onClick(event);
        }
  
        if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
          return;
        }
  
        if (event.defaultPrevented === true) {
          allowTransition = false;
        }
  
        event.preventDefault();
  
        if (allowTransition) {
          if (_this.props.to) {
            _history2.default.push(_this.props.to);
          } else {
            _history2.default.push({
              pathname: event.currentTarget.pathname,
              search: event.currentTarget.search
            });
          }
        }
      }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }
  
    (0, _createClass3.default)(Link, [{
      key: 'render',
      // eslint-disable-line react/prefer-stateless-function
  
      value: function render() {
        var _props = this.props,
            to = _props.to,
            props = (0, _objectWithoutProperties3.default)(_props, ['to']); // eslint-disable-line no-use-before-define
  
        return _react2.default.createElement('a', (0, _extends3.default)({ href: _history2.default.createHref(to) }, props, { onClick: this.handleClick }));
      }
    }]);
    return Link;
  }(_react.Component);
  
  exports.default = Link;

/***/ },
/* 63 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/extends");

/***/ },
/* 64 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/objectWithoutProperties");

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _createBrowserHistory = __webpack_require__(66);
  
  var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);
  
  var _createMemoryHistory = __webpack_require__(67);
  
  var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);
  
  var _useQueries = __webpack_require__(68);
  
  var _useQueries2 = _interopRequireDefault(_useQueries);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var history = (0, _useQueries2.default)( false ? _createBrowserHistory2.default : _createMemoryHistory2.default)(); /**
                                                                                                                                    * React Starter Kit (https://www.reactstarterkit.com/)
                                                                                                                                    *
                                                                                                                                    * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                                                                                                                    *
                                                                                                                                    * This source code is licensed under the MIT license found in the
                                                                                                                                    * LICENSE.txt file in the root directory of this source tree.
                                                                                                                                    */
  
  exports.default = history;

/***/ },
/* 66 */
/***/ function(module, exports) {

  module.exports = require("history/lib/createBrowserHistory");

/***/ },
/* 67 */
/***/ function(module, exports) {

  module.exports = require("history/lib/createMemoryHistory");

/***/ },
/* 68 */
/***/ function(module, exports) {

  module.exports = require("history/lib/useQueries");

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _classnames = __webpack_require__(70);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  var _withStyles = __webpack_require__(59);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Navigation = __webpack_require__(71);
  
  var _Navigation2 = _interopRequireDefault(_Navigation);
  
  var _Link = __webpack_require__(62);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function Navigation(_ref) {
    var className = _ref.className;
  
    return (0, _jsx3.default)('div', {
      className: (0, _classnames2.default)(_Navigation2.default.root, className),
      role: 'navigation'
    }, void 0, (0, _jsx3.default)(_Link2.default, {
      className: _Navigation2.default.link,
      to: '/about'
    }, void 0, 'About'), (0, _jsx3.default)('span', {
      className: _Navigation2.default.spacer
    }, void 0, '|'), (0, _jsx3.default)(_Link2.default, {
      className: _Navigation2.default.link,
      to: '/contact'
    }, void 0, 'Contact'), (0, _jsx3.default)('span', {
      className: _Navigation2.default.spacer
    }, void 0, ' | '), (0, _jsx3.default)(_Link2.default, {
      className: _Navigation2.default.link,
      to: '/login'
    }, void 0, 'Customer Log in'), (0, _jsx3.default)('span', {
      className: _Navigation2.default.spacer
    }, void 0, '|'), (0, _jsx3.default)(_Link2.default, {
      className: _Navigation2.default.link,
      to: '/providerlogin'
    }, void 0, 'Service Provider Login'), (0, _jsx3.default)('span', {
      className: _Navigation2.default.spacer
    }, void 0, '|'), (0, _jsx3.default)(_Link2.default, {
      className: (0, _classnames2.default)(_Navigation2.default.link, _Navigation2.default.highlight),
      to: '/register'
    }, void 0, 'Customer Sign up'), (0, _jsx3.default)('span', {
      className: _Navigation2.default.spacer
    }, void 0, ' | '), (0, _jsx3.default)(_Link2.default, {
      className: _Navigation2.default.link,
      to: '/serviceprovider'
    }, void 0, 'Service Provider Registration'));
  }
  
  exports.default = (0, _withStyles2.default)(_Navigation2.default)(Navigation);

/***/ },
/* 70 */
/***/ function(module, exports) {

  module.exports = require("classnames");

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(72);
      var insertCss = __webpack_require__(55);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(54)();
  // imports
  
  
  // module
  exports.push([module.id, "._1XYB{margin:0}._3ALU{display:inline-block;padding:3px 5px;text-decoration:none;font-size:1em}._3ALU,._3ALU:active,._3ALU:visited{color:hsla(0,0%,100%,.6)}._2nHI,._3ALU:hover{color:#fff}._2nHI{margin-right:8px;margin-left:8px;border-radius:3px;background:rgba(0,0,0,.15)}._2nHI:hover{background:rgba(0,0,0,.3)}._3NEA{color:red}", ""]);
  
  // exports
  exports.locals = {
  	"root": "_1XYB",
  	"link": "_3ALU",
  	"highlight": "_2nHI",
  	"spacer": "_3NEA"
  };

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = __webpack_require__.p + "57f5265da114952432bfae3ba6c7da83.png";

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(59);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Feedback = __webpack_require__(75);
  
  var _Feedback2 = _interopRequireDefault(_Feedback);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function Feedback() {
    return (0, _jsx3.default)('div', {
      className: _Feedback2.default.root
    }, void 0, (0, _jsx3.default)('div', {
      className: _Feedback2.default.container
    }, void 0, (0, _jsx3.default)('a', {
      className: _Feedback2.default.link,
      href: 'https://gitter.im/kriasoft/react-starter-kit'
    }, void 0, 'Ask a question'), (0, _jsx3.default)('span', {
      className: _Feedback2.default.spacer
    }, void 0, '|'), (0, _jsx3.default)('a', {
      className: _Feedback2.default.link,
      href: 'https://github.com/kriasoft/react-starter-kit/issues/new'
    }, void 0, 'Report an issue')));
  }
  
  exports.default = (0, _withStyles2.default)(_Feedback2.default)(Feedback);

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(76);
      var insertCss = __webpack_require__(55);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(54)();
  // imports
  
  
  // module
  exports.push([module.id, "._2M-I{background:#f5f5f5;color:#333}._2ROd{margin:0 auto;padding:20px 8px;max-width:1000px;text-align:center;font-size:1.5em}.w25i,.w25i:active,.w25i:hover,.w25i:visited{color:#333;text-decoration:none}.w25i:hover{text-decoration:underline}._1UrA{padding-right:15px;padding-left:15px}", ""]);
  
  // exports
  exports.locals = {
  	"root": "_2M-I",
  	"container": "_2ROd",
  	"link": "w25i",
  	"spacer": "_1UrA"
  };

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(59);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Footer = __webpack_require__(78);
  
  var _Footer2 = _interopRequireDefault(_Footer);
  
  var _Link = __webpack_require__(62);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  var _fb = __webpack_require__(80);
  
  var _fb2 = _interopRequireDefault(_fb);
  
  var _twitter = __webpack_require__(81);
  
  var _twitter2 = _interopRequireDefault(_twitter);
  
  var _linkedin = __webpack_require__(82);
  
  var _linkedin2 = _interopRequireDefault(_linkedin);
  
  var _Navigation = __webpack_require__(69);
  
  var _Navigation2 = _interopRequireDefault(_Navigation);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var _ref = (0, _jsx3.default)('img', {
    src: _fb2.default,
    width: '20',
    height: '20',
    alt: 'React'
  });
  
  var _ref2 = (0, _jsx3.default)('img', {
    src: _twitter2.default,
    width: '20',
    height: '20',
    alt: 'React'
  });
  
  var _ref3 = (0, _jsx3.default)('img', {
    src: _linkedin2.default,
    width: '20',
    height: '20',
    alt: 'React'
  });
  
  function Footer() {
    return (0, _jsx3.default)('div', {
      className: _Footer2.default.root
    }, void 0, (0, _jsx3.default)('div', {
      className: _Footer2.default.container
    }, void 0, (0, _jsx3.default)(_Link2.default, {
      className: _Footer2.default.brand,
      to: '/facebook'
    }, void 0, _ref, (0, _jsx3.default)('span', {
      className: _Footer2.default.spacer
    }, void 0, '   ')), (0, _jsx3.default)(_Link2.default, {
      className: _Footer2.default.brand,
      to: '/twitter'
    }, void 0, _ref2, (0, _jsx3.default)('span', {
      className: _Footer2.default.spacer
    }, void 0, ' ')), (0, _jsx3.default)(_Link2.default, {
      className: _Footer2.default.brand,
      to: '/linkedin'
    }, void 0, _ref3, (0, _jsx3.default)('span', {
      className: _Footer2.default.spacer
    }, void 0, ' ')), (0, _jsx3.default)('span', {
      className: _Footer2.default.text
    }, void 0, '\xA9 Dream True Soutions'), (0, _jsx3.default)('span', {
      className: _Footer2.default.spacer
    }, void 0, '\xB7'), (0, _jsx3.default)(_Link2.default, {
      className: _Footer2.default.link,
      to: '/'
    }, void 0, 'Home'), (0, _jsx3.default)('span', {
      className: _Footer2.default.spacer
    }, void 0, '\xB7'), (0, _jsx3.default)(_Link2.default, {
      className: _Footer2.default.link,
      to: '/privacy'
    }, void 0, 'Privacy'), (0, _jsx3.default)('span', {
      className: _Footer2.default.spacer
    }, void 0, '\xB7')));
  }
  
  exports.default = (0, _withStyles2.default)(_Footer2.default)(Footer);

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(79);
      var insertCss = __webpack_require__(55);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(54)();
  // imports
  
  
  // module
  exports.push([module.id, "._3mW2{background:#446;color:#fff}._3k8K{margin:0 auto;padding:20px 15px;max-width:1000px;text-align:center}.jehz{color:hsla(0,0%,100%,.5)}._1yAy,._2eiJ{color:hsla(0,0%,100%,.3)}._2Cgk,.jehz{padding:2px 5px;font-size:1em}._2Cgk,._2Cgk:active,._2Cgk:visited{color:hsla(0,0%,100%,.6);text-decoration:none}._2Cgk:hover{color:#fff}._17U_{color:#92e5fc;text-decoration:none;font-size:1.75em}", ""]);
  
  // exports
  exports.locals = {
  	"root": "_3mW2",
  	"container": "_3k8K",
  	"text": "jehz",
  	"textMuted": "_1yAy jehz",
  	"spacer": "_2eiJ",
  	"link": "_2Cgk",
  	"brand": "_17U_"
  };

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = __webpack_require__.p + "637b9a59e490ef651505c74a03122958.png";

/***/ },
/* 81 */
/***/ function(module, exports) {

  module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpGNzdGMTE3NDA3MjA2ODExOTk0Q0JDNjhBREQ3QkU0OSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFODYxM0VGQUFGMkExMUUxOTBFOUZEM0JFQjVCNTNBRCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFODYxM0VGOUFGMkExMUUxOTBFOUZEM0JFQjVCNTNBRCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1LjEgTWFjaW50b3NoIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDM4MDExNzQwNzIwNjgxMThDMTRDQkRDMUUyOEQ1OEQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Rjc3RjExNzQwNzIwNjgxMTk5NENCQzY4QUREN0JFNDkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5d82l2AAACE0lEQVR42mL8//8/AyWAiYFCwHLgwAEGx0OfBfbb8X7ApgAkB6TqgdgAiB8AcSNQ7QOonAIjQ+MmA0ZmlgX///5xQDcEpBkod+C/qJw+Awc3A8PvnwyMrx59/P/7x3ygtAM/D08bk7yYsOR/BV19oMILQA0GKM5jZU0CyTEISzEwcPMzMAiIMfxXNuBnkFAqYFYxVP7LxhXEpC/B/xRk+n9lQ3kgfR5oyHyQ00AGiEpIyYBtRgbMLAwgA1UEubZ/zjFvZBSbcMBNRMsw9dqnvyFgBR9eMTC8egR07o8HLOLyLH9EZGWwhc3/YEFVYPjdYVEQ4ft+6v7jELAzQQDoTDD+/VPhD46Q52NlvAPSDI7Gk9GG57UUZddgqGJlh2AsQPT/j9NwHzk4OPzi5Bd89ZWJjfH1z/8q/xgY2AjFfY7s/1zFX68fwhPSxQfPbly588D0z58/PIQ0K3Iz7WgyETsJjykQsTHE4C2Qivc5+iXk2ue/+ve//vPA5feJWsx1QP//QDEAKPAHGHV/xCRlWD6wcOsy8Ili1bzJgjPNXoz9/IF7SGkFqLEBSOcD41vg1R+gj3j5UNM6I8MXfQHmtb067AuBmg+DLEOWZwTmRoXjb39rTLn7y+Tml78qz7//V2ZnZvgixMb4Up2H+U6OMtsZS2HWG0C1T9A1wwyAeQWUaXigGKQQ5M8voKQF5WMFAAEGAPZkw8s7EntAAAAAAElFTkSuQmCC"

/***/ },
/* 82 */
/***/ function(module, exports) {

  module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAIFSURBVEhLzZY9SCNREMcnkQQ9cn4gWiiC5AqPEwUjWKhgYadWWlkodpYHOTitTkUEc8WW19gIYquFiCCIHhIxigqCXgQbPdKchXAqfkSzzsxO4kvc1S184A/+vHkzs++/b78STywWMyOLUZjbPQIddIdqYKizBTzdPwyTTMLfh6X0thg/J9nMA12DJpkYO3+l9LaEG6vYzEsTY/sEIJXSIl4bYSNIPegVYhk93D9X4hhgb9USxXY9boU47mik9ROYs+Msiu16XAtx3NFoTzuXCI5telwLcTZai3OJ4Nimx7UQfryh4ensVSoDfh4Tl3c8wuGmNRLFZQD+AoB/p5JAqmsBPnyUicLeihjVt0lGIb4lAfK5iQdzopdHYmo5ComLm6xL/OVrBP4k8wFKyiUj7P8Wo9oWyTxhTvZJhNsenuFRzTnREZmGpfM8mQkHUblH98nnUrHLOfBroCt7HTnO+T1CbpLWo6nmVIzVfVYa6vfl+bLXkePECF1zpWKTG13ahm/z6yyKs1DXkePk0qFrrlSUHJ01aWxhI5OnOLN7It2fFvLqjniBnByj9rqovXiPMryUc1l7H0b5PnkflFwGtVeplRYFbGvWC1uInxOd/D+THaXQVacQMZLfDV1C5B7hRKcQb3NFEcDtFX4x8c+EDuHa5OHtDwWhLuABuLvWIlq7PxSER722NIzBJCouAAAAAElFTkSuQmCC"

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _promise = __webpack_require__(84);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Home = __webpack_require__(85);
  
  var _Home2 = _interopRequireDefault(_Home);
  
  var _Login = __webpack_require__(88);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  var _config = __webpack_require__(20);
  
  var _util = __webpack_require__(93);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var sessionid = '';
  var email;
  
  exports.default = {
  
    path: '/home',
  
    action: function action(_ref, _ref2) {
      var _this = this;
  
      var query = _ref.query;
      var path = _ref2.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var body, bookinglist;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                sessionid = query.sessionid;
                email = query.email;
                console.log("Sessionid - index.js - Home " + sessionid);
  
                if (!(sessionid === undefined || sessionid == '')) {
                  _context.next = 10;
                  break;
                }
  
                _context.next = 6;
                return (0, _util.getSessionid)();
  
              case 6:
                body = _context.sent;
                return _context.abrupt('return', (0, _jsx3.default)(_Login2.default, {
                  sessionid: body
                }));
  
              case 10:
                _context.next = 12;
                return getBookingData();
  
              case 12:
                bookinglist = _context.sent;
                return _context.abrupt('return', (0, _jsx3.default)(_Home2.default, {
                  sessionid: sessionid,
                  bookinglist: bookinglist,
                  email: email
                }));
  
              case 14:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
  
  /*function getSessionid() {
    var request = require('request');
    console.log('Home - genSessionid - calling API');
    var url = `http://${apihost}/genSessionid`;
    console.log("getSeesionid - URL: " + url);
    
    return new Promise(function(resolve, reject) {
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log('genSessionid - Response from API' + body);
        //sessionid = body;
        resolve(body);
      }
      else {
        
        console.log("genSessionid -API Server not running: "+error);
        return reject(error);
      }
      console.log("getSessionid - Returning from API call")
    });
  
   });
   
  }*/
  
  function getBookingData() {
    var request = __webpack_require__(94);
  
    console.log('calling API');
    var url = 'http://' + _config.apihost + '/getBookingHistory?email=' + email;
    console.log("URL: " + url);
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Inside getBookingData Response from API (body)' + body);
          resolve(body);
        } else {
          console.log("Error Object: " + error);
          return reject(error);
        }
      });
    });
  }

/***/ },
/* 84 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/promise");

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(59);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Home = __webpack_require__(86);
  
  var _Home2 = _interopRequireDefault(_Home);
  
  var _Link = __webpack_require__(62);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  var _classnames = __webpack_require__(70);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Welcome to World of Opporunity'; /**
                                                 * React Starter Kit (https://www.reactstarterkit.com/)
                                                 *
                                                 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                                 *
                                                 * This source code is licensed under the MIT license found in the
                                                 * LICENSE.txt file in the root directory of this source tree.
                                                 */
  
  var user = 'Customer';
  
  var _ref2 = (0, _jsx3.default)('header', {}, void 0, (0, _jsx3.default)('h2', {}, void 0, 'Search Provider'));
  
  var _ref3 = (0, _jsx3.default)('br', {});
  
  var _ref4 = (0, _jsx3.default)('br', {});
  
  var _ref5 = (0, _jsx3.default)('input', {
    type: 'text',
    id: 'category',
    name: 'category'
  });
  
  var _ref6 = (0, _jsx3.default)('br', {});
  
  var _ref7 = (0, _jsx3.default)('br', {});
  
  var _ref8 = (0, _jsx3.default)('input', {
    type: 'radio',
    name: 'searchterm',
    value: 'pincode'
  });
  
  var _ref9 = (0, _jsx3.default)('br', {});
  
  var _ref10 = (0, _jsx3.default)('input', {
    type: 'radio',
    name: 'searchterm',
    value: 'city'
  });
  
  var _ref11 = (0, _jsx3.default)('br', {});
  
  var _ref12 = (0, _jsx3.default)('header', {}, void 0, (0, _jsx3.default)('h2', {}, void 0, 'Service Booking'));
  
  var _ref13 = (0, _jsx3.default)('br', {});
  
  var _ref14 = (0, _jsx3.default)('br', {});
  
  var _ref15 = (0, _jsx3.default)('header', {}, void 0, (0, _jsx3.default)('h2', {}, void 0, 'Booking History'));
  
  var _ref16 = (0, _jsx3.default)('b', {}, void 0, ' No booking history available');
  
  var _ref17 = (0, _jsx3.default)('header', {}, void 0, (0, _jsx3.default)('h2', {}, void 0, 'Search Provider'));
  
  var _ref18 = (0, _jsx3.default)('br', {});
  
  var _ref19 = (0, _jsx3.default)('br', {});
  
  var _ref20 = (0, _jsx3.default)('input', {
    type: 'text',
    id: 'category',
    name: 'category'
  });
  
  var _ref21 = (0, _jsx3.default)('br', {});
  
  var _ref22 = (0, _jsx3.default)('br', {});
  
  var _ref23 = (0, _jsx3.default)('input', {
    type: 'radio',
    name: 'searchterm',
    value: 'pincode'
  });
  
  var _ref24 = (0, _jsx3.default)('br', {});
  
  var _ref25 = (0, _jsx3.default)('input', {
    type: 'radio',
    name: 'searchterm',
    value: 'city'
  });
  
  var _ref26 = (0, _jsx3.default)('br', {});
  
  var _ref27 = (0, _jsx3.default)('header', {}, void 0, (0, _jsx3.default)('h2', {}, void 0, 'Service Booking'));
  
  var _ref28 = (0, _jsx3.default)('br', {});
  
  var _ref29 = (0, _jsx3.default)('br', {});
  
  var _ref30 = (0, _jsx3.default)('header', {}, void 0, (0, _jsx3.default)('h2', {}, void 0, 'Booking History'));
  
  var _ref31 = (0, _jsx3.default)('caption', {}, void 0, 'Your Booking');
  
  var _ref32 = (0, _jsx3.default)('thead', {}, void 0, (0, _jsx3.default)('tr', {}, void 0, (0, _jsx3.default)('th', {}, void 0, 'Select'), (0, _jsx3.default)('th', {}, void 0, 'Booking ID'), (0, _jsx3.default)('th', {}, void 0, 'Booking Date'), (0, _jsx3.default)('th', {}, void 0, 'Event Date'), (0, _jsx3.default)('th', {}, void 0, 'Event'), (0, _jsx3.default)('th', {}, void 0, 'E-mail'), (0, _jsx3.default)('th', {}, void 0, 'Phone'), (0, _jsx3.default)('th', {}, void 0, 'Status')));
  
  var _ref33 = (0, _jsx3.default)('br', {});
  
  var _ref34 = (0, _jsx3.default)('br', {});
  
  var _ref35 = (0, _jsx3.default)('input', {
    type: 'radio',
    name: 'manage',
    value: 'cancel',
    checked: true
  });
  
  var _ref36 = (0, _jsx3.default)('br', {});
  
  var _ref37 = (0, _jsx3.default)('input', {
    type: 'radio',
    name: 'manage',
    value: 'changedate'
  });
  
  var _ref38 = (0, _jsx3.default)('br', {});
  
  var _ref39 = (0, _jsx3.default)('button', {
    value: 'change',
    type: 'submit'
  }, void 0, 'submit');
  
  function Home(_ref, context) {
    var sessionid = _ref.sessionid,
        email = _ref.email,
        bookinglist = _ref.bookinglist;
  
    context.setTitle(title);
    context.setUser(user);
    // context.getUser('user');
    var logoutlink = "/logout?sessionid=" + sessionid;
    var bookinglink = "/booking?sessionid=" + sessionid + "&email=" + email;
    var cateringbookinglink = "/cateringbooking?sessionid=" + sessionid + "&email=" + email;
    var bookingdata = JSON.parse(bookinglist);
    var size = bookingdata.length;
    console.log("Size of the booking List: " + size);
    if (size == 0) {
      return (0, _jsx3.default)('div', {
        className: _Home2.default.cards
      }, void 0, (0, _jsx3.default)('div', {
        className: _Home2.default.card
      }, void 0, _ref2, _ref3, _ref4, (0, _jsx3.default)('form', {
        name: 'searchform',
        method: 'get',
        action: 'searchprovider'
      }, void 0, _ref5, _ref6, _ref7, _ref8, 'Pincode', _ref9, _ref10, 'City', _ref11, (0, _jsx3.default)('button', {
        className: _Home2.default.button,
        value: 'Search',
        type: 'submit'
      }, void 0, 'Search'), (0, _jsx3.default)('input', {
        id: 'sessionid',
        type: 'hidden',
        name: 'sessionid',
        value: sessionid
      }), (0, _jsx3.default)('input', {
        id: 'email',
        type: 'hidden',
        name: 'email',
        value: email
      }))), (0, _jsx3.default)('div', {
        className: _Home2.default.card
      }, void 0, _ref12, (0, _jsx3.default)(_Link2.default, {
        className: _Home2.default.link,
        to: bookinglink
      }, void 0, 'Home Function'), (0, _jsx3.default)(_Link2.default, {
        className: _Home2.default.link,
        to: '/contact'
      }, void 0, 'Astrology'), _ref13, (0, _jsx3.default)(_Link2.default, {
        className: _Home2.default.link,
        to: '/'
      }, void 0, 'Marriage Services'), (0, _jsx3.default)(_Link2.default, {
        className: _Home2.default.link,
        to: cateringbookinglink
      }, void 0, 'Catering'), _ref14, (0, _jsx3.default)(_Link2.default, {
        className: _Home2.default.link,
        to: logoutlink
      }, void 0, 'Logout'), (0, _jsx3.default)('input', {
        id: 'sessionid',
        type: 'hidden',
        name: 'sessionid',
        value: sessionid
      }), (0, _jsx3.default)('input', {
        id: 'email',
        type: 'hidden',
        name: 'email',
        value: email
      })), (0, _jsx3.default)('div', {
        className: _Home2.default.card
      }, void 0, _ref15, (0, _jsx3.default)('div', {}, void 0, (0, _jsx3.default)('p', {
        className: _Home2.default.p
      }, void 0, _ref16, ' '))));
    } else {
      return (
        //<div className={s.root}>
        // <div className={s.container}>
        //   <h1>{title}</h1>
  
        (0, _jsx3.default)('div', {
          className: _Home2.default.cards
        }, void 0, (0, _jsx3.default)('div', {
          className: _Home2.default.card
        }, void 0, _ref17, _ref18, _ref19, (0, _jsx3.default)('form', {
          name: 'searchform',
          method: 'get',
          action: 'searchprovider'
        }, void 0, _ref20, _ref21, _ref22, _ref23, 'Pincode', _ref24, _ref25, 'City', _ref26, (0, _jsx3.default)('button', {
          className: _Home2.default.button,
          value: 'Search',
          type: 'submit'
        }, void 0, 'Search'), (0, _jsx3.default)('input', {
          id: 'sessionid',
          type: 'hidden',
          name: 'sessionid',
          value: sessionid
        }), (0, _jsx3.default)('input', {
          id: 'email',
          type: 'hidden',
          name: 'email',
          value: email
        }))), (0, _jsx3.default)('div', {
          className: _Home2.default.card
        }, void 0, _ref27, (0, _jsx3.default)(_Link2.default, {
          className: _Home2.default.link,
          to: bookinglink
        }, void 0, 'Home Function'), (0, _jsx3.default)(_Link2.default, {
          className: _Home2.default.link,
          to: '/contact'
        }, void 0, 'Astrology'), _ref28, (0, _jsx3.default)(_Link2.default, {
          className: _Home2.default.link,
          to: '/'
        }, void 0, 'Marriage Services'), (0, _jsx3.default)(_Link2.default, {
          className: _Home2.default.link,
          to: cateringbookinglink
        }, void 0, 'Catering'), _ref29, (0, _jsx3.default)(_Link2.default, {
          className: _Home2.default.link,
          to: logoutlink
        }, void 0, 'Logout'), (0, _jsx3.default)('input', {
          id: 'sessionid',
          type: 'hidden',
          name: 'sessionid',
          value: sessionid
        }), (0, _jsx3.default)('input', {
          id: 'email',
          type: 'hidden',
          name: 'email',
          value: email
        })), (0, _jsx3.default)('div', {
          className: _Home2.default.card
        }, void 0, _ref30, (0, _jsx3.default)('form', {
          name: 'form1',
          method: 'get',
          action: 'managebooking'
        }, void 0, (0, _jsx3.default)('table', {}, void 0, _ref31, _ref32, (0, _jsx3.default)('tbody', {}, void 0, bookingdata.map(function (obj, index) {
          return (0, _jsx3.default)('tr', {}, index, (0, _jsx3.default)('td', {}, void 0, (0, _jsx3.default)('input', {
            type: 'radio',
            name: 'bookingid',
            value: obj.bookingid,
            checked: true
          }), ' '), (0, _jsx3.default)('td', {}, void 0, ' ', obj.bookingid), (0, _jsx3.default)('td', {}, void 0, ' ', obj.dateofbooking), (0, _jsx3.default)('td', {}, void 0, ' ', obj.functiondate, ' '), (0, _jsx3.default)('td', {}, void 0, ' ', obj.eventtype, ' '), (0, _jsx3.default)('td', {}, void 0, ' ', obj.email, ' '), (0, _jsx3.default)('td', {}, void 0, obj.mobile), (0, _jsx3.default)('td', {}, void 0, ' ', obj.status));
        }))), (0, _jsx3.default)('input', {
          id: 'sessionid',
          type: 'hidden',
          name: 'sessionid',
          value: sessionid
        }), (0, _jsx3.default)('input', {
          id: 'email',
          type: 'hidden',
          name: 'email',
          value: email
        }), _ref33, _ref34, _ref35, 'Cancel', _ref36, _ref37, 'Changedate', _ref38, _ref39)))
      );
    }
  }
  
  Home.contextTypes = { setTitle: _react.PropTypes.func.isRequired, setUser: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Home2.default)(Home);

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(87);
      var insertCss = __webpack_require__(55);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(54)();
  // imports
  
  
  // module
  exports.push([module.id, "._3mfp{padding-left:20px;padding-right:20px}._2ac9{margin:2cm 4cm 3cm;padding:10 10 100px;max-width:1000px}._1qGy{display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;padding:13px;text-decoration:none;text-align:center;font-size:1.125em}._1qGy,._1qGy:active,._1qGy:visited{color:rgba(0,0,255,.6)}._1qGy:hover{color:#0f0}._30Mk{margin-right:8px;margin-left:8px;border-radius:3px;background:rgba(0,0,0,.15);color:#fff}._30Mk:hover{background:rgba(0,0,0,.3)}._3ySA{color:hsla(0,0%,100%,.3)}._2JkL{display:-webkit-box;display:-ms-flexbox;display:flex;margin:0 auto;max-width:1200px}._1uIf{margin:0 5px;-webkit-box-flex:0;-ms-flex:0 0 300px;flex:0 0 300px}html{box-sizing:content-box}*,:after,:before{box-sizing:inherit}body{font:1em/1.1 Roboto,Helvetica Neue,Helvetica,Arial,sans-serif;background-color:#fafafa}img{max-width:100%}._1uIf{background-color:#fff;box-shadow:0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12)}._1uIf header{padding:10px;background-color:#8370ff;color:#fff}._1uIf header h2{font-size:14.4px;font-size:.9rem;font-weight:400;margin:0;padding:0}._1uIf ._14Bv{padding:5px;font-size:4.8px;font-size:.3rem;color:#757575}table,td,th{border:1px solid #000}tr:hover{background-color:#f5f5f5}th{background-color:#4caf50;color:#fff}td,th{padding:5px;text-align:left}._1ZoN{color:red}button{box-sizing:border-box;margin:10px 6px;padding:5px 16px;width:30%;outline:10;border:4px solid #373277;border-radius:12px;background:#373277;color:#fff;text-align:center;text-decoration:inherit;font-size:12px;line-height:1.3333333;cursor:pointer;float:inherit}button:hover{background:rgba(54,50,119,.8)}button:focus{border-color:#0074c2;box-shadow:0 0 8px rgba(0,116,194,.6)}", ""]);
  
  // exports
  exports.locals = {
  	"root": "_3mfp",
  	"container": "_2ac9",
  	"link": "_1qGy",
  	"highlight": "_30Mk",
  	"spacer": "_3ySA",
  	"cards": "_2JkL",
  	"card": "_1uIf",
  	"body": "_14Bv",
  	"p": "_1ZoN"
  };

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactDom = __webpack_require__(89);
  
  var _reactDom2 = _interopRequireDefault(_reactDom);
  
  var _withStyles = __webpack_require__(59);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Login = __webpack_require__(90);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  var _Link = __webpack_require__(62);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  var _formsyReact = __webpack_require__(92);
  
  var _formsyReact2 = _interopRequireDefault(_formsyReact);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Entering Credentials';
  //var classNames = require('classnames');
  
  var _ref2 = (0, _jsx3.default)('h1', {}, void 0, title);
  
  var _ref3 = (0, _jsx3.default)('path', {
    d: 'M22 16l1-5h-5V7c0-1.544.784-2 3-2h2V0h-4c-4.072 0-7 2.435-7 7v4H7v5h5v14h6V16h4z'
  });
  
  var _ref4 = (0, _jsx3.default)('span', {}, void 0, 'Log in with Facebook');
  
  var _ref5 = (0, _jsx3.default)('span', {}, void 0, 'Log in with Google');
  
  var _ref6 = (0, _jsx3.default)('span', {}, void 0, 'Log in with Twitter');
  
  var _ref7 = (0, _jsx3.default)(_Link2.default, {
    to: '/forgotpass'
  }, void 0, 'Forgot Password');
  
  var _ref8 = (0, _jsx3.default)(_Link2.default, {
    to: '/register'
  }, void 0, 'Sign Up');
  
  function Login(_ref, context) {
    var sessionid = _ref.sessionid,
        message = _ref.message;
  
    context.setTitle(title);
    console.log("Login.js-SessionId: " + sessionid);
    return (0, _jsx3.default)('div', {
      className: _Login2.default.root
    }, void 0, (0, _jsx3.default)('div', {
      className: _Login2.default.container
    }, void 0, _ref2, (0, _jsx3.default)('p', {
      className: _Login2.default.lead
    }, void 0, 'Log in with your username or personal email address.'), (0, _jsx3.default)('div', {
      className: _Login2.default.formGroup
    }, void 0, (0, _jsx3.default)('a', {
      className: _Login2.default.facebook,
      href: '/login/facebook'
    }, void 0, (0, _jsx3.default)('svg', {
      className: _Login2.default.icon,
      width: '10',
      height: '10',
      viewBox: '0 0 10 10',
      xmlns: 'http://www.w3.org/2000/svg'
    }, void 0, _ref3), _ref4)), (0, _jsx3.default)('div', {
      className: _Login2.default.formGroup
    }, void 0, (0, _jsx3.default)('a', {
      className: _Login2.default.google,
      href: '/login/google'
    }, void 0, (0, _jsx3.default)('svg', {
      className: _Login2.default.icon,
      width: '30',
      height: '30',
      viewBox: '0 0 30 30',
      xmlns: 'http://www.w3.org/2000/svg'
    }, void 0, (0, _jsx3.default)('path', {
      d: 'M30 13h-4V9h-2v4h-4v2h4v4h2v-4h4m-15 2s-2-1.15-2-2c0 0-.5-1.828 1-3 ' + '1.537-1.2 3-3.035 3-5 0-2.336-1.046-5-3-6h3l2.387-1H10C5.835 0 2 3.345 2 7c0 ' + '3.735 2.85 6.56 7.086 6.56.295 0 .58-.006.86-.025-.273.526-.47 1.12-.47 1.735 ' + '0 1.037.817 2.042 1.523 2.73H9c-5.16 0-9 2.593-9 6 0 3.355 4.87 6 10.03 6 5.882 ' + '0 9.97-3 9.97-7 0-2.69-2.545-4.264-5-6zm-4-4c-2.395 0-5.587-2.857-6-6C4.587 ' + '3.856 6.607.93 9 1c2.394.07 4.603 2.908 5.017 6.052C14.43 10.195 13 13 11 ' + '13zm-1 15c-3.566 0-7-1.29-7-4 0-2.658 3.434-5.038 7-5 .832.01 2 0 2 0 1 0 ' + '2.88.88 4 2 1 1 1 2.674 1 3 0 3-1.986 4-7 4z'
    })), _ref5)), (0, _jsx3.default)('div', {
      className: _Login2.default.formGroup
    }, void 0, (0, _jsx3.default)('a', {
      className: _Login2.default.twitter,
      href: '/login/twitter'
    }, void 0, (0, _jsx3.default)('svg', {
      className: _Login2.default.icon,
      width: '30',
      height: '30',
      viewBox: '0 0 30 30',
      xmlns: 'http://www.w3.org/2000/svg'
    }, void 0, (0, _jsx3.default)('path', {
      d: 'M30 6.708c-1.105.49-2.756 1.143-4 1.292 1.273-.762 2.54-2.56 ' + '3-4-.97.577-2.087 1.355-3.227 1.773L25 5c-1.12-1.197-2.23-2-4-2-3.398 0-6 ' + '2.602-6 6 0 .4.047.7.11.956L15 10C9 10 5.034 8.724 2 5c-.53.908-1 1.872-1 ' + '3 0 2.136 1.348 3.894 3 5-1.01-.033-2.17-.542-3-1 0 2.98 4.186 6.432 7 7-1 ' + '1-4.623.074-5 0 .784 2.447 3.31 3.95 6 4-2.105 1.648-4.647 2.51-7.53 2.51-.5 ' + '0-.988-.03-1.47-.084C2.723 27.17 6.523 28 10 28c11.322 0 17-8.867 17-17 ' + '0-.268.008-.736 0-1 1.2-.868 2.172-2.058 3-3.292z'
    })), _ref6)), (0, _jsx3.default)('strong', {
      className: _Login2.default.lineThrough
    }, void 0, 'OR'), (0, _jsx3.default)('form', {
      name: 'form1',
      method: 'get',
      action: 'verifypass'
    }, void 0, (0, _jsx3.default)('div', {
      className: _Login2.default.formGroup
    }, void 0, (0, _jsx3.default)('label', {
      className: _Login2.default.label,
      htmlFor: 'usernameOrEmail'
    }, void 0, 'Username or email address:'), (0, _jsx3.default)('input', {
      className: _Login2.default.input,
      id: 'usernameOrEmail',
      type: 'email',
      name: 'usernameOrEmail',
      required: 'required',
      autoFocus: true
    })), (0, _jsx3.default)('div', {
      className: _Login2.default.formGroup
    }, void 0, (0, _jsx3.default)('label', {
      className: _Login2.default.label,
      htmlFor: 'password'
    }, void 0, 'Password:'), (0, _jsx3.default)('input', {
      className: _Login2.default.input,
      id: 'password',
      type: 'password',
      name: 'password',
      required: 'required'
    }), (0, _jsx3.default)('p', {
      className: _Login2.default.p
    }, void 0, (0, _jsx3.default)('b', {}, void 0, ' ', message), ' ')), (0, _jsx3.default)('div', {
      className: _Login2.default.formGroup
    }, void 0, (0, _jsx3.default)('button', {
      className: _Login2.default.button1,
      type: 'submit'
    }, void 0, 'Log in'), _ref7, (0, _jsx3.default)('span', {
      className: _Login2.default.spacer
    }, void 0, ' | '), _ref8, (0, _jsx3.default)('input', {
      id: 'sessionid',
      type: 'hidden',
      name: 'sessionid',
      value: sessionid
    })))));
  }
  
  Login.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Login2.default)(Login);

/***/ },
/* 89 */
/***/ function(module, exports) {

  module.exports = require("react-dom");

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(91);
      var insertCss = __webpack_require__(55);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(54)();
  // imports
  
  
  // module
  exports.push([module.id, ".AfBI{padding-left:20px;padding-right:20px}html{box-sizing:border-box}._2g23{margin:0 auto;padding:0 0 40px;max-width:380px}.ri6F{font-size:1.25em}._3_Xq{margin-bottom:15px}._2Z7l{display:inline-block;margin-bottom:5px;max-width:100%;font-weight:700}.PvYX{display:block;box-sizing:border-box;padding:10px 16px;width:100%;height:26px;outline:0;border:1px solid #ccc;border-radius:0;background:#fff;box-shadow:inset 0 1px 1px rgba(0,0,0,.075);color:#616161;font-size:18px;line-height:1.3333333;-webkit-transition:border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out}.PvYX:focus{border-color:#0074c2;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(0,116,194,.6)}.tti7{color:red}._10Wa{width:80%;outline:10;background:#373277;font-size:18px}._1E-T,._10Wa{display:block;box-sizing:border-box;margin:0;padding:10px 16px;border:1px solid #373277;border-radius:0;color:#fff;text-align:center;text-decoration:none;line-height:1.3333333;cursor:pointer}._1E-T{width:50%;outline:0;background:#373388;font-size:14px}._10Wa:hover{background:rgba(54,50,119,.8)}._10Wa:focus{border-color:#0074c2;box-shadow:0 0 8px rgba(0,116,194,.6)}._3CIB{border-color:#3b5998;background:#3b5998}._3CIB:hover{background:#2d4373}._1Igk{border-color:#dd4b39;background:#dd4b39}._1Igk:hover{background:#c23321}._3Vql{border-color:#55acee;background:#55acee}._3Vql:hover{background:#2795e9}._97Uq{display:inline-block;margin:-2px 12px -2px 0;width:10px;height:10px;vertical-align:middle;fill:currentColor}._3eY1{position:relative;z-index:1;display:block;margin-bottom:15px;width:100%;color:#757575;text-align:center;font-size:80%}._3eY1:before{top:50%;left:50%;z-index:-1;margin-top:-5px;margin-left:-20px;width:40px;height:10px;background-color:#fff}._3eY1:after,._3eY1:before{position:absolute;content:''}._3eY1:after{top:49%;z-index:-2;display:block;width:100%;border-bottom:1px solid #ddd}", ""]);
  
  // exports
  exports.locals = {
  	"root": "AfBI",
  	"container": "_2g23",
  	"lead": "ri6F",
  	"formGroup": "_3_Xq",
  	"label": "_2Z7l",
  	"input": "PvYX",
  	"p": "tti7",
  	"button": "_10Wa",
  	"button1": "_1E-T",
  	"facebook": "_3CIB _10Wa",
  	"google": "_1Igk _10Wa",
  	"twitter": "_3Vql _10Wa",
  	"icon": "_97Uq",
  	"lineThrough": "_3eY1"
  };

/***/ },
/* 92 */
/***/ function(module, exports) {

  module.exports = require("formsy-react");

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _promise = __webpack_require__(84);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  exports.randomPassword = randomPassword;
  exports.getConnection = getConnection;
  exports.getSessionid = getSessionid;
  exports.checkSessionid = checkSessionid;
  
  var _config = __webpack_require__(20);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function randomPassword(length) {
    var chars = "abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890";
    var pass = "";
    for (var x = 0; x < length; x++) {
      var i = Math.floor(Math.random() * chars.length);
      pass += chars.charAt(i);
    }
    return pass;
  }
  function getConnection(url) {
    var db;
  
    // Initialize DB connection once
    MongoClient.connect(url, function (err, database) {
      db = database;
  
      if (!err) {
        console.log("Listening on port 27107");
        return db;
      } else console.log(" Database Server not running");
      return err;
    });
  }
  
  function getSessionid() {
    var request = __webpack_require__(94);
    console.log('genSessionid - calling API');
    var url = "http://" + _config.apihost + "/genSessionid";
    console.log("getSeesionid - URL: " + url);
  
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('genSessionid - Response from API' + body);
          // sessionid = body;
          resolve(body);
        } else {
  
          console.log("genSessionid -API Server not running: " + error);
          return reject(error);
        }
        console.log("getSessionid - Returning from API call");
      });
    });
  }
  
  function checkSessionid(sessionid) {
    var request = __webpack_require__(94);
    console.log('genSessionid - calling API');
    var url = "http://" + _config.apihost + "/getSessionid?sessionid=" + sessionid;
    console.log("getSeesionid - URL: " + url);
  
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('getSessionid - Response from API' + body);
          // sessionid = body;
          resolve(body);
        } else {
  
          console.log("getSessionid -API Server not running: " + error);
          return reject(error);
        }
        console.log("getSessionid - Returning from API call");
      });
    });
  }

/***/ },
/* 94 */
/***/ function(module, exports) {

  module.exports = require("request");

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _promise = __webpack_require__(84);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Searchprovider = __webpack_require__(96);
  
  var _Searchprovider2 = _interopRequireDefault(_Searchprovider);
  
  var _config = __webpack_require__(20);
  
  var _Providerlist = __webpack_require__(99);
  
  var _Providerlist2 = _interopRequireDefault(_Providerlist);
  
  var _Login = __webpack_require__(88);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  var _Home = __webpack_require__(85);
  
  var _Home2 = _interopRequireDefault(_Home);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var providerlist;
  var sessionid;
  var category;
  
  exports.default = {
  
    path: '/searchprovider',
  
    action: function action(_ref, _ref2) {
      var _this = this;
  
      var query = _ref.query;
      var path = _ref2.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var customeremail, body, searchterm;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
  
                sessionid = query.sessionid;
                customeremail = query.email;
  
                console.log("Sessionid - index.js - SearchProvider " + sessionid);
  
                if (!(sessionid === undefined || sessionid == '')) {
                  _context.next = 8;
                  break;
                }
  
                _context.next = 6;
                return getSessionid();
  
              case 6:
                body = _context.sent;
                return _context.abrupt('return', (0, _jsx3.default)(_Login2.default, {
                  sessionid: body
                }));
  
              case 8:
                searchterm = query.searchterm;
  
                category = query.category;
                console.log("Search Term: " + searchterm);
                console.log("Category: " + category);
  
                if (!(searchterm == 'pincode')) {
                  _context.next = 18;
                  break;
                }
  
                _context.next = 15;
                return getProviderDataByPincode(category);
  
              case 15:
                providerlist = _context.sent;
                _context.next = 21;
                break;
  
              case 18:
                _context.next = 20;
                return getProviderDataByCity(category);
  
              case 20:
                providerlist = _context.sent;
  
              case 21:
                // console.log("Body: "+providerlist);
  
                console.log("customer Email: " + customeremail);
                //console.log("Size:"+providerlist.length);
  
                return _context.abrupt('return', (0, _jsx3.default)(_Searchprovider2.default, {
                  providerlist: providerlist,
                  customeremail: customeremail,
                  sessionid: sessionid
                }));
  
              case 23:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
  
  
  function getProviderDataByCity(searchterm) {
    var request = __webpack_require__(94);
  
    console.log('calling API');
    var url = 'http://' + _config.apihost + '/searchbycity?city=' + category;
    console.log("URL: " + url);
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Inside getProviderData Response from API (body)' + body);
          //providerlist = body;
          console.log("Providerlist: " + providerlist);
          resolve(body);
        } else {
          console.log("Error Object: " + error);
          return reject(error);
        }
      });
    });
  }
  
  function getProviderDataByPincode(searchterm) {
    var request = __webpack_require__(94);
  
    console.log('calling API - getProviderDataByPincode');
    var url = 'http://' + _config.apihost + '/searchbypincode?pincode=' + category;
    console.log("URL: " + url);
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Inside getProviderData Response from API (body)' + body);
          providerlist = body;
          console.log("Providerlist: " + providerlist);
          resolve(body);
        } else {
          console.log("Error Object: " + error);
          return reject(error);
        }
      });
    });
  }
  function getSessionid() {
    var request = __webpack_require__(94);
    console.log('genSessionid - calling API');
    var url = 'http://' + _config.apihost + '/genSessionid';
    console.log("getSeesionid - URL: " + url);
  
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('genSessionid - Response from API' + body);
          //sessionid = body;
          resolve(body);
        } else {
  
          console.log("genSessionid -API Server not running: " + error);
          return reject(error);
        }
        console.log("getSessionid - Returning from API call");
      });
    });
  }

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(59);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Searchprovider = __webpack_require__(97);
  
  var _Searchprovider2 = _interopRequireDefault(_Searchprovider);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Service Provider Search'; /**
                                          * React Starter Kit (https://www.reactstarterkit.com/)
                                          *
                                          * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                          *
                                          * This source code is licensed under the MIT license found in the
                                          * LICENSE.txt file in the root directory of this source tree.
                                          */
  
  var _ref2 = (0, _jsx3.default)('h1', {}, void 0, 'Service Provider Search');
  
  var _ref3 = (0, _jsx3.default)('caption', {}, void 0, 'Service Providers');
  
  var _ref4 = (0, _jsx3.default)('thead', {}, void 0, (0, _jsx3.default)('tr', {}, void 0, (0, _jsx3.default)('th', {}, void 0, 'Email'), (0, _jsx3.default)('th', {}, void 0, 'First Name'), (0, _jsx3.default)('th', {}, void 0, 'Last Name'), (0, _jsx3.default)('th', {}, void 0, 'Address'), (0, _jsx3.default)('th', {}, void 0, 'City'), (0, _jsx3.default)('th', {}, void 0, 'Phone')));
  
  var _ref5 = (0, _jsx3.default)('br', {});
  
  function Searchprovider(_ref, props, context) {
    var providerlist = _ref.providerlist,
        customeremail = _ref.customeremail,
        sessionid = _ref.sessionid;
  
    //context.setTitle(title);
  
    var providerdata = JSON.parse(providerlist);
    var size = providerdata.length;
    console.log("No. of providers: " + size);
    var message = ' ';
    if (size == 0) message = "No provervider for this search Criteria";
  
    console.log("Provider Data: " + providerdata);
    return (0, _jsx3.default)('div', {
      className: _Searchprovider2.default.root
    }, void 0, (0, _jsx3.default)('div', {
      className: _Searchprovider2.default.container
    }, void 0, _ref2, (0, _jsx3.default)('div', {}, void 0, (0, _jsx3.default)('form', {
      name: 'form1',
      method: 'put',
      action: 'home'
    }, void 0, (0, _jsx3.default)('div', {
      className: _Searchprovider2.default.formGroup
    }, void 0, (0, _jsx3.default)('table', {}, void 0, _ref3, _ref4, (0, _jsx3.default)('tbody', {}, void 0, providerdata.map(function (obj, index) {
      return (0, _jsx3.default)('tr', {}, index, (0, _jsx3.default)('td', {}, void 0, obj.email), (0, _jsx3.default)('td', {}, void 0, ' ', obj.firstname), (0, _jsx3.default)('td', {}, void 0, ' ', obj.lname, ' '), (0, _jsx3.default)('td', {}, void 0, ' ', obj.address), (0, _jsx3.default)('td', {}, void 0, ' ', obj.city), (0, _jsx3.default)('td', {}, void 0, obj.phone));
    })))), (0, _jsx3.default)('div', {}, void 0, _ref5, (0, _jsx3.default)('input', {
      type: 'hidden',
      name: 'email',
      value: customeremail
    }), (0, _jsx3.default)('input', {
      type: 'hidden',
      name: 'sessionid',
      value: sessionid
    }), (0, _jsx3.default)('p', {}, void 0, message), (0, _jsx3.default)('button', {
      className: _Searchprovider2.default.button,
      value: 'submit',
      type: 'submit'
    }, void 0, 'Home Page'))))));
  }
  
  Searchprovider.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Searchprovider2.default)(Searchprovider);

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(98);
      var insertCss = __webpack_require__(55);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(54)();
  // imports
  
  
  // module
  exports.push([module.id, "._3jFt{padding-left:20px;padding-right:20px}._2TSr{margin:0 auto;padding:0 0 40px;max-width:380px;max-height:100x}html{min-height:100%}body{min-height:100vh}table,td,th{border:1px solid #000}tr:hover{background-color:#f5f5f5}th{background-color:#4caf50}._2VI1,th{color:#fff}._2VI1{display:block;box-sizing:border-box;margin:0;padding:10px 16px;width:60%;outline:0;border:1px solid #373277;border-radius:0;background:#373277;text-align:center;text-decoration:none;font-size:18px;line-height:1.3333333;cursor:pointer}._2VI1:hover{background:rgba(54,50,119,.8)}._2VI1:focus{border-color:#0074c2;box-shadow:0 0 8px rgba(0,116,194,.6)}div{overflow-x:visible}._2-gr{margin-bottom:15px}", ""]);
  
  // exports
  exports.locals = {
  	"root": "_3jFt",
  	"container": "_2TSr",
  	"button": "_2VI1",
  	"formGroup": "_2-gr"
  };

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(59);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Providerlist = __webpack_require__(100);
  
  var _Providerlist2 = _interopRequireDefault(_Providerlist);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Service Provider Search'; /**
                                          * React Starter Kit (https://www.reactstarterkit.com/)
                                          *
                                          * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                          *
                                          * This source code is licensed under the MIT license found in the
                                          * LICENSE.txt file in the root directory of this source tree.
                                          */
  
  var _ref2 = (0, _jsx3.default)('h1', {}, void 0, 'Service Provider Search');
  
  var _ref3 = (0, _jsx3.default)('p', {}, void 0, 'Select Provider near by you');
  
  var _ref4 = (0, _jsx3.default)('caption', {}, void 0, 'Service Providers');
  
  var _ref5 = (0, _jsx3.default)('thead', {}, void 0, (0, _jsx3.default)('tr', {}, void 0, (0, _jsx3.default)('th', {}, void 0, 'Select'), (0, _jsx3.default)('th', {}, void 0, 'Email'), (0, _jsx3.default)('th', {}, void 0, 'First Name'), (0, _jsx3.default)('th', {}, void 0, 'Last Name'), (0, _jsx3.default)('th', {}, void 0, 'Address'), (0, _jsx3.default)('th', {}, void 0, 'City'), (0, _jsx3.default)('th', {}, void 0, 'Phone')));
  
  var _ref6 = (0, _jsx3.default)('br', {});
  
  function Providerlist(_ref, props, context) {
    var providerlist = _ref.providerlist,
        customeremail = _ref.customeremail,
        sessionid = _ref.sessionid,
        bookingid = _ref.bookingid;
  
    //context.setTitle(title);
  
    var providerdata = JSON.parse(providerlist);
  
    console.log("Provider Data: " + providerdata);
    return (0, _jsx3.default)('div', {
      className: _Providerlist2.default.root
    }, void 0, (0, _jsx3.default)('div', {
      className: _Providerlist2.default.container
    }, void 0, _ref2, _ref3, (0, _jsx3.default)('div', {}, void 0, (0, _jsx3.default)('form', {
      name: 'form1',
      method: 'put',
      action: 'linkprovider'
    }, void 0, (0, _jsx3.default)('div', {
      className: _Providerlist2.default.formGroup
    }, void 0, (0, _jsx3.default)('table', {}, void 0, _ref4, _ref5, (0, _jsx3.default)('tbody', {}, void 0, providerdata.map(function (obj, index) {
      return (0, _jsx3.default)('tr', {}, index, (0, _jsx3.default)('td', {}, void 0, (0, _jsx3.default)('input', {
        type: 'radio',
        name: 'provideremail',
        value: obj.email
      }), ' '), (0, _jsx3.default)('td', {}, void 0, obj.email), (0, _jsx3.default)('td', {}, void 0, ' ', obj.firstname), (0, _jsx3.default)('td', {}, void 0, ' ', obj.lname, ' '), (0, _jsx3.default)('td', {}, void 0, ' ', obj.address), (0, _jsx3.default)('td', {}, void 0, ' ', obj.city), (0, _jsx3.default)('td', {}, void 0, obj.phone));
    })))), (0, _jsx3.default)('div', {}, void 0, _ref6, (0, _jsx3.default)('input', {
      type: 'hidden',
      name: 'customeremail',
      value: customeremail
    }), (0, _jsx3.default)('input', {
      type: 'hidden',
      name: 'sessionid',
      value: sessionid
    }), (0, _jsx3.default)('input', {
      type: 'hidden',
      name: 'bookingid',
      value: bookingid
    }), (0, _jsx3.default)('button', {
      className: _Providerlist2.default.button,
      type: 'submit'
    }, void 0, 'Submit'))))));
  }
  
  Providerlist.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Providerlist2.default)(Providerlist);

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(101);
      var insertCss = __webpack_require__(55);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(54)();
  // imports
  
  
  // module
  exports.push([module.id, "._2frd{padding-left:20px;padding-right:20px}._3Q4I{margin:0 auto;padding:0 0 40px;max-width:380px;max-height:100x}html{min-height:100%}body{min-height:100vh}table,td,th{border:1px solid #000}tr:hover{background-color:#f5f5f5}th{background-color:#4caf50}.TyfY,th{color:#fff}.TyfY{display:block;box-sizing:border-box;margin:0;padding:10px 16px;width:30%;outline:0;border:1px solid #373277;border-radius:0;background:#373277;text-align:center;text-decoration:none;font-size:18px;line-height:1.3333333;cursor:pointer}.TyfY:hover{background:rgba(54,50,119,.8)}.TyfY:focus{border-color:#0074c2;box-shadow:0 0 8px rgba(0,116,194,.6)}div{overflow-x:visible}._2cfQ{margin-bottom:15px}", ""]);
  
  // exports
  exports.locals = {
  	"root": "_2frd",
  	"container": "_3Q4I",
  	"button": "TyfY",
  	"formGroup": "_2cfQ"
  };

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Contact = __webpack_require__(103);
  
  var _Contact2 = _interopRequireDefault(_Contact);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var _ref = (0, _jsx3.default)(_Contact2.default, {});
  
  exports.default = {
  
    path: '/contact',
  
    action: function action() {
      return _ref;
    }
  };

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(59);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Contact = __webpack_require__(104);
  
  var _Contact2 = _interopRequireDefault(_Contact);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Contact Us';
  
  var _ref = (0, _jsx3.default)('h1', {}, void 0, title);
  
  var _ref2 = (0, _jsx3.default)('p', {}, void 0, '...');
  
  function Contact(props, context) {
    context.setTitle(title);
    return (0, _jsx3.default)('div', {
      className: _Contact2.default.root
    }, void 0, (0, _jsx3.default)('div', {
      className: _Contact2.default.container
    }, void 0, _ref, _ref2));
  }
  
  Contact.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Contact2.default)(Contact);

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(105);
      var insertCss = __webpack_require__(55);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(54)();
  // imports
  
  
  // module
  exports.push([module.id, ".sD4L{padding-left:20px;padding-right:20px}.PcAm{margin:0 auto;padding:0 0 40px;max-width:1000px}", ""]);
  
  // exports
  exports.locals = {
  	"root": "sD4L",
  	"container": "PcAm"
  };

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Login = __webpack_require__(88);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  var _config = __webpack_require__(20);
  
  var _util = __webpack_require__(93);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var sessionid = '';
  
  exports.default = {
  
    path: '/login',
  
    action: function action() {
      var _this = this;
  
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var message;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _util.getSessionid)();
  
              case 2:
                sessionid = _context.sent;
                message = ' ';
  
                console.log("SessionId-Login: " + sessionid);
                return _context.abrupt('return', (0, _jsx3.default)(_Login2.default, {
                  sessionid: sessionid,
                  message: message
                }));
  
              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Register = __webpack_require__(108);
  
  var _Register2 = _interopRequireDefault(_Register);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var _ref = (0, _jsx3.default)(_Register2.default, {});
  
  exports.default = {
  
    path: '/register',
  
    action: function action() {
      return _ref;
    }
  };

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(59);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Register = __webpack_require__(109);
  
  var _Register2 = _interopRequireDefault(_Register);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'New User Registration'; /**
                                        * React Starter Kit (https://www.reactstarterkit.com/)
                                        *
                                        * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                        *
                                        * This source code is licensed under the MIT license found in the
                                        * LICENSE.txt file in the root directory of this source tree.
                                        */
  
  var date = new Date();
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  var currentdate = day + '/' + month + '/' + year;
  console.log("Date: " + currentdate);
  
  var _ref = (0, _jsx3.default)('h1', {}, void 0, title);
  
  var _ref2 = (0, _jsx3.default)('input', {
    id: 'modifieddate',
    type: 'hidden',
    value: currentdate,
    name: 'modifieddate'
  });
  
  var _ref3 = (0, _jsx3.default)('span', {}, void 0, 'User Last Name: ');
  
  var _ref4 = (0, _jsx3.default)('span', {}, void 0, 'User Address: ');
  
  var _ref5 = (0, _jsx3.default)('span', {}, void 0, 'City: ');
  
  var _ref6 = (0, _jsx3.default)('span', {}, void 0, 'Zipcode: ');
  
  function Register(props, context) {
    context.setTitle(title);
    return (0, _jsx3.default)('div', {
      className: _Register2.default.root
    }, void 0, (0, _jsx3.default)('div', {
      className: _Register2.default.container
    }, void 0, _ref, (0, _jsx3.default)('form', {
      name: 'form1',
      method: 'put',
      action: 'savecustomer'
    }, void 0, (0, _jsx3.default)('div', {
      classname: _Register2.default.leftContainer
    }, void 0, _ref2, (0, _jsx3.default)('label', {
      className: _Register2.default.label,
      htmlFor: 'firstname'
    }, void 0, 'User First Name:'), (0, _jsx3.default)('input', {
      className: _Register2.default.input,
      id: 'firstname',
      type: 'text',
      name: 'firstname',
      autoFocus: true,
      required: true
    })), (0, _jsx3.default)('div', {
      classname: _Register2.default.rightContainer
    }, void 0, (0, _jsx3.default)('label', {
      className: _Register2.default.label,
      htmlFor: 'Last Name'
    }, void 0, _ref3), (0, _jsx3.default)('input', {
      className: _Register2.default.input,
      id: 'lname',
      type: 'text',
      name: 'lname',
      required: true
    })), (0, _jsx3.default)('div', {}, void 0, (0, _jsx3.default)('label', {
      className: _Register2.default.label,
      htmlFor: 'address'
    }, void 0, _ref4), (0, _jsx3.default)('input', {
      className: _Register2.default.input,
      id: 'address',
      type: 'text',
      name: 'address',
      required: true
    }), (0, _jsx3.default)('label', {
      className: _Register2.default.label,
      htmlFor: 'city'
    }, void 0, _ref5), (0, _jsx3.default)('input', {
      className: _Register2.default.input,
      id: 'city',
      type: 'text',
      name: 'city',
      required: true
    }), (0, _jsx3.default)('label', {
      className: _Register2.default.label,
      htmlFor: 'zipcode'
    }, void 0, _ref6), (0, _jsx3.default)('input', {
      className: _Register2.default.input,
      id: 'zipcode',
      type: 'number',
      name: 'zipcode',
      required: true
    })), (0, _jsx3.default)('div', {
      className: _Register2.default.formGroup
    }, void 0, (0, _jsx3.default)('label', {
      className: _Register2.default.label,
      htmlFor: 'email'
    }, void 0, 'E-mail:'), (0, _jsx3.default)('input', {
      className: _Register2.default.input,
      id: 'email',
      type: 'email',
      name: 'email',
      required: true
    }), (0, _jsx3.default)('label', {
      className: _Register2.default.label,
      htmlFor: 'Phone'
    }, void 0, 'phone:'), (0, _jsx3.default)('input', {
      className: _Register2.default.input,
      id: 'phone',
      type: 'text',
      name: 'phone',
      required: true
    })), (0, _jsx3.default)('div', {
      className: _Register2.default.formGroup
    }, void 0, (0, _jsx3.default)('button', {
      className: _Register2.default.button,
      value: 'submit',
      type: 'submit'
    }, void 0, 'Register')))));
  }
  
  Register.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Register2.default)(Register);

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(110);
      var insertCss = __webpack_require__(55);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(54)();
  // imports
  
  
  // module
  exports.push([module.id, "._3RBt{padding-left:20px;padding-right:20px}._1Lf8{margin:0 auto;padding:0 0 40px;max-width:380px}._2sJj{font-size:1.25em}._1Geh{margin-bottom:20px}.sr8I{margin-bottom:5px;max-width:100%;font-weight:700;float:left}._3Sox{display:block;box-sizing:border-box;padding:10px 16px;width:100%;height:46px;outline:0;border:1px solid #ccc;border-radius:10;background:#fff;box-shadow:inset 0 1px 1px rgba(0,0,0,.075);color:#616161;font-size:18px;line-height:1.3333333;-webkit-transition:border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out;size:15;max-width:30}._3Sox:focus{border-color:#0074c2;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(0,116,194,.6)}._3SiE{display:block;box-sizing:border-box;margin:0;padding:10px 16px;width:100%;outline:0;border:1px solid #373277;border-radius:0;background:#373277;color:#fff;text-align:center;text-decoration:none;font-size:18px;line-height:1.3333333;cursor:pointer}._3SiE:hover{background:rgba(54,50,119,.8)}._3SiE:focus{border-color:#0074c2;box-shadow:0 0 8px rgba(0,116,194,.6)}._3EIs{float:left}._25ix{float:right}._3KC9{display:inline-block;margin:-2px 12px -2px 0;width:20px;height:20px;vertical-align:middle;fill:currentColor}._2IJN{position:relative;z-index:1;display:block;margin-bottom:15px;width:100%;color:#757575;text-align:center;font-size:80%}._2IJN:before{top:50%;left:50%;z-index:-1;margin-top:-5px;margin-left:-20px;width:40px;height:10px;background-color:#fff}._2IJN:after,._2IJN:before{position:absolute;content:''}._2IJN:after{top:49%;z-index:-2;display:block;width:100%;border-bottom:1px solid #ddd}#_27ZK{max-width:100px;float:left}._17d6{float:right}", ""]);
  
  // exports
  exports.locals = {
  	"root": "_3RBt",
  	"container": "_1Lf8",
  	"lead": "_2sJj",
  	"formGroup": "_1Geh",
  	"label": "sr8I",
  	"input": "_3Sox",
  	"button": "_3SiE",
  	"leftContainer": "_3EIs",
  	"rightContainer": "_25ix",
  	"icon": "_3KC9",
  	"lineThrough": "_2IJN",
  	"lastname": "_27ZK",
  	"div": "_17d6"
  };

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _promise = __webpack_require__(84);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Forgotpass = __webpack_require__(112);
  
  var _Forgotpass2 = _interopRequireDefault(_Forgotpass);
  
  var _Login = __webpack_require__(88);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  var _config = __webpack_require__(20);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var request = __webpack_require__(94);
  //import Providerlogin from '../providerlogin/Providerlogin'
  
  
  var status = 'false';
  var errormessage = '';
  //var user;
  var href;
  var message;
  var message1;
  
  var _ref3 = (0, _jsx3.default)(_Forgotpass2.default, {});
  
  var _ref4 = (0, _jsx3.default)(_Login2.default, {});
  
  var _ref5 = (0, _jsx3.default)(_Forgotpass2.default, {
    errormessage: errormessage
  });
  
  exports.default = {
  
    path: '/forgotpass',
  
    action: function action(_ref, _ref2) {
      var _this = this;
  
      var query = _ref.query;
      var path = _ref2.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var email, validlogin, code, body, result;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                email = query.email;
                //user = query.user;
  
                console.log("Email ID:" + email);
                //console.log("User: "+user);
  
                if (!(typeof email === 'undefined')) {
                  _context.next = 6;
                  break;
                }
  
                return _context.abrupt('return', _ref3);
  
              case 6:
                _context.next = 8;
                return checkLogin(email);
  
              case 8:
                validlogin = _context.sent;
  
                console.log("ValidLogin:" + validlogin);
  
                if (!(validlogin == 'true')) {
                  _context.next = 20;
                  break;
                }
  
                code = passwordCode(6);
  
                console.log("Passcode: " + code);
                _context.next = 15;
                return sendEmail(email, code);
  
              case 15:
                body = _context.sent;
  
                if (!(body == 'true')) {
                  _context.next = 20;
                  break;
                }
  
                _context.next = 19;
                return storePasscode(email, code);
  
              case 19:
                result = _context.sent;
  
              case 20:
                console.log("Status: " + status);
  
                if (!(status == true)) {
                  _context.next = 26;
                  break;
                }
  
                console.log("Redirected to Login Page");
                return _context.abrupt('return', _ref4);
  
              case 26:
                console.log("Error in Reseting password request");
                return _context.abrupt('return', _ref5);
  
              case 28:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
  
  
  function sendEmail(email, code) {
    console.log('calling API - sendEmail');
    var url = 'http://' + _config.apihost + '/sendmail';
    console.log("URL: " + url);
  
    var subject = "Your Password Reset";
    var href = 'http://' + _config.host + '/changepassword?code=' + code + '&userEmail=' + email;
    console.log("Href: " + href);
    var message = '<b>We received your request for password Reset. <a href="' + href + '" >Click here to reset password</a> ';
    var formdata = {
      tomail: email,
      subject: subject,
      message: message
    };
  
    console.log("Data: " + formdata);
    return new _promise2.default(function (resolve, reject) {
      request.post(url, { form: formdata }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Inside sendEmail - Response from API (body)' + body);
  
          if (body == 'true') status = true;else status = false;
          resolve(body);
        } else if (error) {
          console.log("Error in Sending Mail");
          status = false;
          return reject(error);
        }
      });
    });
  }
  
  function passwordCode(length) {
    var chars = "abcdefghijklmnopqrstuvwxyz!@#$%^*()-+<>ABCDEFGHIJKLMNOP1234567890";
    var pass = "";
    for (var x = 0; x < length; x++) {
      var i = Math.floor(Math.random() * chars.length);
      pass += chars.charAt(i);
    }
    return pass;
  }
  
  function storePasscode(email, code) {
  
    console.log("Inside storePasscode method email: " + email);
    console.log("Inside storePasscode method Code: " + code);
    console.log('calling API');
    var url = 'http://' + _config.apihost + '/storePasscode';
    console.log("URL: " + url);
    return new _promise2.default(function (resolve, reject) {
      request.post(url, { form: { email: email, code: code } }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Inside StorePasscode Response from API (body)' + body);
  
          if (body == 'true') status = true;
          resolve(body);
        } else {
          console.log("Error in storing passcode");
          status = false;
          return reject(error);
        }
      });
    });
  }
  
  function checkLogin(email) {
  
    console.log('calling API - checkLogin - forgotpass');
    var url = 'http://' + _config.apihost + '/findemail?email=' + email;
  
    console.log("URL: " + url);
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Response from API: - Forgot Passwor - Cutomer' + body);
          if (body == 'true') status = true;
          resolve(body);
        } else {
          status = 'false';
          console.log("API Server not running: " + error);
          return reject(error);
        }
        console.log('Returning');
      });
    });
  }

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(59);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Forgotpass = __webpack_require__(113);
  
  var _Forgotpass2 = _interopRequireDefault(_Forgotpass);
  
  var _Link = __webpack_require__(62);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Changing Password';
  
  var _ref = (0, _jsx3.default)('h1', {}, void 0, title);
  
  function Forgotpass(props, context) {
    context.setTitle(title);
    return (0, _jsx3.default)('div', {
      className: _Forgotpass2.default.root
    }, void 0, (0, _jsx3.default)('div', {
      className: _Forgotpass2.default.container
    }, void 0, _ref, (0, _jsx3.default)('form', {
      name: 'form1',
      method: 'put',
      action: 'forgotpass'
    }, void 0, (0, _jsx3.default)('div', {
      className: _Forgotpass2.default.formGroup
    }, void 0, (0, _jsx3.default)('label', {
      className: _Forgotpass2.default.label,
      htmlFor: 'email'
    }, void 0, 'Email:'), (0, _jsx3.default)('input', {
      className: _Forgotpass2.default.input,
      id: 'email',
      type: 'email',
      name: 'email',
      placeholder: 'Enter E-mail',
      required: 'required'
    })), (0, _jsx3.default)('div', {
      className: _Forgotpass2.default.formGroup
    }, void 0, (0, _jsx3.default)('button', {
      className: _Forgotpass2.default.button,
      type: 'submit'
    }, void 0, 'Send Reset Email')))));
  }
  
  Forgotpass.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Forgotpass2.default)(Forgotpass);

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(114);
      var insertCss = __webpack_require__(55);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(54)();
  // imports
  
  
  // module
  exports.push([module.id, "._2bx-{padding-left:20px;padding-right:20px}._2z15{margin:0 auto;padding:0 0 40px;max-width:380px}._3Qza{font-size:1.25em}.xHrz{margin-bottom:20px}._1Je5{display:inline-block;margin-bottom:5px;max-width:100%;font-weight:700}.hyqQ{display:block;box-sizing:border-box;padding:10px 16px;width:100%;height:46px;outline:0;border:1px solid #ccc;border-radius:10;background:#fff;box-shadow:inset 0 1px 1px rgba(0,0,0,.075);color:#616161;font-size:18px;line-height:1.3333333;-webkit-transition:border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out}.hyqQ:focus{border-color:#0074c2;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(0,116,194,.6)}._7B_h{display:block;box-sizing:border-box;margin:0;padding:10px 16px;width:100%;outline:0;border:1px solid #373277;border-radius:0;background:#373277;color:#fff;text-align:center;text-decoration:none;font-size:18px;line-height:1.3333333;cursor:pointer}._7B_h:hover{background:rgba(54,50,119,.8)}._7B_h:focus{border-color:#0074c2;box-shadow:0 0 8px rgba(0,116,194,.6)}._2eZK{border-color:#3b5998;background:#3b5998}._2eZK:hover{background:#2d4373}.TMnq{border-color:#dd4b39;background:#dd4b39}.TMnq:hover{background:#c23321}.XfUk{border-color:#55acee;background:#55acee}.XfUk:hover{background:#2795e9}._2y13{display:inline-block;margin:-2px 12px -2px 0;width:20px;height:20px;vertical-align:middle;fill:currentColor}._34aJ{position:relative;z-index:1;display:block;margin-bottom:15px;width:100%;color:#757575;text-align:center;font-size:80%}._34aJ:before{top:50%;left:50%;z-index:-1;margin-top:-5px;margin-left:-20px;width:40px;height:10px;background-color:#fff}._34aJ:after,._34aJ:before{position:absolute;content:''}._34aJ:after{top:49%;z-index:-2;display:block;width:100%;border-bottom:1px solid #ddd}", ""]);
  
  // exports
  exports.locals = {
  	"root": "_2bx-",
  	"container": "_2z15",
  	"lead": "_3Qza",
  	"formGroup": "xHrz",
  	"label": "_1Je5",
  	"input": "hyqQ",
  	"button": "_7B_h",
  	"facebook": "_2eZK _7B_h",
  	"google": "TMnq _7B_h",
  	"twitter": "XfUk _7B_h",
  	"icon": "_2y13",
  	"lineThrough": "_34aJ"
  };

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _promise = __webpack_require__(84);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _stringify = __webpack_require__(56);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var sendSMS = function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      var url;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              console.log('calling API - sendSMS method');
  
              url = 'http://' + _config.apihost + '/sendSMS?authkey=' + _config.smsAPIKey + '&mobiles=' + phone + '&message=' + SMSmessage + '&sender=DTSBMF&route=4&country=91';
  
              console.log("URL: " + url);
              return _context2.abrupt('return', new _promise2.default(function (resolve, reject) {
                request(url, function (error, response, body) {
                  if (!error && response.statusCode == 200) {
                    console.log('Inside sendSMS - Response from API (body)' + body);
  
                    if (error) {
                      console.log("Error in Sending SMS");
                      status = false;
                      return reject(error);
                    }
  
                    if (body == 'true') status = true;
                    resolve(body);
                  }
                });
              }));
  
            case 4:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));
  
    return function sendSMS() {
      return _ref3.apply(this, arguments);
    };
  }();
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Savecustomer = __webpack_require__(116);
  
  var _Savecustomer2 = _interopRequireDefault(_Savecustomer);
  
  var _Login = __webpack_require__(119);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  var _config = __webpack_require__(20);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var request = __webpack_require__(94);
  var SMSmessage = 'Thanks for your Registration. Use your email id for login';
  
  var message = 'Sucessfully Registered. ';
  var href = 'http://' + _config.host + '/login';
  var message1 = 'Click here to login';
  var status = true;
  var fn;
  var ln;
  var address;
  var email;
  var phone;
  var zipcode;
  var password;
  
  exports.default = {
  
    path: '/savecustomer',
  
    action: function action(_ref, _ref2) {
      var _this = this;
  
      var query = _ref.query;
      var path = _ref2.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var body, customerdata, login, mail, sms;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log("Query String: " + (0, _stringify2.default)(query));
  
                path = '/';
                fn = query.firstname;
                console.log(fn);
                ln = query.lname;
                address = query.address;
                zipcode = query.zipcode;
                phone = query.phone;
                email = query.email;
                _context.next = 11;
                return checkDuplicate(email);
  
              case 11:
                body = _context.sent;
  
                console.log("Response: " + body);
  
                if (!(body == 'false')) {
                  _context.next = 36;
                  break;
                }
  
                _context.next = 16;
                return saveCustomerData(query);
  
              case 16:
                customerdata = _context.sent;
  
                console.log("Customerdata: " + customerdata);
                console.log("Status--saveCustomerData: " + status);
  
                if (!(customerdata == 'true')) {
                  _context.next = 36;
                  break;
                }
  
                _context.next = 22;
                return getPassword();
  
              case 22:
                password = _context.sent;
  
                console.log("generated Password: " + password);
                console.log("Status--getPassword: " + status);
                _context.next = 27;
                return saveLogin(password);
  
              case 27:
                login = _context.sent;
  
                console.log("Calling SendEmail");
                _context.next = 31;
                return sendEmail();
  
              case 31:
                mail = _context.sent;
  
                console.log("Calling sendSMS");
                _context.next = 35;
                return sendSMS();
  
              case 35:
                sms = _context.sent;
  
              case 36:
  
                if (!status) {
                  message = 'Error in Saving Customer Data';
                  href = 'http://' + _config.host + '/register';
  
                  message1 = 'Click here to Register.';
                }
                console.log("Href: " + href);
                return _context.abrupt('return', (0, _jsx3.default)(_Savecustomer2.default, {
                  message: message,
                  redirectlink: href,
                  message1: message1
                }));
  
              case 39:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
  
  
  function checkDuplicate(email) {
    var url = 'http://' + _config.apihost + '/getCustomer?email=' + email;
    console.log("URL: checkDuplicate " + url);
  
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Check duplicate - Response from API' + body);
  
          if (body == 'true') {
            message = 'Email id already register';
            status = 'false';
          } else {
            console.log("Customer email not exist");
            status = 'true';
          }
          resolve(body);
        } else {
  
          console.log("Check duplicate - Error in getting customer ") + error;
          return reject(error);
        }
      });
      console.log("Checkduplicate -- Returning");
    });
  }
  
  function saveCustomerData(data) {
    // var request = require('request');
    console.log('saveCustomerData -- calling API');
    //var request = require('request-promise');
    var url = 'http://' + _config.apihost + '/addNewCustomer';
    console.log("saveCustomerData -- URL: " + url);
  
    return new _promise2.default(function (resolve, reject) {
      request.post(url, { form: data }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Inside saveCustomerData Response from API (body)' + body);
  
          if (body == 'true') {
            status = true;
          }
          resolve(body);
        } else {
          console.log("saveCustomerData -- Error in storing customer data");
          status = false;
          return error;
        }
  
        console.log('saveCustomerData -- returning from API call');
      });
    });
  }
  
  function getPassword() {
    var url = 'http://' + _config.apihost + '/generatePass?length=6';
    console.log("getPassword -- URL: " + url);
  
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('getPassword --  Response from API' + body);
          status = 'true';
          resolve(body);
        } else {
  
          console.log("getPassword -- API Server not running: " + error);
          status = 'false';
          return error;
        }
        console.log('getPassword -- returning from API call');
      });
    });
  }
  
  function saveLogin(password) {
    var data = { "userEmail": email, "password": password };
    console.log("Data: " + data);
    var url = 'http://' + _config.apihost + '/addcred';
    return new _promise2.default(function (resolve, reject) {
      request.post(url, { form: data }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('saveLogin Password - Response from API' + body);
          status = true;
          resolve(body);
        } else {
          status = false;
          console.log("saveLoging -API Server not running: ") + error;
          return error;
        }
      });
    });
  }
  
  function sendEmail() {
    console.log('calling API - sendEmail');
    var url = 'http://' + _config.apihost + '/sendmail';
    console.log("URL: " + url);
  
    var subject = "Your Registration for our service";
    var message = "<b>Thank you for Register. </b> <br> <b> Assuring best service. Your password for login is: " + password + "<b> ";
    var formdata = {
      tomail: email,
      subject: subject,
      message: message
    };
  
    //data = JSON.stringify('{\"tomail\": \"'+email+'\", \"subject\": '+subject+'\", \"message\": \" '+message+'\"}');
    console.log("Data: " + formdata);
    return new _promise2.default(function (resolve, reject) {
      request.post(url, { form: formdata }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Inside sendEmail - Response from API (body)' + body);
  
          if (body == 'true') resolve(body);
          status = true;
        }
        if (error) {
          console.log("Error in Sending Mail");
          status = false;
          return reject(error);
        }
      });
    });
  }

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(59);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Savecustomer = __webpack_require__(117);
  
  var _Savecustomer2 = _interopRequireDefault(_Savecustomer);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'New User Registration'; /**
                                        * React Starter Kit (https://www.reactstarterkit.com/)
                                        *
                                        * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                        *
                                        * This source code is licensed under the MIT license found in the
                                        * LICENSE.txt file in the root directory of this source tree.
                                        */
  
  var _ref2 = (0, _jsx3.default)('h1', {}, void 0, title);
  
  function Savecustomer(_ref, context) {
    var message = _ref.message,
        redirectlink = _ref.redirectlink,
        message1 = _ref.message1;
  
    context.setTitle(title);
    return (0, _jsx3.default)('div', {
      className: _Savecustomer2.default.root
    }, void 0, (0, _jsx3.default)('div', {
      className: _Savecustomer2.default.container
    }, void 0, _ref2, (0, _jsx3.default)('p', {}, void 0, message), (0, _jsx3.default)('a', {
      href: redirectlink
    }, void 0, message1, ' ')));
  }
  
  Savecustomer.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Savecustomer2.default)(Savecustomer);

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(118);
      var insertCss = __webpack_require__(55);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(54)();
  // imports
  
  
  // module
  exports.push([module.id, "._1nSe{padding-left:20px;padding-right:20px}.lBNt{margin:0 auto;padding:0 0 40px;max-width:380px}.EItp{font-size:1.25em}._3qk5{margin-bottom:20px}._2FoQ{margin-bottom:5px;max-width:100%;font-weight:700;float:left}._2C9v{display:block;box-sizing:border-box;padding:10px 16px;width:100%;height:46px;outline:0;border:1px solid #ccc;border-radius:10;background:#fff;box-shadow:inset 0 1px 1px rgba(0,0,0,.075);color:#616161;font-size:18px;line-height:1.3333333;-webkit-transition:border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out}._2C9v:focus{border-color:#0074c2;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(0,116,194,.6)}._1Zaq{display:block;box-sizing:border-box;margin:0;padding:10px 16px;width:100%;outline:0;border:1px solid #373277;border-radius:0;background:#373277;color:#fff;text-align:center;text-decoration:none;font-size:18px;line-height:1.3333333;cursor:pointer}._1Zaq:hover{background:rgba(54,50,119,.8)}._1Zaq:focus{border-color:#0074c2;box-shadow:0 0 8px rgba(0,116,194,.6)}. ._2t6P{display:inline-block;margin:-2px 12px -2px 0;width:20px;height:20px;vertical-align:middle;fill:currentColor}._1yJy{position:relative;z-index:1;display:block;margin-bottom:15px;width:100%;color:#757575;text-align:center;font-size:80%}._1yJy:before{top:50%;left:50%;z-index:-1;margin-top:-5px;margin-left:-20px;width:40px;height:10px;background-color:#fff}._1yJy:after,._1yJy:before{position:absolute;content:''}._1yJy:after{top:49%;z-index:-2;display:block;width:100%;border-bottom:1px solid #ddd}#_3YEy{max-width:100px;float:left}._3UGD{float:right}#_3RPw{float:left}#L4-x{float:right}", ""]);
  
  // exports
  exports.locals = {
  	"root": "_1nSe",
  	"container": "lBNt",
  	"lead": "EItp",
  	"formGroup": "_3qk5",
  	"label": "_2FoQ",
  	"input": "_2C9v",
  	"button": "_1Zaq",
  	"icon": "_2t6P",
  	"lineThrough": "_1yJy",
  	"lastname": "_3YEy",
  	"div": "_3UGD",
  	"leftContainer": "_3RPw",
  	"rightContainer": "L4-x"
  };

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Login = __webpack_require__(120);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  var _config = __webpack_require__(20);
  
  var _util = __webpack_require__(93);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var sessionid = '';
  
  exports.default = {
  
    path: '/login',
  
    action: function action() {
      var _this = this;
  
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var message;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _util.getSessionid)();
  
              case 2:
                sessionid = _context.sent;
                message = ' ';
  
                console.log("SessionId-Login: " + sessionid);
                return _context.abrupt('return', (0, _jsx3.default)(_Login2.default, {
                  sessionid: sessionid,
                  message: message
                }));
  
              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactDom = __webpack_require__(89);
  
  var _reactDom2 = _interopRequireDefault(_reactDom);
  
  var _withStyles = __webpack_require__(59);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Login = __webpack_require__(121);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  var _Link = __webpack_require__(62);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  var _formsyReact = __webpack_require__(92);
  
  var _formsyReact2 = _interopRequireDefault(_formsyReact);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Entering Credentials';
  //var classNames = require('classnames');
  
  var _ref2 = (0, _jsx3.default)('h1', {}, void 0, title);
  
  var _ref3 = (0, _jsx3.default)('path', {
    d: 'M22 16l1-5h-5V7c0-1.544.784-2 3-2h2V0h-4c-4.072 0-7 2.435-7 7v4H7v5h5v14h6V16h4z'
  });
  
  var _ref4 = (0, _jsx3.default)('span', {}, void 0, 'Log in with Facebook');
  
  var _ref5 = (0, _jsx3.default)('span', {}, void 0, 'Log in with Google');
  
  var _ref6 = (0, _jsx3.default)('span', {}, void 0, 'Log in with Twitter');
  
  var _ref7 = (0, _jsx3.default)(_Link2.default, {
    to: '/forgotpass'
  }, void 0, 'Forgot Password');
  
  var _ref8 = (0, _jsx3.default)(_Link2.default, {
    to: '/register'
  }, void 0, 'Sign Up');
  
  function Login(_ref, context) {
    var sessionid = _ref.sessionid,
        message = _ref.message;
  
    context.setTitle(title);
    console.log("Login.js-SessionId: " + sessionid);
    return (0, _jsx3.default)('div', {
      className: _Login2.default.root
    }, void 0, (0, _jsx3.default)('div', {
      className: _Login2.default.container
    }, void 0, _ref2, (0, _jsx3.default)('p', {
      className: _Login2.default.lead
    }, void 0, 'Log in with your username or personal email address.'), (0, _jsx3.default)('div', {
      className: _Login2.default.formGroup
    }, void 0, (0, _jsx3.default)('a', {
      className: _Login2.default.facebook,
      href: '/login/facebook'
    }, void 0, (0, _jsx3.default)('svg', {
      className: _Login2.default.icon,
      width: '10',
      height: '10',
      viewBox: '0 0 10 10',
      xmlns: 'http://www.w3.org/2000/svg'
    }, void 0, _ref3), _ref4)), (0, _jsx3.default)('div', {
      className: _Login2.default.formGroup
    }, void 0, (0, _jsx3.default)('a', {
      className: _Login2.default.google,
      href: '/login/google'
    }, void 0, (0, _jsx3.default)('svg', {
      className: _Login2.default.icon,
      width: '30',
      height: '30',
      viewBox: '0 0 30 30',
      xmlns: 'http://www.w3.org/2000/svg'
    }, void 0, (0, _jsx3.default)('path', {
      d: 'M30 13h-4V9h-2v4h-4v2h4v4h2v-4h4m-15 2s-2-1.15-2-2c0 0-.5-1.828 1-3 ' + '1.537-1.2 3-3.035 3-5 0-2.336-1.046-5-3-6h3l2.387-1H10C5.835 0 2 3.345 2 7c0 ' + '3.735 2.85 6.56 7.086 6.56.295 0 .58-.006.86-.025-.273.526-.47 1.12-.47 1.735 ' + '0 1.037.817 2.042 1.523 2.73H9c-5.16 0-9 2.593-9 6 0 3.355 4.87 6 10.03 6 5.882 ' + '0 9.97-3 9.97-7 0-2.69-2.545-4.264-5-6zm-4-4c-2.395 0-5.587-2.857-6-6C4.587 ' + '3.856 6.607.93 9 1c2.394.07 4.603 2.908 5.017 6.052C14.43 10.195 13 13 11 ' + '13zm-1 15c-3.566 0-7-1.29-7-4 0-2.658 3.434-5.038 7-5 .832.01 2 0 2 0 1 0 ' + '2.88.88 4 2 1 1 1 2.674 1 3 0 3-1.986 4-7 4z'
    })), _ref5)), (0, _jsx3.default)('div', {
      className: _Login2.default.formGroup
    }, void 0, (0, _jsx3.default)('a', {
      className: _Login2.default.twitter,
      href: '/login/twitter'
    }, void 0, (0, _jsx3.default)('svg', {
      className: _Login2.default.icon,
      width: '30',
      height: '30',
      viewBox: '0 0 30 30',
      xmlns: 'http://www.w3.org/2000/svg'
    }, void 0, (0, _jsx3.default)('path', {
      d: 'M30 6.708c-1.105.49-2.756 1.143-4 1.292 1.273-.762 2.54-2.56 ' + '3-4-.97.577-2.087 1.355-3.227 1.773L25 5c-1.12-1.197-2.23-2-4-2-3.398 0-6 ' + '2.602-6 6 0 .4.047.7.11.956L15 10C9 10 5.034 8.724 2 5c-.53.908-1 1.872-1 ' + '3 0 2.136 1.348 3.894 3 5-1.01-.033-2.17-.542-3-1 0 2.98 4.186 6.432 7 7-1 ' + '1-4.623.074-5 0 .784 2.447 3.31 3.95 6 4-2.105 1.648-4.647 2.51-7.53 2.51-.5 ' + '0-.988-.03-1.47-.084C2.723 27.17 6.523 28 10 28c11.322 0 17-8.867 17-17 ' + '0-.268.008-.736 0-1 1.2-.868 2.172-2.058 3-3.292z'
    })), _ref6)), (0, _jsx3.default)('strong', {
      className: _Login2.default.lineThrough
    }, void 0, 'OR'), (0, _jsx3.default)('form', {
      name: 'form1',
      method: 'get',
      action: 'verifypass'
    }, void 0, (0, _jsx3.default)('div', {
      className: _Login2.default.formGroup
    }, void 0, (0, _jsx3.default)('label', {
      className: _Login2.default.label,
      htmlFor: 'usernameOrEmail'
    }, void 0, 'Username or email address:'), (0, _jsx3.default)('input', {
      className: _Login2.default.input,
      id: 'usernameOrEmail',
      type: 'email',
      name: 'usernameOrEmail',
      required: 'required',
      autoFocus: true
    })), (0, _jsx3.default)('div', {
      className: _Login2.default.formGroup
    }, void 0, (0, _jsx3.default)('label', {
      className: _Login2.default.label,
      htmlFor: 'password'
    }, void 0, 'Password:'), (0, _jsx3.default)('input', {
      className: _Login2.default.input,
      id: 'password',
      type: 'password',
      name: 'password',
      required: 'required'
    }), (0, _jsx3.default)('p', {
      className: _Login2.default.p
    }, void 0, (0, _jsx3.default)('b', {}, void 0, ' ', message), ' ')), (0, _jsx3.default)('div', {
      className: _Login2.default.formGroup
    }, void 0, (0, _jsx3.default)('button', {
      className: _Login2.default.button1,
      type: 'submit'
    }, void 0, 'Log in'), _ref7, (0, _jsx3.default)('span', {
      className: _Login2.default.spacer
    }, void 0, ' | '), _ref8, (0, _jsx3.default)('input', {
      id: 'sessionid',
      type: 'hidden',
      name: 'sessionid',
      value: sessionid
    })))));
  }
  
  Login.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Login2.default)(Login);

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(122);
      var insertCss = __webpack_require__(55);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(54)();
  // imports
  
  
  // module
  exports.push([module.id, "._2w1G{padding-left:20px;padding-right:20px}html{box-sizing:border-box}._GIr{margin:0 auto;padding:0 0 40px;max-width:380px}._1kn_{font-size:1.25em}._1oM7{margin-bottom:15px}._1Gyv{display:inline-block;margin-bottom:5px;max-width:100%;font-weight:700}._3HuS{display:block;box-sizing:border-box;padding:10px 16px;width:100%;height:26px;outline:0;border:1px solid #ccc;border-radius:0;background:#fff;box-shadow:inset 0 1px 1px rgba(0,0,0,.075);color:#616161;font-size:18px;line-height:1.3333333;-webkit-transition:border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out}._3HuS:focus{border-color:#0074c2;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(0,116,194,.6)}._1Z59{color:red}._2e4L{width:80%;outline:10;background:#373277;font-size:18px}._2e4L,.Mej-{display:block;box-sizing:border-box;margin:0;padding:10px 16px;border:1px solid #373277;border-radius:0;color:#fff;text-align:center;text-decoration:none;line-height:1.3333333;cursor:pointer}.Mej-{width:50%;outline:0;background:#373388;font-size:14px}._2e4L:hover{background:rgba(54,50,119,.8)}._2e4L:focus{border-color:#0074c2;box-shadow:0 0 8px rgba(0,116,194,.6)}._1Zmh{border-color:#3b5998;background:#3b5998}._1Zmh:hover{background:#2d4373}.U0ze{border-color:#dd4b39;background:#dd4b39}.U0ze:hover{background:#c23321}._1C5b{border-color:#55acee;background:#55acee}._1C5b:hover{background:#2795e9}._2K7W{display:inline-block;margin:-2px 12px -2px 0;width:10px;height:10px;vertical-align:middle;fill:currentColor}._1sWJ{position:relative;z-index:1;display:block;margin-bottom:15px;width:100%;color:#757575;text-align:center;font-size:80%}._1sWJ:before{top:50%;left:50%;z-index:-1;margin-top:-5px;margin-left:-20px;width:40px;height:10px;background-color:#fff}._1sWJ:after,._1sWJ:before{position:absolute;content:''}._1sWJ:after{top:49%;z-index:-2;display:block;width:100%;border-bottom:1px solid #ddd}", ""]);
  
  // exports
  exports.locals = {
  	"root": "_2w1G",
  	"container": "_GIr",
  	"lead": "_1kn_",
  	"formGroup": "_1oM7",
  	"label": "_1Gyv",
  	"input": "_3HuS",
  	"p": "_1Z59",
  	"button": "_2e4L",
  	"button1": "Mej-",
  	"facebook": "_1Zmh _2e4L",
  	"google": "U0ze _2e4L",
  	"twitter": "_1C5b _2e4L",
  	"icon": "_2K7W",
  	"lineThrough": "_1sWJ"
  };

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _stringify = __webpack_require__(56);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Content = __webpack_require__(124);
  
  var _Content2 = _interopRequireDefault(_Content);
  
  var _fetch = __webpack_require__(39);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
  
    path: '*',
  
    action: function action(_ref) {
      var _this = this;
  
      var path = _ref.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var resp, _ref2, data;
  
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _fetch2.default)('/graphql', {
                  method: 'post',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                  },
                  body: (0, _stringify2.default)({
                    query: '{content(path:"' + path + '"){path,title,content,component}}'
                  }),
                  credentials: 'include'
                });
  
              case 2:
                resp = _context.sent;
  
                if (!(resp.status !== 200)) {
                  _context.next = 5;
                  break;
                }
  
                throw new Error(resp.statusText);
  
              case 5:
                _context.next = 7;
                return resp.json();
  
              case 7:
                _ref2 = _context.sent;
                data = _ref2.data;
  
                if (!(!data || !data.content)) {
                  _context.next = 11;
                  break;
                }
  
                return _context.abrupt('return', undefined);
  
              case 11:
                return _context.abrupt('return', _react2.default.createElement(_Content2.default, data.content));
  
              case 12:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _getPrototypeOf = __webpack_require__(46);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(47);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(48);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(49);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(50);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(59);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Content = __webpack_require__(125);
  
  var _Content2 = _interopRequireDefault(_Content);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var Content = function (_Component) {
    (0, _inherits3.default)(Content, _Component);
  
    function Content() {
      (0, _classCallCheck3.default)(this, Content);
      return (0, _possibleConstructorReturn3.default)(this, (Content.__proto__ || (0, _getPrototypeOf2.default)(Content)).apply(this, arguments));
    }
  
    (0, _createClass3.default)(Content, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.context.setTitle(this.props.title);
      }
    }, {
      key: 'render',
      value: function render() {
        return (0, _jsx3.default)('div', {
          className: _Content2.default.root
        }, void 0, (0, _jsx3.default)('div', {
          className: _Content2.default.container
        }, void 0, this.props.path === '/' ? null : (0, _jsx3.default)('h1', {}, void 0, this.props.title), (0, _jsx3.default)('div', {
          dangerouslySetInnerHTML: { __html: this.props.content || '' }
        })));
      }
    }]);
    return Content;
  }(_react.Component);
  
  Content.contextTypes = {
    setTitle: _react.PropTypes.func.isRequired
  };
  exports.default = (0, _withStyles2.default)(_Content2.default)(Content);

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(126);
      var insertCss = __webpack_require__(55);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(54)();
  // imports
  
  
  // module
  exports.push([module.id, "._2X05{padding-left:20px;padding-right:20px}._20Tb{margin:0 auto;padding:0 0 40px;max-width:1000px}", ""]);
  
  // exports
  exports.locals = {
  	"root": "_2X05",
  	"container": "_20Tb"
  };

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _App = __webpack_require__(45);
  
  var _App2 = _interopRequireDefault(_App);
  
  var _ErrorPage = __webpack_require__(128);
  
  var _ErrorPage2 = _interopRequireDefault(_ErrorPage);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
  
    path: '/error',
  
    action: function action(_ref) {
      var render = _ref.render,
          context = _ref.context,
          error = _ref.error;
  
      return render((0, _jsx3.default)(_App2.default, {
        context: context,
        error: error
      }, void 0, (0, _jsx3.default)(_ErrorPage2.default, {
        error: error
      })), error.status || 500);
    }
  };

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(59);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _ErrorPage = __webpack_require__(129);
  
  var _ErrorPage2 = _interopRequireDefault(_ErrorPage);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function ErrorPage(_ref, context) {
    var error = _ref.error;
  
    var title = 'Error';
    var content = 'Sorry, a critical error occurred on this page.';
    var errorMessage = null;
  
    if (error.status === 404) {
      title = 'Page Not Found';
      content = 'Sorry, the page you were trying to view does not exist.';
    } else if (false) {
      errorMessage = (0, _jsx3.default)('pre', {}, void 0, error.stack);
    }
  
    context.setTitle(title);
  
    return (0, _jsx3.default)('div', {}, void 0, (0, _jsx3.default)('h1', {}, void 0, title), (0, _jsx3.default)('p', {}, void 0, content), errorMessage);
  }
  
  ErrorPage.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_ErrorPage2.default)(ErrorPage);

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(130);
      var insertCss = __webpack_require__(55);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(54)();
  // imports
  
  
  // module
  exports.push([module.id, "*{line-height:1.2;margin:0}html{color:#888;display:table;font-family:sans-serif;height:100%;text-align:center;width:100%}body{display:table-cell;vertical-align:middle;margin:2em auto}h1{color:#555;font-size:2em;font-weight:400}p{margin:0 auto;width:280px}pre{text-align:left;margin-top:32px;margin-top:2rem}@media only screen and (max-width:280px){body,p{width:95%}h1{font-size:1.5em;margin:0 0 .3em}}", ""]);
  
  // exports


/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _promise = __webpack_require__(84);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Verifypass = __webpack_require__(132);
  
  var _Verifypass2 = _interopRequireDefault(_Verifypass);
  
  var _Login = __webpack_require__(88);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  var _ErrorPage = __webpack_require__(128);
  
  var _ErrorPage2 = _interopRequireDefault(_ErrorPage);
  
  var _Home = __webpack_require__(85);
  
  var _Home2 = _interopRequireDefault(_Home);
  
  var _config = __webpack_require__(20);
  
  var _util = __webpack_require__(93);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var request = __webpack_require__(94);
  
  var res;
  var userEmail;
  var password;
  var validLogin;
  var url;
  var page;
  var status;
  var sessionid;
  exports.default = {
  
    path: '/verifypass',
  
    action: function action(_ref, _ref2) {
      var _this = this;
  
      var query = _ref.query;
      var path = _ref2.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var newsessionid, body, bookinglist, message;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
  
                console.log("inside the verifypass");
  
                userEmail = query.usernameOrEmail;
                password = query.password;
                sessionid = query.sessionid;
                console.log(userEmail);
                console.log(password);
                console.log("SessionId: " + sessionid);
                //var sessionbody = await checkSessionid(sessionid);
                //console.log("Session Exist: "+sessionbody);
  
                if (!(sessionid === undefined || sessionid == '')) {
                  _context.next = 13;
                  break;
                }
  
                _context.next = 10;
                return (0, _util.getSessionid)();
  
              case 10:
                newsessionid = _context.sent;
  
                console.log("inside the if");
                return _context.abrupt('return', (0, _jsx3.default)(_Login2.default, {
                  sessionid: newsessionid
                }));
  
              case 13:
  
                url = 'http://' + _config.apihost + '/checklogin?usernameOrEmail=' + userEmail + '&password=' + password;
  
                _context.next = 16;
                return verifylogin(url);
  
              case 16:
                validLogin = _context.sent;
  
                console.log("Result from API call: " + validLogin);
  
                if (!(validLogin == 'true')) {
                  _context.next = 29;
                  break;
                }
  
                _context.next = 21;
                return SaveSessionData();
  
              case 21:
                body = _context.sent;
  
                console.log(" Going to Home Page");
                _context.next = 25;
                return getBookingData();
  
              case 25:
                bookinglist = _context.sent;
                return _context.abrupt('return', (0, _jsx3.default)(_Home2.default, {
                  sessionid: sessionid,
                  email: userEmail,
                  bookinglist: bookinglist
                }));
  
              case 29:
                message = "Invalid username or passowrd";
  
                console.log(" Invalid Credential return to Login Page");
                return _context.abrupt('return', (0, _jsx3.default)(_Login2.default, {
                  sessionid: sessionid,
                  message: message
                }));
  
              case 32:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
  
  
  function verifylogin(url) {
    console.log("URL -- veriylogin: " + url);
  
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Response from API' + body);
          validLogin = body;
          resolve(body);
        } else {
          console.log("Server not responding");
          validLogin = false;
        }
  
        console.log("ValidLogin status: " + validLogin);
      });
    });
  }
  
  function SaveSessionData() {
  
    console.log('calling API - SaveSessionData method');
    var url = 'http://' + _config.apihost + '/addSession';
    console.log("URL: " + url);
    var createdate = new Date();
    var data = {
      email: userEmail,
      sessionid: sessionid,
      creationdate: createdate
    };
    console.log("Data: " + data);
    return new _promise2.default(function (resolve, reject) {
      request.post(url, { form: data }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Inside SaveSessionData Response from API (body)' + body);
  
          if (body == 'true') status = true;
          resolve(body);
        }
        if (error) {
          console.log("Error in storing Session data");
          status = false;
          return reject(error);
        }
      });
  
      console.log('returning');
    });
  }
  
  function getBookingData() {
    var request = __webpack_require__(94);
  
    console.log('calling API');
    var url = 'http://' + _config.apihost + '/getBookingHistory?email=' + userEmail;
    console.log("URL: " + url);
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Inside getBookingData Response from API (body)' + body);
          resolve(body);
        } else {
          console.log("Error Object: " + error);
          return reject(error);
        }
      });
    });
  }

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(59);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _VerifyPass = __webpack_require__(133);
  
  var _VerifyPass2 = _interopRequireDefault(_VerifyPass);
  
  var _me = __webpack_require__(27);
  
  var _me2 = _interopRequireDefault(_me);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Verify Credential';
  var user = 'Customer';
  
  var _ref2 = (0, _jsx3.default)('h1', {}, void 0, title);
  
  function VerifyPass(_ref, props, context) {
    var message = _ref.message,
        sessionid = _ref.sessionid;
  
    context.setUser(user);
    context.setTitle(title);
  
    return (0, _jsx3.default)('div', {
      className: _VerifyPass2.default.root
    }, void 0, (0, _jsx3.default)('div', {
      className: _VerifyPass2.default.container
    }, void 0, _ref2, (0, _jsx3.default)('p', {}, void 0, message), (0, _jsx3.default)('input', {
      id: 'sessionid',
      type: 'hidden',
      name: 'sessionid',
      value: sessionid
    })));
  }
  
  VerifyPass.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_VerifyPass2.default)(VerifyPass);

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(134);
      var insertCss = __webpack_require__(55);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(54)();
  // imports
  
  
  // module
  exports.push([module.id, "._3U8G{padding-left:20px;padding-right:20px}._270Z{margin:0 auto;padding:0 0 40px;max-width:380px}.M-yQ{font-size:1.25em}.K23n{margin-bottom:20px}._1xUR{display:inline-block;margin-bottom:5px;max-width:100%;font-weight:700}._3irr{display:block;box-sizing:border-box;padding:10px 16px;width:100%;height:46px;outline:0;border:1px solid #ccc;border-radius:10;background:#fff;box-shadow:inset 0 1px 1px rgba(0,0,0,.075);color:#616161;font-size:18px;line-height:1.3333333;-webkit-transition:border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out}._3irr:focus{border-color:#0074c2;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(0,116,194,.6)}.YQ7v{display:block;box-sizing:border-box;margin:0;padding:10px 16px;width:100%;outline:0;border:1px solid #373277;border-radius:0;background:#373277;color:#fff;text-align:center;text-decoration:none;font-size:18px;line-height:1.3333333;cursor:pointer}.YQ7v:hover{background:rgba(54,50,119,.8)}.YQ7v:focus{border-color:#0074c2;box-shadow:0 0 8px rgba(0,116,194,.6)}._3azS{border-color:#3b5998;background:#3b5998}._3azS:hover{background:#2d4373}._2t1s{border-color:#dd4b39;background:#dd4b39}._2t1s:hover{background:#c23321}._3GYr{border-color:#55acee;background:#55acee}._3GYr:hover{background:#2795e9}._2IJS{display:inline-block;margin:-2px 12px -2px 0;width:20px;height:20px;vertical-align:middle;fill:currentColor}._1A5r{position:relative;z-index:1;display:block;margin-bottom:15px;width:100%;color:#757575;text-align:center;font-size:80%}._1A5r:before{top:50%;left:50%;z-index:-1;margin-top:-5px;margin-left:-20px;width:40px;height:10px;background-color:#fff}._1A5r:after,._1A5r:before{position:absolute;content:''}._1A5r:after{top:49%;z-index:-2;display:block;width:100%;border-bottom:1px solid #ddd}", ""]);
  
  // exports
  exports.locals = {
  	"root": "_3U8G",
  	"container": "_270Z",
  	"lead": "M-yQ",
  	"formGroup": "K23n",
  	"label": "_1xUR",
  	"input": "_3irr",
  	"button": "YQ7v",
  	"facebook": "_3azS YQ7v",
  	"google": "_2t1s YQ7v",
  	"twitter": "_3GYr YQ7v",
  	"icon": "_2IJS",
  	"lineThrough": "_1A5r"
  };

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _promise = __webpack_require__(84);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Changepassword = __webpack_require__(136);
  
  var _Changepassword2 = _interopRequireDefault(_Changepassword);
  
  var _Login = __webpack_require__(88);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  var _config = __webpack_require__(20);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var status = false;
  
  var _ref3 = (0, _jsx3.default)(_Login2.default, {});
  
  exports.default = {
  
    path: '/changepassword',
  
    action: function action(_ref, _ref2) {
      var _this = this;
  
      var query = _ref.query;
      var path = _ref2.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var email, code, startdate, body, enddate, difftime;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                email = query.userEmail;
                code = query.code;
  
                console.log("Email ID:" + email);
                startdate = new Date();
                _context.next = 6;
                return checkCode(code, email);
  
              case 6:
                body = _context.sent;
                enddate = new Date();
                difftime = enddate.getTime() - startdate.getTime();
  
                console.log("Execution Time:" + difftime);
  
                if (!status) {
                  _context.next = 14;
                  break;
                }
  
                return _context.abrupt('return', (0, _jsx3.default)(_Changepassword2.default, {
                  email: email,
                  passCode: code
                }));
  
              case 14:
                return _context.abrupt('return', _ref3);
  
              case 15:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
  
  
  function checkCode(code, email) {
    var request = __webpack_require__(94);
    console.log('Check Code - calling API');
    var url = 'http://' + _config.apihost + '/getCode?code=' + code + '&userEmail=' + email;
    console.log("Checkcode - URL: " + url);
  
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Checkcode - Response from API' + body);
  
          if (body == 'true') status = true;else status = false;
          resolve(body);
        } else {
          status = false;
          console.log("checkCode -API Server not running: " + error);
          return reject(error);
        }
        console.log("Checkecode - Returning from API call");
      });
    });
  }

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(59);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _changepassword = __webpack_require__(137);
  
  var _changepassword2 = _interopRequireDefault(_changepassword);
  
  var _Link = __webpack_require__(62);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Changing Password';
  
  var _ref2 = (0, _jsx3.default)('h1', {}, void 0, title);
  
  var _ref3 = (0, _jsx3.default)('script', {
    type: 'text/javascript',
    src: '../scripts/passwordmatch.js'
  }, void 0);
  
  var _ref4 = (0, _jsx3.default)('script', {}, void 0);
  
  function Changepassword(_ref, context) {
    var email = _ref.email,
        passCode = _ref.passCode,
        message = _ref.message;
  
    console.log("Changepassword: " + email);
    context.setTitle(title);
    return (0, _jsx3.default)('div', {
      className: _changepassword2.default.root
    }, void 0, (0, _jsx3.default)('div', {
      className: _changepassword2.default.container
    }, void 0, _ref2, _ref3, (0, _jsx3.default)('form', {
      name: 'form1',
      method: 'put',
      action: 'updatepass'
    }, void 0, (0, _jsx3.default)('div', {
      className: _changepassword2.default.formGroup
    }, void 0, (0, _jsx3.default)('label', {
      className: _changepassword2.default.label,
      htmlFor: 'password'
    }, void 0, 'New Password:'), (0, _jsx3.default)('input', {
      className: _changepassword2.default.input,
      id: 'newpass',
      type: 'password',
      name: 'newpass',
      autoFocus: true,
      required: true
    })), (0, _jsx3.default)('div', {
      className: _changepassword2.default.formGroup
    }, void 0, (0, _jsx3.default)('label', {
      className: _changepassword2.default.label,
      htmlFor: 'password'
    }, void 0, 'Confirm Password:'), (0, _jsx3.default)('input', {
      className: _changepassword2.default.input,
      id: 'confirmpass',
      type: 'password',
      name: 'confirmpass'
    }), (0, _jsx3.default)('label', {
      className: _changepassword2.default.label1,
      htmlFor: 'message'
    }, void 0, message)), (0, _jsx3.default)('div', {
      className: _changepassword2.default.formGroup
    }, void 0, (0, _jsx3.default)('button', {
      className: _changepassword2.default.button,
      value: 'Change Password',
      type: 'submit'
    }, void 0, 'Change Password'), (0, _jsx3.default)('input', {
      className: _changepassword2.default.input,
      id: 'email',
      type: 'hidden',
      name: 'email',
      value: email
    }), (0, _jsx3.default)('input', {
      id: 'code',
      type: 'hidden',
      name: 'code',
      value: passCode
    })), _ref4)));
  }
  
  Changepassword.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_changepassword2.default)(Changepassword);

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(138);
      var insertCss = __webpack_require__(55);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(54)();
  // imports
  
  
  // module
  exports.push([module.id, "._2hwf{padding-left:20px;padding-right:20px}.vd0A{margin:0 auto;padding:0 0 40px;max-width:380px}._337T{font-size:1.25em}._2czP{margin-bottom:20px}._1io7{font-weight:700}._1io7,._2XuQ{display:inline-block;margin-bottom:5px;max-width:100%}._2XuQ{font-weight:300;color:red}._3LTy{display:block;box-sizing:border-box;padding:10px 16px;width:100%;height:46px;outline:0;border:1px solid #ccc;border-radius:10;background:#fff;box-shadow:inset 0 1px 1px rgba(0,0,0,.075);color:#616161;font-size:18px;line-height:1.3333333;-webkit-transition:border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out}._3LTy:focus{border-color:#0074c2;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(0,116,194,.6)}.CSnd{display:block;box-sizing:border-box;margin:0;padding:10px 16px;width:100%;outline:0;border:1px solid #373277;border-radius:0;background:#373277;color:#fff;text-align:center;text-decoration:none;font-size:18px;line-height:1.3333333;cursor:pointer}.CSnd:hover{background:rgba(54,50,119,.8)}.CSnd:focus{border-color:#0074c2;box-shadow:0 0 8px rgba(0,116,194,.6)}", ""]);
  
  // exports
  exports.locals = {
  	"root": "_2hwf",
  	"container": "vd0A",
  	"lead": "_337T",
  	"formGroup": "_2czP",
  	"label": "_1io7",
  	"label1": "_2XuQ",
  	"input": "_3LTy",
  	"button": "CSnd"
  };

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _promise = __webpack_require__(84);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Updatepass = __webpack_require__(140);
  
  var _Updatepass2 = _interopRequireDefault(_Updatepass);
  
  var _Changepassword = __webpack_require__(136);
  
  var _Changepassword2 = _interopRequireDefault(_Changepassword);
  
  var _config = __webpack_require__(20);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var status = true;
  var message = 'Password Sucessfully Updated';
  var href = 'http://' + _config.host + '/login';
  var message1 = 'Click here to login';
  var passcode;
  
  exports.default = {
  
    path: '/updatepass',
  
    action: function action(_ref, _ref2) {
      var _this = this;
  
      var query = _ref.query;
      var path = _ref2.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var email, newpass, confirmpass, body, deletecode;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                email = query.email;
                newpass = query.newpass;
                confirmpass = query.confirmpass;
  
                passcode = query.code;
                console.log("Email ID:" + email);
                console.log("New Password: " + newpass);
                console.log("Confirm Password: " + confirmpass);
                console.log("Passcode - Update Password module:" + passcode);
  
                if (!(newpass != confirmpass)) {
                  _context.next = 11;
                  break;
                }
  
                message = "Password Not matching";
                return _context.abrupt('return', (0, _jsx3.default)(_Changepassword2.default, {
                  email: email,
                  message: message
                }));
  
              case 11:
                _context.next = 13;
                return updatePassword(newpass, email);
  
              case 13:
                body = _context.sent;
  
                if (!(status = false)) {
                  _context.next = 18;
                  break;
                }
  
                message = ' Error in updating password';
                _context.next = 22;
                break;
  
              case 18:
                message = 'Password Sucessfully Updated';
                _context.next = 21;
                return deletePassCode();
  
              case 21:
                deletecode = _context.sent;
  
              case 22:
                return _context.abrupt('return', (0, _jsx3.default)(_Updatepass2.default, {
                  message: message,
                  message1: message1,
                  redirectlink: href
                }));
  
              case 23:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
  
  
  function updatePassword(newpass, email) {
    var request = __webpack_require__(94);
    console.log("Inside updatePassword method email: " + email);
    console.log("Inside updatePassword method Password: " + newpass);
    console.log('calling API');
    var url = 'http://' + _config.apihost + '/updatecred?newpass=' + newpass + '&email=' + email;
    console.log("Update Password - URL: " + url);
  
    return new _promise2.default(function (resolve, reject) {
  
      request.put(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Change Password - Response from API' + body);
          if (body == 'true') {
            status = true;
          } else {
            status = false;
            message = 'Error in updating password';
          }
          resolve(body);
        } else {
          status = false;
          console.log("Change Password -API Server not running: ") + error;
          return reject(error);
        }
      });
    });
  }
  
  function deletePassCode() {
    var request = __webpack_require__(94);
    console.log('Check Code - calling API');
    var url = 'http://' + _config.apihost + '/removeCode?code=' + passcode;
    console.log("deletePassCode - URL: " + url);
  
    return new _promise2.default(function (resolve, reject) {
      request.delete(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('deletePassCode- Response from API' + body);
  
          if (body == 'true') status = true;else status = false;
          resolve(body);
        } else {
          status = false;
          console.log("deletePassCode -API Server not running: " + error);
          return reject(error);
        }
        console.log("deletePassCode - Returning from API call");
      });
    });
  }

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(59);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _updatepass = __webpack_require__(141);
  
  var _updatepass2 = _interopRequireDefault(_updatepass);
  
  var _Link = __webpack_require__(62);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var title = 'Update Password';
  
  var _ref2 = (0, _jsx3.default)('h1', {}, void 0, title);
  
  function Updatepass(_ref, context) {
    var message = _ref.message,
        message1 = _ref.message1,
        redirectlink = _ref.redirectlink;
  
    context.setTitle(title);
    return (0, _jsx3.default)('div', {
      className: _updatepass2.default.root
    }, void 0, (0, _jsx3.default)('div', {
      className: _updatepass2.default.container
    }, void 0, _ref2, (0, _jsx3.default)('p', {}, void 0, message), (0, _jsx3.default)('a', {
      href: redirectlink
    }, void 0, message1, ' ')));
  }
  
  Updatepass.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_updatepass2.default)(Updatepass);

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(142);
      var insertCss = __webpack_require__(55);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(54)();
  // imports
  
  
  // module
  exports.push([module.id, ".Q_nn{padding-left:20px;padding-right:20px}.n8c_{margin:0 auto;padding:0 0 40px;max-width:380px}._1Xib{font-size:1.25em}._1FjH{margin-bottom:20px}._3lcA{display:inline-block;margin-bottom:5px;max-width:100%;font-weight:700}._3tgo{display:block;box-sizing:border-box;padding:10px 16px;width:100%;height:46px;outline:0;border:1px solid #ccc;border-radius:10;background:#fff;box-shadow:inset 0 1px 1px rgba(0,0,0,.075);color:#616161;font-size:18px;line-height:1.3333333;-webkit-transition:border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out}._3tgo:focus{border-color:#0074c2;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(0,116,194,.6)}._1mTR{display:block;box-sizing:border-box;margin:0;padding:10px 16px;width:100%;outline:0;border:1px solid #373277;border-radius:0;background:#373277;color:#fff;text-align:center;text-decoration:none;font-size:18px;line-height:1.3333333;cursor:pointer}._1mTR:hover{background:rgba(54,50,119,.8)}._1mTR:focus{border-color:#0074c2;box-shadow:0 0 8px rgba(0,116,194,.6)}._2jXp{border-color:#3b5998;background:#3b5998}._2jXp:hover{background:#2d4373}._1WT-{border-color:#dd4b39;background:#dd4b39}._1WT-:hover{background:#c23321}._3cWg{border-color:#55acee;background:#55acee}._3cWg:hover{background:#2795e9}.IAXF{display:inline-block;margin:-2px 12px -2px 0;width:20px;height:20px;vertical-align:middle;fill:currentColor}._3LSu{position:relative;z-index:1;display:block;margin-bottom:15px;width:100%;color:#757575;text-align:center;font-size:80%}._3LSu:before{top:50%;left:50%;z-index:-1;margin-top:-5px;margin-left:-20px;width:40px;height:10px;background-color:#fff}._3LSu:after,._3LSu:before{position:absolute;content:''}._3LSu:after{top:49%;z-index:-2;display:block;width:100%;border-bottom:1px solid #ddd}", ""]);
  
  // exports
  exports.locals = {
  	"root": "Q_nn",
  	"container": "n8c_",
  	"lead": "_1Xib",
  	"formGroup": "_1FjH",
  	"label": "_3lcA",
  	"input": "_3tgo",
  	"button": "_1mTR",
  	"facebook": "_2jXp _1mTR",
  	"google": "_1WT- _1mTR",
  	"twitter": "_3cWg _1mTR",
  	"icon": "IAXF",
  	"lineThrough": "_3LSu"
  };

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Serviceprovider = __webpack_require__(144);
  
  var _Serviceprovider2 = _interopRequireDefault(_Serviceprovider);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var _ref = (0, _jsx3.default)(_Serviceprovider2.default, {});
  
  exports.default = {
  
    path: '/serviceprovider',
  
    action: function action() {
      return _ref;
    }
  };

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(59);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Serviceprovider = __webpack_require__(145);
  
  var _Serviceprovider2 = _interopRequireDefault(_Serviceprovider);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Service Provider Registration'; /**
                                                * React Starter Kit (https://www.reactstarterkit.com/)
                                                *
                                                * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                                *
                                                * This source code is licensed under the MIT license found in the
                                                * LICENSE.txt file in the root directory of this source tree.
                                                */
  
  var date = new Date();
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  var currentdate = day + '/' + month + '/' + year;
  
  var _ref = (0, _jsx3.default)('h2', {}, void 0, title);
  
  var _ref2 = (0, _jsx3.default)('input', {
    id: 'modifieddate',
    type: 'hidden',
    value: currentdate,
    name: 'modifieddate'
  });
  
  var _ref3 = (0, _jsx3.default)('span', {}, void 0, 'User Last Name: ');
  
  var _ref4 = (0, _jsx3.default)('span', {}, void 0, 'User Address: ');
  
  var _ref5 = (0, _jsx3.default)('span', {}, void 0, 'City: ');
  
  var _ref6 = (0, _jsx3.default)('span', {}, void 0, 'Zipcode: ');
  
  function Serviceprovider(props, context) {
    context.setTitle(title);
    return (0, _jsx3.default)('div', {
      className: _Serviceprovider2.default.root
    }, void 0, (0, _jsx3.default)('div', {
      className: _Serviceprovider2.default.container
    }, void 0, _ref, (0, _jsx3.default)('form', {
      name: 'form1',
      method: 'put',
      action: 'saveprovider'
    }, void 0, (0, _jsx3.default)('div', {
      className: _Serviceprovider2.default.leftContainer
    }, void 0, _ref2, (0, _jsx3.default)('label', {
      className: _Serviceprovider2.default.label,
      htmlFor: 'firstname'
    }, void 0, 'User First Name:'), (0, _jsx3.default)('input', {
      className: _Serviceprovider2.default.input,
      id: 'firstname',
      type: 'text',
      name: 'firstname',
      placeholder: 'First Name',
      autoFocus: true,
      required: true
    }), (0, _jsx3.default)('label', {
      className: _Serviceprovider2.default.label,
      htmlFor: 'Last Name'
    }, void 0, _ref3), (0, _jsx3.default)('input', {
      className: _Serviceprovider2.default.input,
      id: 'lname',
      type: 'text',
      name: 'lname',
      placeholder: 'Last Name',
      required: true
    })), (0, _jsx3.default)('div', {}, void 0, (0, _jsx3.default)('label', {
      className: _Serviceprovider2.default.label,
      htmlFor: 'address'
    }, void 0, _ref4), (0, _jsx3.default)('input', {
      className: _Serviceprovider2.default.input,
      id: 'address',
      type: 'text',
      name: 'address',
      placeholder: 'Address',
      required: true
    }), (0, _jsx3.default)('label', {
      className: _Serviceprovider2.default.label,
      htmlFor: 'city'
    }, void 0, _ref5), (0, _jsx3.default)('input', {
      className: _Serviceprovider2.default.input,
      id: 'city',
      type: 'text',
      name: 'city',
      placeholder: 'City',
      required: true
    }), (0, _jsx3.default)('label', {
      className: _Serviceprovider2.default.label,
      htmlFor: 'zipcode'
    }, void 0, _ref6), (0, _jsx3.default)('input', {
      className: _Serviceprovider2.default.input,
      id: 'zipcode',
      type: 'number',
      name: 'zipcode',
      placeholder: 'Zipcode',
      required: true
    })), (0, _jsx3.default)('div', {
      className: _Serviceprovider2.default.formGroup
    }, void 0, (0, _jsx3.default)('label', {
      className: _Serviceprovider2.default.label,
      htmlFor: 'email'
    }, void 0, 'E-mail:'), (0, _jsx3.default)('input', {
      className: _Serviceprovider2.default.input,
      id: 'email',
      type: 'email',
      name: 'email',
      placeholder: 'Your E-mail',
      required: true
    }), (0, _jsx3.default)('label', {
      className: _Serviceprovider2.default.label,
      htmlFor: 'Phone'
    }, void 0, 'phone:'), (0, _jsx3.default)('input', {
      className: _Serviceprovider2.default.input,
      id: 'phone',
      type: 'text',
      name: 'phone',
      placeholder: 'Mobile Number',
      required: true
    })), (0, _jsx3.default)('div', {
      className: _Serviceprovider2.default.formGroup
    }, void 0, (0, _jsx3.default)('label', {
      className: _Serviceprovider2.default.label,
      htmlFor: 'servicetype'
    }, void 0, 'Service Type:'), (0, _jsx3.default)('input', {
      className: _Serviceprovider2.default.input,
      id: 'servicetype',
      type: 'servicetype',
      name: 'servicetype',
      placeholder: 'Service Type Catering, Astrology etc.',
      required: true
    })), (0, _jsx3.default)('div', {}, void 0, (0, _jsx3.default)('label', {
      className: _Serviceprovider2.default.label,
      htmlFor: 'serve'
    }, void 0, 'Serve Outside:'), (0, _jsx3.default)('input', {
      className: _Serviceprovider2.default.squaredOne,
      id: 'serveoutside',
      type: 'checkbox',
      name: 'serveoutside'
    })), (0, _jsx3.default)('div', {
      className: _Serviceprovider2.default.formGroup
    }, void 0, (0, _jsx3.default)('button', {
      className: _Serviceprovider2.default.button,
      value: 'submit',
      type: 'submit'
    }, void 0, 'Save')))));
  }
  
  Serviceprovider.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Serviceprovider2.default)(Serviceprovider);

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(146);
      var insertCss = __webpack_require__(55);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(54)();
  // imports
  
  
  // module
  exports.push([module.id, "._3Lll{padding-left:20px;padding-right:20px}.c6ZH{margin:0 auto;padding:0 0 40px;max-width:380px;max-height:100x}._35Ed{font-size:1.25em}._3-S7{margin-bottom:20px}._15bS{margin-bottom:5px;max-width:100%;font-weight:700;float:left}._354n{display:block;box-sizing:border-box;padding:10px 16px;width:100%;height:26px;outline:0;border:1px solid #ccc;border-radius:10;background:#fff;box-shadow:inset 0 1px 1px rgba(0,0,0,.075);color:#616161;font-size:18px;line-height:1.3333333;-webkit-transition:border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out;size:15;max-width:30}._354n:focus{border-color:red;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(0,116,194,.6)}.vnx2{display:block;box-sizing:border-box;margin:0;padding:10px 16px;width:50%;outline:0;border:1px solid #373277;border-radius:0;background:#373277;color:#fff;text-align:center;text-decoration:none;font-size:14px;line-height:1.3333333;cursor:pointer}.vnx2:hover{background:rgba(54,50,119,.8)}.vnx2:focus{border-color:#0074c2;box-shadow:0 0 8px rgba(0,116,194,.6)}._31vr{float:left}._2M61{float:right}._1-OP{display:inline-block;margin:-2px 12px -2px 0;width:20px;height:20px;vertical-align:middle;fill:currentColor}._2lM6{position:relative;z-index:1;display:block;margin-bottom:15px;width:100%;color:#757575;text-align:center;font-size:80%}._2lM6:before{top:50%;left:50%;z-index:-1;margin-top:-5px;margin-left:-20px;width:40px;height:10px;background-color:#fff}._2lM6:after,._2lM6:before{position:absolute;content:''}._2lM6:after{top:49%;z-index:-2;display:block;width:100%;border-bottom:1px solid #ddd}._5rna{width:28px;height:28px;position:relative;margin:20px auto;background:#fcfff4;background:-webkit-gradient(linear,left top,left bottom,from(#fcfff4),color-stop(40%,#dfe5d7),to(#b3bead));background:-webkit-linear-gradient(top,#fcfff4,#dfe5d7 40%,#b3bead);background:linear-gradient(top,#fcfff4,#dfe5d7 40%,#b3bead);box-shadow:inset 0 1px 1px #fff,0 1px 3px rgba(0,0,0,.5);label{width:20px;height:20px;position:absolute;top:4px;left:4px;cursor:pointer;background:-webkit-gradient(linear,left top,left bottom,from(top),color-stop(0,#222),to(#45484d));background:-webkit-linear-gradient(top,#222,#45484d);background:linear-gradient(top,#222,#45484d);box-shadow:inset 0 1px 1px rgba(0,0,0,.5),0 1px 0 #fff}label:after{content:'';width:16px;height:16px;position:absolute;top:2px;left:2px;background:$activeColor;background:-webkit-gradient(linear,left top,left bottom,from($activeColor),to($darkenColor));background:-webkit-linear-gradient(top,$activeColor,$darkenColor);background:linear-gradient(top,$activeColor,$darkenColor);box-shadow:inset 0 1px 1px #fff,0 1px 3px rgba(0,0,0,.5);opacity:0}label:hover:after{opacity:.3}input[type=checkbox]{visibility:hidden}input[type=checkbox]:checked+label:after{opacity:1}}html{min-height:100%}body{min-height:100vh}", ""]);
  
  // exports
  exports.locals = {
  	"root": "_3Lll",
  	"container": "c6ZH",
  	"lead": "_35Ed",
  	"formGroup": "_3-S7",
  	"label": "_15bS",
  	"input": "_354n",
  	"button": "vnx2",
  	"leftContainer": "_31vr",
  	"rightContainer": "_2M61",
  	"icon": "_1-OP",
  	"lineThrough": "_2lM6",
  	"squaredOne": "_5rna"
  };

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _promise = __webpack_require__(84);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _stringify = __webpack_require__(56);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Saveprovider = __webpack_require__(148);
  
  var _Saveprovider2 = _interopRequireDefault(_Saveprovider);
  
  var _Login = __webpack_require__(119);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  var _config = __webpack_require__(20);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var request = __webpack_require__(94);
  
  var message = 'Sucessfully Registered. <a href="http://' + _config.apihost + '/login" >Click here to login</a>';
  var status = true;
  /*var fn;
  var ln;
  var address;
  
  var phone;
  var zipcode;
  var type;
  var serve;*/
  
  var email;
  var message = 'Sucessfully Registered. ';
  var href = 'http://' + _config.host + '/providerlogin';
  var message1 = 'Click here to login';
  var password;
  
  exports.default = {
  
    path: '/saveprovider',
  
    action: function action(_ref, _ref2) {
      var _this = this;
  
      var query = _ref.query;
      var path = _ref2.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var result, savelogin, emailstatus;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log("Query String: " + (0, _stringify2.default)(query));
                path = '/';
                /*fn = query.firstname;
                console.log(fn);
                ln = query.lname;
                address = query.address;
                zipcode = query.zipcode;
                phone = query.phone;*/
                email = query.email;
  
                _context.next = 5;
                return SaveproviderData(query);
  
              case 5:
                result = _context.sent;
  
                console.log("Status -- SaveproviderData: " + status);
  
                if (!status) {
                  _context.next = 17;
                  break;
                }
  
                _context.next = 10;
                return getPassword();
  
              case 10:
                password = _context.sent;
  
                console.log("Status -- getPassword: " + status);
  
                if (!status) {
                  _context.next = 16;
                  break;
                }
  
                _context.next = 15;
                return saveLogin(password);
  
              case 15:
                savelogin = _context.sent;
  
              case 16:
                emailstatus = sendEmail();
  
              case 17:
                if (!status) {
                  message = 'Error in Provider Data';
                  href = 'http://' + _config.host + '/serviceprovider';
                  message1 = 'Click here to Register';
                }
                return _context.abrupt('return', (0, _jsx3.default)(_Saveprovider2.default, {
                  message: message,
                  href: href,
                  message1: message1
                }));
  
              case 19:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
  
  
  function SaveproviderData(data) {
    var request = __webpack_require__(94);
    //console.log("Inside storePasscode method email: " + email);
    // console.log("Inside storePasscode method Code: " + code);
    console.log('calling API');
    var url = 'http://' + _config.apihost + '/addNewProvider';
    console.log("URL: " + url);
  
    return new _promise2.default(function (resolve, reject) {
      request.post(url, { form: data }, function (error, response, body) {
  
        if (error) return reject(error);
        if (!error && response.statusCode == 200) {
          console.log('Inside SaveproviderData Response from API (body)' + body);
          if (body == 'true') {
            status = true;
          } else {
            console.log("Error in storing customer data");
            status = false;
          }
          resolve(body);
        }
        console.log('returning');
      });
    });
  }
  
  function getPassword() {
    var url = 'http://' + _config.apihost + '/generatePass?length=6';
    console.log("URL: " + url);
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('generate Password - Response from API' + body);
          resolve(body);
        } else {
  
          console.log("Get Password - API Server not running: ") + error;
          return reject(error);
        }
      });
    });
  }
  
  function saveLogin(password) {
    var data = { "email": email, "password": password };
    console.log("Data: " + data);
    var url = 'http://' + _config.apihost + '/addlogin';
    //var url = `http://${apihost}/addproviderlogin';
    return new _promise2.default(function (resolve, reject) {
      request.post(url, { form: data }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('saveLogin Password - Response from API' + body);
          status = true;
          resolve(body);
        } else {
          status = false;
          console.log("Change Password -API Server not running: ") + error;
          return reject(error);
        }
      });
    });
  }
  
  function sendEmail() {
    console.log('calling API - sendEmail');
    var url = 'http://' + _config.apihost + '/sendmail';
    console.log("URL: " + url);
  
    var subject = "Your Registration for our service";
    var message = "<b>Thank you for Register. </b> <br> <b> Assuring best service. Your password for login is: " + password + "<b> ";
    var formdata = {
      tomail: email,
      subject: subject,
      message: message
    };
  
    //data = JSON.stringify('{\"tomail\": \"'+email+'\", \"subject\": '+subject+'\", \"message\": \" '+message+'\"}');
    console.log("Data: " + formdata);
    return new _promise2.default(function (resolve, reject) {
      request.post(url, { form: formdata }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Inside sendEmail - Response from API (body)' + body);
  
          if (body == 'true') resolve(body);
          status = true;
        }
        if (error) {
          console.log("Error in Sending Mail");
          status = false;
          return reject(error);
        }
      });
    });
  }

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(59);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Saveprovider = __webpack_require__(149);
  
  var _Saveprovider2 = _interopRequireDefault(_Saveprovider);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'New Provider Registration'; /**
                                            * React Starter Kit (https://www.reactstarterkit.com/)
                                            *
                                            * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                            *
                                            * This source code is licensed under the MIT license found in the
                                            * LICENSE.txt file in the root directory of this source tree.
                                            */
  
  var _ref2 = (0, _jsx3.default)('h1', {}, void 0, title);
  
  function Saveprovider(_ref, context) {
    var message = _ref.message,
        message1 = _ref.message1,
        href = _ref.href;
  
    context.setTitle(title);
    return (0, _jsx3.default)('div', {
      className: _Saveprovider2.default.root
    }, void 0, (0, _jsx3.default)('div', {
      className: _Saveprovider2.default.container
    }, void 0, _ref2, (0, _jsx3.default)('p', {}, void 0, message), (0, _jsx3.default)('a', {
      href: href
    }, void 0, message1, ' ')));
  }
  
  Saveprovider.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Saveprovider2.default)(Saveprovider);

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(150);
      var insertCss = __webpack_require__(55);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(54)();
  // imports
  
  
  // module
  exports.push([module.id, "._5OPA{padding-left:20px;padding-right:20px}._9QmC{margin:0 auto;padding:0 0 40px;max-width:380px}._3spR{font-size:1.25em}._3MjR{margin-bottom:20px}.CAgd{margin-bottom:5px;max-width:100%;font-weight:700;float:left}._2b_O{display:block;box-sizing:border-box;padding:10px 16px;width:100%;height:46px;outline:0;border:1px solid #ccc;border-radius:10;background:#fff;box-shadow:inset 0 1px 1px rgba(0,0,0,.075);color:#616161;font-size:18px;line-height:1.3333333;-webkit-transition:border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out}._2b_O:focus{border-color:#0074c2;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(0,116,194,.6)}._2yFs{display:block;box-sizing:border-box;margin:0;padding:10px 16px;width:100%;outline:0;border:1px solid #373277;border-radius:0;background:#373277;color:#fff;text-align:center;text-decoration:none;font-size:18px;line-height:1.3333333;cursor:pointer}._2yFs:hover{background:rgba(54,50,119,.8)}._2yFs:focus{border-color:#0074c2;box-shadow:0 0 8px rgba(0,116,194,.6)}. .JKAP{display:inline-block;margin:-2px 12px -2px 0;width:20px;height:20px;vertical-align:middle;fill:currentColor}.VeAX{position:relative;z-index:1;display:block;margin-bottom:15px;width:100%;color:#757575;text-align:center;font-size:80%}.VeAX:before{top:50%;left:50%;z-index:-1;margin-top:-5px;margin-left:-20px;width:40px;height:10px;background-color:#fff}.VeAX:after,.VeAX:before{position:absolute;content:''}.VeAX:after{top:49%;z-index:-2;display:block;width:100%;border-bottom:1px solid #ddd}#_2oFL{max-width:100px;float:left}._2ZK9{float:right}#_142m{float:left}#_3H9j{float:right}", ""]);
  
  // exports
  exports.locals = {
  	"root": "_5OPA",
  	"container": "_9QmC",
  	"lead": "_3spR",
  	"formGroup": "_3MjR",
  	"label": "CAgd",
  	"input": "_2b_O",
  	"button": "_2yFs",
  	"icon": "JKAP",
  	"lineThrough": "VeAX",
  	"lastname": "_2oFL",
  	"div": "_2ZK9",
  	"leftContainer": "_142m",
  	"rightContainer": "_3H9j"
  };

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _promise = __webpack_require__(84);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Booking = __webpack_require__(152);
  
  var _Booking2 = _interopRequireDefault(_Booking);
  
  var _Login = __webpack_require__(88);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  var _config = __webpack_require__(20);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
  
    path: '/booking',
  
    action: function action(_ref) {
      var _this = this;
  
      var query = _ref.query;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var date, currentdate, sessionid, email, customerrec, customermobile, body, bookingid;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                date = new Date();
                currentdate = date.getDate() + '/' + date.getMonth() + 1 + '/' + date.getFullYear();
                sessionid = query.sessionid;
                email = query.email;
                _context.t0 = JSON;
                _context.next = 7;
                return getCustomerRecord(email);
  
              case 7:
                _context.t1 = _context.sent;
                customerrec = _context.t0.parse.call(_context.t0, _context.t1);
  
                console.log("booking Record: " + customerrec);
                customermobile = customerrec[0].phone;
  
                //console.log("Booking Id: "+bookingid);
  
                console.log("Sessionid - index.js - Booking : " + sessionid);
  
                if (!(sessionid === undefined || sessionid == '')) {
                  _context.next = 20;
                  break;
                }
  
                _context.next = 15;
                return getSessionid();
  
              case 15:
                body = _context.sent;
  
                console.log("Sessionid: " + body);
                return _context.abrupt('return', (0, _jsx3.default)(_Login2.default, {
                  sessionid: body
                }));
  
              case 20:
                bookingid = Math.floor(1000000 + Math.random() * 9000000);
                return _context.abrupt('return', (0, _jsx3.default)(_Booking2.default, {
                  sessionid: sessionid,
                  bookingid: bookingid,
                  email: email,
                  phone: customermobile
                }));
  
              case 22:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
  
  
  function getSessionid() {
    var request = __webpack_require__(94);
    console.log('genSessionid - calling API');
    var url = 'http://' + _config.apihost + '/genSessionid';
    console.log("getSeesionid - URL: " + url);
  
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('genSessionid - Response from API' + body);
          // sessionid = body;
          resolve(body);
        } else {
  
          console.log("genSessionid -API Server not running: " + error);
          return reject(error);
        }
        console.log("getSessionid - Returning from API call");
      });
    });
  }
  
  function getCustomerRecord(email) {
    var request = __webpack_require__(94);
    console.log('getCustomerRecord - calling API');
    var url = 'http://' + _config.apihost + '/getCustomer?email=' + email;
    console.log("getCustomerRecord - URL: " + url);
  
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('getCustomerRecord - linkbooking - Response from API' + body);
          //sessionid = body;
          resolve(body);
        } else {
  
          console.log("getCustomerRecord - linkbooking -API Server not running: " + error);
          return reject(error);
        }
        console.log("getCustomerRecord - Returning from API call");
      });
    });
  }

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(59);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Booking = __webpack_require__(153);
  
  var _Booking2 = _interopRequireDefault(_Booking);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'New Event Booking';
  
  var date = new Date();
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  var currentdate = day + '/' + month + '/' + year;
  
  var _ref2 = (0, _jsx3.default)('h1', {}, void 0, title);
  
  var _ref3 = (0, _jsx3.default)('input', {
    id: 'status',
    type: 'hidden',
    value: 'booked',
    name: 'status'
  });
  
  var _ref4 = (0, _jsx3.default)('span', {}, void 0, 'Event Date: ');
  
  var _ref5 = (0, _jsx3.default)('span', {}, void 0, 'E-mail: ');
  
  var _ref6 = (0, _jsx3.default)('span', {}, void 0, 'Mobile Number: ');
  
  var _ref7 = (0, _jsx3.default)('br', {});
  
  var _ref8 = (0, _jsx3.default)('span', {}, void 0, 'Function: ');
  
  var _ref9 = (0, _jsx3.default)('select', {
    name: 'eventtype'
  }, void 0, (0, _jsx3.default)('option', {
    value: 'House Warming'
  }, void 0, 'House Warming'), (0, _jsx3.default)('option', {
    value: 'Ayush  Homam'
  }, void 0, 'Ayush  Homam'), (0, _jsx3.default)('option', {
    value: '60th Birthday'
  }, void 0, '60th Birthday'), (0, _jsx3.default)('option', {
    value: '80th Birthday'
  }, void 0, '80th Birthday'));
  
  var _ref10 = (0, _jsx3.default)('input', {
    id: 'bookingtype',
    type: 'hidden',
    name: 'bookingtype',
    value: 'Pooja'
  });
  
  function Booking(_ref, context) {
    var sessionid = _ref.sessionid,
        bookingid = _ref.bookingid,
        email = _ref.email,
        phone = _ref.phone;
  
    context.setTitle(title);
    return (0, _jsx3.default)('div', {
      className: _Booking2.default.root
    }, void 0, (0, _jsx3.default)('div', {
      className: _Booking2.default.container
    }, void 0, _ref2, (0, _jsx3.default)('form', {
      name: 'form1',
      method: 'put',
      action: 'savebooking'
    }, void 0, (0, _jsx3.default)('div', {
      className: _Booking2.default.leftContainer
    }, void 0, _ref3, (0, _jsx3.default)('label', {
      className: _Booking2.default.label,
      htmlFor: 'dateofbooking'
    }, void 0, 'Date of Booking:'), (0, _jsx3.default)('input', {
      className: _Booking2.default.input,
      id: 'dateofbooking',
      type: 'text',
      name: 'dateofbooking',
      value: currentdate,
      autoFocus: true,
      readOnly: true
    }), (0, _jsx3.default)('label', {
      className: _Booking2.default.label,
      htmlFor: 'eventdate'
    }, void 0, _ref4), (0, _jsx3.default)('input', {
      className: _Booking2.default.input,
      id: 'functiondate',
      type: 'date',
      name: 'functiondate',
      required: true
    })), (0, _jsx3.default)('div', {}, void 0, (0, _jsx3.default)('label', {
      className: _Booking2.default.label,
      htmlFor: 'email'
    }, void 0, _ref5), (0, _jsx3.default)('input', {
      className: _Booking2.default.input,
      id: 'email',
      type: 'email',
      name: 'email',
      value: email,
      readOnly: true
    }), (0, _jsx3.default)('label', {
      className: _Booking2.default.label,
      htmlFor: 'mobile'
    }, void 0, _ref6), (0, _jsx3.default)('input', {
      className: _Booking2.default.input,
      id: 'mobile',
      type: 'number',
      name: 'mobile',
      value: phone,
      readOnly: true
    })), (0, _jsx3.default)('div', {
      className: _Booking2.default.formGroup
    }, void 0, (0, _jsx3.default)('label', {
      className: _Booking2.default.label,
      htmlFor: 'catering'
    }, void 0, 'Need Catering:'), (0, _jsx3.default)('input', {
      className: _Booking2.default.squaredOne,
      id: 'catering',
      type: 'checkbox',
      name: 'catering'
    }), _ref7, (0, _jsx3.default)('label', {
      className: _Booking2.default.label,
      htmlFor: 'Travel'
    }, void 0, 'Need Travel Arrangment:'), (0, _jsx3.default)('input', {
      className: _Booking2.default.squaredOne,
      id: 'travel',
      type: 'checkbox',
      name: 'travel'
    })), (0, _jsx3.default)('div', {}, void 0, (0, _jsx3.default)('label', {
      className: _Booking2.default.label,
      htmlFor: 'Function'
    }, void 0, _ref8), _ref9, (0, _jsx3.default)('input', {
      id: 'sessionid',
      type: 'hidden',
      name: 'sessionid',
      value: sessionid
    }), (0, _jsx3.default)('input', {
      id: 'bookingid',
      type: 'hidden',
      name: 'bookingid',
      value: bookingid
    }), _ref10), (0, _jsx3.default)('div', {
      className: _Booking2.default.formGroup
    }, void 0, (0, _jsx3.default)('button', {
      className: _Booking2.default.button,
      value: 'submit',
      type: 'submit'
    }, void 0, 'Book Event')))));
  }
  
  Booking.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Booking2.default)(Booking);

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(154);
      var insertCss = __webpack_require__(55);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(54)();
  // imports
  
  
  // module
  exports.push([module.id, "._16dj{padding-left:20px;padding-right:20px}._3w7t{margin:0 auto;padding:0 0 40px;max-width:380px}.oXiY{font-size:1.25em}._1WcD{margin-bottom:20px}.yqNT{margin-bottom:5px;max-width:100%;font-weight:700;float:left}.b9l_{display:block;box-sizing:border-box;padding:10px 16px;width:100%;height:46px;outline:0;border:1px solid #ccc;border-radius:10;background:#fff;box-shadow:inset 0 1px 1px rgba(0,0,0,.075);color:#616161;font-size:18px;line-height:1.3333333;-webkit-transition:border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out;size:15;max-width:30}.b9l_:focus{border-color:#0074c2;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(0,116,194,.6)}._1QBN{display:block;box-sizing:border-box;margin:0;padding:10px 16px;width:100%;outline:0;border:1px solid #373277;border-radius:0;background:#483288;color:#fff;text-align:center;text-decoration:none;font-size:18px;line-height:1.3333333;cursor:pointer}._1QBN:hover{background:rgba(54,50,119,.8)}._1QBN:focus{border-color:#0074c2;box-shadow:0 0 8px rgba(0,116,194,.6)}._3QXC{float:left}._35NT{float:right}._1b7S{display:inline-block;margin:-2px 12px -2px 0;width:20px;height:20px;vertical-align:middle;fill:currentColor}.SuZe{position:relative;z-index:1;display:block;margin-bottom:15px;width:100%;color:#757575;text-align:center;font-size:80%}.SuZe:before{top:50%;left:50%;z-index:-1;margin-top:-5px;margin-left:-20px;width:40px;height:10px;background-color:#fff}.SuZe:after,.SuZe:before{position:absolute;content:''}.SuZe:after{top:49%;z-index:-2;display:block;width:100%;border-bottom:1px solid #ddd}#_1vnX{max-width:100px;float:left}._2tFa{width:28px;height:28px;position:relative;margin:20px auto;background:#fcfff4;background:-webkit-gradient(linear,left top,left bottom,from(#fcfff4),color-stop(40%,#dfe5d7),to(#b3bead));background:-webkit-linear-gradient(top,#fcfff4,#dfe5d7 40%,#b3bead);background:linear-gradient(top,#fcfff4,#dfe5d7 40%,#b3bead);box-shadow:inset 0 1px 1px #fff,0 1px 3px rgba(0,0,0,.5);label{width:20px;height:20px;position:absolute;top:4px;left:4px;cursor:pointer;background:-webkit-gradient(linear,left top,left bottom,from(top),color-stop(0,#222),to(#45484d));background:-webkit-linear-gradient(top,#222,#45484d);background:linear-gradient(top,#222,#45484d);box-shadow:inset 0 1px 1px rgba(0,0,0,.5),0 1px 0 #fff}label:after{content:'';width:16px;height:16px;position:absolute;top:2px;left:2px;background:$activeColor;background:-webkit-gradient(linear,left top,left bottom,from($activeColor),to($darkenColor));background:-webkit-linear-gradient(top,$activeColor,$darkenColor);background:linear-gradient(top,$activeColor,$darkenColor);box-shadow:inset 0 1px 1px #fff,0 1px 3px rgba(0,0,0,.5);opacity:0}label:hover:after{opacity:.3}input[type=checkbox]{visibility:hidden}input[type=checkbox]:checked+label:after{opacity:1}}", ""]);
  
  // exports
  exports.locals = {
  	"root": "_16dj",
  	"container": "_3w7t",
  	"lead": "oXiY",
  	"formGroup": "_1WcD",
  	"label": "yqNT",
  	"input": "b9l_",
  	"button": "_1QBN",
  	"leftContainer": "_3QXC",
  	"rightContainer": "_35NT",
  	"icon": "_1b7S",
  	"lineThrough": "SuZe",
  	"lastname": "_1vnX",
  	"squaredOne": "_2tFa"
  };

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _promise = __webpack_require__(84);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _stringify = __webpack_require__(56);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Savebooking = __webpack_require__(156);
  
  var _Savebooking2 = _interopRequireDefault(_Savebooking);
  
  var _Providerlist = __webpack_require__(99);
  
  var _Providerlist2 = _interopRequireDefault(_Providerlist);
  
  var _Login = __webpack_require__(119);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  var _config = __webpack_require__(20);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var request = __webpack_require__(94);
  
  var message = 'Booking done Sucessfully  ';
  var href = 'http://' + _config.host + '/';
  var message1 = 'Click here to login';
  var status = true;
  var email;
  var phone;
  var bookingid;
  var providerlist;
  var sessionid;
  var bookingtype;
  
  exports.default = {
  
    path: '/savebooking',
  
    action: function action(_ref, _ref2) {
      var _this = this;
  
      var query = _ref.query;
      var path = _ref2.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var sessionbody, body;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log("Query String - index.js - Savebooking: " + (0, _stringify2.default)(query));
                phone = query.mobile;
                email = query.email;
                bookingtype = query.bookingtype;
                console.log("Bookingtype: " + bookingtype);
                console.log("Email: " + email);
                sessionid = query.sessionid;
                bookingid = query.bookingid;
                console.log("Sessionid - index.js - Savebooking " + sessionid);
  
                if (!(sessionid === undefined || sessionid == '')) {
                  _context.next = 14;
                  break;
                }
  
                _context.next = 12;
                return getSessionid();
  
              case 12:
                sessionbody = _context.sent;
                return _context.abrupt('return', (0, _jsx3.default)(_Login2.default, {
                  sessionid: sessionbody
                }));
  
              case 14:
                _context.next = 16;
                return SavebookingData(query);
  
              case 16:
                body = _context.sent;
  
                console.log("Calling SendEmail");
                //var mail = await sendEmail();
                console.log("Calling sendSMS");
                // var sms = await sendSMS();
                console.log("Body: " + body);
  
                if (status) {
                  _context.next = 27;
                  break;
                }
  
                message = 'Unable to book the Event';
                href = 'http://' + _config.host + '/booking';
                message1 = 'Click here to Register.';
                return _context.abrupt('return', (0, _jsx3.default)(_Savebooking2.default, {
                  message: message,
                  redirectlink: href,
                  message1: message1,
                  sessionid: sessionid
                }));
  
              case 27:
                _context.next = 29;
                return getProviderData();
  
              case 29:
                providerlist = _context.sent;
  
                console.log("Service Provider List: " + providerlist);
                return _context.abrupt('return', (0, _jsx3.default)(_Providerlist2.default, {
                  providerlist: providerlist,
                  customeremail: email,
                  sessionid: sessionid,
                  bookingid: bookingid
                }));
  
              case 32:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
  
  
  function SavebookingData(data) {
  
    console.log('calling API - SavebookingData method');
    var url = 'http://' + _config.apihost + '/newBooking';
    console.log("URL: " + url);
    delete data.bookingtype;
    return new _promise2.default(function (resolve, reject) {
      request.post(url, { form: data }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Inside SavebookingData Response from API (body)' + body);
  
          if (body == 'true') status = true;
          resolve(body);
          //sendSMS();
          //var result = await sendEmail();
        }
        if (error) {
          console.log("Error in storing customer data");
          status = false;
          return reject(error);
        }
      });
  
      console.log('returning');
    });
  }
  
  function sendSMS() {
    console.log('calling API - sendSMS method');
  
    var url = 'http://' + _config.apihost + '/sendSMS?authkey=' + _config.smsAPIKey + '&mobiles=' + phone + '&message=' + _config.SMSmessage + '&sender=DTSBMF&route=4&country=91';
    console.log("URL: " + url);
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Inside sendSMS - Response from API (body)' + body);
  
          if (error) {
            console.log("Error in Sending SMS");
            status = false;
            return reject(error);
          }
  
          if (body == 'true') status = true;
          resolve(body);
        }
      });
    });
  }
  
  function sendEmail() {
    console.log('calling API - sendEmail');
    var url = 'http://' + _config.apihost + '/sendmail';
    console.log("URL: " + url);
  
    var subject = "Your booking for the event in BMY";
    var message = "<b>Thank you for booking and service provider will get in touch shortly. </b> <br> <b> Your Booking id is <b> " + bookingid;
    var formdata = {
      tomail: email,
      subject: subject,
      message: message
    };
  
    //data = JSON.stringify('{\"tomail\": \"'+email+'\", \"subject\": '+subject+'\", \"message\": \" '+message+'\"}');
    console.log("Data: " + formdata);
    return new _promise2.default(function (resolve, reject) {
      request.post(url, { form: formdata }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Inside sendEmail - Response from API (body)' + body);
  
          if (body == 'true') resolve(body);
          status = true;
        }
        if (error) {
          console.log("Error in Sending Mail");
          status = false;
          return reject(error);
        }
      });
    });
  }
  
  function getProviderData() {
    var request = __webpack_require__(94);
  
    console.log('calling API');
    var url = 'http://' + _config.apihost + '/searchByType?servicetype=' + bookingtype;
    console.log("URL: " + url);
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          //console.log('Inside getProviderData Response from API (body)' + body);
          providerlist = body;
          //console.log("Providerlist: "+providerlist);
          resolve(body);
        } else {
          return reject(body);
        }
      });
    });
  }
  
  function getSessionid() {
    var request = __webpack_require__(94);
    console.log('genSessionid - calling API');
    var url = 'http://' + _config.apihost + '/genSessionid';
    console.log("getSeesionid - URL: " + url);
  
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('genSessionid - Response from API' + body);
          //sessionid = body;
          resolve(body);
        } else {
  
          console.log("genSessionid -API Server not running: " + error);
          return reject(error);
        }
        console.log("getSessionid - Returning from API call");
      });
    });
  }

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(59);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Savebooking = __webpack_require__(157);
  
  var _Savebooking2 = _interopRequireDefault(_Savebooking);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'New Booking'; /**
                              * React Starter Kit (https://www.reactstarterkit.com/)
                              *
                              * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                              *
                              * This source code is licensed under the MIT license found in the
                              * LICENSE.txt file in the root directory of this source tree.
                              */
  
  var _ref2 = (0, _jsx3.default)('h1', {}, void 0, title);
  
  function Savebooking(_ref, context) {
    var message = _ref.message,
        redirectlink = _ref.redirectlink,
        message1 = _ref.message1,
        sessionid = _ref.sessionid;
  
    context.setTitle(title);
    return (0, _jsx3.default)('div', {
      className: _Savebooking2.default.root
    }, void 0, (0, _jsx3.default)('div', {
      className: _Savebooking2.default.container
    }, void 0, _ref2, (0, _jsx3.default)('p', {}, void 0, message), (0, _jsx3.default)('a', {
      href: redirectlink
    }, void 0, message1, ' '), (0, _jsx3.default)('input', {
      id: 'sessionid',
      type: 'hidden',
      name: 'sessionid',
      value: sessionid
    })));
  }
  
  Savebooking.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Savebooking2.default)(Savebooking);

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(158);
      var insertCss = __webpack_require__(55);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(54)();
  // imports
  
  
  // module
  exports.push([module.id, "._1qYT{padding-left:20px;padding-right:20px}._2d_X{margin:0 auto;padding:0 0 40px;max-width:380px}._1N_U{font-size:1.25em}._-clJ{margin-bottom:20px}._2o3f{margin-bottom:5px;max-width:100%;font-weight:700;float:left}.TmPl{display:block;box-sizing:border-box;padding:10px 16px;width:100%;height:46px;outline:0;border:1px solid #ccc;border-radius:10;background:#fff;box-shadow:inset 0 1px 1px rgba(0,0,0,.075);color:#616161;font-size:18px;line-height:1.3333333;-webkit-transition:border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out}.TmPl:focus{border-color:#0074c2;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(0,116,194,.6)}._1_LP{display:block;box-sizing:border-box;margin:0;padding:10px 16px;width:100%;outline:0;border:1px solid #373277;border-radius:0;background:#373277;color:#fff;text-align:center;text-decoration:none;font-size:18px;line-height:1.3333333;cursor:pointer}._1_LP:hover{background:rgba(54,50,119,.8)}._1_LP:focus{border-color:#0074c2;box-shadow:0 0 8px rgba(0,116,194,.6)}.hHj_{display:inline-block;margin:-2px 12px -2px 0;width:20px;height:20px;vertical-align:middle;fill:currentColor}.LPAU{position:relative;z-index:1;display:block;margin-bottom:15px;width:100%;color:#757575;text-align:center;font-size:80%}.LPAU:before{top:50%;left:50%;z-index:-1;margin-top:-5px;margin-left:-20px;width:40px;height:10px;background-color:#fff}.LPAU:after,.LPAU:before{position:absolute;content:''}.LPAU:after{top:49%;z-index:-2;display:block;width:100%;border-bottom:1px solid #ddd}#_3wM1{max-width:100px;float:left}._33sF{float:right}#_2OoI{float:left}#_2aPK{float:right}", ""]);
  
  // exports
  exports.locals = {
  	"root": "_1qYT",
  	"container": "_2d_X",
  	"lead": "_1N_U",
  	"formGroup": "_-clJ",
  	"label": "_2o3f",
  	"input": "TmPl",
  	"button": "_1_LP",
  	"icon": "hHj_",
  	"lineThrough": "LPAU",
  	"lastname": "_3wM1",
  	"div": "_33sF",
  	"leftContainer": "_2OoI",
  	"rightContainer": "_2aPK"
  };

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _providerlogin = __webpack_require__(160);
  
  var _providerlogin2 = _interopRequireDefault(_providerlogin);
  
  var _util = __webpack_require__(93);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var sessionid = '';
  
  exports.default = {
  
    path: '/providerlogin',
  
    action: function action() {
      var _this = this;
  
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var message;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _util.getSessionid)();
  
              case 2:
                sessionid = _context.sent;
                message = ' ';
  
                console.log("SessionId-Login: " + sessionid);
                return _context.abrupt('return', (0, _jsx3.default)(_providerlogin2.default, {
                  sessionid: sessionid,
                  message: message
                }));
  
              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactDom = __webpack_require__(89);
  
  var _reactDom2 = _interopRequireDefault(_reactDom);
  
  var _withStyles = __webpack_require__(59);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Providerlogin = __webpack_require__(161);
  
  var _Providerlogin2 = _interopRequireDefault(_Providerlogin);
  
  var _Link = __webpack_require__(62);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Entering Credentials';
  
  var _ref2 = (0, _jsx3.default)('h1', {}, void 0, title);
  
  var _ref3 = (0, _jsx3.default)(_Link2.default, {
    to: '/providerforgotpass'
  }, void 0, 'Forgot Password');
  
  var _ref4 = (0, _jsx3.default)(_Link2.default, {
    to: '/serviceprovider'
  }, void 0, 'Sign Up');
  
  function Providerlogin(_ref, context) {
    var sessionid = _ref.sessionid,
        message = _ref.message;
  
    console.log("ProviderLogin.js-SessionId: " + sessionid);
    context.setTitle(title);
  
    return (0, _jsx3.default)('div', {
      className: _Providerlogin2.default.root
    }, void 0, (0, _jsx3.default)('div', {
      className: _Providerlogin2.default.container
    }, void 0, _ref2, (0, _jsx3.default)('p', {
      className: _Providerlogin2.default.lead
    }, void 0, 'Log in with your username or email address.'), (0, _jsx3.default)('div', {
      className: _Providerlogin2.default.formGroup
    }, void 0, (0, _jsx3.default)('form', {
      name: 'form1',
      method: 'get',
      action: 'verifyproviderlogin'
    }, void 0, (0, _jsx3.default)('div', {
      className: _Providerlogin2.default.formGroup
    }, void 0, (0, _jsx3.default)('label', {
      className: _Providerlogin2.default.label,
      htmlFor: 'usernameOrEmail'
    }, void 0, 'Username or email address:'), (0, _jsx3.default)('input', {
      className: _Providerlogin2.default.input,
      id: 'email',
      type: 'email',
      name: 'email',
      required: 'required',
      autoFocus: true
    })), (0, _jsx3.default)('div', {
      className: _Providerlogin2.default.formGroup
    }, void 0, (0, _jsx3.default)('label', {
      className: _Providerlogin2.default.label,
      htmlFor: 'password'
    }, void 0, 'Password:'), (0, _jsx3.default)('input', {
      className: _Providerlogin2.default.input,
      id: 'password',
      type: 'password',
      name: 'password',
      required: 'required'
    }), (0, _jsx3.default)('p', {
      className: _Providerlogin2.default.p
    }, void 0, (0, _jsx3.default)('b', {}, void 0, ' ', message), ' '), (0, _jsx3.default)('input', {
      id: 'sessionid',
      type: 'hidden',
      name: 'sessionid',
      value: sessionid
    })), (0, _jsx3.default)('div', {
      className: _Providerlogin2.default.formGroup
    }, void 0, (0, _jsx3.default)('button', {
      className: _Providerlogin2.default.button1,
      type: 'submit'
    }, void 0, 'Log in'), _ref3, (0, _jsx3.default)('span', {
      className: _Providerlogin2.default.spacer
    }, void 0, ' | '), _ref4)))));
  }
  
  Providerlogin.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Providerlogin2.default)(Providerlogin);

/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(162);
      var insertCss = __webpack_require__(55);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(54)();
  // imports
  
  
  // module
  exports.push([module.id, "._2kFo{padding-left:20px;padding-right:20px}._20Qr{margin:0 auto;padding:0 0 40px;max-width:380px;max-height:580px}._3NdX{font-size:1.25em}.lA5N{margin-bottom:15px}._2KAw{color:red}._15rC{display:inline-block;margin-bottom:5px;max-width:100%;font-weight:700}._2AyE{display:block;box-sizing:border-box;padding:10px 16px;width:100%;height:26px;outline:0;border:1px solid #ccc;border-radius:0;background:#fff;box-shadow:inset 0 1px 1px rgba(0,0,0,.075);color:#616161;font-size:18px;line-height:1.3333333;-webkit-transition:border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out}._2AyE:focus{border-color:#0074c2;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(0,116,194,.6)}._2ilN{width:80%;outline:10;background:#373277;font-size:18px}._2ilN,._120_{display:block;box-sizing:border-box;margin:0;padding:10px 16px;border:1px solid #373277;border-radius:0;color:#fff;text-align:center;text-decoration:none;line-height:1.3333333;cursor:pointer}._120_{width:50%;outline:0;background:#373388;font-size:14px}._2ilN:hover{background:rgba(54,50,119,.8)}._2ilN:focus{border-color:#0074c2;box-shadow:0 0 8px rgba(0,116,194,.6)}._1jW7{border-color:#3b5998;background:#3b5998}._1jW7:hover{background:#2d4373}._1Ctc{border-color:#dd4b39;background:#dd4b39}._1Ctc:hover{background:#c23321}._3bXN{border-color:#55acee;background:#55acee}._3bXN:hover{background:#2795e9}._3e1g{display:inline-block;margin:-2px 12px -2px 0;width:20px;height:20px;vertical-align:middle;fill:currentColor}._1urZ{position:relative;z-index:1;display:block;margin-bottom:15px;width:100%;color:#757575;text-align:center;font-size:80%}._1urZ:before{top:50%;left:50%;z-index:-1;margin-top:-5px;margin-left:-20px;width:40px;height:10px;background-color:#fff}._1urZ:after,._1urZ:before{position:absolute;content:''}._1urZ:after{top:49%;z-index:-2;display:block;width:100%;border-bottom:1px solid #ddd}", ""]);
  
  // exports
  exports.locals = {
  	"root": "_2kFo",
  	"container": "_20Qr",
  	"lead": "_3NdX",
  	"formGroup": "lA5N",
  	"p": "_2KAw",
  	"label": "_15rC",
  	"input": "_2AyE",
  	"button": "_2ilN",
  	"button1": "_120_",
  	"facebook": "_1jW7 _2ilN",
  	"google": "_1Ctc _2ilN",
  	"twitter": "_3bXN _2ilN",
  	"icon": "_3e1g",
  	"lineThrough": "_1urZ"
  };

/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _promise = __webpack_require__(84);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Providerforgotpass = __webpack_require__(164);
  
  var _Providerforgotpass2 = _interopRequireDefault(_Providerforgotpass);
  
  var _Providerlogin = __webpack_require__(167);
  
  var _Providerlogin2 = _interopRequireDefault(_Providerlogin);
  
  var _config = __webpack_require__(20);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var request = __webpack_require__(94);
  
  var status = 'false';
  var errormessage = '';
  //var user;
  
  var _ref3 = (0, _jsx3.default)(_Providerforgotpass2.default, {});
  
  var _ref4 = (0, _jsx3.default)(_Providerlogin2.default, {});
  
  var _ref5 = (0, _jsx3.default)(_Providerforgotpass2.default, {
    errormessage: errormessage
  });
  
  exports.default = {
  
    path: '/providerforgotpass',
  
    action: function action(_ref, _ref2) {
      var _this = this;
  
      var query = _ref.query;
      var path = _ref2.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var email, validlogin, code, body, result;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                email = query.email;
                // user = query.user;
  
                console.log("Email ID:" + email);
                // console.log("User: "+user);
  
                if (!(typeof email === 'undefined')) {
                  _context.next = 6;
                  break;
                }
  
                return _context.abrupt('return', _ref3);
  
              case 6:
                _context.next = 8;
                return checkLogin(email);
  
              case 8:
                validlogin = _context.sent;
  
                console.log("ValidLogin:" + validlogin);
  
                if (!(validlogin == 'true')) {
                  _context.next = 20;
                  break;
                }
  
                code = passwordCode(6);
  
                console.log("Passcode: " + code);
                _context.next = 15;
                return sendEmail(email, code);
  
              case 15:
                body = _context.sent;
  
                if (!(body == 'true')) {
                  _context.next = 20;
                  break;
                }
  
                _context.next = 19;
                return storePasscode(email, code);
  
              case 19:
                result = _context.sent;
  
              case 20:
                console.log("Status: " + status);
  
                if (!(status == true)) {
                  _context.next = 26;
                  break;
                }
  
                console.log("Redirected to Login Page");
                return _context.abrupt('return', _ref4);
  
              case 26:
                console.log("Error in Reseting password request");
                return _context.abrupt('return', _ref5);
  
              case 28:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
  
  
  function sendEmail(email, code) {
    console.log('calling API - sendEmail');
    var url = 'http://' + _config.apihost + '/sendmail';
    console.log("URL: " + url);
  
    var subject = "Your Password Reset";
    var href = 'http://' + _config.host + '/providerchangepassword?code=' + code + '&userEmail=' + email;
    console.log("Href: " + href);
    var message = '<b>We received your request for password Reset. <a href="' + href + '" >Click here to reset password</a> ';
    var formdata = {
      tomail: email,
      subject: subject,
      message: message
    };
  
    console.log("Data: " + formdata);
    return new _promise2.default(function (resolve, reject) {
      request.post(url, { form: formdata }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Inside sendEmail - Response from API (body)' + body);
  
          if (body == 'true') status = true;else status = false;
          resolve(body);
        } else if (error) {
          console.log("Error in Sending Mail");
          status = false;
          return reject(error);
        }
      });
    });
  }
  
  function passwordCode(length) {
    var chars = "abcdefghijklmnopqrstuvwxyz!@#$%^*()-+<>ABCDEFGHIJKLMNOP1234567890";
    var pass = "";
    for (var x = 0; x < length; x++) {
      var i = Math.floor(Math.random() * chars.length);
      pass += chars.charAt(i);
    }
    return pass;
  }
  
  function storePasscode(email, code) {
  
    console.log("Inside storePasscode method email: " + email);
    console.log("Inside storePasscode method Code: " + code);
    console.log('calling API');
    var url = 'http://' + _config.apihost + '/storePasscode';
    console.log("URL: " + url);
    return new _promise2.default(function (resolve, reject) {
      request.post(url, { form: { email: email, code: code } }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Inside StorePasscode Response from API (body)' + body);
  
          if (body == 'true') status = true;
          resolve(body);
        } else {
          console.log("Error in storing passcode");
          status = false;
          return reject(error);
        }
      });
    });
  }
  
  function checkLogin(email) {
  
    console.log('calling API');
  
    var url = 'http://' + _config.apihost + '/checkemail?email=' + email;
    console.log("URL: " + url);
  
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Response from API: ' + body);
          if (body == 'true') status = true;
          resolve(body);
        } else {
          status = 'false';
          console.log("API Server not running: " + error);
          return reject(error);
        }
        console.log('Returning');
      });
    });
  }

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(59);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Providerforgotpass = __webpack_require__(165);
  
  var _Providerforgotpass2 = _interopRequireDefault(_Providerforgotpass);
  
  var _Link = __webpack_require__(62);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Changing Provider Password';
  
  var _ref = (0, _jsx3.default)('h1', {}, void 0, title);
  
  function Providerforgotpass(props, context) {
    context.setTitle(title);
    return (0, _jsx3.default)('div', {
      className: _Providerforgotpass2.default.root
    }, void 0, (0, _jsx3.default)('div', {
      className: _Providerforgotpass2.default.container
    }, void 0, _ref, (0, _jsx3.default)('form', {
      name: 'form1',
      method: 'put',
      action: 'providerforgotpass'
    }, void 0, (0, _jsx3.default)('div', {
      className: _Providerforgotpass2.default.formGroup
    }, void 0, (0, _jsx3.default)('label', {
      className: _Providerforgotpass2.default.label,
      htmlFor: 'email'
    }, void 0, 'Email:'), (0, _jsx3.default)('input', {
      className: _Providerforgotpass2.default.input,
      id: 'email',
      type: 'email',
      name: 'email',
      placeholder: 'Enter E-mail',
      required: 'required'
    })), (0, _jsx3.default)('div', {
      className: _Providerforgotpass2.default.formGroup
    }, void 0, (0, _jsx3.default)('button', {
      className: _Providerforgotpass2.default.button,
      type: 'submit'
    }, void 0, 'Send Reset Email')))));
  }
  
  Providerforgotpass.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Providerforgotpass2.default)(Providerforgotpass);

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(166);
      var insertCss = __webpack_require__(55);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(54)();
  // imports
  
  
  // module
  exports.push([module.id, ".grrX{padding-left:20px;padding-right:20px}._1G4x{margin:0 auto;padding:0 0 40px;max-width:380px}._71yB{font-size:1.25em}._2IWb{margin-bottom:20px}._3LnX{display:inline-block;margin-bottom:5px;max-width:100%;font-weight:700}._3Iq8{display:block;box-sizing:border-box;padding:10px 16px;width:100%;height:46px;outline:0;border:1px solid #ccc;border-radius:10;background:#fff;box-shadow:inset 0 1px 1px rgba(0,0,0,.075);color:#616161;font-size:18px;line-height:1.3333333;-webkit-transition:border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out}._3Iq8:focus{border-color:#0074c2;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(0,116,194,.6)}._1XQ8{display:block;box-sizing:border-box;margin:0;padding:10px 16px;width:100%;outline:0;border:1px solid #373277;border-radius:0;background:#373277;color:#fff;text-align:center;text-decoration:none;font-size:18px;line-height:1.3333333;cursor:pointer}._1XQ8:hover{background:rgba(54,50,119,.8)}._1XQ8:focus{border-color:#0074c2;box-shadow:0 0 8px rgba(0,116,194,.6)}._37uA{border-color:#3b5998;background:#3b5998}._37uA:hover{background:#2d4373}._20Ze{border-color:#dd4b39;background:#dd4b39}._20Ze:hover{background:#c23321}._311T{border-color:#55acee;background:#55acee}._311T:hover{background:#2795e9}.qg2Z{display:inline-block;margin:-2px 12px -2px 0;width:20px;height:20px;vertical-align:middle;fill:currentColor}._3Y6f{position:relative;z-index:1;display:block;margin-bottom:15px;width:100%;color:#757575;text-align:center;font-size:80%}._3Y6f:before{top:50%;left:50%;z-index:-1;margin-top:-5px;margin-left:-20px;width:40px;height:10px;background-color:#fff}._3Y6f:after,._3Y6f:before{position:absolute;content:''}._3Y6f:after{top:49%;z-index:-2;display:block;width:100%;border-bottom:1px solid #ddd}", ""]);
  
  // exports
  exports.locals = {
  	"root": "grrX",
  	"container": "_1G4x",
  	"lead": "_71yB",
  	"formGroup": "_2IWb",
  	"label": "_3LnX",
  	"input": "_3Iq8",
  	"button": "_1XQ8",
  	"facebook": "_37uA _1XQ8",
  	"google": "_20Ze _1XQ8",
  	"twitter": "_311T _1XQ8",
  	"icon": "qg2Z",
  	"lineThrough": "_3Y6f"
  };

/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactDom = __webpack_require__(89);
  
  var _reactDom2 = _interopRequireDefault(_reactDom);
  
  var _withStyles = __webpack_require__(59);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Providerlogin = __webpack_require__(161);
  
  var _Providerlogin2 = _interopRequireDefault(_Providerlogin);
  
  var _Link = __webpack_require__(62);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Entering Credentials';
  
  var _ref2 = (0, _jsx3.default)('h1', {}, void 0, title);
  
  var _ref3 = (0, _jsx3.default)(_Link2.default, {
    to: '/providerforgotpass'
  }, void 0, 'Forgot Password');
  
  var _ref4 = (0, _jsx3.default)(_Link2.default, {
    to: '/serviceprovider'
  }, void 0, 'Sign Up');
  
  function Providerlogin(_ref, context) {
    var sessionid = _ref.sessionid,
        message = _ref.message;
  
    console.log("ProviderLogin.js-SessionId: " + sessionid);
    context.setTitle(title);
  
    return (0, _jsx3.default)('div', {
      className: _Providerlogin2.default.root
    }, void 0, (0, _jsx3.default)('div', {
      className: _Providerlogin2.default.container
    }, void 0, _ref2, (0, _jsx3.default)('p', {
      className: _Providerlogin2.default.lead
    }, void 0, 'Log in with your username or email address.'), (0, _jsx3.default)('div', {
      className: _Providerlogin2.default.formGroup
    }, void 0, (0, _jsx3.default)('form', {
      name: 'form1',
      method: 'get',
      action: 'verifyproviderlogin'
    }, void 0, (0, _jsx3.default)('div', {
      className: _Providerlogin2.default.formGroup
    }, void 0, (0, _jsx3.default)('label', {
      className: _Providerlogin2.default.label,
      htmlFor: 'usernameOrEmail'
    }, void 0, 'Username or email address:'), (0, _jsx3.default)('input', {
      className: _Providerlogin2.default.input,
      id: 'email',
      type: 'email',
      name: 'email',
      required: 'required',
      autoFocus: true
    })), (0, _jsx3.default)('div', {
      className: _Providerlogin2.default.formGroup
    }, void 0, (0, _jsx3.default)('label', {
      className: _Providerlogin2.default.label,
      htmlFor: 'password'
    }, void 0, 'Password:'), (0, _jsx3.default)('input', {
      className: _Providerlogin2.default.input,
      id: 'password',
      type: 'password',
      name: 'password',
      required: 'required'
    }), (0, _jsx3.default)('p', {
      className: _Providerlogin2.default.p
    }, void 0, (0, _jsx3.default)('b', {}, void 0, ' ', message), ' '), (0, _jsx3.default)('input', {
      id: 'sessionid',
      type: 'hidden',
      name: 'sessionid',
      value: sessionid
    })), (0, _jsx3.default)('div', {
      className: _Providerlogin2.default.formGroup
    }, void 0, (0, _jsx3.default)('button', {
      className: _Providerlogin2.default.button1,
      type: 'submit'
    }, void 0, 'Log in'), _ref3, (0, _jsx3.default)('span', {
      className: _Providerlogin2.default.spacer
    }, void 0, ' | '), _ref4)))));
  }
  
  Providerlogin.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Providerlogin2.default)(Providerlogin);

/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _promise = __webpack_require__(84);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Providerchangepassword = __webpack_require__(169);
  
  var _Providerchangepassword2 = _interopRequireDefault(_Providerchangepassword);
  
  var _Providerlogin = __webpack_require__(167);
  
  var _Providerlogin2 = _interopRequireDefault(_Providerlogin);
  
  var _config = __webpack_require__(20);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var status = false;
  
  var _ref3 = (0, _jsx3.default)(_Providerlogin2.default, {});
  
  exports.default = {
  
    path: '/providerchangepassword',
  
    action: function action(_ref, _ref2) {
      var _this = this;
  
      var query = _ref.query;
      var path = _ref2.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var email, code, startdate, body, enddate, difftime;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                email = query.userEmail;
                code = query.code;
  
                console.log("Email ID:" + email);
                startdate = new Date();
                _context.next = 6;
                return checkCode(code, email);
  
              case 6:
                body = _context.sent;
                enddate = new Date();
                difftime = enddate.getTime() - startdate.getTime();
  
                console.log("Execution Time:" + difftime);
  
                if (!status) {
                  _context.next = 14;
                  break;
                }
  
                return _context.abrupt('return', (0, _jsx3.default)(_Providerchangepassword2.default, {
                  email: email,
                  passCode: code
                }));
  
              case 14:
                return _context.abrupt('return', _ref3);
  
              case 15:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
  
  
  function checkCode(code, email) {
    var request = __webpack_require__(94);
    console.log('Check Code - calling API');
    var url = 'http://' + _config.apihost + '/getCode?code=' + code + '&userEmail=' + email;
    console.log("Checkcode - URL: " + url);
  
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Checkcode - Response from API' + body);
  
          if (body == 'true') status = true;else status = false;
          resolve(body);
        } else {
          status = false;
          console.log("checkCode -API Server not running: " + error);
          return reject(error);
        }
        console.log("Checkecode - Returning from API call");
      });
    });
  }

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(59);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _providerchangepassword = __webpack_require__(170);
  
  var _providerchangepassword2 = _interopRequireDefault(_providerchangepassword);
  
  var _Link = __webpack_require__(62);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Changing Password';
  
  var _ref2 = (0, _jsx3.default)('h1', {}, void 0, title);
  
  var _ref3 = (0, _jsx3.default)('script', {
    type: 'text/javascript',
    src: '../scripts/passwordmatch.js'
  }, void 0);
  
  var _ref4 = (0, _jsx3.default)('script', {}, void 0);
  
  function Changepassword(_ref, context) {
    var email = _ref.email,
        passCode = _ref.passCode,
        message = _ref.message;
  
    console.log("Changepassword: " + email);
    context.setTitle(title);
    return (0, _jsx3.default)('div', {
      className: _providerchangepassword2.default.root
    }, void 0, (0, _jsx3.default)('div', {
      className: _providerchangepassword2.default.container
    }, void 0, _ref2, _ref3, (0, _jsx3.default)('form', {
      name: 'form1',
      method: 'put',
      action: 'updateproviderpass'
    }, void 0, (0, _jsx3.default)('div', {
      className: _providerchangepassword2.default.formGroup
    }, void 0, (0, _jsx3.default)('label', {
      className: _providerchangepassword2.default.label,
      htmlFor: 'password'
    }, void 0, 'New Password:'), (0, _jsx3.default)('input', {
      className: _providerchangepassword2.default.input,
      id: 'newpass',
      type: 'password',
      name: 'newpass',
      autoFocus: true,
      required: true
    })), (0, _jsx3.default)('div', {
      className: _providerchangepassword2.default.formGroup
    }, void 0, (0, _jsx3.default)('label', {
      className: _providerchangepassword2.default.label,
      htmlFor: 'password'
    }, void 0, 'Confirm Password:'), (0, _jsx3.default)('input', {
      className: _providerchangepassword2.default.input,
      id: 'confirmpass',
      type: 'password',
      name: 'confirmpass'
    }), (0, _jsx3.default)('label', {
      className: _providerchangepassword2.default.label1,
      htmlFor: 'message'
    }, void 0, message)), (0, _jsx3.default)('div', {
      className: _providerchangepassword2.default.formGroup
    }, void 0, (0, _jsx3.default)('button', {
      className: _providerchangepassword2.default.button,
      value: 'Change Password',
      type: 'submit'
    }, void 0, 'Change Password'), (0, _jsx3.default)('input', {
      className: _providerchangepassword2.default.input,
      id: 'email',
      type: 'hidden',
      name: 'email',
      value: email
    }), (0, _jsx3.default)('input', {
      id: 'code',
      type: 'hidden',
      name: 'code',
      value: passCode
    })), _ref4)));
  }
  
  Changepassword.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_providerchangepassword2.default)(Changepassword);

/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(171);
      var insertCss = __webpack_require__(55);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(54)();
  // imports
  
  
  // module
  exports.push([module.id, "._27Ef{padding-left:20px;padding-right:20px}._33RR{margin:0 auto;padding:0 0 40px;max-width:380px}._1Haq{font-size:1.25em}._3eo8{margin-bottom:20px}._1SWV{font-weight:700}._1FMu,._1SWV{display:inline-block;margin-bottom:5px;max-width:100%}._1FMu{font-weight:300;color:red}._164t{display:block;box-sizing:border-box;padding:10px 16px;width:100%;height:46px;outline:0;border:1px solid #ccc;border-radius:10;background:#fff;box-shadow:inset 0 1px 1px rgba(0,0,0,.075);color:#616161;font-size:18px;line-height:1.3333333;-webkit-transition:border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out}._164t:focus{border-color:#0074c2;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(0,116,194,.6)}._2BtK{display:block;box-sizing:border-box;margin:0;padding:10px 16px;width:100%;outline:0;border:1px solid #373277;border-radius:0;background:#373277;color:#fff;text-align:center;text-decoration:none;font-size:18px;line-height:1.3333333;cursor:pointer}._2BtK:hover{background:rgba(54,50,119,.8)}._2BtK:focus{border-color:#0074c2;box-shadow:0 0 8px rgba(0,116,194,.6)}", ""]);
  
  // exports
  exports.locals = {
  	"root": "_27Ef",
  	"container": "_33RR",
  	"lead": "_1Haq",
  	"formGroup": "_3eo8",
  	"label": "_1SWV",
  	"label1": "_1FMu",
  	"input": "_164t",
  	"button": "_2BtK"
  };

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _promise = __webpack_require__(84);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Updateproviderpass = __webpack_require__(173);
  
  var _Updateproviderpass2 = _interopRequireDefault(_Updateproviderpass);
  
  var _Providerchangepassword = __webpack_require__(169);
  
  var _Providerchangepassword2 = _interopRequireDefault(_Providerchangepassword);
  
  var _config = __webpack_require__(20);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var status = true;
  var message = 'Password Sucessfully Updated';
  var href = 'http://' + _config.host + '/providerlogin';
  var message1 = 'Click here to login';
  var passcode;
  
  exports.default = {
  
    path: '/updateproviderpass',
  
    action: function action(_ref, _ref2) {
      var _this = this;
  
      var query = _ref.query;
      var path = _ref2.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var email, newpass, confirmpass, body, deletecode;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                email = query.email;
                newpass = query.newpass;
                confirmpass = query.confirmpass;
  
                passcode = query.code;
                console.log("Email ID:" + email);
                console.log("New Password: " + newpass);
                console.log("Confirm Password: " + confirmpass);
                console.log("Passcode - Update Password module:" + passcode);
  
                if (!(newpass != confirmpass)) {
                  _context.next = 11;
                  break;
                }
  
                message = "Password Not matching";
                return _context.abrupt('return', (0, _jsx3.default)(_Providerchangepassword2.default, {
                  email: email,
                  message: message
                }));
  
              case 11:
                _context.next = 13;
                return updatePassword(newpass, email);
  
              case 13:
                body = _context.sent;
  
                if (!(status = false)) {
                  _context.next = 18;
                  break;
                }
  
                message = ' Error in updating password';
                _context.next = 22;
                break;
  
              case 18:
                message = 'Password Sucessfully Updated';
                _context.next = 21;
                return deletePassCode();
  
              case 21:
                deletecode = _context.sent;
  
              case 22:
                return _context.abrupt('return', (0, _jsx3.default)(_Updateproviderpass2.default, {
                  message: message,
                  message1: message1,
                  redirectlink: href
                }));
  
              case 23:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
  
  
  function updatePassword(newpass, email) {
    var request = __webpack_require__(94);
    console.log("Inside Updateproviderpassword method email: " + email);
    console.log("Inside Updateproviderpassword method Password: " + newpass);
    console.log('calling API');
    var url = 'http://' + _config.apihost + '/updatelogin?newpass=' + newpass + '&email=' + email;
    console.log("Update Updateproviderpass Password - URL: " + url);
  
    return new _promise2.default(function (resolve, reject) {
  
      request.put(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Change Password - Updateproviderpass - Response from API' + body);
          if (body == 'true') {
            status = true;
          } else {
            status = false;
            message = 'Error in updating password';
          }
          resolve(body);
        } else {
          status = false;
          console.log("Updateproviderpass - API Server not running: ") + error;
          return reject(error);
        }
      });
    });
  }
  
  function deletePassCode() {
    var request = __webpack_require__(94);
    console.log('Check Code - calling API');
    var url = 'http://' + _config.apihost + '/removeCode?code=' + passcode;
    console.log("deletePassCode - URL: " + url);
  
    return new _promise2.default(function (resolve, reject) {
      request.delete(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('deletePassCode- Response from API' + body);
  
          if (body == 'true') status = true;else status = false;
          resolve(body);
        } else {
          status = false;
          console.log("deletePassCode -API Server not running: " + error);
          return reject(error);
        }
        console.log("deletePassCode - Returning from API call");
      });
    });
  }

/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(59);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Updateproviderpass = __webpack_require__(174);
  
  var _Updateproviderpass2 = _interopRequireDefault(_Updateproviderpass);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  //import Link from '../../components/Link'
  
  var title = 'Update Provider Password'; /**
                                           * React Starter Kit (https://www.reactstarterkit.com/)
                                           *
                                           * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                           *
                                           * This source code is licensed under the MIT license found in the
                                           * LICENSE.txt file in the root directory of this source tree.
                                           */
  
  var _ref2 = (0, _jsx3.default)('h1', {}, void 0, title);
  
  function Updateproviderpass(_ref, context) {
    var message = _ref.message,
        message1 = _ref.message1,
        redirectlink = _ref.redirectlink;
  
    context.setTitle(title);
    return (0, _jsx3.default)('div', {
      className: _Updateproviderpass2.default.root
    }, void 0, (0, _jsx3.default)('div', {
      className: _Updateproviderpass2.default.container
    }, void 0, _ref2, (0, _jsx3.default)('p', {}, void 0, message), (0, _jsx3.default)('a', {
      href: redirectlink
    }, void 0, message1, ' ')));
  }
  
  Updateproviderpass.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Updateproviderpass2.default)(Updateproviderpass);

/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(175);
      var insertCss = __webpack_require__(55);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(54)();
  // imports
  
  
  // module
  exports.push([module.id, "._3O-w{padding-left:20px;padding-right:20px}._2GDJ{margin:0 auto;padding:0 0 40px;max-width:380px}._1Osd{font-size:1.25em}.ru8j{margin-bottom:20px}._3cKu{display:inline-block;margin-bottom:5px;max-width:100%;font-weight:700}._1PNc{display:block;box-sizing:border-box;padding:10px 16px;width:100%;height:46px;outline:0;border:1px solid #ccc;border-radius:10;background:#fff;box-shadow:inset 0 1px 1px rgba(0,0,0,.075);color:#616161;font-size:18px;line-height:1.3333333;-webkit-transition:border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out}._1PNc:focus{border-color:#0074c2;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(0,116,194,.6)}._1pi-{display:block;box-sizing:border-box;margin:0;padding:10px 16px;width:100%;outline:0;border:1px solid #373277;border-radius:0;background:#373277;color:#fff;text-align:center;text-decoration:none;font-size:18px;line-height:1.3333333;cursor:pointer}._1pi-:hover{background:rgba(54,50,119,.8)}._1pi-:focus{border-color:#0074c2;box-shadow:0 0 8px rgba(0,116,194,.6)}._1Vny{border-color:#3b5998;background:#3b5998}._1Vny:hover{background:#2d4373}._25Lc{border-color:#dd4b39;background:#dd4b39}._25Lc:hover{background:#c23321}._3wfo{border-color:#55acee;background:#55acee}._3wfo:hover{background:#2795e9}._3bFr{display:inline-block;margin:-2px 12px -2px 0;width:20px;height:20px;vertical-align:middle;fill:currentColor}._3HXK{position:relative;z-index:1;display:block;margin-bottom:15px;width:100%;color:#757575;text-align:center;font-size:80%}._3HXK:before{top:50%;left:50%;z-index:-1;margin-top:-5px;margin-left:-20px;width:40px;height:10px;background-color:#fff}._3HXK:after,._3HXK:before{position:absolute;content:''}._3HXK:after{top:49%;z-index:-2;display:block;width:100%;border-bottom:1px solid #ddd}", ""]);
  
  // exports
  exports.locals = {
  	"root": "_3O-w",
  	"container": "_2GDJ",
  	"lead": "_1Osd",
  	"formGroup": "ru8j",
  	"label": "_3cKu",
  	"input": "_1PNc",
  	"button": "_1pi-",
  	"facebook": "_1Vny _1pi-",
  	"google": "_25Lc _1pi-",
  	"twitter": "_3wfo _1pi-",
  	"icon": "_3bFr",
  	"lineThrough": "_3HXK"
  };

/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _promise = __webpack_require__(84);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _stringify = __webpack_require__(56);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _LinkProvider = __webpack_require__(177);
  
  var _LinkProvider2 = _interopRequireDefault(_LinkProvider);
  
  var _config = __webpack_require__(20);
  
  var _Login = __webpack_require__(88);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var message = 'Booking done Sucessfully  ';
  var href = 'http://' + _config.host + '/';
  var message1 = 'Click here to Home Page';
  var status = true;
  var bookingid;
  
  exports.default = {
  
    path: '/linkprovider',
  
    action: function action(_ref, _ref2) {
      var _this = this;
  
      var query = _ref.query;
      var path = _ref2.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var provideremail, customeremail, providerphone, bookingid, sessionid, providerrec, body, url, result, mail;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log("Query String - index.js - linkprovider: " + (0, _stringify2.default)(query));
                provideremail = query.provideremail;
                customeremail = query.customeremail;
                bookingid = query.bookingid;
                sessionid = query.sessionid;
                _context.t0 = JSON;
                _context.next = 8;
                return getProviderRecord(provideremail);
  
              case 8:
                _context.t1 = _context.sent;
                providerrec = _context.t0.parse.call(_context.t0, _context.t1);
  
                console.log("Provider Record: " + providerrec);
                providerphone = providerrec[0].phone;
                console.log("Provider Phone: " + providerphone);
                console.log("Sessionid - index.js - Home " + sessionid);
  
                if (!(sessionid === undefined || sessionid == '')) {
                  _context.next = 19;
                  break;
                }
  
                _context.next = 17;
                return getSessionid();
  
              case 17:
                body = _context.sent;
                return _context.abrupt('return', (0, _jsx3.default)(_Login2.default, {
                  sessionid: body
                }));
  
              case 19:
                url = 'http://' + _config.apihost + '/updateProviderLink?provideremail=' + provideremail + '&email=' + customeremail + '&phone=' + providerphone + '&bookingid=' + bookingid;
  
                console.log("Link Provider - Provider Email: " + provideremail);
                console.log("Link Provider - Customer Email: " + customeremail);
                console.log("URL: " + url);
                _context.next = 25;
                return LinkProviderData(url);
  
              case 25:
                result = _context.sent;
  
                console.log("Return from LinkProviderData");
                if (!status) {
                  message = 'Error in Saving Booking Data';
                  href = 'http://' + _config.host + '/booking';
                  message1 = 'Click here to Re-booking';
                } else {
                  mail = sendEmail(customeremail, provideremail, bookingid);
  
                  href = 'http://' + _config.host + '/home?sessionid=' + sessionid + '&email=' + customeremail;
                }
                return _context.abrupt('return', (0, _jsx3.default)(_LinkProvider2.default, {
                  message: message,
                  redirectlink: href,
                  message1: message1,
                  sessionid: sessionid
                }));
  
              case 29:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
  
  
  function LinkProviderData(url) {
    var request = __webpack_require__(94);
    // console.log("APIHOST: "+apihost);
    console.log('calling API - LinkProviderData method');
    //console.log("URL: " + url);
    return new _promise2.default(function (resolve, reject) {
      request.put(url, function (error, response, body) {
        if (error) {
          console.log("Error in storing provider data");
          status = false;
          return reject(error);
        }
  
        if (body == 'true') {
          console.log('Inside LinkProviderData Response from API (body)' + body);
          status = true;
          resolve(body);
        }
      });
      console.log('returning');
    });
  }
  
  function getSessionid(email) {
    var request = __webpack_require__(94);
    console.log('genSessionid - calling API');
    var url = 'http://' + _config.apihost + '/genSessionid';
    console.log("getSeesionid - URL: " + url);
  
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('genSessionid - Response from API' + body);
          //sessionid = body;
          resolve(body);
        } else {
  
          console.log("genSessionid -API Server not running: " + error);
          return reject(error);
        }
        console.log("getSessionid - Returning from API call");
      });
    });
  }
  
  function getProviderRecord(email) {
    var request = __webpack_require__(94);
    console.log('getProviderRecord - linkProvider - calling API');
    var url = 'http://' + _config.apihost + '/getProvider?email=' + email;
    console.log("getSeesionid - URL: " + url);
  
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('getProviderRecord - linkProvider - Response from API' + body);
          //sessionid = body;
          resolve(body);
        } else {
  
          console.log("getProviderRecord - linkProvider -API Server not running: " + error);
          return reject(error);
        }
        console.log("getSessionid - Returning from API call");
      });
    });
  }
  
  function sendEmail(email, provideremail, bookingid) {
    var request = __webpack_require__(94);-console.log('calling API - sendEmail');
    var url = 'http://' + _config.apihost + '/sendmail';
    console.log("URL: " + url);
  
    var subject = "Your booking for the event in BMY";
    var message = "<b>Thank you for booking and service provider will get in touch shortly. </b> <br> <b> Your Booking id is <b> " + bookingid;
    var formdata = {
      tomail: email + ' ,' + provideremail,
      subject: subject,
      message: message
    };
  
    //data = JSON.stringify('{\"tomail\": \"'+email+'\", \"subject\": '+subject+'\", \"message\": \" '+message+'\"}');
    console.log("Data: " + formdata);
    return new _promise2.default(function (resolve, reject) {
      request.post(url, { form: formdata }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Inside sendEmail - Response from API (body)' + body);
  
          if (body == 'true') resolve(body);
          status = true;
        }
        if (error) {
          console.log("Error in Sending Mail");
          status = false;
          return reject(error);
        }
      });
    });
  }

/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(59);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _LinkProvider = __webpack_require__(178);
  
  var _LinkProvider2 = _interopRequireDefault(_LinkProvider);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'New Boooking';
  
  var _ref2 = (0, _jsx3.default)('h1', {}, void 0, title);
  
  function LinkProvider(_ref, context) {
    var message = _ref.message,
        redirectlink = _ref.redirectlink,
        message1 = _ref.message1,
        sessionid = _ref.sessionid;
  
    context.setTitle(title);
    return (0, _jsx3.default)('div', {
      className: _LinkProvider2.default.root
    }, void 0, (0, _jsx3.default)('div', {
      className: _LinkProvider2.default.container
    }, void 0, _ref2, (0, _jsx3.default)('p', {}, void 0, message), (0, _jsx3.default)('a', {
      href: redirectlink
    }, void 0, message1, ' '), (0, _jsx3.default)('input', {
      type: 'hidden',
      name: 'sessionid',
      value: sessionid
    })));
  }
  
  LinkProvider.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_LinkProvider2.default)(LinkProvider);

/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(179);
      var insertCss = __webpack_require__(55);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(54)();
  // imports
  
  
  // module
  exports.push([module.id, ".r-gR{padding-left:20px;padding-right:20px}._3Z8t{margin:0 auto;padding:0 0 40px;max-width:380px}._102v{font-size:1.25em}._2xX5{margin-bottom:20px}._1tqg{margin-bottom:5px;max-width:100%;font-weight:700;float:left}._3Aqa{display:block;box-sizing:border-box;padding:10px 16px;width:100%;height:46px;outline:0;border:1px solid #ccc;border-radius:10;background:#fff;box-shadow:inset 0 1px 1px rgba(0,0,0,.075);color:#616161;font-size:18px;line-height:1.3333333;-webkit-transition:border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out}._3Aqa:focus{border-color:#0074c2;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(0,116,194,.6)}._296q{display:block;box-sizing:border-box;margin:0;padding:10px 16px;width:100%;outline:0;border:1px solid #373277;border-radius:0;background:#373277;color:#fff;text-align:center;text-decoration:none;font-size:18px;line-height:1.3333333;cursor:pointer}._296q:hover{background:rgba(54,50,119,.8)}._296q:focus{border-color:#0074c2;box-shadow:0 0 8px rgba(0,116,194,.6)}._2pSk{display:inline-block;margin:-2px 12px -2px 0;width:20px;height:20px;vertical-align:middle;fill:currentColor}._2QDt{position:relative;z-index:1;display:block;margin-bottom:15px;width:100%;color:#757575;text-align:center;font-size:80%}._2QDt:before{top:50%;left:50%;z-index:-1;margin-top:-5px;margin-left:-20px;width:40px;height:10px;background-color:#fff}._2QDt:after,._2QDt:before{position:absolute;content:''}._2QDt:after{top:49%;z-index:-2;display:block;width:100%;border-bottom:1px solid #ddd}#_3UqQ{max-width:100px;float:left}._314u{float:right}#_1J2j{float:left}#_3SKP{float:right}", ""]);
  
  // exports
  exports.locals = {
  	"root": "r-gR",
  	"container": "_3Z8t",
  	"lead": "_102v",
  	"formGroup": "_2xX5",
  	"label": "_1tqg",
  	"input": "_3Aqa",
  	"button": "_296q",
  	"icon": "_2pSk",
  	"lineThrough": "_2QDt",
  	"lastname": "_3UqQ",
  	"div": "_314u",
  	"leftContainer": "_1J2j",
  	"rightContainer": "_3SKP"
  };

/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _promise = __webpack_require__(84);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _stringify = __webpack_require__(56);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Providerlogin = __webpack_require__(167);
  
  var _Providerlogin2 = _interopRequireDefault(_Providerlogin);
  
  var _Providerhome = __webpack_require__(181);
  
  var _Providerhome2 = _interopRequireDefault(_Providerhome);
  
  var _ErrorPage = __webpack_require__(128);
  
  var _ErrorPage2 = _interopRequireDefault(_ErrorPage);
  
  var _config = __webpack_require__(20);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  //import Verifyproviderlogn from './Verifyproviderlogin';
  var request = __webpack_require__(94);
  
  var res;
  var userEmail;
  var password;
  var validLogin = true;
  var url;
  var bookinglist;
  var sessionid;
  
  exports.default = {
  
    path: '/verifyproviderlogin',
  
    action: function action(_ref, _ref2) {
      var _this = this;
  
      var query = _ref.query;
      var path = _ref2.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var validlogin, sessiondatastatus, bookinglist, message;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
  
                console.log("inside the Verifyproviderlogin");
                console.log((0, _stringify2.default)(query));
                console.log("Request query: " + query);
                userEmail = query.email;
                password = query.password;
                sessionid = query.sessionid;
                console.log(userEmail);
                console.log(password);
                console.log("Session Id: " + sessionid);
  
                console.log('calling checkLogin');
                _context.next = 12;
                return checklogin();
  
              case 12:
                validlogin = _context.sent;
  
                console.log("Result from API call: " + validLogin);
  
                if (!(validLogin == 'true')) {
                  _context.next = 25;
                  break;
                }
  
                _context.next = 17;
                return SaveSessionData();
  
              case 17:
                sessiondatastatus = _context.sent;
  
                console.log(" Going to Provider Home Page");
                _context.next = 21;
                return getBookingData();
  
              case 21:
                bookinglist = _context.sent;
                return _context.abrupt('return', (0, _jsx3.default)(_Providerhome2.default, {
                  sessionid: sessionid,
                  email: userEmail,
                  bookinglist: bookinglist
                }));
  
              case 25:
                console.log(" Invalid Credential return to Login Page");
                message = "Invalid username or passowrd";
                return _context.abrupt('return', (0, _jsx3.default)(_Providerlogin2.default, {
                  sessionid: sessionid,
                  message: message
                }));
  
              case 28:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
  
  
  function checklogin() {
    url = 'http://' + _config.apihost + '/verifylogin?email=' + userEmail + '&password=' + password;
    console.log("API Endpoing - checklogin : " + url);
  
    return new _promise2.default(function (resolve, reject) {
      var results = request(url, function (error, response, query) {
        if (!error && response.statusCode == 200) {
          console.log('Response from API - checklogin ' + query);
          validLogin = query;
          resolve(query);
        } else {
          console.log("Server not responding - checklogin");
          validLogin = false;
        }
      });
      console.log("ValidLogin status: - checklogin" + validLogin);
    });
  }
  
  function SaveSessionData() {
  
    console.log('calling API - SaveSessionData method');
    var url = 'http://' + _config.apihost + '/addSession';
    console.log("URL: " + url);
    var createdate = new Date();
    var data = {
      email: userEmail,
      sessionid: sessionid,
      creationdate: createdate
    };
    console.log("Data: " + data);
    return new _promise2.default(function (resolve, reject) {
      request.post(url, { form: data }, function (error, response, query) {
        if (!error && response.statusCode == 200) {
          console.log('Inside SaveSessionData Response from API (query)' + query);
  
          if (query == 'true')
            //status = true;
            resolve(query);
        }
        if (error) {
          console.log("Error in storing Session data");
          // status = false;
          return reject(error);
        }
      });
  
      console.log('returning');
    });
  }
  
  function getBookingData() {
    var request = __webpack_require__(94);
  
    console.log('calling API');
    var url = 'http://' + _config.apihost + '/getbookingrecbyprovider?email=' + userEmail;
    console.log("URL: " + url);
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, query) {
        if (!error && response.statusCode == 200) {
          console.log('Inside getBookingData Response from API (query)' + query);
          resolve(query);
        } else {
          console.log("Error Object: " + error);
          return reject(error);
        }
      });
    });
  }

/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(59);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Providerhome = __webpack_require__(182);
  
  var _Providerhome2 = _interopRequireDefault(_Providerhome);
  
  var _Link = __webpack_require__(62);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  var _classnames = __webpack_require__(70);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Welcome to World of Opporunity'; /**
                                                 * React Starter Kit (https://www.reactstarterkit.com/)
                                                 *
                                                 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                                 *
                                                 * This source code is licensed under the MIT license found in the
                                                 * LICENSE.txt file in the root directory of this source tree.
                                                 */
  
  var user = 'Customer';
  
  var _ref2 = (0, _jsx3.default)('header', {}, void 0, (0, _jsx3.default)('h2', {}, void 0, 'Search Provider'));
  
  var _ref3 = (0, _jsx3.default)('br', {});
  
  var _ref4 = (0, _jsx3.default)('br', {});
  
  var _ref5 = (0, _jsx3.default)('input', {
    type: 'text',
    id: 'category',
    name: 'category'
  });
  
  var _ref6 = (0, _jsx3.default)('br', {});
  
  var _ref7 = (0, _jsx3.default)('br', {});
  
  var _ref8 = (0, _jsx3.default)('input', {
    type: 'radio',
    name: 'searchterm',
    value: 'pincode'
  });
  
  var _ref9 = (0, _jsx3.default)('br', {});
  
  var _ref10 = (0, _jsx3.default)('input', {
    type: 'radio',
    name: 'searchterm',
    value: 'city'
  });
  
  var _ref11 = (0, _jsx3.default)('br', {});
  
  var _ref12 = (0, _jsx3.default)('header', {}, void 0, (0, _jsx3.default)('h2', {}, void 0, 'Service Booking'));
  
  var _ref13 = (0, _jsx3.default)('br', {});
  
  var _ref14 = (0, _jsx3.default)('header', {}, void 0, (0, _jsx3.default)('h2', {}, void 0, 'Booking History'));
  
  var _ref15 = (0, _jsx3.default)('b', {}, void 0, ' No booking history available');
  
  var _ref16 = (0, _jsx3.default)('header', {}, void 0, (0, _jsx3.default)('h2', {}, void 0, 'Search Provider'));
  
  var _ref17 = (0, _jsx3.default)('br', {});
  
  var _ref18 = (0, _jsx3.default)('br', {});
  
  var _ref19 = (0, _jsx3.default)('input', {
    type: 'text',
    id: 'category',
    name: 'category'
  });
  
  var _ref20 = (0, _jsx3.default)('br', {});
  
  var _ref21 = (0, _jsx3.default)('br', {});
  
  var _ref22 = (0, _jsx3.default)('input', {
    type: 'radio',
    name: 'searchterm',
    value: 'pincode'
  });
  
  var _ref23 = (0, _jsx3.default)('br', {});
  
  var _ref24 = (0, _jsx3.default)('input', {
    type: 'radio',
    name: 'searchterm',
    value: 'city'
  });
  
  var _ref25 = (0, _jsx3.default)('br', {});
  
  var _ref26 = (0, _jsx3.default)('header', {}, void 0, (0, _jsx3.default)('h2', {}, void 0, 'Service Booking'));
  
  var _ref27 = (0, _jsx3.default)('br', {});
  
  var _ref28 = (0, _jsx3.default)('header', {}, void 0, (0, _jsx3.default)('h2', {}, void 0, 'Booking History'));
  
  var _ref29 = (0, _jsx3.default)('caption', {}, void 0, 'Your Booking');
  
  var _ref30 = (0, _jsx3.default)('thead', {}, void 0, (0, _jsx3.default)('tr', {}, void 0, (0, _jsx3.default)('th', {}, void 0, 'Select'), (0, _jsx3.default)('th', {}, void 0, 'Booking ID'), (0, _jsx3.default)('th', {}, void 0, 'Booking Date'), (0, _jsx3.default)('th', {}, void 0, 'Event Date'), (0, _jsx3.default)('th', {}, void 0, 'Event'), (0, _jsx3.default)('th', {}, void 0, 'Customer E-mail'), (0, _jsx3.default)('th', {}, void 0, 'Customer Mobile'), (0, _jsx3.default)('th', {}, void 0, 'Status')));
  
  var _ref31 = (0, _jsx3.default)('input', {
    type: 'hidden',
    name: 'provider',
    value: 'provider'
  });
  
  var _ref32 = (0, _jsx3.default)('br', {});
  
  var _ref33 = (0, _jsx3.default)('br', {});
  
  var _ref34 = (0, _jsx3.default)('input', {
    type: 'radio',
    name: 'manage',
    value: 'cancel',
    checked: true
  });
  
  var _ref35 = (0, _jsx3.default)('br', {});
  
  var _ref36 = (0, _jsx3.default)('input', {
    type: 'radio',
    name: 'manage',
    value: 'close'
  });
  
  var _ref37 = (0, _jsx3.default)('br', {});
  
  var _ref38 = (0, _jsx3.default)('button', {
    value: 'change',
    type: 'submit'
  }, void 0, 'submit');
  
  function Providerhome(_ref, context) {
    var sessionid = _ref.sessionid,
        bookinglist = _ref.bookinglist,
        email = _ref.email,
        provider = _ref.provider;
  
    context.setTitle(title);
    context.setUser(user);
    // context.getUser('user');
    var logoutlink = "/providerlogout?sessionid=" + sessionid;
    var updateEmail = "/changeprovideremail?sessionid=" + sessionid + "&email=" + email;
    var updatePhone = "/changeproviderphone?sessionid=" + sessionid + "&email=" + email;
    var bookingdata = JSON.parse(bookinglist);
    var size = bookingdata.length;
    console.log("Size of the booking List: " + size);
    if (size == 0) {
      return (0, _jsx3.default)('div', {
        className: _Providerhome2.default.cards
      }, void 0, (0, _jsx3.default)('div', {
        className: _Providerhome2.default.card
      }, void 0, _ref2, _ref3, _ref4, (0, _jsx3.default)('form', {
        name: 'searchform',
        method: 'get',
        action: 'searchprovider'
      }, void 0, _ref5, _ref6, _ref7, _ref8, 'Pincode', _ref9, _ref10, 'City', _ref11, (0, _jsx3.default)('button', {
        className: _Providerhome2.default.button,
        value: 'Search',
        type: 'submit'
      }, void 0, 'Search'), (0, _jsx3.default)('input', {
        id: 'sessionid',
        type: 'hidden',
        name: 'sessionid',
        value: sessionid
      }), (0, _jsx3.default)('input', {
        id: 'email',
        type: 'hidden',
        name: 'email',
        value: email
      }))), (0, _jsx3.default)('div', {
        className: _Providerhome2.default.card
      }, void 0, _ref12, (0, _jsx3.default)(_Link2.default, {
        className: _Providerhome2.default.link,
        to: updateEmail
      }, void 0, 'Change E-mail'), (0, _jsx3.default)(_Link2.default, {
        className: _Providerhome2.default.link,
        to: updatePhone
      }, void 0, 'Change Mobile No'), (0, _jsx3.default)(_Link2.default, {
        className: _Providerhome2.default.link,
        to: '/contact'
      }, void 0, 'Add New Service'), _ref13, (0, _jsx3.default)(_Link2.default, {
        className: _Providerhome2.default.link,
        to: logoutlink
      }, void 0, 'Logout'), (0, _jsx3.default)('input', {
        id: 'sessionid',
        type: 'hidden',
        name: 'sessionid',
        value: sessionid
      }), (0, _jsx3.default)('input', {
        id: 'email',
        type: 'hidden',
        name: 'email',
        value: email
      })), (0, _jsx3.default)('div', {
        className: _Providerhome2.default.card
      }, void 0, _ref14, (0, _jsx3.default)('div', {}, void 0, (0, _jsx3.default)('p', {
        className: _Providerhome2.default.p
      }, void 0, _ref15, ' '))));
    } else {
      return (
        //<div className={s.root}>
        //<div className={s.container}>
        //   <h1>{title}</h1>
  
        (0, _jsx3.default)('div', {
          className: _Providerhome2.default.cards
        }, void 0, (0, _jsx3.default)('div', {
          className: _Providerhome2.default.card
        }, void 0, _ref16, _ref17, _ref18, (0, _jsx3.default)('form', {
          name: 'searchform',
          method: 'get',
          action: 'searchprovider'
        }, void 0, _ref19, _ref20, _ref21, _ref22, 'Pincode', _ref23, _ref24, 'City', _ref25, (0, _jsx3.default)('button', {
          className: _Providerhome2.default.button,
          value: 'Search',
          type: 'submit'
        }, void 0, 'Search'), (0, _jsx3.default)('input', {
          id: 'sessionid',
          type: 'hidden',
          name: 'sessionid',
          value: sessionid
        }), (0, _jsx3.default)('input', {
          id: 'email',
          type: 'hidden',
          name: 'email',
          value: email
        }))), (0, _jsx3.default)('div', {
          className: _Providerhome2.default.card
        }, void 0, _ref26, (0, _jsx3.default)(_Link2.default, {
          className: _Providerhome2.default.link,
          to: updateEmail
        }, void 0, 'Change E-mail'), (0, _jsx3.default)(_Link2.default, {
          className: _Providerhome2.default.link,
          to: updatePhone
        }, void 0, 'Change Mobile No'), (0, _jsx3.default)(_Link2.default, {
          className: _Providerhome2.default.link,
          to: '/contact'
        }, void 0, 'Add New Service'), _ref27, (0, _jsx3.default)(_Link2.default, {
          className: _Providerhome2.default.link,
          to: logoutlink
        }, void 0, 'Logout'), (0, _jsx3.default)('input', {
          id: 'sessionid',
          type: 'hidden',
          name: 'sessionid',
          value: sessionid
        }), (0, _jsx3.default)('input', {
          id: 'email',
          type: 'hidden',
          name: 'email',
          value: email
        })), (0, _jsx3.default)('div', {
          className: _Providerhome2.default.card
        }, void 0, _ref28, (0, _jsx3.default)('form', {
          name: 'form1',
          method: 'get',
          action: 'managebooking'
        }, void 0, (0, _jsx3.default)('table', {}, void 0, _ref29, _ref30, (0, _jsx3.default)('tbody', {}, void 0, bookingdata.map(function (obj, index) {
          return (0, _jsx3.default)('tr', {}, index, (0, _jsx3.default)('td', {}, void 0, (0, _jsx3.default)('input', {
            type: 'radio',
            name: 'bookingid',
            value: obj.bookingid,
            checked: true
          }), ' '), (0, _jsx3.default)('td', {}, void 0, ' ', obj.bookingid), (0, _jsx3.default)('td', {}, void 0, ' ', obj.dateofbooking), (0, _jsx3.default)('td', {}, void 0, ' ', obj.functiondate, ' '), (0, _jsx3.default)('td', {}, void 0, ' ', obj.eventtype, ' '), (0, _jsx3.default)('td', {}, void 0, ' ', obj.email, ' '), (0, _jsx3.default)('td', {}, void 0, obj.mobile), (0, _jsx3.default)('td', {}, void 0, ' ', obj.status));
        }))), (0, _jsx3.default)('input', {
          id: 'sessionid',
          type: 'hidden',
          name: 'sessionid',
          value: sessionid
        }), (0, _jsx3.default)('input', {
          id: 'email',
          type: 'hidden',
          name: 'email',
          value: email
        }), _ref31, _ref32, _ref33, _ref34, 'Cancel', _ref35, _ref36, 'Close Booking', _ref37, _ref38)))
      );
    }
  }
  
  Providerhome.contextTypes = { setTitle: _react.PropTypes.func.isRequired, setUser: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Providerhome2.default)(Providerhome);

/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(183);
      var insertCss = __webpack_require__(55);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(54)();
  // imports
  
  
  // module
  exports.push([module.id, "._3MhA{padding-left:20px;padding-right:20px}._2b2-{margin:2cm 4cm 3cm;padding:10 10 100px;max-width:1000px}.ZJCO{display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;padding:13px;text-decoration:none;text-align:center;font-size:1.125em}.ZJCO,.ZJCO:active,.ZJCO:visited{color:rgba(0,0,255,.6)}.ZJCO:hover{color:#0f0}._2__U{margin-right:8px;margin-left:8px;border-radius:3px;background:rgba(0,0,0,.15);color:#fff}._2__U:hover{background:rgba(0,0,0,.3)}._3mEG{color:hsla(0,0%,100%,.3)}._1__v{display:-webkit-box;display:-ms-flexbox;display:flex;margin:0 auto;max-width:1200px}._2Yr2{margin:0 5px;-webkit-box-flex:0;-ms-flex:0 0 300px;flex:0 0 300px}html{box-sizing:content-box}*,:after,:before{box-sizing:inherit}body{font:1em/1.1 Roboto,Helvetica Neue,Helvetica,Arial,sans-serif;background-color:#fafafa}img{max-width:100%}._2Yr2{background-color:#fff;box-shadow:0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12)}._2Yr2 header{padding:10px;background-color:#8370ff;color:#fff}._2Yr2 header h2{font-size:14.4px;font-size:.9rem;font-weight:400;margin:0;padding:0}._2Yr2 .oXJY{padding:5px;font-size:4.8px;font-size:.3rem;color:#757575}table,td,th{border:1px solid #000}tr:hover{background-color:#f5f5f5}th{background-color:#4caf50;color:#fff}td,th{padding:5px;text-align:left}button{box-sizing:border-box;margin:10px 6px;padding:5px 16px;width:30%;outline:10;border:4px solid #373277;border-radius:12px;background:#373277;color:#fff;text-align:center;text-decoration:inherit;font-size:12px;line-height:1.3333333;cursor:pointer;float:inherit}button:hover{background:rgba(54,50,119,.8)}button:focus{border-color:#0074c2;box-shadow:0 0 8px rgba(0,116,194,.6)}", ""]);
  
  // exports
  exports.locals = {
  	"root": "_3MhA",
  	"container": "_2b2-",
  	"link": "ZJCO",
  	"highlight": "_2__U",
  	"spacer": "_3mEG",
  	"cards": "_1__v",
  	"card": "_2Yr2",
  	"body": "oXJY"
  };

/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _promise = __webpack_require__(84);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Providerlist = __webpack_require__(99);
  
  var _Providerlist2 = _interopRequireDefault(_Providerlist);
  
  var _config = __webpack_require__(20);
  
  var _Login = __webpack_require__(88);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var providerlist;
  var sessionid;
  
  exports.default = {
  
    path: '/providerlist',
  
    action: function action(_ref, _ref2) {
      var _this = this;
  
      var query = _ref.query;
      var path = _ref2.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var body, customeremail;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
  
                sessionid = query.sessionid;
                console.log("Sessionid - index.js - Providerlist " + sessionid);
  
                if (!(sessionid === undefined || sessionid == '')) {
                  _context.next = 7;
                  break;
                }
  
                _context.next = 5;
                return getSessionid();
  
              case 5:
                body = _context.sent;
                return _context.abrupt('return', (0, _jsx3.default)(_Login2.default, {
                  sessionid: body
                }));
  
              case 7:
                _context.next = 9;
                return getProviderData();
  
              case 9:
                body = _context.sent;
  
                //console.log("Body: "+body);
                customeremail = query.customeremail;
  
                console.log("customer Email: " + customeremail);
                return _context.abrupt('return', (0, _jsx3.default)(_Providerlist2.default, {
                  providerlist: providerlist,
                  customeremail: customeremail,
                  sessionid: sessionid
                }));
  
              case 13:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
  
  
  function getProviderData() {
    var request = __webpack_require__(94);
  
    console.log('calling API');
    var url = 'http://' + _config.apihost + '/searchByType?servicetype=Pooja';
    console.log("URL: " + url);
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Inside getProviderData Response from API (body)' + body);
          providerlist = body;
          console.log("Providerlist: " + providerlist);
          resolve(body);
        } else {
          console.log("Error Object: " + error);
          return reject(error);
        }
      });
    });
  }
  
  function getSessionid() {
    var request = __webpack_require__(94);
    console.log('genSessionid - calling API');
    var url = 'http://' + _config.apihost + '/genSessionid';
    console.log("getSeesionid - URL: " + url);
  
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('genSessionid - Response from API' + body);
          //sessionid = body;
          resolve(body);
        } else {
  
          console.log("genSessionid -API Server not running: " + error);
          return reject(error);
        }
        console.log("getSessionid - Returning from API call");
      });
    });
  }

/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _promise = __webpack_require__(84);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Logout = __webpack_require__(186);
  
  var _Logout2 = _interopRequireDefault(_Logout);
  
  var _Login = __webpack_require__(88);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  var _config = __webpack_require__(20);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var message = 'Thanks for visiting our website. You have Sucessfully Logged out ';
  var message1 = 'Click here to login';
  var href = 'http://' + _config.host + '/login';
  var status;
  var sessionid;
  
  var _ref3 = (0, _jsx3.default)(_Logout2.default, {
    message: message,
    redirectlink: href,
    message1: message1
  });
  
  exports.default = {
  
    path: '/logout',
  
    action: function action(_ref, _ref2) {
      var _this = this;
  
      var query = _ref.query;
      var path = _ref2.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var body;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                sessionid = query.sessionid;
                console.log("Logout - index.js - Sessionid: " + sessionid);
                _context.next = 4;
                return deleteSession();
  
              case 4:
                body = _context.sent;
  
                console.log("Session deleted");
                return _context.abrupt('return', _ref3);
  
              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
  
  
  function deleteSession() {
    var request = __webpack_require__(94);
    console.log('calling API - DeleteSession method');
    var url = 'http://' + _config.apihost + '/deleteSession?sessionid=' + sessionid;
    console.log("URL: " + url);
  
    return new _promise2.default(function (resolve, reject) {
      request.put(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Inside Logout - index.js - deleteSession Response from API (body)' + body);
  
          if (body == 'true') status = true;
          resolve(body);
        }
        if (error) {
          console.log("Error in deleting session data");
          status = false;
          return reject(error);
        }
        console.log('returning from deleteSession API call');
      });
    });
  }

/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(59);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Logout = __webpack_require__(187);
  
  var _Logout2 = _interopRequireDefault(_Logout);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Logout';
  
  var _ref2 = (0, _jsx3.default)('h1', {}, void 0, title);
  
  function Logout(_ref, context) {
    var message = _ref.message,
        redirectlink = _ref.redirectlink,
        message1 = _ref.message1;
  
    context.setTitle(title);
    return (0, _jsx3.default)('div', {
      className: _Logout2.default.root
    }, void 0, (0, _jsx3.default)('div', {
      className: _Logout2.default.container
    }, void 0, _ref2, (0, _jsx3.default)('p', {}, void 0, message), (0, _jsx3.default)('a', {
      href: redirectlink
    }, void 0, message1)));
  }
  
  Logout.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Logout2.default)(Logout);

/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(188);
      var insertCss = __webpack_require__(55);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(54)();
  // imports
  
  
  // module
  exports.push([module.id, "._3lwZ{padding-left:20px;padding-right:20px}.Wral{margin:0 auto;padding:0 0 40px;max-width:380px}.RHcX{font-size:1.25em}._2i25{margin-bottom:20px}._3-Al{margin-bottom:5px;max-width:100%;font-weight:700;float:left}", ""]);
  
  // exports
  exports.locals = {
  	"root": "_3lwZ",
  	"container": "Wral",
  	"lead": "RHcX",
  	"formGroup": "_2i25",
  	"label": "_3-Al"
  };

/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _promise = __webpack_require__(84);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Bookinglist = __webpack_require__(190);
  
  var _Bookinglist2 = _interopRequireDefault(_Bookinglist);
  
  var _config = __webpack_require__(20);
  
  var _Login = __webpack_require__(88);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var sessionid;
  var email;
  
  exports.default = {
  
    path: '/bookinglist',
  
    action: function action(_ref, _ref2) {
      var _this = this;
  
      var query = _ref.query;
      var path = _ref2.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var body, bookingdata;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
  
                sessionid = query.sessionid;
                console.log("Sessionid - index.js - Home " + sessionid);
  
                email = query.email;
                console.log("customer Email: " + email);
  
                if (!(sessionid === undefined || sessionid == '')) {
                  _context.next = 9;
                  break;
                }
  
                _context.next = 7;
                return getSessionid();
  
              case 7:
                body = _context.sent;
                return _context.abrupt('return', (0, _jsx3.default)(_Login2.default, {
                  sessionid: body
                }));
  
              case 9:
                _context.next = 11;
                return getBookingData();
  
              case 11:
                bookingdata = _context.sent;
                return _context.abrupt('return', (0, _jsx3.default)(_Bookinglist2.default, {
                  Bookingdata: bookingdata,
                  customeremail: email,
                  sessionid: sessionid
                }));
  
              case 13:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
  
  
  function getBookingData() {
    var request = __webpack_require__(94);
  
    console.log('calling API');
    var url = 'http://' + _config.apihost + '/getBookingHistory?email=' + email;
    console.log("URL: " + url);
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Inside getBookingData Response from API (body)' + body);
          //Bookinglist = body;
          // console.log("Bookinglist: "+Bookinglist);
          resolve(body);
        } else {
          console.log("Error Object: " + error);
          return reject(error);
        }
      });
    });
  }
  
  function getSessionid() {
    var request = __webpack_require__(94);
    console.log('genSessionid - calling API');
    var url = 'http://' + _config.apihost + '/genSessionid';
    console.log("getSeesionid - URL: " + url);
  
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('genSessionid - Response from API' + body);
          //sessionid = body;
          resolve(body);
        } else {
  
          console.log("genSessionid -API Server not running: " + error);
          return reject(error);
        }
        console.log("getSessionid - Returning from API call");
      });
    });
  }

/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(59);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Bookinglist = __webpack_require__(191);
  
  var _Bookinglist2 = _interopRequireDefault(_Bookinglist);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Service booking Search';
  
  var _ref2 = (0, _jsx3.default)('h1', {}, void 0, 'My Booking');
  
  var _ref3 = (0, _jsx3.default)('caption', {}, void 0, 'Service Providers');
  
  var _ref4 = (0, _jsx3.default)('thead', {}, void 0, (0, _jsx3.default)('tr', {}, void 0, (0, _jsx3.default)('th', {}, void 0, 'Email'), (0, _jsx3.default)('th', {}), (0, _jsx3.default)('th', {}, void 0, 'Booking Date'), (0, _jsx3.default)('th', {}, void 0, 'Function Date'), (0, _jsx3.default)('th', {}, void 0, 'Mobile'), (0, _jsx3.default)('th', {}, void 0, 'Status'), (0, _jsx3.default)('th', {}, void 0, 'Event Type')));
  
  var _ref5 = (0, _jsx3.default)('br', {});
  
  function Bookinglist(_ref, props, context) {
    var Bookingdata = _ref.Bookingdata,
        customeremail = _ref.customeremail,
        sessionid = _ref.sessionid;
  
    //context.setTitle(title);
  
    var bookingdata = JSON.parse(Bookingdata);
  
    console.log("booking Data: " + bookingdata);
    return (0, _jsx3.default)('div', {
      className: _Bookinglist2.default.root
    }, void 0, (0, _jsx3.default)('div', {
      className: _Bookinglist2.default.container
    }, void 0, _ref2, (0, _jsx3.default)('div', {}, void 0, (0, _jsx3.default)('form', {
      name: 'form1'
    }, void 0, (0, _jsx3.default)('div', {
      className: _Bookinglist2.default.formGroup
    }, void 0, (0, _jsx3.default)('table', {}, void 0, _ref3, _ref4, (0, _jsx3.default)('tbody', {}, void 0, bookingdata.map(function (obj, index) {
      return (0, _jsx3.default)('tr', {}, index, (0, _jsx3.default)('td', {}, void 0, (0, _jsx3.default)('input', {
        type: 'radio',
        name: 'customeremail',
        value: obj.email
      }), ' '), (0, _jsx3.default)('td', {}, void 0, ' ', (0, _jsx3.default)('input', {
        id: 'email',
        type: 'hidden',
        value: obj.email
      }), obj.email, ' '), (0, _jsx3.default)('td', {}, void 0, ' ', obj.bookingdate), (0, _jsx3.default)('td', {}, void 0, ' ', obj.functiondate), (0, _jsx3.default)('td', {}, void 0, ' ', obj.mobile, ' '), (0, _jsx3.default)('td', {}, void 0, ' ', obj.status), (0, _jsx3.default)('td', {}, void 0, ' ', obj.eventtype));
    })))), (0, _jsx3.default)('div', {}, void 0, _ref5, (0, _jsx3.default)('input', {
      type: 'hidden',
      name: 'customeremail',
      value: customeremail
    }), (0, _jsx3.default)('input', {
      type: 'hidden',
      name: 'sessionid',
      value: sessionid
    }))))));
  }
  
  Bookinglist.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Bookinglist2.default)(Bookinglist);

/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(192);
      var insertCss = __webpack_require__(55);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(54)();
  // imports
  
  
  // module
  exports.push([module.id, ".W57o{padding-left:20px;padding-right:20px}._27iM{margin:0 auto;padding:0 0 40px;max-width:380px;max-height:100x}html{min-height:100%}body{min-height:100vh}table,td,th{border:1px solid #000}tr:hover{background-color:#f5f5f5}th{background-color:#4caf50}._2HE4,th{color:#fff}._2HE4{display:block;box-sizing:border-box;margin:0;padding:10px 16px;width:30%;outline:0;border:1px solid #373277;border-radius:0;background:#373277;text-align:center;text-decoration:none;font-size:18px;line-height:1.3333333;cursor:pointer}._2HE4:hover{background:rgba(54,50,119,.8)}._2HE4:focus{border-color:#0074c2;box-shadow:0 0 8px rgba(0,116,194,.6)}div{overflow-x:visible}._2hTf{margin-bottom:15px}", ""]);
  
  // exports
  exports.locals = {
  	"root": "W57o",
  	"container": "_27iM",
  	"button": "_2HE4",
  	"formGroup": "_2hTf"
  };

/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _stringify = __webpack_require__(56);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Cancelbooking = __webpack_require__(194);
  
  var _Cancelbooking2 = _interopRequireDefault(_Cancelbooking);
  
  var _bookinglist = __webpack_require__(197);
  
  var _bookinglist2 = _interopRequireDefault(_bookinglist);
  
  var _util = __webpack_require__(93);
  
  var _config = __webpack_require__(20);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var sessionid = '';
  
  var message = 'Booking done Sucessfully  ';
  var href = 'http://' + _config.host + '/';
  var message1 = 'Click here to login';
  var status = true;
  var email;
  var phone;
  var providermobile;
  var providermail;
  var sessionid;
  var id;
  
  exports.default = {
  
    path: '/cancelbooking',
  
    action: function action(_ref, _ref2) {
      var _this = this;
  
      var query = _ref.query;
      var path = _ref2.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log("Query String - index.js - Cancelbooking: " + (0, _stringify2.default)(query));
                message = 'Sucessfully canceled  the Event';
                sessionid = query.sessionid;
                href = href = 'http://' + _config.host + '/home?sessionid=' + sessionid + '&email=' + email;
                message1 = 'Click here to Home Page.';
                return _context.abrupt('return', (0, _jsx3.default)(_Cancelbooking2.default, {
                  message: message,
                  redirectlink: href,
                  message1: message1,
                  sessionid: sessionid
                }));
  
              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };

/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(59);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Cancelbooking = __webpack_require__(195);
  
  var _Cancelbooking2 = _interopRequireDefault(_Cancelbooking);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Cancel Booking'; /**
                                 * React Starter Kit (https://www.reactstarterkit.com/)
                                 *
                                 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                 *
                                 * This source code is licensed under the MIT license found in the
                                 * LICENSE.txt file in the root directory of this source tree.
                                 */
  
  var _ref2 = (0, _jsx3.default)('h1', {}, void 0, title);
  
  var _ref3 = (0, _jsx3.default)('script', {}, void 0);
  
  function Cancelbooking(_ref, context) {
    var message = _ref.message,
        redirectlink = _ref.redirectlink,
        message1 = _ref.message1,
        sessionid = _ref.sessionid;
  
    context.setTitle(title);
    return (0, _jsx3.default)('div', {
      className: _Cancelbooking2.default.root
    }, void 0, (0, _jsx3.default)('div', {
      className: _Cancelbooking2.default.container
    }, void 0, _ref2, (0, _jsx3.default)('p', {}, void 0, message), _ref3, (0, _jsx3.default)('a', {
      href: redirectlink
    }, void 0, message1, ' '), (0, _jsx3.default)('input', {
      id: 'sessionid',
      type: 'hidden',
      name: 'sessionid',
      value: sessionid
    })));
  }
  
  Cancelbooking.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Cancelbooking2.default)(Cancelbooking);

/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(196);
      var insertCss = __webpack_require__(55);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(54)();
  // imports
  
  
  // module
  exports.push([module.id, "._3yON{padding-left:20px;padding-right:20px}._3PoS{margin:0 auto;padding:0 0 40px;max-width:380px}._2Lqi{font-size:1.25em}._275t{margin-bottom:20px}._2u_l{margin-bottom:5px;max-width:100%;font-weight:700;float:left}.oj0N{display:block;box-sizing:border-box;padding:10px 16px;width:100%;height:46px;outline:0;border:1px solid #ccc;border-radius:10;background:#fff;box-shadow:inset 0 1px 1px rgba(0,0,0,.075);color:#616161;font-size:18px;line-height:1.3333333;-webkit-transition:border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out}.oj0N:focus{border-color:#0074c2;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(0,116,194,.6)}.CpvP{display:block;box-sizing:border-box;margin:0;padding:10px 16px;width:100%;outline:0;border:1px solid #373277;border-radius:0;background:#373277;color:#fff;text-align:center;text-decoration:none;font-size:18px;line-height:1.3333333;cursor:pointer}.CpvP:hover{background:rgba(54,50,119,.8)}.CpvP:focus{border-color:#0074c2;box-shadow:0 0 8px rgba(0,116,194,.6)}._1XTX{display:inline-block;margin:-2px 12px -2px 0;width:20px;height:20px;vertical-align:middle;fill:currentColor}._30uc{position:relative;z-index:1;display:block;margin-bottom:15px;width:100%;color:#757575;text-align:center;font-size:80%}._30uc:before{top:50%;left:50%;z-index:-1;margin-top:-5px;margin-left:-20px;width:40px;height:10px;background-color:#fff}._30uc:after,._30uc:before{position:absolute;content:''}._30uc:after{top:49%;z-index:-2;display:block;width:100%;border-bottom:1px solid #ddd}#poFV{max-width:100px;float:left}._1WF1{float:right}#_3kam{float:left}#_72aT{float:right}", ""]);
  
  // exports
  exports.locals = {
  	"root": "_3yON",
  	"container": "_3PoS",
  	"lead": "_2Lqi",
  	"formGroup": "_275t",
  	"label": "_2u_l",
  	"input": "oj0N",
  	"button": "CpvP",
  	"icon": "_1XTX",
  	"lineThrough": "_30uc",
  	"lastname": "poFV",
  	"div": "_1WF1",
  	"leftContainer": "_3kam",
  	"rightContainer": "_72aT"
  };

/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(59);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Bookinglist = __webpack_require__(191);
  
  var _Bookinglist2 = _interopRequireDefault(_Bookinglist);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Service booking Search';
  
  var _ref2 = (0, _jsx3.default)('h1', {}, void 0, 'My Booking');
  
  var _ref3 = (0, _jsx3.default)('caption', {}, void 0, 'Service Providers');
  
  var _ref4 = (0, _jsx3.default)('thead', {}, void 0, (0, _jsx3.default)('tr', {}, void 0, (0, _jsx3.default)('th', {}, void 0, 'Email'), (0, _jsx3.default)('th', {}), (0, _jsx3.default)('th', {}, void 0, 'Booking Date'), (0, _jsx3.default)('th', {}, void 0, 'Function Date'), (0, _jsx3.default)('th', {}, void 0, 'Mobile'), (0, _jsx3.default)('th', {}, void 0, 'Status'), (0, _jsx3.default)('th', {}, void 0, 'Event Type')));
  
  var _ref5 = (0, _jsx3.default)('br', {});
  
  function Bookinglist(_ref, props, context) {
    var Bookingdata = _ref.Bookingdata,
        customeremail = _ref.customeremail,
        sessionid = _ref.sessionid;
  
    //context.setTitle(title);
  
    var bookingdata = JSON.parse(Bookingdata);
  
    console.log("booking Data: " + bookingdata);
    return (0, _jsx3.default)('div', {
      className: _Bookinglist2.default.root
    }, void 0, (0, _jsx3.default)('div', {
      className: _Bookinglist2.default.container
    }, void 0, _ref2, (0, _jsx3.default)('div', {}, void 0, (0, _jsx3.default)('form', {
      name: 'form1'
    }, void 0, (0, _jsx3.default)('div', {
      className: _Bookinglist2.default.formGroup
    }, void 0, (0, _jsx3.default)('table', {}, void 0, _ref3, _ref4, (0, _jsx3.default)('tbody', {}, void 0, bookingdata.map(function (obj, index) {
      return (0, _jsx3.default)('tr', {}, index, (0, _jsx3.default)('td', {}, void 0, (0, _jsx3.default)('input', {
        type: 'radio',
        name: 'customeremail',
        value: obj.email
      }), ' '), (0, _jsx3.default)('td', {}, void 0, ' ', (0, _jsx3.default)('input', {
        id: 'email',
        type: 'hidden',
        value: obj.email
      }), obj.email, ' '), (0, _jsx3.default)('td', {}, void 0, ' ', obj.bookingdate), (0, _jsx3.default)('td', {}, void 0, ' ', obj.functiondate), (0, _jsx3.default)('td', {}, void 0, ' ', obj.mobile, ' '), (0, _jsx3.default)('td', {}, void 0, ' ', obj.status), (0, _jsx3.default)('td', {}, void 0, ' ', obj.eventtype));
    })))), (0, _jsx3.default)('div', {}, void 0, _ref5, (0, _jsx3.default)('input', {
      type: 'hidden',
      name: 'customeremail',
      value: customeremail
    }), (0, _jsx3.default)('input', {
      type: 'hidden',
      name: 'sessionid',
      value: sessionid
    }))))));
  }
  
  Bookinglist.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Bookinglist2.default)(Bookinglist);

/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _promise = __webpack_require__(84);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _stringify = __webpack_require__(56);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var sendSMS = function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      var url;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              console.log('calling API - sendSMS method');
  
              url = 'http://' + _config.apihost + '/sendSMS?authkey=' + _config.smsAPIKey + '&mobiles=' + phone + '&message=' + _config.SMSmessage + '&sender=DTSBMF&route=4&country=91';
  
              console.log("URL: " + url);
              return _context2.abrupt('return', new _promise2.default(function (resolve, reject) {
                request(url, function (error, response, body) {
                  if (!error && response.statusCode == 200) {
                    console.log('Inside sendSMS - Response from API (body)' + body);
  
                    if (error) {
                      console.log("Error in Sending SMS");
                      status = false;
                      return reject(error);
                    }
  
                    if (body == 'true') status = true;
                    resolve(body);
                  }
                });
              }));
  
            case 4:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));
  
    return function sendSMS() {
      return _ref3.apply(this, arguments);
    };
  }();
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Changebookingdate = __webpack_require__(199);
  
  var _Changebookingdate2 = _interopRequireDefault(_Changebookingdate);
  
  var _Login = __webpack_require__(88);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  var _config = __webpack_require__(20);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var request = __webpack_require__(94);
  
  var message = 'Booking done Sucessfully  ';
  var href = 'http://' + _config.host + '/';
  var message1 = 'Click here to login';
  var status = true;
  var changeddate;
  var sessionid;
  var id;
  var email;
  
  exports.default = {
  
    path: '/changebookingdate',
  
    action: function action(_ref, _ref2) {
      var _this = this;
  
      var query = _ref.query;
      var path = _ref2.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var sessionbody, body;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log("Query String - index.js - Changebookingdate: " + (0, _stringify2.default)(query));
                sessionid = query.sessionid;
                console.log("Sessionid - index.js - Changebookingdate " + sessionid);
  
                if (!(sessionid === undefined || sessionid == '')) {
                  _context.next = 8;
                  break;
                }
  
                _context.next = 6;
                return getSessionid();
  
              case 6:
                sessionbody = _context.sent;
                return _context.abrupt('return', (0, _jsx3.default)(_Login2.default, {
                  sessionid: sessionbody
                }));
  
              case 8:
  
                id = query.bookingid;
                console.log("Booking Id: " + id);
                changeddate = query.newdate;
  
                _context.next = 13;
                return Changedate();
  
              case 13:
                body = _context.sent;
  
                /*console.log("Calling SendEmail");
                var mail = await sendEmail();
                console.log("Calling sendSMS");
                var sms = await sendSMS();
                console.log("Body: "+body);*/
                if (!status) {
                  message = 'Unable to Change booking date  the Event';
                  href = 'http://' + _config.host + '/home';
                  message1 = 'Click here to Register.';
                } else {
                  message = 'Sucessfully changed booking date for  the Event';
                  href = 'http://' + _config.host + '/home?sessionid=' + sessionid + '&email=' + email;
                  message1 = 'Click here to Home Page.';
                }
                return _context.abrupt('return', (0, _jsx3.default)(_Changebookingdate2.default, {
                  message: message,
                  redirectlink: href,
                  message1: message1,
                  sessionid: sessionid
                }));
  
              case 16:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
  
  
  function Changedate() {
  
    console.log('calling API - SavebookingData method');
    var url = 'http://' + _config.apihost + '/changedate?id=' + id + '&date=' + changeddate;
    console.log("URL: " + url);
  
    return new _promise2.default(function (resolve, reject) {
      request.put(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Inside Changebookingdate Response from API (body)' + body);
  
          if (body == 'true') status = true;else status = false;
          resolve(body);
          //sendSMS();
          //var result = await sendEmail();
        }
        if (error) {
          console.log("Error in storing customer data");
          status = false;
          return reject(error);
        }
      });
  
      console.log('returning');
    });
  }
  
  function sendEmail() {
    console.log('calling API - sendEmail');
    var url = 'http://' + _config.apihost + '/sendmail';
    console.log("URL: " + url);
  
    var subject = "Your booking for the event in BMY";
    var message = "<b>Thank you for booking and service provider will get in touch shortly. </b> <br> <b> Your Booking id is <b> ";
    var formdata = {
      tomail: email,
      subject: subject,
      message: message
    };
  
    //data = JSON.stringify('{\"tomail\": \"'+email+'\", \"subject\": '+subject+'\", \"message\": \" '+message+'\"}');
    console.log("Data: " + formdata);
    return new _promise2.default(function (resolve, reject) {
      request.post(url, { form: formdata }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Inside sendEmail - Response from API (body)' + body);
  
          if (body == 'true') resolve(body);
          status = true;
        }
        if (error) {
          console.log("Error in Sending Mail");
          status = false;
          return reject(error);
        }
      });
    });
  }
  
  function getSessionid() {
    var request = __webpack_require__(94);
    console.log('genSessionid - calling API');
    var url = 'http://' + _config.apihost + '/genSessionid';
    console.log("getSeesionid - URL: " + url);
  
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('genSessionid - Response from API' + body);
          //sessionid = body;
          resolve(body);
        } else {
  
          console.log("genSessionid -API Server not running: " + error);
          return reject(error);
        }
        console.log("getSessionid - Returning from API call");
      });
    });
  }
  
  function getBookingRecord() {
    var request = __webpack_require__(94);
    console.log('getBookingRecord - linkbooking - calling API');
    var url = 'http://' + _config.apihost + '/getbookingrec?email=' + email + '&bookingid=' + id;
    console.log("getSeesionid - URL: " + url);
  
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('getBookingRecord - linkbooking - Response from API' + body);
          //sessionid = body;
          resolve(body);
        } else {
  
          console.log("getBookingRecord - linkbooking -API Server not running: " + error);
          return reject(error);
        }
        console.log("getBookingRecord - Returning from API call");
      });
    });
  }

/***/ },
/* 199 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(59);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Changebookingdate = __webpack_require__(200);
  
  var _Changebookingdate2 = _interopRequireDefault(_Changebookingdate);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Change Booking Date'; /**
                                      * React Starter Kit (https://www.reactstarterkit.com/)
                                      *
                                      * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                      *
                                      * This source code is licensed under the MIT license found in the
                                      * LICENSE.txt file in the root directory of this source tree.
                                      */
  
  var _ref2 = (0, _jsx3.default)('h1', {}, void 0, title);
  
  function Changebookingdate(_ref, context) {
    var message = _ref.message,
        redirectlink = _ref.redirectlink,
        message1 = _ref.message1,
        sessionid = _ref.sessionid;
  
    context.setTitle(title);
    return (0, _jsx3.default)('div', {
      className: _Changebookingdate2.default.root
    }, void 0, (0, _jsx3.default)('div', {
      className: _Changebookingdate2.default.container
    }, void 0, _ref2, (0, _jsx3.default)('p', {}, void 0, message), (0, _jsx3.default)('a', {
      href: redirectlink
    }, void 0, message1, ' '), (0, _jsx3.default)('input', {
      id: 'sessionid',
      type: 'hidden',
      name: 'sessionid',
      value: sessionid
    })));
  }
  
  Changebookingdate.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Changebookingdate2.default)(Changebookingdate);

/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(201);
      var insertCss = __webpack_require__(55);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(54)();
  // imports
  
  
  // module
  exports.push([module.id, "._2cuv{padding-left:20px;padding-right:20px}.YVrl{margin:0 auto;padding:0 0 40px;max-width:380px}._31TA{font-size:1.25em}._2VXh{margin-bottom:20px}._2a0Q{margin-bottom:5px;max-width:100%;font-weight:700;float:left}._3Bmo{display:block;box-sizing:border-box;padding:10px 16px;width:100%;height:46px;outline:0;border:1px solid #ccc;border-radius:10;background:#fff;box-shadow:inset 0 1px 1px rgba(0,0,0,.075);color:#616161;font-size:18px;line-height:1.3333333;-webkit-transition:border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out}._3Bmo:focus{border-color:#0074c2;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(0,116,194,.6)}._1ma4{display:block;box-sizing:border-box;margin:0;padding:10px 16px;width:100%;outline:0;border:1px solid #373277;border-radius:0;background:#373277;color:#fff;text-align:center;text-decoration:none;font-size:18px;line-height:1.3333333;cursor:pointer}._1ma4:hover{background:rgba(54,50,119,.8)}._1ma4:focus{border-color:#0074c2;box-shadow:0 0 8px rgba(0,116,194,.6)}._3HYj{display:inline-block;margin:-2px 12px -2px 0;width:20px;height:20px;vertical-align:middle;fill:currentColor}.tyl4{position:relative;z-index:1;display:block;margin-bottom:15px;width:100%;color:#757575;text-align:center;font-size:80%}.tyl4:before{top:50%;left:50%;z-index:-1;margin-top:-5px;margin-left:-20px;width:40px;height:10px;background-color:#fff}.tyl4:after,.tyl4:before{position:absolute;content:''}.tyl4:after{top:49%;z-index:-2;display:block;width:100%;border-bottom:1px solid #ddd}#KfYm{max-width:100px;float:left}._2Lyx{float:right}#uyCz{float:left}#_2Ko_{float:right}", ""]);
  
  // exports
  exports.locals = {
  	"root": "_2cuv",
  	"container": "YVrl",
  	"lead": "_31TA",
  	"formGroup": "_2VXh",
  	"label": "_2a0Q",
  	"input": "_3Bmo",
  	"button": "_1ma4",
  	"icon": "_3HYj",
  	"lineThrough": "tyl4",
  	"lastname": "KfYm",
  	"div": "_2Lyx",
  	"leftContainer": "uyCz",
  	"rightContainer": "_2Ko_"
  };

/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _promise = __webpack_require__(84);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _stringify = __webpack_require__(56);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var sendSMS = function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      var mobiles, SMSmessage, url;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              console.log('calling API - sendSMS method');
              mobiles = phone + ',' + providermobile;
  
              console.log("Mobiles: " + mobiles);
              SMSmessage = 'We cancelled your booking with id ' + id + ', booking please login to view the details';
              url = 'http://' + _config.apihost + '/sendSMS?authkey=' + _config.smsAPIKey + '&mobiles=' + mobiles + '&message=' + SMSmessage + '&sender=DTSBMF&route=4&country=91';
  
              console.log("URL: " + url);
              return _context2.abrupt('return', new _promise2.default(function (resolve, reject) {
                request(url, function (error, response, body) {
                  if (!error && response.statusCode == 200) {
                    console.log('Inside sendSMS - Response from API (body)' + body);
  
                    if (error) {
                      console.log("Error in Sending SMS");
                      status = false;
                      return reject(error);
                    }
  
                    if (body == 'true') status = true;
                    resolve(body);
                  }
                });
              }));
  
            case 7:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));
  
    return function sendSMS() {
      return _ref3.apply(this, arguments);
    };
  }();
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Managebooking = __webpack_require__(203);
  
  var _Managebooking2 = _interopRequireDefault(_Managebooking);
  
  var _Login = __webpack_require__(88);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  var _Cancelbooking = __webpack_require__(194);
  
  var _Cancelbooking2 = _interopRequireDefault(_Cancelbooking);
  
  var _config = __webpack_require__(20);
  
  var _util = __webpack_require__(93);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var request = __webpack_require__(94);
  
  var message = 'Booking done Sucessfully  ';
  var href = 'http://' + _config.host + '/';
  var message1 = 'Click here to login';
  var status = true;
  var email;
  var phone;
  var providermobile;
  var providermail;
  var sessionid;
  var id;
  var bookingstatus;
  var provider;
  
  exports.default = {
  
    path: '/managebooking',
  
    action: function action(_ref, _ref2) {
      var _this = this;
  
      var query = _ref.query;
      var path = _ref2.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var sessionbody, bookingrec, eventdate, body, mail;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log("Query String - index.js - Managebooking: " + (0, _stringify2.default)(query));
  
                sessionid = query.sessionid;
                console.log("Sessionid - index.js - Manage Booking " + sessionid);
  
                if (!(sessionid === undefined || sessionid == '')) {
                  _context.next = 8;
                  break;
                }
  
                _context.next = 6;
                return (0, _util.getSessionid)();
  
              case 6:
                sessionbody = _context.sent;
                return _context.abrupt('return', (0, _jsx3.default)(_Login2.default, {
                  sessionid: sessionbody
                }));
  
              case 8:
  
                email = query.email;
                id = query.bookingid;
                provider = query.provider;
                console.log("Provider - Manageing Booking: " + provider);
  
                console.log("Email: " + email);
  
                _context.t0 = JSON;
                _context.next = 16;
                return getBookingRecord();
  
              case 16:
                _context.t1 = _context.sent;
                bookingrec = _context.t0.parse.call(_context.t0, _context.t1);
  
                if (!(query.manage == 'changedate')) {
                  _context.next = 22;
                  break;
                }
  
                console.log("Inside the changedate");
                eventdate = bookingrec[0].functiondate;
                return _context.abrupt('return', (0, _jsx3.default)(_Managebooking2.default, {
                  sessionid: sessionid,
                  bookingid: id,
                  eventdate: eventdate
                }));
  
              case 22:
  
                if (query.manage == 'close') bookingstatus = "closed";else bookingstatus = "canceled";
  
                //var bookingrec = JSON.parse(await getBookingRecord());
                console.log("booking Record: " + bookingrec);
                providermobile = bookingrec[0].providerphone;
                phone = bookingrec[0].mobile;
                console.log("Customer Mobile: " + phone);
                providermail = bookingrec[0].provideremail;
  
                console.log("Provider Phone: " + providermobile);
                console.log("Provider Email: " + providermail);
  
                _context.next = 32;
                return updatebookingstatus();
  
              case 32:
                body = _context.sent;
  
                console.log("Calling SendEmail");
                _context.next = 36;
                return sendEmail();
  
              case 36:
                mail = _context.sent;
  
                // console.log("Calling sendSMS");
                //var sms = await sendSMS();
                console.log("Body: " + body);
                if (!status) {
  
                  if (bookingstatus == "canceled") message = 'Unable to cancelling  the Event';else message = 'Unable to close  the Event';
                  href = 'http://' + _config.host + '/';
                  message1 = 'Click here to Register.';
                } else {
                  if (bookingstatus == "canceled") message = 'Sucessfully canceled  the booking';else message = 'Sucessfully closed the booking';
                  if (provider != undefined) href = href = 'http://' + _config.host + '/providerhome?sessionid=' + sessionid + '&email=' + email;else href = href = 'http://' + _config.host + '/home?sessionid=' + sessionid + '&email=' + email;
                  message1 = 'Click here to Home Page.';
                }
                return _context.abrupt('return', (0, _jsx3.default)(_Cancelbooking2.default, {
                  message: message,
                  redirectlink: href,
                  message1: message1,
                  sessionid: sessionid
                }));
  
              case 40:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
  
  
  function updatebookingstatus() {
  
    console.log('calling API - updatebookingstatus method');
    var url = 'http://' + _config.apihost + '/updatebookinstatus?id=' + id + '&status=' + bookingstatus;
    console.log("URL - updatebookingstatus: " + url);
  
    return new _promise2.default(function (resolve, reject) {
      request.put(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Inside updatebookingstatus Response from API (body)' + body);
  
          if (body == 'true') status = true;else status = false;
          resolve(body);
          //sendSMS();
          //var result = await sendEmail();
        }
        if (error) {
          console.log("Error in  update event status");
          status = false;
          return reject(error);
        }
      });
  
      console.log('returning');
    });
  }
  
  function sendEmail() {
    console.log('calling API - sendEmail');
    var url = 'http://' + _config.apihost + '/sendmail';
    console.log("URL: " + url);
  
    var subject = "Your booking for the event with id: " + id + " has been cancelled";
    var message = "<b>Your booking for the event Cancelled as per your requst. Thank you for the booking and We continue to provide our best service. ";
    var formdata = {
      tomail: email + ' ,' + providermail,
      subject: subject,
      message: message
    };
  
    //data = JSON.stringify('{\"tomail\": \"'+email+'\", \"subject\": '+subject+'\", \"message\": \" '+message+'\"}');
    console.log("Data: " + formdata);
    return new _promise2.default(function (resolve, reject) {
      request.post(url, { form: formdata }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Inside sendEmail - Response from API (body)' + body);
  
          if (body == 'true') resolve(body);
          status = true;
        }
        if (error) {
          console.log("Error in Sending Mail");
          status = false;
          return reject(error);
        }
      });
    });
  }
  
  /*function getSessionid() {
    var request = require('request');
    console.log('genSessionid - calling API');
    var url = `http://${apihost}/genSessionid`;
    console.log("getSeesionid - URL: " + url);
    
    return new Promise(function(resolve, reject) {
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log('genSessionid - Response from API' + body);
        //sessionid = body;
        resolve(body);
      }
      else {
        
        console.log("genSessionid -API Server not running: "+error);
        return reject(error);
      }
      console.log("getSessionid - Returning from API call")
    });
  
   });
   
  }*/
  
  function getBookingRecord() {
    var request = __webpack_require__(94);
    console.log('getBookingRecord - linkbooking - calling API');
    var url = 'http://' + _config.apihost + '/getbookingrec?bookingid=' + id;
    console.log("getSeesionid - URL: " + url);
  
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('getBookingRecord - linkbooking - Response from API' + body);
          //sessionid = body;
          resolve(body);
        } else {
  
          console.log("getBookingRecord - linkbooking -API Server not running: " + error);
          return reject(error);
        }
        console.log("getBookingRecord - Returning from API call");
      });
    });
  }

/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(59);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Managebooking = __webpack_require__(204);
  
  var _Managebooking2 = _interopRequireDefault(_Managebooking);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Manage Booking';
  
  var _ref2 = (0, _jsx3.default)('h1', {}, void 0, title);
  
  function Managebooking(_ref, context) {
    var sessionid = _ref.sessionid,
        bookingid = _ref.bookingid,
        eventdate = _ref.eventdate;
  
    context.setTitle(title);
    return (0, _jsx3.default)('div', {
      className: _Managebooking2.default.root
    }, void 0, (0, _jsx3.default)('div', {
      className: _Managebooking2.default.container
    }, void 0, _ref2, (0, _jsx3.default)('form', {
      name: 'form1',
      method: 'put',
      action: 'changebookingdate'
    }, void 0, (0, _jsx3.default)('div', {
      className: _Managebooking2.default.formGroup
    }, void 0, (0, _jsx3.default)('label', {
      className: _Managebooking2.default.label,
      htmlFor: 'currentdate'
    }, void 0, 'Current Event Date:'), (0, _jsx3.default)('input', {
      className: _Managebooking2.default.input,
      id: 'currentdate',
      type: 'text',
      name: 'currentdate',
      value: eventdate,
      readOnly: true
    }), (0, _jsx3.default)('label', {
      className: _Managebooking2.default.label,
      htmlFor: 'newdate'
    }, void 0, 'Select New Date:'), (0, _jsx3.default)('input', {
      className: _Managebooking2.default.input,
      id: 'newdate',
      type: 'date',
      name: 'newdate'
    })), (0, _jsx3.default)('div', {
      className: _Managebooking2.default.formGroup
    }, void 0, (0, _jsx3.default)('button', {
      className: _Managebooking2.default.button,
      value: 'Change Date',
      type: 'submit'
    }, void 0, 'Change Event Date')), (0, _jsx3.default)('input', {
      id: 'sessionid',
      type: 'hidden',
      name: 'sessionid',
      value: sessionid
    }), (0, _jsx3.default)('input', {
      id: 'bookingid',
      type: 'hidden',
      name: 'bookingid',
      value: bookingid
    }))));
  }
  
  Managebooking.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Managebooking2.default)(Managebooking);

/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(205);
      var insertCss = __webpack_require__(55);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 205 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(54)();
  // imports
  
  
  // module
  exports.push([module.id, "._27MY{padding-left:20px;padding-right:20px}._3Uwa{margin:0 auto;padding:0 0 40px;max-width:380px}._30el{font-size:1.25em}.kwfS{margin-bottom:20px}.r7Ce{margin-bottom:5px;max-width:100%;font-weight:700;float:left}._3a8i{display:block;box-sizing:border-box;padding:10px 16px;width:100%;height:46px;outline:0;border:1px solid #ccc;border-radius:10;background:#fff;box-shadow:inset 0 1px 1px rgba(0,0,0,.075);color:#616161;font-size:18px;line-height:1.3333333;-webkit-transition:border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out}._3a8i:focus{border-color:#0074c2;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(0,116,194,.6)}._1aKg{display:block;box-sizing:border-box;margin:0;padding:10px 16px;width:100%;outline:0;border:1px solid #373277;border-radius:0;background:#373277;color:#fff;text-align:center;text-decoration:none;font-size:18px;line-height:1.3333333;cursor:pointer}._1aKg:hover{background:rgba(54,50,119,.8)}._1aKg:focus{border-color:#0074c2;box-shadow:0 0 8px rgba(0,116,194,.6)}._295u{display:inline-block;margin:-2px 12px -2px 0;width:20px;height:20px;vertical-align:middle;fill:currentColor}.AkfN{position:relative;z-index:1;display:block;margin-bottom:15px;width:100%;color:#757575;text-align:center;font-size:80%}.AkfN:before{top:50%;left:50%;z-index:-1;margin-top:-5px;margin-left:-20px;width:40px;height:10px;background-color:#fff}.AkfN:after,.AkfN:before{position:absolute;content:''}.AkfN:after{top:49%;z-index:-2;display:block;width:100%;border-bottom:1px solid #ddd}#_1GH2{max-width:100px;float:left}._2m2v{float:right}#_2zl1{float:left}#CfRa{float:right}", ""]);
  
  // exports
  exports.locals = {
  	"root": "_27MY",
  	"container": "_3Uwa",
  	"lead": "_30el",
  	"formGroup": "kwfS",
  	"label": "r7Ce",
  	"input": "_3a8i",
  	"button": "_1aKg",
  	"icon": "_295u",
  	"lineThrough": "AkfN",
  	"lastname": "_1GH2",
  	"div": "_2m2v",
  	"leftContainer": "_2zl1",
  	"rightContainer": "CfRa"
  };

/***/ },
/* 206 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _promise = __webpack_require__(84);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Providerhome = __webpack_require__(181);
  
  var _Providerhome2 = _interopRequireDefault(_Providerhome);
  
  var _Providerlogin = __webpack_require__(167);
  
  var _Providerlogin2 = _interopRequireDefault(_Providerlogin);
  
  var _config = __webpack_require__(20);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var sessionid;
  var email;
  var provider = "provider";
  
  exports.default = {
  
    path: '/providerhome',
  
    action: function action(_ref, _ref2) {
      var _this = this;
  
      var query = _ref.query;
      var path = _ref2.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var body, bookinglist;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                sessionid = query.sessionid;
                email = query.email;
  
                console.log("Sessionid - index.js - Providerhome " + sessionid);
  
                if (!(sessionid === undefined || sessionid == '')) {
                  _context.next = 10;
                  break;
                }
  
                _context.next = 6;
                return getSessionid();
  
              case 6:
                body = _context.sent;
                return _context.abrupt('return', (0, _jsx3.default)(_Providerlogin2.default, {
                  sessionid: body
                }));
  
              case 10:
                _context.next = 12;
                return getBookingData();
  
              case 12:
                bookinglist = _context.sent;
                return _context.abrupt('return', (0, _jsx3.default)(_Providerhome2.default, {
                  sessionid: sessionid,
                  bookinglist: bookinglist,
                  email: email,
                  provider: provider
                }));
  
              case 14:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
  
  
  function getSessionid() {
    var request = __webpack_require__(94);
    console.log('Home - genSessionid - calling API');
    var url = 'http://' + _config.apihost + '/genSessionid';
    console.log("getSeesionid - URL: " + url);
  
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('genSessionid - Response from API' + body);
          //sessionid = body;
          resolve(body);
        } else {
  
          console.log("genSessionid -API Server not running: " + error);
          return reject(error);
        }
        console.log("getSessionid - Returning from API call");
      });
    });
  }
  
  function getBookingData() {
    var request = __webpack_require__(94);
  
    console.log('calling API');
    var url = 'http://' + _config.apihost + '/getbookingrecbyprovider?email=' + email;
    console.log("URL: " + url);
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Inside getBookingData Response from API (body)' + body);
          resolve(body);
        } else {
          console.log("Error Object: " + error);
          return reject(error);
        }
      });
    });
  }

/***/ },
/* 207 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _promise = __webpack_require__(84);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Providerlogout = __webpack_require__(208);
  
  var _Providerlogout2 = _interopRequireDefault(_Providerlogout);
  
  var _Providerlogin = __webpack_require__(167);
  
  var _Providerlogin2 = _interopRequireDefault(_Providerlogin);
  
  var _config = __webpack_require__(20);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var message = 'Thanks for visiting our website. You have Sucessfully Logged out ';
  var message1 = 'Click here to login';
  var href = 'http://' + _config.host + '/providerlogin';
  var status;
  var sessionid;
  
  var _ref3 = (0, _jsx3.default)(_Providerlogout2.default, {
    message: message,
    redirectlink: href,
    message1: message1
  });
  
  exports.default = {
  
    path: '/providerlogout',
  
    action: function action(_ref, _ref2) {
      var _this = this;
  
      var query = _ref.query;
      var path = _ref2.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var body;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                sessionid = query.sessionid;
                console.log("Logout - index.js - Sessionid: " + sessionid);
                _context.next = 4;
                return deleteSession();
  
              case 4:
                body = _context.sent;
  
                console.log("Session deleted");
                return _context.abrupt('return', _ref3);
  
              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
  
  
  function deleteSession() {
    var request = __webpack_require__(94);
    console.log('calling API - DeleteSession method');
    var url = 'http://' + _config.apihost + '/deleteSession?sessionid=' + sessionid;
    console.log("URL: " + url);
  
    return new _promise2.default(function (resolve, reject) {
      request.put(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Inside Logout - index.js - deleteSession Response from API (body)' + body);
  
          if (body == 'true') status = true;
          resolve(body);
        }
        if (error) {
          console.log("Error in deleting session data");
          status = false;
          return reject(error);
        }
        console.log('returning from deleteSession API call');
      });
    });
  }

/***/ },
/* 208 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(59);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Providerlogout = __webpack_require__(209);
  
  var _Providerlogout2 = _interopRequireDefault(_Providerlogout);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Provider Logout';
  
  var _ref2 = (0, _jsx3.default)('h1', {}, void 0, title);
  
  function Logout(_ref, context) {
    var message = _ref.message,
        redirectlink = _ref.redirectlink,
        message1 = _ref.message1;
  
    context.setTitle(title);
    return (0, _jsx3.default)('div', {
      className: _Providerlogout2.default.root
    }, void 0, (0, _jsx3.default)('div', {
      className: _Providerlogout2.default.container
    }, void 0, _ref2, (0, _jsx3.default)('p', {}, void 0, message), (0, _jsx3.default)('a', {
      href: redirectlink
    }, void 0, message1)));
  }
  
  Logout.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Providerlogout2.default)(Logout);

/***/ },
/* 209 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(210);
      var insertCss = __webpack_require__(55);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 210 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(54)();
  // imports
  
  
  // module
  exports.push([module.id, "._2RHc{padding-left:20px;padding-right:20px}._3StN{margin:0 auto;padding:0 0 40px;max-width:380px;max-height:800px}._2MxM{font-size:1.25em}._324j{margin-bottom:20px}._2d_X{margin-bottom:5px;max-width:100%;font-weight:700;float:left}", ""]);
  
  // exports
  exports.locals = {
  	"root": "_2RHc",
  	"container": "_3StN",
  	"lead": "_2MxM",
  	"formGroup": "_324j",
  	"label": "_2d_X"
  };

/***/ },
/* 211 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Changeprovideremail = __webpack_require__(212);
  
  var _Changeprovideremail2 = _interopRequireDefault(_Changeprovideremail);
  
  var _Login = __webpack_require__(88);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  var _config = __webpack_require__(20);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var status = false;
  var code;
  
  exports.default = {
  
    path: '/changeprovideremail',
  
    action: function action(_ref, _ref2) {
      var _this = this;
  
      var query = _ref.query;
      var path = _ref2.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var email, sessionid;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                email = query.email;
                sessionid = query.sessionid;
  
                console.log("Email ID:" + email);
                //var body = await checkCode(code, email);
  
                code = "verify";
                return _context.abrupt('return', (0, _jsx3.default)(_Changeprovideremail2.default, {
                  email: email,
                  passCode: code,
                  sessionid: sessionid
                }));
  
              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };

/***/ },
/* 212 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(59);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Changeprovideremail = __webpack_require__(213);
  
  var _Changeprovideremail2 = _interopRequireDefault(_Changeprovideremail);
  
  var _Link = __webpack_require__(62);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Change Email';
  
  var _ref2 = (0, _jsx3.default)('h1', {}, void 0, title);
  
  var _ref3 = (0, _jsx3.default)('script', {}, void 0);
  
  function Changeprovideremail(_ref, context) {
    var email = _ref.email,
        passCode = _ref.passCode,
        sessionid = _ref.sessionid;
  
    console.log("Changeprovideremail: " + email);
    context.setTitle(title);
    return (0, _jsx3.default)('div', {
      className: _Changeprovideremail2.default.root
    }, void 0, (0, _jsx3.default)('div', {
      className: _Changeprovideremail2.default.container
    }, void 0, _ref2, (0, _jsx3.default)('form', {
      name: 'form1',
      method: 'put',
      action: 'updateprovideremail'
    }, void 0, (0, _jsx3.default)('div', {
      className: _Changeprovideremail2.default.formGroup
    }, void 0, (0, _jsx3.default)('label', {
      className: _Changeprovideremail2.default.label,
      htmlFor: 'oldemail'
    }, void 0, 'Current E-mail:'), (0, _jsx3.default)('input', {
      className: _Changeprovideremail2.default.input,
      id: 'oldemail',
      type: 'text',
      name: 'oldemail',
      value: email,
      readOnly: true
    })), (0, _jsx3.default)('div', {
      className: _Changeprovideremail2.default.formGroup
    }, void 0, (0, _jsx3.default)('label', {
      className: _Changeprovideremail2.default.label,
      htmlFor: 'newemail'
    }, void 0, 'New E-mail:'), (0, _jsx3.default)('input', {
      className: _Changeprovideremail2.default.input,
      id: 'newemail',
      type: 'email',
      name: 'newemail'
    })), (0, _jsx3.default)('div', {
      className: _Changeprovideremail2.default.formGroup
    }, void 0, (0, _jsx3.default)('button', {
      className: _Changeprovideremail2.default.button,
      value: 'Change Email',
      type: 'submit'
    }, void 0, 'Change Password'), (0, _jsx3.default)('input', {
      id: 'email',
      type: 'hidden',
      name: 'email',
      value: email
    })), _ref3)));
  }
  
  Changeprovideremail.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Changeprovideremail2.default)(Changeprovideremail);

/***/ },
/* 213 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(214);
      var insertCss = __webpack_require__(55);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 214 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(54)();
  // imports
  
  
  // module
  exports.push([module.id, "._3wA7{padding-left:20px;padding-right:20px}._2KFC{margin:0 auto;padding:0 0 40px;max-width:380px}._321c{font-size:1.25em}.MrAi{margin-bottom:20px}._2fZf{font-weight:700}._2BGh,._2fZf{display:inline-block;margin-bottom:5px;max-width:100%}._2BGh{font-weight:300;color:red}._1l3a{display:block;box-sizing:border-box;padding:10px 16px;width:100%;height:46px;outline:0;border:1px solid #ccc;border-radius:10;background:#fff;box-shadow:inset 0 1px 1px rgba(0,0,0,.075);color:#616161;font-size:18px;line-height:1.3333333;-webkit-transition:border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out}._1l3a:focus{border-color:#0074c2;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(0,116,194,.6)}.xvet{display:block;box-sizing:border-box;margin:0;padding:10px 16px;width:100%;outline:0;border:1px solid #373277;border-radius:0;background:#373277;color:#fff;text-align:center;text-decoration:none;font-size:18px;line-height:1.3333333;cursor:pointer}.xvet:hover{background:rgba(54,50,119,.8)}.xvet:focus{border-color:#0074c2;box-shadow:0 0 8px rgba(0,116,194,.6)}", ""]);
  
  // exports
  exports.locals = {
  	"root": "_3wA7",
  	"container": "_2KFC",
  	"lead": "_321c",
  	"formGroup": "MrAi",
  	"label": "_2fZf",
  	"label1": "_2BGh",
  	"input": "_1l3a",
  	"button": "xvet"
  };

/***/ },
/* 215 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _promise = __webpack_require__(84);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _stringify = __webpack_require__(56);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Changeproviderphone = __webpack_require__(216);
  
  var _Changeproviderphone2 = _interopRequireDefault(_Changeproviderphone);
  
  var _Login = __webpack_require__(88);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  var _config = __webpack_require__(20);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var status = false;
  
  var email;
  
  exports.default = {
  
    path: '/changeproviderphone',
  
    action: function action(_ref, _ref2) {
      var _this = this;
  
      var query = _ref.query;
      var path = _ref2.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var providerRecord, phone;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
  
                console.log("Query - Changeproviderphone: " + (0, _stringify2.default)(query));
                email = query.email;
                _context.t0 = JSON;
                _context.next = 5;
                return getProvider();
  
              case 5:
                _context.t1 = _context.sent;
                providerRecord = _context.t0.parse.call(_context.t0, _context.t1);
  
                console.log("Provider Record: " + providerRecord);
                phone = providerRecord[0].phone;
  
  
                console.log("Provider Email: " + email);
                console.log("Provider Old Phone:" + phone);
  
                return _context.abrupt('return', (0, _jsx3.default)(_Changeproviderphone2.default, {
                  email: email,
                  phone: phone
                }));
  
              case 12:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
  
  
  function getProvider() {
    var request = __webpack_require__(94);
    console.log('genSessionid - calling API');
    var url = 'http://' + _config.apihost + '/getProvider?email=' + email;
    console.log("getProvider - URL: " + url);
  
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('getProvider - Response from API' + body);
          //sessionid = body;
          resolve(body);
        } else {
  
          console.log("getProvider -API Server not running: " + error);
          return reject(error);
        }
        console.log("getProvider - Returning from API call");
      });
    });
  }

/***/ },
/* 216 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(59);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _changeproviderphone = __webpack_require__(217);
  
  var _changeproviderphone2 = _interopRequireDefault(_changeproviderphone);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Changing Provider Phone';
  
  var _ref2 = (0, _jsx3.default)('h1', {}, void 0, title);
  
  var _ref3 = (0, _jsx3.default)('script', {}, void 0);
  
  function Changeproviderphone(_ref, context) {
    var email = _ref.email,
        phone = _ref.phone;
  
    console.log("Changeproviderphone: " + email);
    context.setTitle(title);
    return (0, _jsx3.default)('div', {
      className: _changeproviderphone2.default.root
    }, void 0, (0, _jsx3.default)('div', {
      className: _changeproviderphone2.default.container
    }, void 0, _ref2, (0, _jsx3.default)('form', {
      name: 'form1',
      method: 'put',
      action: 'confirmOTP'
    }, void 0, (0, _jsx3.default)('div', {
      className: _changeproviderphone2.default.formGroup
    }, void 0, (0, _jsx3.default)('label', {
      className: _changeproviderphone2.default.label,
      htmlFor: 'phone'
    }, void 0, 'Current phone:'), (0, _jsx3.default)('input', {
      className: _changeproviderphone2.default.input,
      id: 'oldphone',
      type: 'text',
      name: 'oldphone',
      value: phone,
      readOnly: true
    }), (0, _jsx3.default)('label', {
      className: _changeproviderphone2.default.label,
      htmlFor: 'newphone'
    }, void 0, 'New phone:'), (0, _jsx3.default)('input', {
      className: _changeproviderphone2.default.input,
      id: 'newphone',
      type: 'text',
      name: 'newphone'
    }), (0, _jsx3.default)('input', {
      id: 'email',
      type: 'hidden',
      name: 'email',
      value: email
    })), (0, _jsx3.default)('div', {
      className: _changeproviderphone2.default.formGroup
    }, void 0, (0, _jsx3.default)('button', {
      className: _changeproviderphone2.default.button,
      value: 'Change phone',
      type: 'submit'
    }, void 0, 'Change phone')), _ref3)));
  }
  
  Changeproviderphone.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_changeproviderphone2.default)(Changeproviderphone);

/***/ },
/* 217 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(218);
      var insertCss = __webpack_require__(55);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 218 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(54)();
  // imports
  
  
  // module
  exports.push([module.id, "._1jO3{padding-left:20px;padding-right:20px}.jN2F{margin:0 auto;padding:0 0 40px;max-width:380px}._3O1j{font-size:1.25em}._2U1Q{margin-bottom:20px}._3Iaq{font-weight:700}._2pdE,._3Iaq{display:inline-block;margin-bottom:5px;max-width:100%}._2pdE{font-weight:300;color:red}.IjBG{display:block;box-sizing:border-box;padding:10px 16px;width:100%;height:46px;outline:0;border:1px solid #ccc;border-radius:10;background:#fff;box-shadow:inset 0 1px 1px rgba(0,0,0,.075);color:#616161;font-size:18px;line-height:1.3333333;-webkit-transition:border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out}.IjBG:focus{border-color:#0074c2;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(0,116,194,.6)}._1PGE{display:block;box-sizing:border-box;margin:0;padding:10px 16px;width:100%;outline:0;border:1px solid #373277;border-radius:0;background:#373277;color:#fff;text-align:center;text-decoration:none;font-size:18px;line-height:1.3333333;cursor:pointer}._1PGE:hover{background:rgba(54,50,119,.8)}._1PGE:focus{border-color:#0074c2;box-shadow:0 0 8px rgba(0,116,194,.6)}", ""]);
  
  // exports
  exports.locals = {
  	"root": "_1jO3",
  	"container": "jN2F",
  	"lead": "_3O1j",
  	"formGroup": "_2U1Q",
  	"label": "_3Iaq",
  	"label1": "_2pdE",
  	"input": "IjBG",
  	"button": "_1PGE"
  };

/***/ },
/* 219 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _promise = __webpack_require__(84);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Updateprovideremail = __webpack_require__(220);
  
  var _Updateprovideremail2 = _interopRequireDefault(_Updateprovideremail);
  
  var _config = __webpack_require__(20);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var status = true;
  var message = 'Email Sucessfully Updated';
  var href;
  var message1 = 'Click here to login';
  var passcode;
  var request = __webpack_require__(94);
  
  exports.default = {
  
    path: '/updateprovideremail',
  
    action: function action(_ref, _ref2) {
      var _this = this;
  
      var query = _ref.query;
      var path = _ref2.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var email, newemail, body, login, mail;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log("Query: " + query);
                email = query.oldemail;
                newemail = query.newemail;
  
                passcode = query.code;
  
                console.log("Current Email: " + email);
                console.log("New Email: " + newemail);
                console.log("Passcode - Update Email module:" + passcode);
  
                if (!(passcode == "activate")) {
                  _context.next = 19;
                  break;
                }
  
                _context.next = 10;
                return updateEmail(email, newemail);
  
              case 10:
                body = _context.sent;
                _context.next = 13;
                return updatelogin(email, newemail);
  
              case 13:
                login = _context.sent;
  
                if (status == false) message = ' Error in updating email';else {
                  message = 'Email  Sucessfully Updated';
                }
                message1 = 'click here to login with new email';
                href = 'http://' + _config.host + '/providerlogin';
                _context.next = 27;
                break;
  
              case 19:
                href = 'http://' + _config.host + '/updateprovideremail?code=activate&newemail=' + newemail + '&oldemail=' + email;
                console.log("Verify: href:" + href);
                _context.next = 23;
                return sendEmail(newemail);
  
              case 23:
                mail = _context.sent;
  
                message = "Confirmation mail sent to your new email. ";
                message1 = "Click here to relogin";
                href = 'http://' + _config.host + '/providerlogin';
  
              case 27:
                return _context.abrupt('return', (0, _jsx3.default)(_Updateprovideremail2.default, {
                  message: message,
                  message1: message1,
                  redirectlink: href
                }));
  
              case 28:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
  
  
  function updateEmail(email, newemail) {
  
    console.log("Inside Updateprovideremailword method email: " + email);
    console.log("Inside Updateprovideremailword method New Email: " + newemail);
    console.log('calling API');
    var url = 'http://' + _config.apihost + '/updateEmail?email=' + email + '&newemail=' + newemail;
    console.log("Update Updateprovideremail updateEmail - URL: " + url);
  
    return new _promise2.default(function (resolve, reject) {
  
      request.put(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Update Email - Updateprovideremail - Response from API' + body);
          if (body == 'true') {
            status = true;
          } else {
            status = false;
            message = 'Error in updating email';
          }
          resolve(body);
        } else {
          status = false;
          console.log("Updateprovideremail - API Server not running: ") + error;
          return reject(error);
        }
      });
    });
  }
  
  function sendEmail(email) {
    console.log('calling API - sendEmail');
    var url = 'http://' + _config.apihost + '/sendmail';
    console.log("URL: " + url);
  
    var subject = "Your request for change Email";
    var message = "<b>You have requested for email change . Click below link to verify to activate email </b> <br> <b> <a href='" + href + "' >Please click the link to activate email</a>  <b> ";
    var formdata = {
      tomail: email,
      subject: subject,
      message: message
    };
  
    //data = JSON.stringify('{\"tomail\": \"'+email+'\", \"subject\": '+subject+'\", \"message\": \" '+message+'\"}');
    console.log("Data: " + formdata);
    return new _promise2.default(function (resolve, reject) {
      request.post(url, { form: formdata }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Inside sendEmail - Response from API (body)' + body);
  
          if (body == 'true') resolve(body);
          status = true;
        }
        if (error) {
          console.log("Error in Sending Mail");
          status = false;
          return reject(error);
        }
      });
    });
  }
  
  function updatelogin(email, newemail) {
  
    console.log("Inside updatelogin method email: " + email);
    console.log("Inside updatelogin method New Email: " + newemail);
    console.log('calling API');
    var url = 'http://' + _config.apihost + '/updatelogin?email=' + email + '&newemail=' + newemail;
    console.log("Update Updateprovideremail updatelogin - URL: " + url);
  
    return new _promise2.default(function (resolve, reject) {
  
      request.put(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Update Login - Updateprovideremail - Response from API' + body);
          if (body == 'true') {
            status = true;
          } else {
            status = false;
            message = 'Error in updating password';
          }
          resolve(body);
        } else {
          status = false;
          console.log("Updateprovideremail - updatelogin - API Server not running: ") + error;
          return reject(error);
        }
      });
    });
  }

/***/ },
/* 220 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(59);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Updateprovideremail = __webpack_require__(221);
  
  var _Updateprovideremail2 = _interopRequireDefault(_Updateprovideremail);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  //import Link from '../../components/Link'
  
  var title = 'Update Provider Password';
  
  var _ref2 = (0, _jsx3.default)('h1', {}, void 0, title);
  
  function Updateprovideremail(_ref, context) {
    var message = _ref.message,
        message1 = _ref.message1,
        redirectlink = _ref.redirectlink;
  
    context.setTitle(title);
    return (0, _jsx3.default)('div', {
      className: _Updateprovideremail2.default.root
    }, void 0, (0, _jsx3.default)('div', {
      className: _Updateprovideremail2.default.container
    }, void 0, _ref2, (0, _jsx3.default)('p', {}, void 0, message), (0, _jsx3.default)('a', {
      href: redirectlink
    }, void 0, message1, ' ')));
  }
  
  Updateprovideremail.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Updateprovideremail2.default)(Updateprovideremail);

/***/ },
/* 221 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(222);
      var insertCss = __webpack_require__(55);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 222 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(54)();
  // imports
  
  
  // module
  exports.push([module.id, ".zUx3{padding-left:20px;padding-right:20px}._1yUe{margin:0 auto;padding:0 0 40px;max-width:380px}.ddnX{font-size:1.25em}._3prO{margin-bottom:20px}._2xq_{display:inline-block;margin-bottom:5px;max-width:100%;font-weight:700}._1Hgo{display:block;box-sizing:border-box;padding:10px 16px;width:100%;height:46px;outline:0;border:1px solid #ccc;border-radius:10;background:#fff;box-shadow:inset 0 1px 1px rgba(0,0,0,.075);color:#616161;font-size:18px;line-height:1.3333333;-webkit-transition:border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out}._1Hgo:focus{border-color:#0074c2;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(0,116,194,.6)}._1byh{display:block;box-sizing:border-box;margin:0;padding:10px 16px;width:100%;outline:0;border:1px solid #373277;border-radius:0;background:#373277;color:#fff;text-align:center;text-decoration:none;font-size:18px;line-height:1.3333333;cursor:pointer}._1byh:hover{background:rgba(54,50,119,.8)}._1byh:focus{border-color:#0074c2;box-shadow:0 0 8px rgba(0,116,194,.6)}._1fZ7{border-color:#3b5998;background:#3b5998}._1fZ7:hover{background:#2d4373}._1ls0{border-color:#dd4b39;background:#dd4b39}._1ls0:hover{background:#c23321}._1Ehy{border-color:#55acee;background:#55acee}._1Ehy:hover{background:#2795e9}._3Kd9{display:inline-block;margin:-2px 12px -2px 0;width:20px;height:20px;vertical-align:middle;fill:currentColor}._3Tbb{position:relative;z-index:1;display:block;margin-bottom:15px;width:100%;color:#757575;text-align:center;font-size:80%}._3Tbb:before{top:50%;left:50%;z-index:-1;margin-top:-5px;margin-left:-20px;width:40px;height:10px;background-color:#fff}._3Tbb:after,._3Tbb:before{position:absolute;content:''}._3Tbb:after{top:49%;z-index:-2;display:block;width:100%;border-bottom:1px solid #ddd}", ""]);
  
  // exports
  exports.locals = {
  	"root": "zUx3",
  	"container": "_1yUe",
  	"lead": "ddnX",
  	"formGroup": "_3prO",
  	"label": "_2xq_",
  	"input": "_1Hgo",
  	"button": "_1byh",
  	"facebook": "_1fZ7 _1byh",
  	"google": "_1ls0 _1byh",
  	"twitter": "_1Ehy _1byh",
  	"icon": "_3Kd9",
  	"lineThrough": "_3Tbb"
  };

/***/ },
/* 223 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _promise = __webpack_require__(84);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _stringify = __webpack_require__(56);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Updateproviderphone = __webpack_require__(224);
  
  var _Updateproviderphone2 = _interopRequireDefault(_Updateproviderphone);
  
  var _config = __webpack_require__(20);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var status = true;
  var message = '';
  var href = 'http://' + _config.host + '/providerlogin';
  var message1 = '';
  var code;
  var request = __webpack_require__(94);
  var phone;
  var newphone;
  var email;
  var otp;
  
  exports.default = {
  
    path: '/updateproviderphone',
  
    action: function action(_ref, _ref2) {
      var _this = this;
  
      var query = _ref.query;
      var path = _ref2.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var otpres, deleteres, updatestatus;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log("Query: " + (0, _stringify2.default)(query));
  
                newphone = query.newphone;
                email = query.email;
                otp = query.otp;
                console.log("OTP: " + otp);
                console.log("New phone: " + newphone);
                console.log("Email: " + email);
  
                _context.next = 9;
                return searchOTP();
  
              case 9:
                otpres = _context.sent;
  
                if (!(otpres == 'true')) {
                  _context.next = 17;
                  break;
                }
  
                _context.next = 13;
                return updatephone();
  
              case 13:
                updatestatus = _context.sent;
                _context.next = 16;
                return deleteOTP();
  
              case 16:
                deleteres = _context.sent;
  
              case 17:
                console.log("Status: " + status);
                if (status) {
                  console.log("Inside the true");
                  message = " Phone sucessfully updated";
                  message1 = "Click here to home page";
                } else {
                  message = " Phone details not updated. An error occured";
                  message1 = "Click here to relogin";
                }
  
                return _context.abrupt('return', (0, _jsx3.default)(_Updateproviderphone2.default, {
                  message: message,
                  message1: message1,
                  redirectlink: href
                }));
  
              case 20:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
  
  
  function updatephone() {
  
    console.log("Inside Updateproviderphone - updatephone method email: " + email);
    console.log("Inside Updateprovider- updatephone method New phone: " + newphone);
    console.log('calling API');
    var url = 'http://' + _config.apihost + '/updatephone?email=' + email + '&newphone=' + newphone;
    console.log("Update Updateproviderphone updatephone - URL: " + url);
  
    return new _promise2.default(function (resolve, reject) {
  
      request.put(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Update phone - Updateproviderphone - Response from API' + body);
          if (body == 'true') {
            status = true;
          } else {
            status = false;
            message = 'Error in updating phone';
          }
          resolve(body);
        } else {
          status = false;
          console.log("Updateproviderphone - API Server not running: ") + error;
          return reject(error);
        }
      });
    });
  }
  
  function searchOTP() {
  
    console.log("Inside searchOTP method email: " + email);
    console.log("Inside searchOTP method Code: " + otp);
    console.log('calling API');
    var url = 'http://' + _config.apihost + '/findOTP?email=' + email + '&otp=' + otp;
    console.log("URL - searchOTP: " + url);
  
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
  
        if (error) return reject(error);
        if (!error && response.statusCode == 200) {
          console.log('Inside searchOTP Response from API (body)' + body);
          if (body == 'true') {
            status = true;
          } else {
            console.log("Error in searching OTP data");
            status = false;
          }
          resolve(body);
        }
        console.log('returning');
      });
    });
  }
  
  function deleteOTP() {
  
    console.log("Inside deleteOTP method email: " + email);
    console.log("Inside deleteOTP method Code: " + otp);
    console.log('calling API');
    var url = 'http://' + _config.apihost + '/deleteOTP?otp=' + otp;
    console.log("URL - deleteOTP: " + url);
  
    return new _promise2.default(function (resolve, reject) {
      request.delete(url, function (error, response, body) {
  
        if (error) return reject(error);
        if (!error && response.statusCode == 200) {
          console.log('Inside deleteOTP Response from API (body)' + body);
          if (body == 'true') {
            console.log("Successfully deleted the OTP");
            status = true;
          } else {
            console.log("Error in deleteing  OTP data");
            status = false;
          }
          resolve(body);
        }
        console.log('returning');
      });
    });
  }

/***/ },
/* 224 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(59);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Updateproviderphone = __webpack_require__(225);
  
  var _Updateproviderphone2 = _interopRequireDefault(_Updateproviderphone);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  //import Link from '../../components/Link'
  
  var title = 'Update Provider Moblie';
  
  var _ref2 = (0, _jsx3.default)('h1', {}, void 0, title);
  
  function Updateproviderphone(_ref, context) {
    var message = _ref.message,
        message1 = _ref.message1,
        redirectlink = _ref.redirectlink;
  
    context.setTitle(title);
    return (0, _jsx3.default)('div', {
      className: _Updateproviderphone2.default.root
    }, void 0, (0, _jsx3.default)('div', {
      className: _Updateproviderphone2.default.container
    }, void 0, _ref2, (0, _jsx3.default)('p', {}, void 0, message), (0, _jsx3.default)('a', {
      href: redirectlink
    }, void 0, message1, ' ')));
  }
  
  Updateproviderphone.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Updateproviderphone2.default)(Updateproviderphone);

/***/ },
/* 225 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(226);
      var insertCss = __webpack_require__(55);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 226 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(54)();
  // imports
  
  
  // module
  exports.push([module.id, "._3epD{padding-left:20px;padding-right:20px}._3hP5{margin:0 auto;padding:0 0 40px;max-width:380px}._33Sc{font-size:1.25em}.F0oF{margin-bottom:20px}._3vsc{display:inline-block;margin-bottom:5px;max-width:100%;font-weight:700}._2_M_{display:block;box-sizing:border-box;padding:10px 16px;width:100%;height:46px;outline:0;border:1px solid #ccc;border-radius:10;background:#fff;box-shadow:inset 0 1px 1px rgba(0,0,0,.075);color:#616161;font-size:18px;line-height:1.3333333;-webkit-transition:border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out}._2_M_:focus{border-color:#0074c2;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(0,116,194,.6)}._2b4x{display:block;box-sizing:border-box;margin:0;padding:10px 16px;width:100%;outline:0;border:1px solid #373277;border-radius:0;background:#373277;color:#fff;text-align:center;text-decoration:none;font-size:18px;line-height:1.3333333;cursor:pointer}._2b4x:hover{background:rgba(54,50,119,.8)}._2b4x:focus{border-color:#0074c2;box-shadow:0 0 8px rgba(0,116,194,.6)}._115w{border-color:#3b5998;background:#3b5998}._115w:hover{background:#2d4373}._2GoT{border-color:#dd4b39;background:#dd4b39}._2GoT:hover{background:#c23321}._2CYJ{border-color:#55acee;background:#55acee}._2CYJ:hover{background:#2795e9}._2LvG{display:inline-block;margin:-2px 12px -2px 0;width:20px;height:20px;vertical-align:middle;fill:currentColor}._2DYH{position:relative;z-index:1;display:block;margin-bottom:15px;width:100%;color:#757575;text-align:center;font-size:80%}._2DYH:before{top:50%;left:50%;z-index:-1;margin-top:-5px;margin-left:-20px;width:40px;height:10px;background-color:#fff}._2DYH:after,._2DYH:before{position:absolute;content:''}._2DYH:after{top:49%;z-index:-2;display:block;width:100%;border-bottom:1px solid #ddd}", ""]);
  
  // exports
  exports.locals = {
  	"root": "_3epD",
  	"container": "_3hP5",
  	"lead": "_33Sc",
  	"formGroup": "F0oF",
  	"label": "_3vsc",
  	"input": "_2_M_",
  	"button": "_2b4x",
  	"facebook": "_115w _2b4x",
  	"google": "_2GoT _2b4x",
  	"twitter": "_2CYJ _2b4x",
  	"icon": "_2LvG",
  	"lineThrough": "_2DYH"
  };

/***/ },
/* 227 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _promise = __webpack_require__(84);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _ConfirmOTP = __webpack_require__(228);
  
  var _ConfirmOTP2 = _interopRequireDefault(_ConfirmOTP);
  
  var _config = __webpack_require__(20);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var request = __webpack_require__(94);
  var status = true;
  var message = 'Password Sucessfully Updated';
  var href = 'http://' + _config.host + '/providerlogin';
  var message1 = 'Click here to login';
  var otp;
  var SMSmessage;
  var email;
  
  exports.default = {
  
    path: '/confirmOTP',
  
    action: function action(_ref, _ref2) {
      var _this = this;
  
      var query = _ref.query;
      var path = _ref2.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var oldphone, newphone, OTP;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
  
                email = query.email;
                oldphone = query.oldphone;
                newphone = query.newphone;
  
  
                otp = Math.floor(1000000 + Math.random() * 9000000);
                console.log("OTP - Update phone module:" + otp);
  
                SMSmessage = " You are requested for mobile number change. Use this OTP " + otp;
  
                //var SMS = await sendSMS(newphone);
                _context.next = 8;
                return saveOTP();
  
              case 8:
                OTP = _context.sent;
                return _context.abrupt('return', (0, _jsx3.default)(_ConfirmOTP2.default, {
                  email: email,
                  newphone: newphone
                }));
  
              case 10:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
  
  
  function sendSMS(newphone) {
    console.log('calling API - sendSMS method');
  
    var url = 'http://' + _config.apihost + '/sendSMS?authkey=' + _config.smsAPIKey + '&mobiles=' + newphone + '&message=' + SMSmessage + '&sender=DTSBMF&route=4&country=91';
    console.log("URL: " + url);
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Inside sendSMS - Response from API (body)' + body);
  
          if (error) {
            console.log("Error in Sending SMS");
            status = false;
            return reject(error);
          }
  
          if (body == 'true') status = true;
          resolve(body);
        }
      });
    });
  }
  
  function saveOTP() {
  
    console.log("Inside saveOTP method email: " + email);
    console.log("Inside saveOTP method Code: " + otp);
    console.log('calling API');
    var url = 'http://' + _config.apihost + '/addOTP';
    console.log("URL - saveOTP: " + url);
  
    var formdata = {
      email: email,
      otp: otp
    };
  
    return new _promise2.default(function (resolve, reject) {
      request.post(url, { form: formdata }, function (error, response, body) {
  
        if (error) return reject(error);
        if (!error && response.statusCode == 200) {
          console.log('Inside saveOTP Response from API (body)' + body);
          if (body == 'true') {
            status = true;
          } else {
            console.log("Error in storing OTP data");
            status = false;
          }
          resolve(body);
        }
        console.log('returning');
      });
    });
  }

/***/ },
/* 228 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(59);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _ConfirmOTP = __webpack_require__(229);
  
  var _ConfirmOTP2 = _interopRequireDefault(_ConfirmOTP);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  //import Link from '../../components/Link'
  
  var title = 'Enter the OTP to validate the phone';
  
  var _ref2 = (0, _jsx3.default)('h1', {}, void 0, title);
  
  function ConfirmOTP(_ref, context) {
    var email = _ref.email,
        newphone = _ref.newphone;
  
    context.setTitle(title);
    return (0, _jsx3.default)('div', {
      className: _ConfirmOTP2.default.root
    }, void 0, (0, _jsx3.default)('div', {
      className: _ConfirmOTP2.default.container
    }, void 0, _ref2, (0, _jsx3.default)('form', {
      name: 'form1',
      method: 'put',
      action: 'updateproviderphone'
    }, void 0, (0, _jsx3.default)('div', {
      className: _ConfirmOTP2.default.formGroup
    }, void 0, (0, _jsx3.default)('label', {
      className: _ConfirmOTP2.default.label,
      htmlFor: 'otp'
    }, void 0, 'OTP:'), (0, _jsx3.default)('input', {
      className: _ConfirmOTP2.default.input,
      id: 'otp',
      type: 'text',
      name: 'otp',
      placeholder: 'Enter OTP',
      required: 'required'
    }), (0, _jsx3.default)('input', {
      id: 'email',
      type: 'hidden',
      name: 'email',
      value: email
    }), (0, _jsx3.default)('input', {
      className: _ConfirmOTP2.default.input,
      id: 'newphone',
      type: 'hidden',
      name: 'newphone',
      value: newphone
    })), (0, _jsx3.default)('div', {
      className: _ConfirmOTP2.default.formGroup
    }, void 0, (0, _jsx3.default)('button', {
      className: _ConfirmOTP2.default.button,
      type: 'submit'
    }, void 0, 'Confirm OTP')))));
  }
  
  ConfirmOTP.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_ConfirmOTP2.default)(ConfirmOTP);

/***/ },
/* 229 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(230);
      var insertCss = __webpack_require__(55);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 230 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(54)();
  // imports
  
  
  // module
  exports.push([module.id, ".Rvwm{padding-left:20px;padding-right:20px}.L7dM{margin:0 auto;padding:0 0 40px;max-width:380px}._1miP{margin-bottom:20px}._1fQH{display:inline-block;margin-bottom:5px;max-width:100%;font-weight:700}._7iej{display:block;box-sizing:border-box;padding:10px 16px;width:100%;height:46px;outline:0;border:1px solid #ccc;border-radius:10;background:#fff;box-shadow:inset 0 1px 1px rgba(0,0,0,.075);color:#616161;font-size:18px;line-height:1.3333333;-webkit-transition:border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out}._7iej:focus{border-color:#0074c2;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(0,116,194,.6)}._3SFJ{display:block;box-sizing:border-box;margin:0;padding:10px 16px;width:100%;outline:0;border:1px solid #373277;border-radius:0;background:#373277;color:#fff;text-align:center;text-decoration:none;font-size:18px;line-height:1.3333333;cursor:pointer}._3SFJ:hover{background:rgba(54,50,119,.8)}._3SFJ:focus{border-color:#0074c2;box-shadow:0 0 8px rgba(0,116,194,.6)}._28Br{position:relative;z-index:1;display:block;margin-bottom:15px;width:100%;color:#757575;text-align:center;font-size:80%}._28Br:before{top:50%;left:50%;z-index:-1;margin-top:-5px;margin-left:-20px;width:40px;height:10px;background-color:#fff}._28Br:after,._28Br:before{position:absolute;content:''}._28Br:after{top:49%;z-index:-2;display:block;width:100%;border-bottom:1px solid #ddd}", ""]);
  
  // exports
  exports.locals = {
  	"root": "Rvwm",
  	"container": "L7dM",
  	"formGroup": "_1miP",
  	"label": "_1fQH",
  	"input": "_7iej",
  	"button": "_3SFJ",
  	"lineThrough": "_28Br"
  };

/***/ },
/* 231 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _promise = __webpack_require__(84);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Cateringbooking = __webpack_require__(232);
  
  var _Cateringbooking2 = _interopRequireDefault(_Cateringbooking);
  
  var _Login = __webpack_require__(88);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  var _config = __webpack_require__(20);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
  
    path: '/cateringbooking',
  
    action: function action(_ref) {
      var _this = this;
  
      var query = _ref.query;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var date, currentdate, sessionid, email, customerrec, customermobile, body, bookingid;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                date = new Date();
                currentdate = date.getDate() + '/' + date.getMonth() + 1 + '/' + date.getFullYear();
                sessionid = query.sessionid;
                email = query.email;
                _context.t0 = JSON;
                _context.next = 7;
                return getCustomerRecord(email);
  
              case 7:
                _context.t1 = _context.sent;
                customerrec = _context.t0.parse.call(_context.t0, _context.t1);
  
                console.log("Cateringbooking Record: " + customerrec);
                customermobile = customerrec[0].phone;
  
                //console.log("Cateringbooking Id: "+Cateringbookingid);
  
                console.log("Sessionid - index.js - Booking : " + sessionid);
  
                if (!(sessionid === undefined || sessionid == '')) {
                  _context.next = 20;
                  break;
                }
  
                _context.next = 15;
                return getSessionid();
  
              case 15:
                body = _context.sent;
  
                console.log("Sessionid: " + body);
                return _context.abrupt('return', (0, _jsx3.default)(_Login2.default, {
                  sessionid: body
                }));
  
              case 20:
                bookingid = Math.floor(1000000 + Math.random() * 9000000);
                return _context.abrupt('return', (0, _jsx3.default)(_Cateringbooking2.default, {
                  sessionid: sessionid,
                  bookingid: bookingid,
                  email: email,
                  phone: customermobile
                }));
  
              case 22:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
  
  
  function getSessionid() {
    var request = __webpack_require__(94);
    console.log('genSessionid - calling API');
    var url = 'http://' + _config.apihost + '/genSessionid';
    console.log("getSeesionid - URL: " + url);
  
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('genSessionid - Response from API' + body);
          // sessionid = body;
          resolve(body);
        } else {
  
          console.log("genSessionid -API Server not running: " + error);
          return reject(error);
        }
        console.log("getSessionid - Returning from API call");
      });
    });
  }
  
  function getCustomerRecord(email) {
    var request = __webpack_require__(94);
    console.log('getCustomerRecord - calling API');
    var url = 'http://' + _config.apihost + '/getCustomer?email=' + email;
    console.log("getCustomerRecord - URL: " + url);
  
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('getCustomerRecord - linkbooking - Response from API' + body);
          //sessionid = body;
          resolve(body);
        } else {
  
          console.log("getCustomerRecord - linkbooking -API Server not running: " + error);
          return reject(error);
        }
        console.log("getCustomerRecord - Returning from API call");
      });
    });
  }

/***/ },
/* 232 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _jsx2 = __webpack_require__(43);
  
  var _jsx3 = _interopRequireDefault(_jsx2);
  
  var _react = __webpack_require__(44);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(59);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Cateringbooking = __webpack_require__(233);
  
  var _Cateringbooking2 = _interopRequireDefault(_Cateringbooking);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'New Event Booking';
  
  var date = new Date();
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  var currentdate = day + '/' + month + '/' + year;
  
  var _ref2 = (0, _jsx3.default)('h1', {}, void 0, title);
  
  var _ref3 = (0, _jsx3.default)('input', {
    id: 'status',
    type: 'hidden',
    value: 'booked',
    name: 'status'
  });
  
  var _ref4 = (0, _jsx3.default)('span', {}, void 0, 'Event Date: ');
  
  var _ref5 = (0, _jsx3.default)('span', {}, void 0, 'E-mail: ');
  
  var _ref6 = (0, _jsx3.default)('span', {}, void 0, 'Mobile Number: ');
  
  var _ref7 = (0, _jsx3.default)('br', {});
  
  var _ref8 = (0, _jsx3.default)('span', {}, void 0, 'Service: ');
  
  var _ref9 = (0, _jsx3.default)('input', {
    id: 'bookingtype',
    type: 'hidden',
    name: 'bookingtype',
    value: 'Catering'
  });
  
  function Cateringbooking(_ref, context) {
    var sessionid = _ref.sessionid,
        bookingid = _ref.bookingid,
        email = _ref.email,
        phone = _ref.phone;
  
    context.setTitle(title);
    return (0, _jsx3.default)('div', {
      className: _Cateringbooking2.default.root
    }, void 0, (0, _jsx3.default)('div', {
      className: _Cateringbooking2.default.container
    }, void 0, _ref2, (0, _jsx3.default)('form', {
      name: 'form1',
      method: 'put',
      action: 'savebooking'
    }, void 0, (0, _jsx3.default)('div', {
      className: _Cateringbooking2.default.leftContainer
    }, void 0, _ref3, (0, _jsx3.default)('label', {
      className: _Cateringbooking2.default.label,
      htmlFor: 'dateofbooking'
    }, void 0, 'Date of Booking:'), (0, _jsx3.default)('input', {
      className: _Cateringbooking2.default.input,
      id: 'dateofbooking',
      type: 'text',
      name: 'dateofbooking',
      value: currentdate,
      autoFocus: true,
      readOnly: true
    }), (0, _jsx3.default)('label', {
      className: _Cateringbooking2.default.label,
      htmlFor: 'eventdate'
    }, void 0, _ref4), (0, _jsx3.default)('input', {
      className: _Cateringbooking2.default.input,
      id: 'functiondate',
      type: 'date',
      name: 'functiondate',
      required: true
    })), (0, _jsx3.default)('div', {}, void 0, (0, _jsx3.default)('label', {
      className: _Cateringbooking2.default.label,
      htmlFor: 'email'
    }, void 0, _ref5), (0, _jsx3.default)('input', {
      className: _Cateringbooking2.default.input,
      id: 'email',
      type: 'email',
      name: 'email',
      value: email,
      readOnly: true
    }), (0, _jsx3.default)('label', {
      className: _Cateringbooking2.default.label,
      htmlFor: 'mobile'
    }, void 0, _ref6), (0, _jsx3.default)('input', {
      className: _Cateringbooking2.default.input,
      id: 'mobile',
      type: 'number',
      name: 'mobile',
      value: phone,
      readOnly: true
    })), _ref7, (0, _jsx3.default)('div', {}, void 0, (0, _jsx3.default)('label', {
      className: _Cateringbooking2.default.label,
      htmlFor: 'Function'
    }, void 0, _ref8), (0, _jsx3.default)('input', {
      className: _Cateringbooking2.default.input,
      id: 'eventtype',
      type: 'text',
      name: 'eventtype',
      value: 'Catering',
      readOnly: true
    }), (0, _jsx3.default)('input', {
      id: 'sessionid',
      type: 'hidden',
      name: 'sessionid',
      value: sessionid
    }), (0, _jsx3.default)('input', {
      id: 'bookingid',
      type: 'hidden',
      name: 'bookingid',
      value: bookingid
    }), _ref9), (0, _jsx3.default)('div', {
      className: _Cateringbooking2.default.formGroup
    }, void 0, (0, _jsx3.default)('button', {
      className: _Cateringbooking2.default.button,
      value: 'submit',
      type: 'submit'
    }, void 0, 'Book Event')))));
  }
  
  Cateringbooking.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Cateringbooking2.default)(Cateringbooking);

/***/ },
/* 233 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(234);
      var insertCss = __webpack_require__(55);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    

/***/ },
/* 234 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(54)();
  // imports
  
  
  // module
  exports.push([module.id, "._1Q_k{padding-left:20px;padding-right:20px}._23u0{margin:0 auto;padding:0 0 40px;max-width:380px}._1Z7E{font-size:1.25em}._1r6E{margin-bottom:20px}._3Y1L{margin-bottom:5px;max-width:100%;font-weight:700;float:left}._3_y9{display:block;box-sizing:border-box;padding:10px 16px;width:100%;height:46px;outline:0;border:1px solid #ccc;border-radius:10;background:#fff;box-shadow:inset 0 1px 1px rgba(0,0,0,.075);color:#616161;font-size:18px;line-height:1.3333333;-webkit-transition:border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out;size:15;max-width:30}._3_y9:focus{border-color:#0074c2;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(0,116,194,.6)}.tVdA{display:block;box-sizing:border-box;margin:0;padding:10px 16px;width:100%;outline:0;border:1px solid #373277;border-radius:0;background:#483288;color:#fff;text-align:center;text-decoration:none;font-size:18px;line-height:1.3333333;cursor:pointer}.tVdA:hover{background:rgba(54,50,119,.8)}.tVdA:focus{border-color:#0074c2;box-shadow:0 0 8px rgba(0,116,194,.6)}.L21c{float:left}._1uZy{float:right}._22O1{display:inline-block;margin:-2px 12px -2px 0;width:20px;height:20px;vertical-align:middle;fill:currentColor}._1jF_{position:relative;z-index:1;display:block;margin-bottom:15px;width:100%;color:#757575;text-align:center;font-size:80%}._1jF_:before{top:50%;left:50%;z-index:-1;margin-top:-5px;margin-left:-20px;width:40px;height:10px;background-color:#fff}._1jF_:after,._1jF_:before{position:absolute;content:''}._1jF_:after{top:49%;z-index:-2;display:block;width:100%;border-bottom:1px solid #ddd}#_167U{max-width:100px;float:left}._2bf-{width:28px;height:28px;position:relative;margin:20px auto;background:#fcfff4;background:-webkit-gradient(linear,left top,left bottom,from(top),color-stop(0,#fcfff4),color-stop(40%,#dfe5d7),to(#b3bead));background:-webkit-linear-gradient(top,#fcfff4,#dfe5d7 40%,#b3bead);background:linear-gradient(top,#fcfff4,#dfe5d7 40%,#b3bead);box-shadow:inset 0 1px 1px #fff,0 1px 3px rgba(0,0,0,.5);label{width:20px;height:20px;position:absolute;top:4px;left:4px;cursor:pointer;background:-webkit-gradient(linear,left top,left bottom,from(#222),to(#45484d));background:-webkit-linear-gradient(top,#222,#45484d);background:linear-gradient(top,#222,#45484d);box-shadow:inset 0 1px 1px rgba(0,0,0,.5),0 1px 0 #fff}label:after{content:'';width:16px;height:16px;position:absolute;top:2px;left:2px;background:$activeColor;background:-webkit-gradient(linear,left top,left bottom,from(top),color-stop(0,$activeColor),to($darkenColor));background:-webkit-linear-gradient(top,$activeColor,$darkenColor);background:linear-gradient(top,$activeColor,$darkenColor);box-shadow:inset 0 1px 1px #fff,0 1px 3px rgba(0,0,0,.5);opacity:0}label:hover:after{opacity:.3}input[type=checkbox]{visibility:hidden}input[type=checkbox]:checked+label:after{opacity:1}}", ""]);
  
  // exports
  exports.locals = {
  	"root": "_1Q_k",
  	"container": "_23u0",
  	"lead": "_1Z7E",
  	"formGroup": "_1r6E",
  	"label": "_3Y1L",
  	"input": "_3_y9",
  	"button": "tVdA",
  	"leftContainer": "L21c",
  	"rightContainer": "_1uZy",
  	"icon": "_22O1",
  	"lineThrough": "_1jF_",
  	"lastname": "_167U",
  	"squaredOne": "_2bf-"
  };

/***/ },
/* 235 */
/***/ function(module, exports, __webpack_require__) {

  var extend = __webpack_require__(236);
  
  function Assets(options) {
    if (!(this instanceof Assets)) {
      return new Assets(options);
    }
  
    this.options = extend({}, options);
    Object.freeze(this);
  }
  
  ['data', 'path', 'size', 'url'].forEach(function (resolver) {
    Assets[resolver] = __webpack_require__(237)("./" + resolver);
    Assets.prototype[resolver] = function (path, callback) {
      return Assets[resolver](path, this.options, callback);
    };
  });
  
  module.exports = Assets;


/***/ },
/* 236 */
/***/ function(module, exports) {

  module.exports = require("lodash/object/extend");

/***/ },
/* 237 */
/***/ function(module, exports, __webpack_require__) {

  var map = {
  	"./__utils__/composeAbsolutePathname": 238,
  	"./__utils__/composeAbsolutePathname.js": 238,
  	"./__utils__/composeQueryString": 242,
  	"./__utils__/composeQueryString.js": 242,
  	"./__utils__/composeRelativePathname": 243,
  	"./__utils__/composeRelativePathname.js": 243,
  	"./__utils__/convertPathToUrl": 239,
  	"./__utils__/convertPathToUrl.js": 239,
  	"./__utils__/defaultCachebuster": 244,
  	"./__utils__/defaultCachebuster.js": 244,
  	"./__utils__/encodeBuffer": 245,
  	"./__utils__/encodeBuffer.js": 245,
  	"./__utils__/ensureTrailingSlash": 240,
  	"./__utils__/ensureTrailingSlash.js": 240,
  	"./__utils__/exists": 246,
  	"./__utils__/exists.js": 246,
  	"./data": 247,
  	"./data.js": 247,
  	"./index": 235,
  	"./index.js": 235,
  	"./path": 249,
  	"./path.js": 249,
  	"./size": 253,
  	"./size.js": 253,
  	"./url": 255,
  	"./url.js": 255
  };
  function webpackContext(req) {
  	return __webpack_require__(webpackContextResolve(req));
  };
  function webpackContextResolve(req) {
  	return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
  };
  webpackContext.keys = function webpackContextKeys() {
  	return Object.keys(map);
  };
  webpackContext.resolve = webpackContextResolve;
  module.exports = webpackContext;
  webpackContext.id = 237;


/***/ },
/* 238 */
/***/ function(module, exports, __webpack_require__) {

  var convertPathToUrl = __webpack_require__(239);
  var ensureTrailingSlash = __webpack_require__(240);
  var path = __webpack_require__(4);
  var url = __webpack_require__(241);
  
  module.exports = function (baseUrl, basePath, resolvedPath) {
    var from = ensureTrailingSlash(baseUrl);
    var to = path.relative(basePath, resolvedPath);
    return url.resolve(from, convertPathToUrl(to));
  };


/***/ },
/* 239 */
/***/ function(module, exports, __webpack_require__) {

  var sep = __webpack_require__(4).sep;
  
  module.exports = function (path) {
    return path.split(sep).join('/');
  };


/***/ },
/* 240 */
/***/ function(module, exports, __webpack_require__) {

  var convertPathToUrl = __webpack_require__(239);
  var path = __webpack_require__(4);
  var url = __webpack_require__(241);
  
  module.exports = function (urlStr) {
    var urlObj = url.parse(urlStr);
    urlObj.pathname = convertPathToUrl(path.join(urlObj.pathname, path.sep));
    return url.format(urlObj);
  };


/***/ },
/* 241 */
/***/ function(module, exports) {

  module.exports = require("url");

/***/ },
/* 242 */
/***/ function(module, exports) {

  module.exports = function (current, addon) {
    if (current) {
      return current + '&' + addon;
    }
    return '?' + addon;
  };


/***/ },
/* 243 */
/***/ function(module, exports, __webpack_require__) {

  var convertPathToUrl = __webpack_require__(239);
  var path = __webpack_require__(4);
  
  module.exports = function (basePath, relativeTo, resolvedPath) {
    var from = path.resolve(basePath, relativeTo);
    var relativePath = path.relative(from, resolvedPath);
    return convertPathToUrl(relativePath);
  };


/***/ },
/* 244 */
/***/ function(module, exports, __webpack_require__) {

  var fs = __webpack_require__(32);
  
  module.exports = function (resolvedPath) {
    var mtime = fs.statSync(resolvedPath).mtime;
    return mtime.getTime().toString(16);
  };


/***/ },
/* 245 */
/***/ function(module, exports) {

  module.exports = function (buffer, mediaType) {
    if (mediaType === 'image/svg+xml') {
      return 'charset=utf-8,' + encodeURIComponent(buffer.toString('utf8').trim());
    }
    return 'base64,' + buffer.toString('base64');
  };


/***/ },
/* 246 */
/***/ function(module, exports, __webpack_require__) {

  var fs = __webpack_require__(32);
  
  module.exports = function (filePath, callback) {
    fs.stat(filePath, function (err) {
      callback(err === null);
    });
  };


/***/ },
/* 247 */
/***/ function(module, exports, __webpack_require__) {

  var encodeBuffer = __webpack_require__(245);
  var extend = __webpack_require__(236);
  var fs = __webpack_require__(32);
  var mime = __webpack_require__(248);
  var Promise = __webpack_require__(33);
  var resolvePath = __webpack_require__(249);
  var url = __webpack_require__(241);
  
  var preadFile = Promise.promisify(fs.readFile);
  
  module.exports = function (to, options, callback) {
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }
  
    options = extend({
      basePath: '.',
      loadPaths: []
    }, options);
  
    var toUrl = url.parse(to);
  
    return resolvePath(toUrl.pathname, options)
      .then(function (resolvedPath) {
        var mediaType = mime.lookup(resolvedPath);
        return preadFile(resolvedPath)
          .then(function (buffer) {
            var data = encodeBuffer(buffer, mediaType);
            return 'data:' + mediaType + ';' + data + (toUrl.hash || '');
          });
      })
      .nodeify(callback);
  };


/***/ },
/* 248 */
/***/ function(module, exports) {

  module.exports = require("mime");

/***/ },
/* 249 */
/***/ function(module, exports, __webpack_require__) {

  var async = __webpack_require__(250);
  var exists = __webpack_require__(246);
  var extend = __webpack_require__(236);
  var flatten = __webpack_require__(251);
  var glob = __webpack_require__(252);
  var path = __webpack_require__(4);
  var Promise = __webpack_require__(33);
  
  var pglob = Promise.promisify(glob);
  
  module.exports = function (to, options, callback) {
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }
  
    options = extend({
      basePath: '.',
      loadPaths: []
    }, options);
  
    var loadPaths = [].concat(options.loadPaths);
  
    return Promise.map(loadPaths, function (loadPath) {
      return pglob(loadPath, {
        cwd: options.basePath
      })
        .then(function (matchedPaths) {
          return matchedPaths.map(function (matchedPath) {
            return path.resolve(options.basePath, matchedPath, to);
          });
        });
    })
      .then(function (filePaths) {
        filePaths = flatten(filePaths);
        filePaths.unshift(path.resolve(options.basePath, to));
  
        return new Promise(function (resolve, reject) {
          async.detectSeries(filePaths, exists, function (resolvedPath) {
            if (resolvedPath) return resolve(resolvedPath);
            reject(new Error('Asset not found or unreadable: ' + to));
          });
        });
      })
      .nodeify(callback);
  };


/***/ },
/* 250 */
/***/ function(module, exports) {

  module.exports = require("async");

/***/ },
/* 251 */
/***/ function(module, exports) {

  module.exports = require("lodash/array/flatten");

/***/ },
/* 252 */
/***/ function(module, exports) {

  module.exports = require("glob");

/***/ },
/* 253 */
/***/ function(module, exports, __webpack_require__) {

  var calipers = __webpack_require__(254)('webp', 'png', 'jpeg', 'gif', 'svg');
  var Promise = __webpack_require__(33);
  var resolvePath = __webpack_require__(249);
  
  module.exports = function (to, options, callback) {
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }
  
    return resolvePath(to, options)
      .then(function (resolvedPath) {
        return calipers.measure(resolvedPath)
          .then(function (result) {
            return result.pages[0];
          })
          .catch(function (err) {
            return Promise.reject(new Error(err.message + ': ' + resolvedPath));
          });
      })
      .nodeify(callback);
  };


/***/ },
/* 254 */
/***/ function(module, exports) {

  module.exports = require("calipers");

/***/ },
/* 255 */
/***/ function(module, exports, __webpack_require__) {

  var composeAbsolutePathname = __webpack_require__(238);
  var composeQueryString = __webpack_require__(242);
  var composeRelativePathname = __webpack_require__(243);
  var defaultCachebuster = __webpack_require__(244);
  var extend = __webpack_require__(236);
  var resolvePath = __webpack_require__(249);
  var url = __webpack_require__(241);
  
  module.exports = function (to, options, callback) {
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }
  
    options = extend({
      basePath: '.',
      baseUrl: '/',
      cachebuster: false,
      relativeTo: false
    }, options);
  
    if (options.cachebuster === true) {
      options.cachebuster = defaultCachebuster;
    }
  
    var toUrl = url.parse(to);
  
    return resolvePath(decodeURI(toUrl.pathname), options)
      .then(function (resolvedPath) {
        if (options.relativeTo) {
          toUrl.pathname = composeRelativePathname(options.basePath, options.relativeTo, resolvedPath);
        } else {
          toUrl.pathname = composeAbsolutePathname(options.baseUrl, options.basePath, resolvedPath);
        }
        if (options.cachebuster) {
          var cachebusterOutput = options.cachebuster(resolvedPath, toUrl.pathname);
          if (cachebusterOutput) {
            if (typeof cachebusterOutput !== 'object') {
              toUrl.search = composeQueryString(toUrl.search, String(cachebusterOutput));
            } else {
              if (cachebusterOutput.pathname) {
                toUrl.pathname = cachebusterOutput.pathname;
              }
              if (cachebusterOutput.query) {
                toUrl.search = composeQueryString(toUrl.search, cachebusterOutput.query);
              }
            }
          }
        }
        return url.format(toUrl);
      })
      .nodeify(callback);
  };


/***/ },
/* 256 */
/***/ function(module, exports) {

  module.exports = require("mongodb");

/***/ },
/* 257 */
/***/ function(module, exports) {

  module.exports = require("express-session");

/***/ },
/* 258 */
/***/ function(module, exports, __webpack_require__) {

  var jade = __webpack_require__(259);
  
  module.exports = function template(locals) {
  var buf = [];
  var jade_mixins = {};
  var jade_interp;
  ;var locals_for_with = (locals || {});(function (body, css, description, entry, title, trackingId) {
  buf.push("<!DOCTYPE html><html lang=\"\" class=\"no-js\"><head><meta charset=\"utf-8\"><meta http-equiv=\"x-ua-compatible\" content=\"ie=edge\"><title>" + (jade.escape(null == (jade_interp = title) ? "" : jade_interp)) + "</title><meta name=\"description\"" + (jade.attr("description", description, true, true)) + "><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"><link rel=\"apple-touch-icon\" href=\"apple-touch-icon.png\"><style id=\"css\">" + (null == (jade_interp = css) ? "" : jade_interp) + "</style></head><body><div id=\"app\">" + (null == (jade_interp = body) ? "" : jade_interp) + "</div><script" + (jade.attr("src", entry, true, true)) + "></script><script>window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;\nga('create','" + (jade.escape((jade_interp = trackingId) == null ? '' : jade_interp)) + "','auto');ga('send','pageview')</script>");
  if ( trackingId)
  {
  buf.push("<script src=\"https://www.google-analytics.com/analytics.js\" async defer></script>");
  }
  buf.push("</body></html>");}.call(this,"body" in locals_for_with?locals_for_with.body:typeof body!=="undefined"?body:undefined,"css" in locals_for_with?locals_for_with.css:typeof css!=="undefined"?css:undefined,"description" in locals_for_with?locals_for_with.description:typeof description!=="undefined"?description:undefined,"entry" in locals_for_with?locals_for_with.entry:typeof entry!=="undefined"?entry:undefined,"title" in locals_for_with?locals_for_with.title:typeof title!=="undefined"?title:undefined,"trackingId" in locals_for_with?locals_for_with.trackingId:typeof trackingId!=="undefined"?trackingId:undefined));;return buf.join("");
  }

/***/ },
/* 259 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  /**
   * Merge two attribute objects giving precedence
   * to values in object `b`. Classes are special-cased
   * allowing for arrays and merging/joining appropriately
   * resulting in a string.
   *
   * @param {Object} a
   * @param {Object} b
   * @return {Object} a
   * @api private
   */
  
  exports.merge = function merge(a, b) {
    if (arguments.length === 1) {
      var attrs = a[0];
      for (var i = 1; i < a.length; i++) {
        attrs = merge(attrs, a[i]);
      }
      return attrs;
    }
    var ac = a['class'];
    var bc = b['class'];
  
    if (ac || bc) {
      ac = ac || [];
      bc = bc || [];
      if (!Array.isArray(ac)) ac = [ac];
      if (!Array.isArray(bc)) bc = [bc];
      a['class'] = ac.concat(bc).filter(nulls);
    }
  
    for (var key in b) {
      if (key != 'class') {
        a[key] = b[key];
      }
    }
  
    return a;
  };
  
  /**
   * Filter null `val`s.
   *
   * @param {*} val
   * @return {Boolean}
   * @api private
   */
  
  function nulls(val) {
    return val != null && val !== '';
  }
  
  /**
   * join array as classes.
   *
   * @param {*} val
   * @return {String}
   */
  exports.joinClasses = joinClasses;
  function joinClasses(val) {
    return (Array.isArray(val) ? val.map(joinClasses) :
      (val && typeof val === 'object') ? Object.keys(val).filter(function (key) { return val[key]; }) :
      [val]).filter(nulls).join(' ');
  }
  
  /**
   * Render the given classes.
   *
   * @param {Array} classes
   * @param {Array.<Boolean>} escaped
   * @return {String}
   */
  exports.cls = function cls(classes, escaped) {
    var buf = [];
    for (var i = 0; i < classes.length; i++) {
      if (escaped && escaped[i]) {
        buf.push(exports.escape(joinClasses([classes[i]])));
      } else {
        buf.push(joinClasses(classes[i]));
      }
    }
    var text = joinClasses(buf);
    if (text.length) {
      return ' class="' + text + '"';
    } else {
      return '';
    }
  };
  
  
  exports.style = function (val) {
    if (val && typeof val === 'object') {
      return Object.keys(val).map(function (style) {
        return style + ':' + val[style];
      }).join(';');
    } else {
      return val;
    }
  };
  /**
   * Render the given attribute.
   *
   * @param {String} key
   * @param {String} val
   * @param {Boolean} escaped
   * @param {Boolean} terse
   * @return {String}
   */
  exports.attr = function attr(key, val, escaped, terse) {
    if (key === 'style') {
      val = exports.style(val);
    }
    if ('boolean' == typeof val || null == val) {
      if (val) {
        return ' ' + (terse ? key : key + '="' + key + '"');
      } else {
        return '';
      }
    } else if (0 == key.indexOf('data') && 'string' != typeof val) {
      if (JSON.stringify(val).indexOf('&') !== -1) {
        console.warn('Since Jade 2.0.0, ampersands (`&`) in data attributes ' +
                     'will be escaped to `&amp;`');
      };
      if (val && typeof val.toISOString === 'function') {
        console.warn('Jade will eliminate the double quotes around dates in ' +
                     'ISO form after 2.0.0');
      }
      return ' ' + key + "='" + JSON.stringify(val).replace(/'/g, '&apos;') + "'";
    } else if (escaped) {
      if (val && typeof val.toISOString === 'function') {
        console.warn('Jade will stringify dates in ISO form after 2.0.0');
      }
      return ' ' + key + '="' + exports.escape(val) + '"';
    } else {
      if (val && typeof val.toISOString === 'function') {
        console.warn('Jade will stringify dates in ISO form after 2.0.0');
      }
      return ' ' + key + '="' + val + '"';
    }
  };
  
  /**
   * Render the given attributes object.
   *
   * @param {Object} obj
   * @param {Object} escaped
   * @return {String}
   */
  exports.attrs = function attrs(obj, terse){
    var buf = [];
  
    var keys = Object.keys(obj);
  
    if (keys.length) {
      for (var i = 0; i < keys.length; ++i) {
        var key = keys[i]
          , val = obj[key];
  
        if ('class' == key) {
          if (val = joinClasses(val)) {
            buf.push(' ' + key + '="' + val + '"');
          }
        } else {
          buf.push(exports.attr(key, val, false, terse));
        }
      }
    }
  
    return buf.join('');
  };
  
  /**
   * Escape the given string of `html`.
   *
   * @param {String} html
   * @return {String}
   * @api private
   */
  
  var jade_encode_html_rules = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;'
  };
  var jade_match_html = /[&<>"]/g;
  
  function jade_encode_char(c) {
    return jade_encode_html_rules[c] || c;
  }
  
  exports.escape = jade_escape;
  function jade_escape(html){
    var result = String(html).replace(jade_match_html, jade_encode_char);
    if (result === '' + html) return html;
    else return result;
  };
  
  /**
   * Re-throw the given `err` in context to the
   * the jade in `filename` at the given `lineno`.
   *
   * @param {Error} err
   * @param {String} filename
   * @param {String} lineno
   * @api private
   */
  
  exports.rethrow = function rethrow(err, filename, lineno, str){
    if (!(err instanceof Error)) throw err;
    if ((typeof window != 'undefined' || !filename) && !str) {
      err.message += ' on line ' + lineno;
      throw err;
    }
    try {
      str = str || __webpack_require__(32).readFileSync(filename, 'utf8')
    } catch (ex) {
      rethrow(err, null, lineno)
    }
    var context = 3
      , lines = str.split('\n')
      , start = Math.max(lineno - context, 0)
      , end = Math.min(lines.length, lineno + context);
  
    // Error context
    var context = lines.slice(start, end).map(function(line, i){
      var curr = i + start + 1;
      return (curr == lineno ? '  > ' : '    ')
        + curr
        + '| '
        + line;
    }).join('\n');
  
    // Alter exception message
    err.path = filename;
    err.message = (filename || 'Jade') + ':' + lineno
      + '\n' + context + '\n\n' + err.message;
    throw err;
  };
  
  exports.DebugItem = function DebugItem(lineno, filename) {
    this.lineno = lineno;
    this.filename = filename;
  }


/***/ },
/* 260 */
/***/ function(module, exports, __webpack_require__) {

  var jade = __webpack_require__(259);
  
  module.exports = function template(locals) {
  var buf = [];
  var jade_mixins = {};
  var jade_interp;
  ;var locals_for_with = (locals || {});(function (stack) {
  buf.push("<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"utf-8\"><title>Internal Server Error</title><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"><style>* {\n  line-height: 1.2;\n  margin: 0;\n}\n\nhtml {\n  color: #888;\n  display: table;\n  font-family: sans-serif;\n  height: 100%;\n  text-align: center;\n  width: 100%;\n}\n\nbody {\n  display: table-cell;\n  vertical-align: middle;\n  margin: 2em auto;\n}\n\nh1 {\n  color: #555;\n  font-size: 2em;\n  font-weight: 400;\n}\n\np {\n  margin: 0 auto;\n  width: 280px;\n}\n\npre {\n  text-align: left;\n  margin-top: 2rem;\n}\n\n@media only screen and (max-width: 280px) {\n\n  body, p {\n    width: 95%;\n  }\n\n  h1 {\n    font-size: 1.5em;\n    margin: 0 0 0.3em;\n  }\n\n}\n</style></head><body><h1>Internal Server Error</h1><p>Sorry, something went wrong.</p><pre>" + (jade.escape(null == (jade_interp = stack) ? "" : jade_interp)) + "</pre></body></html><!-- IE needs 512+ bytes: http://blogs.msdn.com/b/ieinternals/archive/2010/08/19/http-error-pages-in-internet-explorer.aspx-->");}.call(this,"stack" in locals_for_with?locals_for_with.stack:typeof stack!=="undefined"?stack:undefined));;return buf.join("");
  }

/***/ }
/******/ ]);
//# sourceMappingURL=server.js.map