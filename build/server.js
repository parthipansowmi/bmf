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
  
  var _assets = __webpack_require__(175);
  
  var _assets2 = _interopRequireDefault(_assets);
  
  var _config = __webpack_require__(20);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var mongodb = __webpack_require__(196); // eslint-disable-line import/no-unresolved
  
  var session = __webpack_require__(197);
  
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
      pretty: ("development") !== 'production'
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
                        template = __webpack_require__(198); // eslint-disable-line global-require
  
                        data = { title: '', description: '', user: '', css: '', body: '', entry: 'assets.main.js' }; //assets.main.js
                        //var sess = req.session;
  
                        if (false) {
                          data.trackingId = _config.analytics.google.trackingId;
                        }
  
                        _context.next = 7;
                        return (0, _universalRouter.match)(_routes2.default, {
                          path: req.path,
                          query: req.query,
                          request: req,
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
    var template = __webpack_require__(200); // eslint-disable-line global-require
    var statusCode = err.status || 500;
    res.status(statusCode);
    res.send(template({
      message: err.message,
      stack:  false ? '' : err.stack
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
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(43);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _App = __webpack_require__(44);
  
  var _App2 = _interopRequireDefault(_App);
  
  var _home = __webpack_require__(82);
  
  var _home2 = _interopRequireDefault(_home);
  
  var _contact = __webpack_require__(93);
  
  var _contact2 = _interopRequireDefault(_contact);
  
  var _login = __webpack_require__(97);
  
  var _login2 = _interopRequireDefault(_login);
  
  var _register = __webpack_require__(98);
  
  var _register2 = _interopRequireDefault(_register);
  
  var _savecustomer = __webpack_require__(102);
  
  var _savecustomer2 = _interopRequireDefault(_savecustomer);
  
  var _content = __webpack_require__(110);
  
  var _content2 = _interopRequireDefault(_content);
  
  var _error = __webpack_require__(114);
  
  var _error2 = _interopRequireDefault(_error);
  
  var _verifypass = __webpack_require__(118);
  
  var _verifypass2 = _interopRequireDefault(_verifypass);
  
  var _forgotpass = __webpack_require__(122);
  
  var _forgotpass2 = _interopRequireDefault(_forgotpass);
  
  var _changepassword = __webpack_require__(126);
  
  var _changepassword2 = _interopRequireDefault(_changepassword);
  
  var _updatepass = __webpack_require__(130);
  
  var _updatepass2 = _interopRequireDefault(_updatepass);
  
  var _serviceprovider = __webpack_require__(134);
  
  var _serviceprovider2 = _interopRequireDefault(_serviceprovider);
  
  var _saveprovider = __webpack_require__(138);
  
  var _saveprovider2 = _interopRequireDefault(_saveprovider);
  
  var _booking = __webpack_require__(142);
  
  var _booking2 = _interopRequireDefault(_booking);
  
  var _savebooking = __webpack_require__(146);
  
  var _savebooking2 = _interopRequireDefault(_savebooking);
  
  var _providerlogin = __webpack_require__(153);
  
  var _providerlogin2 = _interopRequireDefault(_providerlogin);
  
  var _linkprovider = __webpack_require__(157);
  
  var _linkprovider2 = _interopRequireDefault(_linkprovider);
  
  var _verifyproviderlogin = __webpack_require__(161);
  
  var _verifyproviderlogin2 = _interopRequireDefault(_verifyproviderlogin);
  
  var _providerlist = __webpack_require__(166);
  
  var _providerlist2 = _interopRequireDefault(_providerlist);
  
  var _logout = __webpack_require__(167);
  
  var _logout2 = _interopRequireDefault(_logout);
  
  var _bookinglist = __webpack_require__(171);
  
  var _bookinglist2 = _interopRequireDefault(_bookinglist);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
  
    path: '/',
  
    children: [_home2.default, _logout2.default, _bookinglist2.default, _contact2.default, _login2.default, _providerlogin2.default, _verifypass2.default, _verifyproviderlogin2.default, _forgotpass2.default, _changepassword2.default, _updatepass2.default, _register2.default, _savecustomer2.default, _serviceprovider2.default, _saveprovider2.default, _booking2.default, _providerlist2.default, _savebooking2.default, _linkprovider2.default, _content2.default, _error2.default],
  
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
                return _context.abrupt('return', render(_react2.default.createElement(
                  _App2.default,
                  { context: context },
                  component
                )));
  
              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
  
  // Child routes

/***/ },
/* 43 */
/***/ function(module, exports) {

  module.exports = require("react");

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(45);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(46);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(47);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(48);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(49);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(43);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _emptyFunction = __webpack_require__(50);
  
  var _emptyFunction2 = _interopRequireDefault(_emptyFunction);
  
  var _App = __webpack_require__(51);
  
  var _App2 = _interopRequireDefault(_App);
  
  var _Header = __webpack_require__(57);
  
  var _Header2 = _interopRequireDefault(_Header);
  
  var _Feedback = __webpack_require__(73);
  
  var _Feedback2 = _interopRequireDefault(_Feedback);
  
  var _Footer = __webpack_require__(76);
  
  var _Footer2 = _interopRequireDefault(_Footer);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
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
  
        return !this.props.error ? _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_Header2.default, null),
          this.props.children,
          _react2.default.createElement(_Footer2.default, null)
        ) : this.props.children;
      }
    }]);
    return App;
  }(_react.Component);
  
  App.propTypes = {
    context: _react.PropTypes.shape({
      insertCss: _react.PropTypes.func,
      setTitle: _react.PropTypes.func,
      setUser: _react.PropTypes.func,
      setMeta: _react.PropTypes.func,
      getUser: _react.PropTypes.func
    }),
    children: _react.PropTypes.element.isRequired,
    error: _react.PropTypes.object
  };
  App.childContextTypes = {
    insertCss: _react.PropTypes.func.isRequired,
    setTitle: _react.PropTypes.func.isRequired,
    setUser: _react.PropTypes.func.isRequired,
    setMeta: _react.PropTypes.func.isRequired,
    getUser: _react.PropTypes.func.isRequired
  };
  exports.default = App;

/***/ },
/* 45 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/object/get-prototype-of");

/***/ },
/* 46 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/classCallCheck");

/***/ },
/* 47 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/createClass");

/***/ },
/* 48 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/possibleConstructorReturn");

/***/ },
/* 49 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/inherits");

/***/ },
/* 50 */
/***/ function(module, exports) {

  module.exports = require("fbjs/lib/emptyFunction");

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(52);
      var insertCss = __webpack_require__(54);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./App.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./App.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(53)();
  // imports
  
  
  // module
  exports.push([module.id, "/*! normalize.css v4.1.1 | MIT License | github.com/necolas/normalize.css */\n\n/**\n * 1. Change the default font family in all browsers (opinionated).\n * 2. Prevent adjustments of font size after orientation changes in IE and iOS.\n */\n\nhtml {\n  font-family: sans-serif; /* 1 */\n  -ms-text-size-adjust: 100%; /* 2 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/**\n * Remove the margin in all browsers (opinionated).\n */\n\nbody {\n  margin: 0;\n}\n\n/* HTML5 display definitions\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n * 2. Add the correct display in IE.\n */\n\narticle,\naside,\ndetails, /* 1 */\nfigcaption,\nfigure,\nfooter,\nheader,\nmain, /* 2 */\nmenu,\nnav,\nsection,\nsummary { /* 1 */\n  display: block;\n}\n\n/**\n * Add the correct display in IE 9-.\n */\n\naudio,\ncanvas,\nprogress,\nvideo {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in iOS 4-7.\n */\n\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n/**\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  vertical-align: baseline;\n}\n\n/**\n * Add the correct display in IE 10-.\n * 1. Add the correct display in IE.\n */\n\ntemplate, /* 1 */\n[hidden] {\n  display: none;\n}\n\n/* Links\n   ========================================================================== */\n\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\n\na {\n  background-color: transparent; /* 1 */\n  -webkit-text-decoration-skip: objects; /* 2 */\n}\n\n/**\n * Remove the outline on focused links when they are also active or hovered\n * in all browsers (opinionated).\n */\n\na:active,\na:hover {\n  outline-width: 0;\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * 1. Remove the bottom border in Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\n\nb,\nstrong {\n  font-weight: inherit;\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * Add the correct font style in Android 4.3-.\n */\n\ndfn {\n  font-style: italic;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/**\n * Add the correct background and color in IE 9-.\n */\n\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Remove the border on images inside links in IE 10-.\n */\n\nimg {\n  border-style: none;\n}\n\n/**\n * Hide the overflow in IE.\n */\n\nsvg:not(:root) {\n  overflow: hidden;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\npre,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct margin in IE 8.\n */\n\nfigure {\n  margin: 1em 40px;\n}\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  -webkit-box-sizing: content-box;\n          box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change font properties to `inherit` in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\nselect,\ntextarea {\n  font: inherit; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Restore the font weight unset by the previous rule.\n */\n\noptgroup {\n  font-weight: bold;\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput { /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect { /* 1 */\n  text-transform: none;\n}\n\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\nhtml [type=\"button\"], /* 1 */\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button; /* 2 */\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Change the border, margin, and padding in all browsers (opinionated).\n */\n\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * Remove the default vertical scrollbar in IE.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on OS X.\n */\n\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * Correct the text style of placeholders in Chrome, Edge, and Safari.\n */\n\n::-webkit-input-placeholder {\n  color: inherit;\n  opacity: 0.54;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n}\n\n/*\n * Base styles\n * ========================================================================== */\n\nhtml {\n  color: #222;\n  font-weight: 100;\n  font-size: 1em; /* ~16px; */\n  font-family: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\n  line-height: 1.375; /* ~22px */\n}\n\na {\n  color: #0074c2;\n}\n\n/*\n * Remove text-shadow in selection highlight:\n * https://twitter.com/miketaylr/status/12228805301\n *\n * These selection rule sets have to be separate.\n * Customize the background color to match your design.\n */\n\n::-moz-selection {\n  background: #b3d4fc;\n  text-shadow: none;\n}\n\n::selection {\n  background: #b3d4fc;\n  text-shadow: none;\n}\n\n/*\n * A better looking default horizontal rule\n */\n\nhr {\n  display: block;\n  height: 1px;\n  border: 0;\n  border-top: 1px solid #ccc;\n  margin: 1em 0;\n  padding: 0;\n}\n\n/*\n * Remove the gap between audio, canvas, iframes,\n * images, videos and the bottom of their containers:\n * https://github.com/h5bp/html5-boilerplate/issues/440\n */\n\naudio,\ncanvas,\niframe,\nimg,\nsvg,\nvideo {\n  vertical-align: middle;\n}\n\n/*\n * Remove default fieldset styles.\n */\n\nfieldset {\n  border: 0;\n  margin: 0;\n  padding: 0;\n}\n\n/*\n * Allow only vertical resizing of textareas.\n */\n\ntextarea {\n  resize: vertical;\n}\n\n/*\n * Browser upgrade prompt\n * ========================================================================== */\n\n.browserupgrade {\n  margin: 0.2em 0;\n  background: #ccc;\n  color: #000;\n  padding: 0.2em 0;\n}\n\n/*\n * Print styles\n * Inlined to avoid the additional HTTP request:\n * http://www.phpied.com/delay-loading-your-print-css/\n * ========================================================================== */\n\n@media print {\n  *,\n  *::before,\n  *::after {\n    background: transparent !important;\n    color: #000 !important; /* Black prints faster: http://www.sanbeiji.com/archives/953 */\n    -webkit-box-shadow: none !important;\n            box-shadow: none !important;\n    text-shadow: none !important;\n  }\n\n  a,\n  a:visited {\n    text-decoration: underline;\n  }\n\n  a[href]::after {\n    content: ' (' attr(href) ')';\n  }\n\n  abbr[title]::after {\n    content: ' (' attr(title) ')';\n  }\n\n  /*\n   * Don't show links that are fragment identifiers,\n   * or use the `javascript:` pseudo protocol\n   */\n\n  a[href^='#']::after,\n  a[href^='javascript:']::after {\n    content: '';\n  }\n\n  pre,\n  blockquote {\n    border: 1px solid #999;\n    page-break-inside: avoid;\n  }\n\n  /*\n   * Printing Tables:\n   * http://css-discuss.incutio.com/wiki/Printing_Tables\n   */\n\n  thead {\n    display: table-header-group;\n  }\n\n  tr,\n  img {\n    page-break-inside: avoid;\n  }\n\n  img {\n    max-width: 100% !important;\n  }\n\n  p,\n  h2,\n  h3 {\n    orphans: 3;\n    widows: 3;\n  }\n\n  h2,\n  h3 {\n    page-break-after: avoid;\n  }\n}\n", "", {"version":3,"sources":["/../node_modules/normalize.css/normalize.css","/./components/variables.css","/./components/App/App.css"],"names":[],"mappings":"AAAA,4EAA4E;;AAE5E;;;GAGG;;AAEH;EACE,wBAAwB,CAAC,OAAO;EAChC,2BAA2B,CAAC,OAAO;EACnC,+BAA+B,CAAC,OAAO;CACxC;;AAED;;GAEG;;AAEH;EACE,UAAU;CACX;;AAED;gFACgF;;AAEhF;;;;GAIG;;AAEH;;;;;;;;;;;UAWU,OAAO;EACf,eAAe;CAChB;;AAED;;GAEG;;AAEH;;;;EAIE,sBAAsB;CACvB;;AAED;;GAEG;;AAEH;EACE,cAAc;EACd,UAAU;CACX;;AAED;;GAEG;;AAEH;EACE,yBAAyB;CAC1B;;AAED;;;GAGG;;AAEH;;EAEE,cAAc;CACf;;AAED;gFACgF;;AAEhF;;;GAGG;;AAEH;EACE,8BAA8B,CAAC,OAAO;EACtC,sCAAsC,CAAC,OAAO;CAC/C;;AAED;;;GAGG;;AAEH;;EAEE,iBAAiB;CAClB;;AAED;gFACgF;;AAEhF;;;GAGG;;AAEH;EACE,oBAAoB,CAAC,OAAO;EAC5B,2BAA2B,CAAC,OAAO;EACnC,kCAAkC,CAAC,OAAO;CAC3C;;AAED;;GAEG;;AAEH;;EAEE,qBAAqB;CACtB;;AAED;;GAEG;;AAEH;;EAEE,oBAAoB;CACrB;;AAED;;GAEG;;AAEH;EACE,mBAAmB;CACpB;;AAED;;;GAGG;;AAEH;EACE,eAAe;EACf,iBAAiB;CAClB;;AAED;;GAEG;;AAEH;EACE,uBAAuB;EACvB,YAAY;CACb;;AAED;;GAEG;;AAEH;EACE,eAAe;CAChB;;AAED;;;GAGG;;AAEH;;EAEE,eAAe;EACf,eAAe;EACf,mBAAmB;EACnB,yBAAyB;CAC1B;;AAED;EACE,gBAAgB;CACjB;;AAED;EACE,YAAY;CACb;;AAED;gFACgF;;AAEhF;;GAEG;;AAEH;EACE,mBAAmB;CACpB;;AAED;;GAEG;;AAEH;EACE,iBAAiB;CAClB;;AAED;gFACgF;;AAEhF;;;GAGG;;AAEH;;;;EAIE,kCAAkC,CAAC,OAAO;EAC1C,eAAe,CAAC,OAAO;CACxB;;AAED;;GAEG;;AAEH;EACE,iBAAiB;CAClB;;AAED;;;GAGG;;AAEH;EACE,gCAAwB;UAAxB,wBAAwB,CAAC,OAAO;EAChC,UAAU,CAAC,OAAO;EAClB,kBAAkB,CAAC,OAAO;CAC3B;;AAED;gFACgF;;AAEhF;;;GAGG;;AAEH;;;;EAIE,cAAc,CAAC,OAAO;EACtB,UAAU,CAAC,OAAO;CACnB;;AAED;;GAEG;;AAEH;EACE,kBAAkB;CACnB;;AAED;;;GAGG;;AAEH;QACQ,OAAO;EACb,kBAAkB;CACnB;;AAED;;;GAGG;;AAEH;SACS,OAAO;EACd,qBAAqB;CACtB;;AAED;;;;GAIG;;AAEH;;;;EAIE,2BAA2B,CAAC,OAAO;CACpC;;AAED;;GAEG;;AAEH;;;;EAIE,mBAAmB;EACnB,WAAW;CACZ;;AAED;;GAEG;;AAEH;;;;EAIE,+BAA+B;CAChC;;AAED;;GAEG;;AAEH;EACE,0BAA0B;EAC1B,cAAc;EACd,+BAA+B;CAChC;;AAED;;;;;GAKG;;AAEH;EACE,+BAAuB;UAAvB,uBAAuB,CAAC,OAAO;EAC/B,eAAe,CAAC,OAAO;EACvB,eAAe,CAAC,OAAO;EACvB,gBAAgB,CAAC,OAAO;EACxB,WAAW,CAAC,OAAO;EACnB,oBAAoB,CAAC,OAAO;CAC7B;;AAED;;GAEG;;AAEH;EACE,eAAe;CAChB;;AAED;;;GAGG;;AAEH;;EAEE,+BAAuB;UAAvB,uBAAuB,CAAC,OAAO;EAC/B,WAAW,CAAC,OAAO;CACpB;;AAED;;GAEG;;AAEH;;EAEE,aAAa;CACd;;AAED;;;GAGG;;AAEH;EACE,8BAA8B,CAAC,OAAO;EACtC,qBAAqB,CAAC,OAAO;CAC9B;;AAED;;GAEG;;AAEH;;EAEE,yBAAyB;CAC1B;;AAED;;GAEG;;AAEH;EACE,eAAe;EACf,cAAc;CACf;;AAED;;;GAGG;;AAEH;EACE,2BAA2B,CAAC,OAAO;EACnC,cAAc,CAAC,OAAO;CACvB;;AChaD;EACE;;gFAE8E;;EAI9E;;gFAE8E;;EAI9E;;gFAE8E,EAErD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;CAC3D;;AChBD;;gFAEgF;;AAEhF;EACE,YAAY;EACZ,iBAAiB;EACjB,eAAe,CAAC,YAAY;EAC5B,2DAAqC;EACrC,mBAAmB,CAAC,WAAW;CAChC;;AAED;EACE,eAAe;CAChB;;AAED;;;;;;GAMG;;AAEH;EACE,oBAAoB;EACpB,kBAAkB;CACnB;;AAED;EACE,oBAAoB;EACpB,kBAAkB;CACnB;;AAED;;GAEG;;AAEH;EACE,eAAe;EACf,YAAY;EACZ,UAAU;EACV,2BAA2B;EAC3B,cAAc;EACd,WAAW;CACZ;;AAED;;;;GAIG;;AAEH;;;;;;EAME,uBAAuB;CACxB;;AAED;;GAEG;;AAEH;EACE,UAAU;EACV,UAAU;EACV,WAAW;CACZ;;AAED;;GAEG;;AAEH;EACE,iBAAiB;CAClB;;AAED;;gFAEgF;;AAEhF;EACE,gBAAgB;EAChB,iBAAiB;EACjB,YAAY;EACZ,iBAAiB;CAClB;;AAED;;;;gFAIgF;;AAEhF;EACE;;;IAGE,mCAAmC;IACnC,uBAAuB,CAAC,+DAA+D;IACvF,oCAA4B;YAA5B,4BAA4B;IAC5B,6BAA6B;GAC9B;;EAED;;IAEE,2BAA2B;GAC5B;;EAED;IACE,6BAA6B;GAC9B;;EAED;IACE,8BAA8B;GAC/B;;EAED;;;KAGG;;EAEH;;IAEE,YAAY;GACb;;EAED;;IAEE,uBAAuB;IACvB,yBAAyB;GAC1B;;EAED;;;KAGG;;EAEH;IACE,4BAA4B;GAC7B;;EAED;;IAEE,yBAAyB;GAC1B;;EAED;IACE,2BAA2B;GAC5B;;EAED;;;IAGE,WAAW;IACX,UAAU;GACX;;EAED;;IAEE,wBAAwB;GACzB;CACF","file":"App.css","sourcesContent":["/*! normalize.css v4.1.1 | MIT License | github.com/necolas/normalize.css */\n\n/**\n * 1. Change the default font family in all browsers (opinionated).\n * 2. Prevent adjustments of font size after orientation changes in IE and iOS.\n */\n\nhtml {\n  font-family: sans-serif; /* 1 */\n  -ms-text-size-adjust: 100%; /* 2 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/**\n * Remove the margin in all browsers (opinionated).\n */\n\nbody {\n  margin: 0;\n}\n\n/* HTML5 display definitions\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n * 2. Add the correct display in IE.\n */\n\narticle,\naside,\ndetails, /* 1 */\nfigcaption,\nfigure,\nfooter,\nheader,\nmain, /* 2 */\nmenu,\nnav,\nsection,\nsummary { /* 1 */\n  display: block;\n}\n\n/**\n * Add the correct display in IE 9-.\n */\n\naudio,\ncanvas,\nprogress,\nvideo {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in iOS 4-7.\n */\n\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n/**\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  vertical-align: baseline;\n}\n\n/**\n * Add the correct display in IE 10-.\n * 1. Add the correct display in IE.\n */\n\ntemplate, /* 1 */\n[hidden] {\n  display: none;\n}\n\n/* Links\n   ========================================================================== */\n\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\n\na {\n  background-color: transparent; /* 1 */\n  -webkit-text-decoration-skip: objects; /* 2 */\n}\n\n/**\n * Remove the outline on focused links when they are also active or hovered\n * in all browsers (opinionated).\n */\n\na:active,\na:hover {\n  outline-width: 0;\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * 1. Remove the bottom border in Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\n\nb,\nstrong {\n  font-weight: inherit;\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * Add the correct font style in Android 4.3-.\n */\n\ndfn {\n  font-style: italic;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/**\n * Add the correct background and color in IE 9-.\n */\n\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Remove the border on images inside links in IE 10-.\n */\n\nimg {\n  border-style: none;\n}\n\n/**\n * Hide the overflow in IE.\n */\n\nsvg:not(:root) {\n  overflow: hidden;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\npre,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct margin in IE 8.\n */\n\nfigure {\n  margin: 1em 40px;\n}\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change font properties to `inherit` in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\nselect,\ntextarea {\n  font: inherit; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Restore the font weight unset by the previous rule.\n */\n\noptgroup {\n  font-weight: bold;\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput { /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect { /* 1 */\n  text-transform: none;\n}\n\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\nhtml [type=\"button\"], /* 1 */\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button; /* 2 */\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Change the border, margin, and padding in all browsers (opinionated).\n */\n\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * Remove the default vertical scrollbar in IE.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on OS X.\n */\n\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * Correct the text style of placeholders in Chrome, Edge, and Safari.\n */\n\n::-webkit-input-placeholder {\n  color: inherit;\n  opacity: 0.54;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n","\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  --font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  --max-content-width: 1000px;\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */\n\n  --screen-xs-min: 480px;  /* Extra small screen / phone */\n  --screen-sm-min: 768px;  /* Small screen / tablet */\n  --screen-md-min: 992px;  /* Medium screen / desktop */\n  --screen-lg-min: 1200px; /* Large screen / wide desktop */\n}\n","\n@import '../../../node_modules/normalize.css/normalize.css';\n\n\n\n@import '../variables.css';\n\n/*\n * Base styles\n * ========================================================================== */\n\nhtml {\n  color: #222;\n  font-weight: 100;\n  font-size: 1em; /* ~16px; */\n  font-family: var(--font-family-base);\n  line-height: 1.375; /* ~22px */\n}\n\na {\n  color: #0074c2;\n}\n\n/*\n * Remove text-shadow in selection highlight:\n * https://twitter.com/miketaylr/status/12228805301\n *\n * These selection rule sets have to be separate.\n * Customize the background color to match your design.\n */\n\n::-moz-selection {\n  background: #b3d4fc;\n  text-shadow: none;\n}\n\n::selection {\n  background: #b3d4fc;\n  text-shadow: none;\n}\n\n/*\n * A better looking default horizontal rule\n */\n\nhr {\n  display: block;\n  height: 1px;\n  border: 0;\n  border-top: 1px solid #ccc;\n  margin: 1em 0;\n  padding: 0;\n}\n\n/*\n * Remove the gap between audio, canvas, iframes,\n * images, videos and the bottom of their containers:\n * https://github.com/h5bp/html5-boilerplate/issues/440\n */\n\naudio,\ncanvas,\niframe,\nimg,\nsvg,\nvideo {\n  vertical-align: middle;\n}\n\n/*\n * Remove default fieldset styles.\n */\n\nfieldset {\n  border: 0;\n  margin: 0;\n  padding: 0;\n}\n\n/*\n * Allow only vertical resizing of textareas.\n */\n\ntextarea {\n  resize: vertical;\n}\n\n/*\n * Browser upgrade prompt\n * ========================================================================== */\n\n:global(.browserupgrade) {\n  margin: 0.2em 0;\n  background: #ccc;\n  color: #000;\n  padding: 0.2em 0;\n}\n\n/*\n * Print styles\n * Inlined to avoid the additional HTTP request:\n * http://www.phpied.com/delay-loading-your-print-css/\n * ========================================================================== */\n\n@media print {\n  *,\n  *::before,\n  *::after {\n    background: transparent !important;\n    color: #000 !important; /* Black prints faster: http://www.sanbeiji.com/archives/953 */\n    box-shadow: none !important;\n    text-shadow: none !important;\n  }\n\n  a,\n  a:visited {\n    text-decoration: underline;\n  }\n\n  a[href]::after {\n    content: ' (' attr(href) ')';\n  }\n\n  abbr[title]::after {\n    content: ' (' attr(title) ')';\n  }\n\n  /*\n   * Don't show links that are fragment identifiers,\n   * or use the `javascript:` pseudo protocol\n   */\n\n  a[href^='#']::after,\n  a[href^='javascript:']::after {\n    content: '';\n  }\n\n  pre,\n  blockquote {\n    border: 1px solid #999;\n    page-break-inside: avoid;\n  }\n\n  /*\n   * Printing Tables:\n   * http://css-discuss.incutio.com/wiki/Printing_Tables\n   */\n\n  thead {\n    display: table-header-group;\n  }\n\n  tr,\n  img {\n    page-break-inside: avoid;\n  }\n\n  img {\n    max-width: 100% !important;\n  }\n\n  p,\n  h2,\n  h3 {\n    orphans: 3;\n    widows: 3;\n  }\n\n  h2,\n  h3 {\n    page-break-after: avoid;\n  }\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports


/***/ },
/* 53 */
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
/* 54 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  var _assign = __webpack_require__(31);
  
  var _assign2 = _interopRequireDefault(_assign);
  
  var _stringify = __webpack_require__(55);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _slicedToArray2 = __webpack_require__(56);
  
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
/* 55 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/json/stringify");

/***/ },
/* 56 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/slicedToArray");

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(43);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(58);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Header = __webpack_require__(59);
  
  var _Header2 = _interopRequireDefault(_Header);
  
  var _Link = __webpack_require__(61);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  var _Navigation = __webpack_require__(68);
  
  var _Navigation2 = _interopRequireDefault(_Navigation);
  
  var _bmf = __webpack_require__(72);
  
  var _bmf2 = _interopRequireDefault(_bmf);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function Header() {
    //console.log("HTTP QUERY: "+query);
    return _react2.default.createElement(
      'div',
      { className: _Header2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Header2.default.container },
        _react2.default.createElement(
          _Link2.default,
          { className: _Header2.default.brand, to: '/' },
          _react2.default.createElement('img', { src: _bmf2.default, width: '38', height: '38', align: 'left', alt: 'React' }),
          _react2.default.createElement(
            'span',
            { className: _Header2.default.brandTxt },
            'Dream True Solutions'
          )
        ),
        _react2.default.createElement(_Navigation2.default, { className: _Header2.default.nav })
      )
    );
  }
  
  exports.default = (0, _withStyles2.default)(_Header2.default)(Header);

/***/ },
/* 58 */
/***/ function(module, exports) {

  module.exports = require("isomorphic-style-loader/lib/withStyles");

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(60);
      var insertCss = __webpack_require__(54);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Header.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Header.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(53)();
  // imports
  
  
  // module
  exports.push([module.id, "\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n}\n\n.Header_root_AA5 {\n  background: #008B8B;\n  color: #fff;\n}\n\n.Header_container_2Ar {\n  margin: 0 auto;\n  padding: 20px 0;\n  max-width: 1000px;\n}\n\n.Header_brand_w2l {\n  color: rgb(146, 229, 252);\n  text-decoration: none;\n  font-size: 1.10em; /* ~28px */\n}\n\n.Header_brandTxt_Qj7 {\n  margin-left: 1px;\n}\n\n.Header_nav_2n3 {\n  float: right;\n  margin-top: 2px;\n  margin-right: 0px;\n  padding-right: 2px;\n}\n\n.Header_banner_2t0 {\n  text-align: center;\n}\n\n.Header_bannerTitle_3Hr {\n  margin: 0;\n  padding: 5px;\n  font-weight: normal;\n  font-size: 2em;\n  line-height: 1em;\n}\n\n.Header_bannerDesc_32d {\n  padding: 0;\n  color: rgba(255, 255, 255, 0.5);\n  font-size: 1.25em;\n  margin: 0;\n}\n", "", {"version":3,"sources":["/./components/variables.css","/./components/Header/Header.css"],"names":[],"mappings":";;AAEA;EACE;;gFAE8E;;EAI9E;;gFAE8E;;EAI9E;;gFAE8E,EAErD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;CAC3D;;AChBD;EACE,oBAAoB;EACpB,YAAY;CACb;;AAED;EACE,eAAe;EACf,gBAAgB;EAChB,kBAAoC;CACrC;;AAED;EACE,0BAAiD;EACjD,sBAAsB;EACtB,kBAAkB,CAAC,WAAW;CAC/B;;AAED;EACE,iBAAiB;CAClB;;AAED;EACE,aAAa;EACb,gBAAgB;EAChB,kBAAkB;EAClB,mBAAmB;CACpB;;AAED;EACE,mBAAmB;CACpB;;AAED;EACE,UAAU;EACV,aAAa;EACb,oBAAoB;EACpB,eAAe;EACf,iBAAiB;CAClB;;AAED;EACE,WAAW;EACX,gCAAgC;EAChC,kBAAkB;EAClB,UAAU;CACX","file":"Header.css","sourcesContent":["\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  --font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  --max-content-width: 1000px;\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */\n\n  --screen-xs-min: 480px;  /* Extra small screen / phone */\n  --screen-sm-min: 768px;  /* Small screen / tablet */\n  --screen-md-min: 992px;  /* Medium screen / desktop */\n  --screen-lg-min: 1200px; /* Large screen / wide desktop */\n}\n","\n@import '../variables.css';\n\n:root {\n  --brand-color: #61dafb;\n}\n\n.root {\n  background: #008B8B;\n  color: #fff;\n}\n\n.container {\n  margin: 0 auto;\n  padding: 20px 0;\n  max-width: var(--max-content-width);\n}\n\n.brand {\n  color: color(var(--brand-color) lightness(+10%));\n  text-decoration: none;\n  font-size: 1.10em; /* ~28px */\n}\n\n.brandTxt {\n  margin-left: 1px;\n}\n\n.nav {\n  float: right;\n  margin-top: 2px;\n  margin-right: 0px;\n  padding-right: 2px;\n}\n\n.banner {\n  text-align: center;\n}\n\n.bannerTitle {\n  margin: 0;\n  padding: 5px;\n  font-weight: normal;\n  font-size: 2em;\n  line-height: 1em;\n}\n\n.bannerDesc {\n  padding: 0;\n  color: rgba(255, 255, 255, 0.5);\n  font-size: 1.25em;\n  margin: 0;\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Header_root_AA5",
  	"container": "Header_container_2Ar",
  	"brand": "Header_brand_w2l",
  	"brandTxt": "Header_brandTxt_Qj7",
  	"nav": "Header_nav_2n3",
  	"banner": "Header_banner_2t0",
  	"bannerTitle": "Header_bannerTitle_3Hr",
  	"bannerDesc": "Header_bannerDesc_32d"
  };

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _extends2 = __webpack_require__(62);
  
  var _extends3 = _interopRequireDefault(_extends2);
  
  var _objectWithoutProperties2 = __webpack_require__(63);
  
  var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
  
  var _getPrototypeOf = __webpack_require__(45);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(46);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(47);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(48);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(49);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(43);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _history = __webpack_require__(64);
  
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
    } // eslint-disable-line react/prefer-stateless-function
  
    (0, _createClass3.default)(Link, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            to = _props.to,
            props = (0, _objectWithoutProperties3.default)(_props, ['to']); // eslint-disable-line no-use-before-define
  
        return _react2.default.createElement('a', (0, _extends3.default)({ href: _history2.default.createHref(to) }, props, { onClick: this.handleClick }));
      }
    }]);
    return Link;
  }(_react.Component);
  
  Link.propTypes = {
    to: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.object]).isRequired,
    onClick: _react.PropTypes.func
  };
  exports.default = Link;

/***/ },
/* 62 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/extends");

/***/ },
/* 63 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/objectWithoutProperties");

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _createBrowserHistory = __webpack_require__(65);
  
  var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);
  
  var _createMemoryHistory = __webpack_require__(66);
  
  var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);
  
  var _useQueries = __webpack_require__(67);
  
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
/* 65 */
/***/ function(module, exports) {

  module.exports = require("history/lib/createBrowserHistory");

/***/ },
/* 66 */
/***/ function(module, exports) {

  module.exports = require("history/lib/createMemoryHistory");

/***/ },
/* 67 */
/***/ function(module, exports) {

  module.exports = require("history/lib/useQueries");

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(43);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _classnames = __webpack_require__(69);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  var _withStyles = __webpack_require__(58);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Navigation = __webpack_require__(70);
  
  var _Navigation2 = _interopRequireDefault(_Navigation);
  
  var _Link = __webpack_require__(61);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function Navigation(_ref) {
    var className = _ref.className;
  
    return _react2.default.createElement(
      'div',
      { className: (0, _classnames2.default)(_Navigation2.default.root, className), role: 'navigation' },
      _react2.default.createElement(
        _Link2.default,
        { className: _Navigation2.default.link, to: '/about' },
        'About'
      ),
      _react2.default.createElement(
        'span',
        { className: _Navigation2.default.spacer },
        '|'
      ),
      _react2.default.createElement(
        _Link2.default,
        { className: _Navigation2.default.link, to: '/contact' },
        'Contact'
      ),
      _react2.default.createElement(
        'span',
        { className: _Navigation2.default.spacer },
        ' | '
      ),
      _react2.default.createElement(
        _Link2.default,
        { className: _Navigation2.default.link, to: '/login' },
        'Customer Log in'
      ),
      _react2.default.createElement(
        'span',
        { className: _Navigation2.default.spacer },
        '|'
      ),
      _react2.default.createElement(
        _Link2.default,
        { className: _Navigation2.default.link, to: '/providerlogin' },
        'Service Provider Login'
      ),
      _react2.default.createElement(
        'span',
        { className: _Navigation2.default.spacer },
        '|'
      ),
      _react2.default.createElement(
        _Link2.default,
        { className: (0, _classnames2.default)(_Navigation2.default.link, _Navigation2.default.highlight), to: '/register' },
        'Customer Sign up'
      ),
      _react2.default.createElement(
        'span',
        { className: _Navigation2.default.spacer },
        ' | '
      ),
      _react2.default.createElement(
        _Link2.default,
        { className: _Navigation2.default.link, to: '/serviceprovider' },
        'Service Provider Registration'
      )
    );
  }
  
  Navigation.propTypes = {
    className: _react.PropTypes.string
  };
  
  exports.default = (0, _withStyles2.default)(_Navigation2.default)(Navigation);

/***/ },
/* 69 */
/***/ function(module, exports) {

  module.exports = require("classnames");

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(71);
      var insertCss = __webpack_require__(54);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Navigation.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Navigation.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(53)();
  // imports
  
  
  // module
  exports.push([module.id, "\n\n.Navigation_root_1XY {\n  margin: 0;\n}\n\n.Navigation_link_3AL {\n  display: inline-block;\n  padding: 3px 5px;\n  text-decoration: none;\n  font-size: 1.000em; /* ~18px */\n}\n\n.Navigation_link_3AL,\n.Navigation_link_3AL:active,\n.Navigation_link_3AL:visited {\n  color: rgba(255, 255, 255, 0.6);\n}\n\n.Navigation_link_3AL:hover {\n  color: rgba(255, 255, 255, 1);\n}\n\n.Navigation_highlight_2nH {\n  margin-right: 8px;\n  margin-left: 8px;\n  border-radius: 3px;\n  background: rgba(0, 0, 0, 0.15);\n  color: #fff;\n}\n\n.Navigation_highlight_2nH:hover {\n  background: rgba(0, 0, 0, 0.3);\n}\n\n.Navigation_spacer_3NE {\n  color: red;\n}\n", "", {"version":3,"sources":["/./components/Navigation/Navigation.css"],"names":[],"mappings":";;AAEA;EACE,UAAU;CACX;;AAED;EACE,sBAAsB;EACtB,iBAAiB;EACjB,sBAAsB;EACtB,mBAAmB,CAAC,WAAW;CAChC;;AAED;;;EAGE,gCAAgC;CACjC;;AAED;EACE,8BAA8B;CAC/B;;AAED;EACE,kBAAkB;EAClB,iBAAiB;EACjB,mBAAmB;EACnB,gCAAgC;EAChC,YAAY;CACb;;AAED;EACE,+BAA+B;CAChC;;AAED;EACE,WAAW;CACZ","file":"Navigation.css","sourcesContent":["\n\n.root {\n  margin: 0;\n}\n\n.link {\n  display: inline-block;\n  padding: 3px 5px;\n  text-decoration: none;\n  font-size: 1.000em; /* ~18px */\n}\n\n.link,\n.link:active,\n.link:visited {\n  color: rgba(255, 255, 255, 0.6);\n}\n\n.link:hover {\n  color: rgba(255, 255, 255, 1);\n}\n\n.highlight {\n  margin-right: 8px;\n  margin-left: 8px;\n  border-radius: 3px;\n  background: rgba(0, 0, 0, 0.15);\n  color: #fff;\n}\n\n.highlight:hover {\n  background: rgba(0, 0, 0, 0.3);\n}\n\n.spacer {\n  color: red;\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Navigation_root_1XY",
  	"link": "Navigation_link_3AL",
  	"highlight": "Navigation_highlight_2nH",
  	"spacer": "Navigation_spacer_3NE"
  };

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = __webpack_require__.p + "components/Header/bmf.png?57f5265da114952432bfae3ba6c7da83";

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(43);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(58);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Feedback = __webpack_require__(74);
  
  var _Feedback2 = _interopRequireDefault(_Feedback);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function Feedback() {
    return _react2.default.createElement(
      'div',
      { className: _Feedback2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Feedback2.default.container },
        _react2.default.createElement(
          'a',
          {
            className: _Feedback2.default.link,
            href: 'https://gitter.im/kriasoft/react-starter-kit'
          },
          'Ask a question'
        ),
        _react2.default.createElement(
          'span',
          { className: _Feedback2.default.spacer },
          '|'
        ),
        _react2.default.createElement(
          'a',
          {
            className: _Feedback2.default.link,
            href: 'https://github.com/kriasoft/react-starter-kit/issues/new'
          },
          'Report an issue'
        )
      )
    );
  }
  
  exports.default = (0, _withStyles2.default)(_Feedback2.default)(Feedback);

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(75);
      var insertCss = __webpack_require__(54);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Feedback.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Feedback.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(53)();
  // imports
  
  
  // module
  exports.push([module.id, "\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n}\n\n.Feedback_root_2M- {\n  background: #f5f5f5;\n  color: #333;\n}\n\n.Feedback_container_2RO {\n  margin: 0 auto;\n  padding: 20px 8px;\n  max-width: 1000px;\n  text-align: center;\n  font-size: 1.5em; /* ~24px */\n}\n\n.Feedback_link_w25,\n.Feedback_link_w25:active,\n.Feedback_link_w25:hover,\n.Feedback_link_w25:visited {\n  color: #333;\n  text-decoration: none;\n}\n\n.Feedback_link_w25:hover {\n  text-decoration: underline;\n}\n\n.Feedback_spacer_1Ur {\n  padding-right: 15px;\n  padding-left: 15px;\n}\n", "", {"version":3,"sources":["/./components/variables.css","/./components/Feedback/Feedback.css"],"names":[],"mappings":";;AAEA;EACE;;gFAE8E;;EAI9E;;gFAE8E;;EAI9E;;gFAE8E,EAErD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;CAC3D;;ACpBD;EACE,oBAAoB;EACpB,YAAY;CACb;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,kBAAoC;EACpC,mBAAmB;EACnB,iBAAiB,CAAC,WAAW;CAC9B;;AAED;;;;EAIE,YAAY;EACZ,sBAAsB;CACvB;;AAED;EACE,2BAA2B;CAC5B;;AAED;EACE,oBAAoB;EACpB,mBAAmB;CACpB","file":"Feedback.css","sourcesContent":["\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  --font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  --max-content-width: 1000px;\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */\n\n  --screen-xs-min: 480px;  /* Extra small screen / phone */\n  --screen-sm-min: 768px;  /* Small screen / tablet */\n  --screen-md-min: 992px;  /* Medium screen / desktop */\n  --screen-lg-min: 1200px; /* Large screen / wide desktop */\n}\n","\n@import '../variables.css';\n\n.root {\n  background: #f5f5f5;\n  color: #333;\n}\n\n.container {\n  margin: 0 auto;\n  padding: 20px 8px;\n  max-width: var(--max-content-width);\n  text-align: center;\n  font-size: 1.5em; /* ~24px */\n}\n\n.link,\n.link:active,\n.link:hover,\n.link:visited {\n  color: #333;\n  text-decoration: none;\n}\n\n.link:hover {\n  text-decoration: underline;\n}\n\n.spacer {\n  padding-right: 15px;\n  padding-left: 15px;\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Feedback_root_2M-",
  	"container": "Feedback_container_2RO",
  	"link": "Feedback_link_w25",
  	"spacer": "Feedback_spacer_1Ur"
  };

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(43);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(58);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Footer = __webpack_require__(77);
  
  var _Footer2 = _interopRequireDefault(_Footer);
  
  var _Link = __webpack_require__(61);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  var _fb = __webpack_require__(79);
  
  var _fb2 = _interopRequireDefault(_fb);
  
  var _twitter = __webpack_require__(80);
  
  var _twitter2 = _interopRequireDefault(_twitter);
  
  var _linkedin = __webpack_require__(81);
  
  var _linkedin2 = _interopRequireDefault(_linkedin);
  
  var _Navigation = __webpack_require__(68);
  
  var _Navigation2 = _interopRequireDefault(_Navigation);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function Footer() {
    return _react2.default.createElement(
      'div',
      { className: _Footer2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Footer2.default.container },
        _react2.default.createElement(
          _Link2.default,
          { className: _Footer2.default.brand, to: '/facebook' },
          _react2.default.createElement('img', { src: _fb2.default, width: '20', height: '20', alt: 'React' }),
          _react2.default.createElement(
            'span',
            { className: _Footer2.default.spacer },
            '   '
          )
        ),
        _react2.default.createElement(
          _Link2.default,
          { className: _Footer2.default.brand, to: '/twitter' },
          _react2.default.createElement('img', { src: _twitter2.default, width: '20', height: '20', alt: 'React' }),
          _react2.default.createElement(
            'span',
            { className: _Footer2.default.spacer },
            ' '
          )
        ),
        _react2.default.createElement(
          _Link2.default,
          { className: _Footer2.default.brand, to: '/linkedin' },
          _react2.default.createElement('img', { src: _linkedin2.default, width: '20', height: '20', alt: 'React' }),
          _react2.default.createElement(
            'span',
            { className: _Footer2.default.spacer },
            ' '
          )
        ),
        _react2.default.createElement(
          'span',
          { className: _Footer2.default.text },
          '\xA9 Dream True Soutions'
        ),
        _react2.default.createElement(
          'span',
          { className: _Footer2.default.spacer },
          '\xB7'
        ),
        _react2.default.createElement(
          _Link2.default,
          { className: _Footer2.default.link, to: '/' },
          'Home'
        ),
        _react2.default.createElement(
          'span',
          { className: _Footer2.default.spacer },
          '\xB7'
        ),
        _react2.default.createElement(
          _Link2.default,
          { className: _Footer2.default.link, to: '/privacy' },
          'Privacy'
        ),
        _react2.default.createElement(
          'span',
          { className: _Footer2.default.spacer },
          '\xB7'
        )
      )
    );
  }
  
  exports.default = (0, _withStyles2.default)(_Footer2.default)(Footer);

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(78);
      var insertCss = __webpack_require__(54);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Footer.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Footer.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(53)();
  // imports
  
  
  // module
  exports.push([module.id, "\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n}\n\n.Footer_root_3mW {\n  background: #446;\n  color: #fff;\n  \n}\n\n.Footer_container_3k8 {\n  margin: 0 auto;\n  padding: 20px 15px;\n  max-width: 1000px;\n  text-align: center;\n}\n\n.Footer_text_jeh {\n  color: rgba(255, 255, 255, 0.5);\n}\n\n.Footer_textMuted_1yA {\n  color: rgba(255, 255, 255, 0.3);\n}\n\n.Footer_spacer_2ei {\n  color: rgba(255, 255, 255, 0.3);\n}\n\n.Footer_text_jeh,\n.Footer_link_2Cg {\n  padding: 2px 5px;\n  font-size: 1em;\n}\n\n.Footer_link_2Cg,\n.Footer_link_2Cg:active,\n.Footer_link_2Cg:visited {\n  color: rgba(255, 255, 255, 0.6);\n  text-decoration: none;\n}\n\n.Footer_link_2Cg:hover {\n  color: rgba(255, 255, 255, 1);\n}\n\n.Footer_brand_17U {\n  color: rgb(146, 229, 252);\n  text-decoration: none;\n  font-size: 1.75em; /* ~28px */\n}", "", {"version":3,"sources":["/./components/variables.css","/./components/Footer/Footer.css"],"names":[],"mappings":";;AAEA;EACE;;gFAE8E;;EAI9E;;gFAE8E;;EAI9E;;gFAE8E,EAErD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;CAC3D;;ACpBD;EACE,iBAAiB;EACjB,YAAY;;CAEb;;AAMD;EACE,eAAe;EACf,mBAAmB;EACnB,kBAAoC;EACpC,mBAAmB;CACpB;;AAED;EACE,gCAAgC;CACjC;;AAED;EAEE,gCAAgC;CACjC;;AAED;EACE,gCAAgC;CACjC;;AAED;;EAEE,iBAAiB;EACjB,eAAe;CAChB;;AAED;;;EAGE,gCAAgC;EAChC,sBAAsB;CACvB;;AAED;EACE,8BAA8B;CAC/B;;AACD;EACE,0BAAiD;EACjD,sBAAsB;EACtB,kBAAkB,CAAC,WAAW;CAC/B","file":"Footer.css","sourcesContent":["\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  --font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  --max-content-width: 1000px;\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */\n\n  --screen-xs-min: 480px;  /* Extra small screen / phone */\n  --screen-sm-min: 768px;  /* Small screen / tablet */\n  --screen-md-min: 992px;  /* Medium screen / desktop */\n  --screen-lg-min: 1200px; /* Large screen / wide desktop */\n}\n","\n@import '../variables.css';\n\n.root {\n  background: #446;\n  color: #fff;\n  \n}\n\n:root {\n  --brand-color: #61dafb;\n}\n\n.container {\n  margin: 0 auto;\n  padding: 20px 15px;\n  max-width: var(--max-content-width);\n  text-align: center;\n}\n\n.text {\n  color: rgba(255, 255, 255, 0.5);\n}\n\n.textMuted {\n  composes: text;\n  color: rgba(255, 255, 255, 0.3);\n}\n\n.spacer {\n  color: rgba(255, 255, 255, 0.3);\n}\n\n.text,\n.link {\n  padding: 2px 5px;\n  font-size: 1em;\n}\n\n.link,\n.link:active,\n.link:visited {\n  color: rgba(255, 255, 255, 0.6);\n  text-decoration: none;\n}\n\n.link:hover {\n  color: rgba(255, 255, 255, 1);\n}\n.brand {\n  color: color(var(--brand-color) lightness(+10%));\n  text-decoration: none;\n  font-size: 1.75em; /* ~28px */\n}"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Footer_root_3mW",
  	"container": "Footer_container_3k8",
  	"text": "Footer_text_jeh",
  	"textMuted": "Footer_textMuted_1yA Footer_text_jeh",
  	"spacer": "Footer_spacer_2ei",
  	"link": "Footer_link_2Cg",
  	"brand": "Footer_brand_17U"
  };

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = __webpack_require__.p + "public/fb.png?637b9a59e490ef651505c74a03122958";

/***/ },
/* 80 */
/***/ function(module, exports) {

  module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpGNzdGMTE3NDA3MjA2ODExOTk0Q0JDNjhBREQ3QkU0OSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFODYxM0VGQUFGMkExMUUxOTBFOUZEM0JFQjVCNTNBRCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFODYxM0VGOUFGMkExMUUxOTBFOUZEM0JFQjVCNTNBRCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1LjEgTWFjaW50b3NoIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDM4MDExNzQwNzIwNjgxMThDMTRDQkRDMUUyOEQ1OEQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Rjc3RjExNzQwNzIwNjgxMTk5NENCQzY4QUREN0JFNDkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5d82l2AAACE0lEQVR42mL8//8/AyWAiYFCwHLgwAEGx0OfBfbb8X7ApgAkB6TqgdgAiB8AcSNQ7QOonAIjQ+MmA0ZmlgX///5xQDcEpBkod+C/qJw+Awc3A8PvnwyMrx59/P/7x3ygtAM/D08bk7yYsOR/BV19oMILQA0GKM5jZU0CyTEISzEwcPMzMAiIMfxXNuBnkFAqYFYxVP7LxhXEpC/B/xRk+n9lQ3kgfR5oyHyQ00AGiEpIyYBtRgbMLAwgA1UEubZ/zjFvZBSbcMBNRMsw9dqnvyFgBR9eMTC8egR07o8HLOLyLH9EZGWwhc3/YEFVYPjdYVEQ4ft+6v7jELAzQQDoTDD+/VPhD46Q52NlvAPSDI7Gk9GG57UUZddgqGJlh2AsQPT/j9NwHzk4OPzi5Bd89ZWJjfH1z/8q/xgY2AjFfY7s/1zFX68fwhPSxQfPbly588D0z58/PIQ0K3Iz7WgyETsJjykQsTHE4C2Qivc5+iXk2ue/+ve//vPA5feJWsx1QP//QDEAKPAHGHV/xCRlWD6wcOsy8Ili1bzJgjPNXoz9/IF7SGkFqLEBSOcD41vg1R+gj3j5UNM6I8MXfQHmtb067AuBmg+DLEOWZwTmRoXjb39rTLn7y+Tml78qz7//V2ZnZvgixMb4Up2H+U6OMtsZS2HWG0C1T9A1wwyAeQWUaXigGKQQ5M8voKQF5WMFAAEGAPZkw8s7EntAAAAAAElFTkSuQmCC"

/***/ },
/* 81 */
/***/ function(module, exports) {

  module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAIFSURBVEhLzZY9SCNREMcnkQQ9cn4gWiiC5AqPEwUjWKhgYadWWlkodpYHOTitTkUEc8WW19gIYquFiCCIHhIxigqCXgQbPdKchXAqfkSzzsxO4kvc1S184A/+vHkzs++/b78STywWMyOLUZjbPQIddIdqYKizBTzdPwyTTMLfh6X0thg/J9nMA12DJpkYO3+l9LaEG6vYzEsTY/sEIJXSIl4bYSNIPegVYhk93D9X4hhgb9USxXY9boU47mik9ROYs+Msiu16XAtx3NFoTzuXCI5telwLcTZai3OJ4Nimx7UQfryh4ensVSoDfh4Tl3c8wuGmNRLFZQD+AoB/p5JAqmsBPnyUicLeihjVt0lGIb4lAfK5iQdzopdHYmo5ComLm6xL/OVrBP4k8wFKyiUj7P8Wo9oWyTxhTvZJhNsenuFRzTnREZmGpfM8mQkHUblH98nnUrHLOfBroCt7HTnO+T1CbpLWo6nmVIzVfVYa6vfl+bLXkePECF1zpWKTG13ahm/z6yyKs1DXkePk0qFrrlSUHJ01aWxhI5OnOLN7It2fFvLqjniBnByj9rqovXiPMryUc1l7H0b5PnkflFwGtVeplRYFbGvWC1uInxOd/D+THaXQVacQMZLfDV1C5B7hRKcQb3NFEcDtFX4x8c+EDuHa5OHtDwWhLuABuLvWIlq7PxSER722NIzBJCouAAAAAElFTkSuQmCC"

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _promise = __webpack_require__(83);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(43);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Home = __webpack_require__(84);
  
  var _Home2 = _interopRequireDefault(_Home);
  
  var _Login = __webpack_require__(87);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  var _config = __webpack_require__(20);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var sessionid;
  
  exports.default = {
  
    path: '/',
  
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
                console.log("Sessionid - index.js - Home " + sessionid);
  
                if (!(sessionid === undefined || sessionid == '')) {
                  _context.next = 9;
                  break;
                }
  
                _context.next = 5;
                return getSessionid();
  
              case 5:
                body = _context.sent;
                return _context.abrupt('return', _react2.default.createElement(_Login2.default, { sessionid: body }));
  
              case 9:
                return _context.abrupt('return', _react2.default.createElement(_Home2.default, { sessionid: sessionid }));
  
              case 10:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
  
  
  function getSessionid() {
    var request = __webpack_require__(92);
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

/***/ },
/* 83 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/promise");

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(43);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(58);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Home = __webpack_require__(85);
  
  var _Home2 = _interopRequireDefault(_Home);
  
  var _Link = __webpack_require__(61);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  var _classnames = __webpack_require__(69);
  
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
  
  function Home(_ref, context) {
    var sessionid = _ref.sessionid,
        email = _ref.email;
  
    context.setTitle(title);
    context.setUser(user);
    // context.getUser('user');
    var logoutlink = "/logout?sessionid=" + sessionid;
    var bookinglink = "/booking?sessionid=" + sessionid;
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        _Link2.default,
        { className: _Home2.default.link, to: bookinglink },
        'Home Function'
      ),
      _react2.default.createElement(
        _Link2.default,
        { className: _Home2.default.link, to: '/contact' },
        'Astrology'
      ),
      _react2.default.createElement('br', null),
      _react2.default.createElement(
        _Link2.default,
        { className: _Home2.default.link, to: '/' },
        'Marriage Services'
      ),
      _react2.default.createElement(
        _Link2.default,
        { className: _Home2.default.link, to: '/register' },
        'Catering'
      ),
      _react2.default.createElement('br', null),
      _react2.default.createElement(
        _Link2.default,
        { className: _Home2.default.link, to: logoutlink },
        'Logout'
      ),
      _react2.default.createElement(
        'span',
        { className: _Home2.default.spacer },
        ' | '
      ),
      _react2.default.createElement('input', {
        id: 'sessionid',
        type: 'hidden',
        name: 'sessionid',
        value: sessionid
      }),
      _react2.default.createElement('input', {
        id: 'email',
        type: 'hidden',
        name: 'email',
        value: email
      })
    );
  }
  
  Home.contextTypes = { setTitle: _react.PropTypes.func.isRequired, setUser: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Home2.default)(Home);

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(86);
      var insertCss = __webpack_require__(54);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Home.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Home.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(53)();
  // imports
  
  
  // module
  exports.push([module.id, "\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n}\n\n.Home_root_3mf {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.Home_container_2ac {\n  margin: 2cm 4cm 3cm 4cm auto;\n  padding: 10 10 100px;\n  max-width: 1000px;\n  max-height: 400px\n}\n\nhtml {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n\n.Home_link_1qG {\n  display: -webkit-inline-box;\n  display: -webkit-inline-flex;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  padding: 13px 13px;\n  text-decoration: none;\n  text-align: center;\n  font-size: 1.125em; /* ~18px */\n}\n\n.Home_link_1qG,\n.Home_link_1qG:active,\n.Home_link_1qG:visited {\n  color: rgba(0, 0, 255, 0.6);\n}\n\n.Home_link_1qG:hover {\n  color: rgba(0, 255, 0, 1);\n}\n\n.Home_highlight_30M {\n  margin-right: 8px;\n  margin-left: 8px;\n  border-radius: 3px;\n  background: rgba(0, 0, 0, 0.15);\n  color: #fff;\n}\n\n.Home_highlight_30M:hover {\n  background: rgba(0, 0, 0, 0.3);\n}\n\n.Home_spacer_3yS {\n  color: rgba(255, 255, 255, 0.3);\n}\n\n\n\n\n", "", {"version":3,"sources":["/./components/variables.css","/./routes/home/Home.css"],"names":[],"mappings":";;AAEA;EACE;;gFAE8E;;EAI9E;;gFAE8E;;EAI9E;;gFAE8E,EAErD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;CAC3D;;ACpBD;EACE,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,6BAA6B;EAC7B,qBAAqB;EACrB,kBAAoC;EACpC,iBAAiB;CAClB;;AAGD;EACE,+BAAuB;UAAvB,uBAAuB;CACxB;;AAED;EACE,4BAAqB;EAArB,6BAAqB;EAArB,4BAAqB;EAArB,qBAAqB;EACrB,mBAAmB;EACnB,sBAAsB;EACtB,mBAAmB;EACnB,mBAAmB,CAAC,WAAW;CAChC;;AAED;;;EAGE,4BAA4B;CAC7B;;AAED;EACE,0BAA0B;CAC3B;;AAED;EACE,kBAAkB;EAClB,iBAAiB;EACjB,mBAAmB;EACnB,gCAAgC;EAChC,YAAY;CACb;;AAED;EACE,+BAA+B;CAChC;;AAED;EACE,gCAAgC;CACjC","file":"Home.css","sourcesContent":["\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  --font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  --max-content-width: 1000px;\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */\n\n  --screen-xs-min: 480px;  /* Extra small screen / phone */\n  --screen-sm-min: 768px;  /* Small screen / tablet */\n  --screen-md-min: 992px;  /* Medium screen / desktop */\n  --screen-lg-min: 1200px; /* Large screen / wide desktop */\n}\n","\n@import '../../components/variables.css';\n\n.root {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.container {\n  margin: 2cm 4cm 3cm 4cm auto;\n  padding: 10 10 100px;\n  max-width: var(--max-content-width);\n  max-height: 400px\n}\n\n\nhtml {\n  box-sizing: border-box;\n}\n\n.link {\n  display: inline-flex;\n  padding: 13px 13px;\n  text-decoration: none;\n  text-align: center;\n  font-size: 1.125em; /* ~18px */\n}\n\n.link,\n.link:active,\n.link:visited {\n  color: rgba(0, 0, 255, 0.6);\n}\n\n.link:hover {\n  color: rgba(0, 255, 0, 1);\n}\n\n.highlight {\n  margin-right: 8px;\n  margin-left: 8px;\n  border-radius: 3px;\n  background: rgba(0, 0, 0, 0.15);\n  color: #fff;\n}\n\n.highlight:hover {\n  background: rgba(0, 0, 0, 0.3);\n}\n\n.spacer {\n  color: rgba(255, 255, 255, 0.3);\n}\n\n\n\n\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Home_root_3mf",
  	"container": "Home_container_2ac",
  	"link": "Home_link_1qG",
  	"highlight": "Home_highlight_30M",
  	"spacer": "Home_spacer_3yS"
  };

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(43);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactDom = __webpack_require__(88);
  
  var _reactDom2 = _interopRequireDefault(_reactDom);
  
  var _withStyles = __webpack_require__(58);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Login = __webpack_require__(89);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  var _Link = __webpack_require__(61);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  var _formsyReact = __webpack_require__(91);
  
  var _formsyReact2 = _interopRequireDefault(_formsyReact);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Entering Credentials';
  //var classNames = require('classnames');
  
  function Login(_ref, context) {
    var sessionid = _ref.sessionid;
  
    context.setTitle(title);
    console.log("Login.js-SessionId: " + { sessionid: sessionid });
    return _react2.default.createElement(
      'div',
      { className: _Login2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Login2.default.container },
        _react2.default.createElement(
          'h1',
          null,
          title
        ),
        _react2.default.createElement(
          'p',
          { className: _Login2.default.lead },
          'Log in with your username or personal email address.'
        ),
        _react2.default.createElement(
          'div',
          { className: _Login2.default.formGroup },
          _react2.default.createElement(
            'a',
            { className: _Login2.default.facebook, href: '/login/facebook' },
            _react2.default.createElement(
              'svg',
              {
                className: _Login2.default.icon,
                width: '10',
                height: '10',
                viewBox: '0 0 10 10',
                xmlns: 'http://www.w3.org/2000/svg'
              },
              _react2.default.createElement('path', {
                d: 'M22 16l1-5h-5V7c0-1.544.784-2 3-2h2V0h-4c-4.072 0-7 2.435-7 7v4H7v5h5v14h6V16h4z'
              })
            ),
            _react2.default.createElement(
              'span',
              null,
              'Log in with Facebook'
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: _Login2.default.formGroup },
          _react2.default.createElement(
            'a',
            { className: _Login2.default.google, href: '/login/google' },
            _react2.default.createElement(
              'svg',
              {
                className: _Login2.default.icon,
                width: '30',
                height: '30',
                viewBox: '0 0 30 30',
                xmlns: 'http://www.w3.org/2000/svg'
              },
              _react2.default.createElement('path', {
                d: 'M30 13h-4V9h-2v4h-4v2h4v4h2v-4h4m-15 2s-2-1.15-2-2c0 0-.5-1.828 1-3 ' + '1.537-1.2 3-3.035 3-5 0-2.336-1.046-5-3-6h3l2.387-1H10C5.835 0 2 3.345 2 7c0 ' + '3.735 2.85 6.56 7.086 6.56.295 0 .58-.006.86-.025-.273.526-.47 1.12-.47 1.735 ' + '0 1.037.817 2.042 1.523 2.73H9c-5.16 0-9 2.593-9 6 0 3.355 4.87 6 10.03 6 5.882 ' + '0 9.97-3 9.97-7 0-2.69-2.545-4.264-5-6zm-4-4c-2.395 0-5.587-2.857-6-6C4.587 ' + '3.856 6.607.93 9 1c2.394.07 4.603 2.908 5.017 6.052C14.43 10.195 13 13 11 ' + '13zm-1 15c-3.566 0-7-1.29-7-4 0-2.658 3.434-5.038 7-5 .832.01 2 0 2 0 1 0 ' + '2.88.88 4 2 1 1 1 2.674 1 3 0 3-1.986 4-7 4z'
              })
            ),
            _react2.default.createElement(
              'span',
              null,
              'Log in with Google'
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: _Login2.default.formGroup },
          _react2.default.createElement(
            'a',
            { className: _Login2.default.twitter, href: '/login/twitter' },
            _react2.default.createElement(
              'svg',
              {
                className: _Login2.default.icon,
                width: '30',
                height: '30',
                viewBox: '0 0 30 30',
                xmlns: 'http://www.w3.org/2000/svg'
              },
              _react2.default.createElement('path', {
                d: 'M30 6.708c-1.105.49-2.756 1.143-4 1.292 1.273-.762 2.54-2.56 ' + '3-4-.97.577-2.087 1.355-3.227 1.773L25 5c-1.12-1.197-2.23-2-4-2-3.398 0-6 ' + '2.602-6 6 0 .4.047.7.11.956L15 10C9 10 5.034 8.724 2 5c-.53.908-1 1.872-1 ' + '3 0 2.136 1.348 3.894 3 5-1.01-.033-2.17-.542-3-1 0 2.98 4.186 6.432 7 7-1 ' + '1-4.623.074-5 0 .784 2.447 3.31 3.95 6 4-2.105 1.648-4.647 2.51-7.53 2.51-.5 ' + '0-.988-.03-1.47-.084C2.723 27.17 6.523 28 10 28c11.322 0 17-8.867 17-17 ' + '0-.268.008-.736 0-1 1.2-.868 2.172-2.058 3-3.292z'
              })
            ),
            _react2.default.createElement(
              'span',
              null,
              'Log in with Twitter'
            )
          )
        ),
        _react2.default.createElement(
          'strong',
          { className: _Login2.default.lineThrough },
          'OR'
        ),
        _react2.default.createElement(
          'form',
          { name: 'form1', method: 'get', action: 'verifypass' },
          _react2.default.createElement(
            'div',
            { className: _Login2.default.formGroup },
            _react2.default.createElement(
              'label',
              { className: _Login2.default.label, htmlFor: 'usernameOrEmail' },
              'Username or email address:'
            ),
            _react2.default.createElement('input', {
              className: _Login2.default.input,
              id: 'usernameOrEmail',
              type: 'email',
              name: 'usernameOrEmail',
              required: 'required',
              autoFocus: true
            })
          ),
          _react2.default.createElement(
            'div',
            { className: _Login2.default.formGroup },
            _react2.default.createElement(
              'label',
              { className: _Login2.default.label, htmlFor: 'password' },
              'Password:'
            ),
            _react2.default.createElement('input', {
              className: _Login2.default.input,
              id: 'password',
              type: 'password',
              name: 'password',
              required: 'required'
            })
          ),
          _react2.default.createElement(
            'div',
            { className: _Login2.default.formGroup },
            _react2.default.createElement(
              'button',
              { className: _Login2.default.button1, type: 'submit' },
              'Log in'
            ),
            _react2.default.createElement(
              _Link2.default,
              { to: '/forgotpass' },
              'Forgot Password'
            ),
            _react2.default.createElement(
              'span',
              { className: _Login2.default.spacer },
              ' | '
            ),
            _react2.default.createElement(
              _Link2.default,
              { to: '/register' },
              'Sign Up'
            ),
            _react2.default.createElement('input', {
              id: 'sessionid',
              type: 'hidden',
              name: 'sessionid',
              value: sessionid
            })
          )
        )
      )
    );
  }
  
  Login.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Login2.default)(Login);

/***/ },
/* 88 */
/***/ function(module, exports) {

  module.exports = require("react-dom");

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(90);
      var insertCss = __webpack_require__(54);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Login.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Login.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(53)();
  // imports
  
  
  // module
  exports.push([module.id, "\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n}\n\n.Login_root_AfB {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\nhtml {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n\n.Login_container_2g2 {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 380px;\n}\n\n.Login_lead_ri6 {\n  font-size: 1.25em;\n}\n\n.Login_formGroup_3_X {\n  margin-bottom: 15px;\n}\n\n.Login_label_2Z7 {\n  display: inline-block;\n  margin-bottom: 5px;\n  max-width: 100%;\n  font-weight: 700;\n}\n\n.Login_input_PvY {\n  display: block;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  padding: 10px 16px;\n  width: 100%;\n  height: 26px;\n  outline: 0;\n  border: 1px solid #ccc;\n  border-radius: 0;\n  background: #fff;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  color: #616161;\n  font-size: 18px;\n  line-height: 1.3333333;\n  -webkit-transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\n  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\n}\n\n.Login_input_PvY:focus {\n  border-color: #0074c2;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\n}\n\n.Login_button_10W {\n  display: block;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  margin: 0;\n  padding: 10px 16px;\n  width: 80%;\n  outline: 10;\n  border: 1px solid #373277;\n  border-radius: 0;\n  background: #373277;\n  color: #fff;\n  text-align: center;\n  text-decoration: none;\n  font-size: 18px;\n  line-height: 1.3333333;\n  cursor: pointer;\n}\n\n.Login_button1_1E- {\n  display: block;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  margin: 0;\n  padding: 10px 16px;\n  width: 50%;\n  outline: 0;\n  border: 1px solid #373277;\n  border-radius: 0;\n  background: #373388;\n  color: #fff;\n  text-align: center;\n  text-decoration: none;\n  font-size: 14px;\n  line-height: 1.3333333;\n  cursor: pointer;\n}\n\n.Login_button_10W:hover {\n  background: rgba(54, 50, 119, 0.8);\n}\n\n.Login_button_10W:focus {\n  border-color: #0074c2;\n  -webkit-box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n          box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n}\n\n.Login_facebook_3CI {\n  border-color: #3b5998;\n  background: #3b5998;\n}\n\n.Login_facebook_3CI:hover {\n  background: #2d4373;\n}\n\n.Login_google_1Ig {\n  border-color: #dd4b39;\n  background: #dd4b39;\n}\n\n.Login_google_1Ig:hover {\n  background: #c23321;\n}\n\n.Login_twitter_3Vq {\n  border-color: #55acee;\n  background: #55acee;\n}\n\n.Login_twitter_3Vq:hover {\n  background: #2795e9;\n}\n\n.Login_icon_97U {\n  display: inline-block;\n  margin: -2px 12px -2px 0;\n  width: 10px;\n  height: 10px;\n  vertical-align: middle;\n  fill: currentColor;\n}\n\n.Login_lineThrough_3eY {\n  position: relative;\n  z-index: 1;\n  display: block;\n  margin-bottom: 15px;\n  width: 100%;\n  color: #757575;\n  text-align: center;\n  font-size: 80%;\n}\n\n.Login_lineThrough_3eY::before {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  z-index: -1;\n  margin-top: -5px;\n  margin-left: -20px;\n  width: 40px;\n  height: 10px;\n  background-color: #fff;\n  content: '';\n}\n\n.Login_lineThrough_3eY::after {\n  position: absolute;\n  top: 49%;\n  z-index: -2;\n  display: block;\n  width: 100%;\n  border-bottom: 1px solid #ddd;\n  content: '';\n}\n", "", {"version":3,"sources":["/./components/variables.css","/./routes/login/Login.css"],"names":[],"mappings":";;AAEA;EACE;;gFAE8E;;EAI9E;;gFAE8E;;EAI9E;;gFAE8E,EAErD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;CAC3D;;ACpBD;EACE,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,+BAAuB;UAAvB,uBAAuB;CACxB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,iBAAiB;CAClB;;AAED;EACE,kBAAkB;CACnB;;AAED;EACE,oBAAoB;CACrB;;AAED;EACE,sBAAsB;EACtB,mBAAmB;EACnB,gBAAgB;EAChB,iBAAiB;CAClB;;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,WAAW;EACX,uBAAuB;EACvB,iBAAiB;EACjB,iBAAiB;EACjB,yDAAiD;UAAjD,iDAAiD;EACjD,eAAe;EACf,gBAAgB;EAChB,uBAAuB;EACvB,yFAAyE;EAAzE,iFAAyE;EAAzE,4EAAyE;EAAzE,yEAAyE;EAAzE,+GAAyE;CAC1E;;AAED;EACE,sBAAsB;EACtB,yFAAiF;UAAjF,iFAAiF;CAClF;;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,UAAU;EACV,mBAAmB;EACnB,WAAW;EACX,YAAY;EACZ,0BAA0B;EAC1B,iBAAiB;EACjB,oBAAoB;EACpB,YAAY;EACZ,mBAAmB;EACnB,sBAAsB;EACtB,gBAAgB;EAChB,uBAAuB;EACvB,gBAAgB;CACjB;;AACD;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,UAAU;EACV,mBAAmB;EACnB,WAAW;EACX,WAAW;EACX,0BAA0B;EAC1B,iBAAiB;EACjB,oBAAoB;EACpB,YAAY;EACZ,mBAAmB;EACnB,sBAAsB;EACtB,gBAAgB;EAChB,uBAAuB;EACvB,gBAAgB;CACjB;;AAED;EACE,mCAAmC;CACpC;;AAED;EACE,sBAAsB;EACtB,mDAA2C;UAA3C,2CAA2C;CAC5C;;AAED;EACE,sBAAsB;EACtB,oBAAoB;CAErB;;AAED;EACE,oBAAoB;CACrB;;AAED;EACE,sBAAsB;EACtB,oBAAoB;CAErB;;AAED;EACE,oBAAoB;CACrB;;AAED;EACE,sBAAsB;EACtB,oBAAoB;CAErB;;AAED;EACE,oBAAoB;CACrB;;AAED;EACE,sBAAsB;EACtB,yBAAyB;EACzB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,mBAAmB;CACpB;;AAED;EACE,mBAAmB;EACnB,WAAW;EACX,eAAe;EACf,oBAAoB;EACpB,YAAY;EACZ,eAAe;EACf,mBAAmB;EACnB,eAAe;CAChB;;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,UAAU;EACV,YAAY;EACZ,iBAAiB;EACjB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,YAAY;CACb;;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,YAAY;EACZ,eAAe;EACf,YAAY;EACZ,8BAA8B;EAC9B,YAAY;CACb","file":"Login.css","sourcesContent":["\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  --font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  --max-content-width: 1000px;\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */\n\n  --screen-xs-min: 480px;  /* Extra small screen / phone */\n  --screen-sm-min: 768px;  /* Small screen / tablet */\n  --screen-md-min: 992px;  /* Medium screen / desktop */\n  --screen-lg-min: 1200px; /* Large screen / wide desktop */\n}\n","\n@import '../../components/variables.css';\n\n.root {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\nhtml {\n  box-sizing: border-box;\n}\n\n.container {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 380px;\n}\n\n.lead {\n  font-size: 1.25em;\n}\n\n.formGroup {\n  margin-bottom: 15px;\n}\n\n.label {\n  display: inline-block;\n  margin-bottom: 5px;\n  max-width: 100%;\n  font-weight: 700;\n}\n\n.input {\n  display: block;\n  box-sizing: border-box;\n  padding: 10px 16px;\n  width: 100%;\n  height: 26px;\n  outline: 0;\n  border: 1px solid #ccc;\n  border-radius: 0;\n  background: #fff;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  color: #616161;\n  font-size: 18px;\n  line-height: 1.3333333;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n}\n\n.input:focus {\n  border-color: #0074c2;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\n}\n\n.button {\n  display: block;\n  box-sizing: border-box;\n  margin: 0;\n  padding: 10px 16px;\n  width: 80%;\n  outline: 10;\n  border: 1px solid #373277;\n  border-radius: 0;\n  background: #373277;\n  color: #fff;\n  text-align: center;\n  text-decoration: none;\n  font-size: 18px;\n  line-height: 1.3333333;\n  cursor: pointer;\n}\n.button1 {\n  display: block;\n  box-sizing: border-box;\n  margin: 0;\n  padding: 10px 16px;\n  width: 50%;\n  outline: 0;\n  border: 1px solid #373277;\n  border-radius: 0;\n  background: #373388;\n  color: #fff;\n  text-align: center;\n  text-decoration: none;\n  font-size: 14px;\n  line-height: 1.3333333;\n  cursor: pointer;\n}\n\n.button:hover {\n  background: rgba(54, 50, 119, 0.8);\n}\n\n.button:focus {\n  border-color: #0074c2;\n  box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n}\n\n.facebook {\n  border-color: #3b5998;\n  background: #3b5998;\n  composes: button;\n}\n\n.facebook:hover {\n  background: #2d4373;\n}\n\n.google {\n  border-color: #dd4b39;\n  background: #dd4b39;\n  composes: button;\n}\n\n.google:hover {\n  background: #c23321;\n}\n\n.twitter {\n  border-color: #55acee;\n  background: #55acee;\n  composes: button;\n}\n\n.twitter:hover {\n  background: #2795e9;\n}\n\n.icon {\n  display: inline-block;\n  margin: -2px 12px -2px 0;\n  width: 10px;\n  height: 10px;\n  vertical-align: middle;\n  fill: currentColor;\n}\n\n.lineThrough {\n  position: relative;\n  z-index: 1;\n  display: block;\n  margin-bottom: 15px;\n  width: 100%;\n  color: #757575;\n  text-align: center;\n  font-size: 80%;\n}\n\n.lineThrough::before {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  z-index: -1;\n  margin-top: -5px;\n  margin-left: -20px;\n  width: 40px;\n  height: 10px;\n  background-color: #fff;\n  content: '';\n}\n\n.lineThrough::after {\n  position: absolute;\n  top: 49%;\n  z-index: -2;\n  display: block;\n  width: 100%;\n  border-bottom: 1px solid #ddd;\n  content: '';\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Login_root_AfB",
  	"container": "Login_container_2g2",
  	"lead": "Login_lead_ri6",
  	"formGroup": "Login_formGroup_3_X",
  	"label": "Login_label_2Z7",
  	"input": "Login_input_PvY",
  	"button": "Login_button_10W",
  	"button1": "Login_button1_1E-",
  	"facebook": "Login_facebook_3CI Login_button_10W",
  	"google": "Login_google_1Ig Login_button_10W",
  	"twitter": "Login_twitter_3Vq Login_button_10W",
  	"icon": "Login_icon_97U",
  	"lineThrough": "Login_lineThrough_3eY"
  };

/***/ },
/* 91 */
/***/ function(module, exports) {

  module.exports = require("formsy-react");

/***/ },
/* 92 */
/***/ function(module, exports) {

  module.exports = require("request");

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(43);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Contact = __webpack_require__(94);
  
  var _Contact2 = _interopRequireDefault(_Contact);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
  
    path: '/contact',
  
    action: function action() {
      return _react2.default.createElement(_Contact2.default, null);
    }
  };

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(43);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(58);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Contact = __webpack_require__(95);
  
  var _Contact2 = _interopRequireDefault(_Contact);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Contact Us';
  
  function Contact(props, context) {
    context.setTitle(title);
    return _react2.default.createElement(
      'div',
      { className: _Contact2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Contact2.default.container },
        _react2.default.createElement(
          'h1',
          null,
          title
        ),
        _react2.default.createElement(
          'p',
          null,
          '...'
        )
      )
    );
  }
  
  Contact.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Contact2.default)(Contact);

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(96);
      var insertCss = __webpack_require__(54);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Contact.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Contact.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(53)();
  // imports
  
  
  // module
  exports.push([module.id, "\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n}\n\n.Contact_root_sD4 {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.Contact_container_PcA {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 1000px;\n}\n", "", {"version":3,"sources":["/./components/variables.css","/./routes/contact/Contact.css"],"names":[],"mappings":";;AAEA;EACE;;gFAE8E;;EAI9E;;gFAE8E;;EAI9E;;gFAE8E,EAErD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;CAC3D;;ACpBD;EACE,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,kBAAoC;CACrC","file":"Contact.css","sourcesContent":["\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  --font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  --max-content-width: 1000px;\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */\n\n  --screen-xs-min: 480px;  /* Extra small screen / phone */\n  --screen-sm-min: 768px;  /* Small screen / tablet */\n  --screen-md-min: 992px;  /* Medium screen / desktop */\n  --screen-lg-min: 1200px; /* Large screen / wide desktop */\n}\n","\n@import '../../components/variables.css';\n\n.root {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.container {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: var(--max-content-width);\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Contact_root_sD4",
  	"container": "Contact_container_PcA"
  };

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _promise = __webpack_require__(83);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(43);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Login = __webpack_require__(87);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  var _config = __webpack_require__(20);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var sessionid = '';
  
  exports.default = {
  
    path: '/login',
  
    action: function action() {
      var _this = this;
  
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var body;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return getSessionid();
  
              case 2:
                body = _context.sent;
  
                console.log("SessionId-Login: " + sessionid);
                return _context.abrupt('return', _react2.default.createElement(_Login2.default, { sessionid: sessionid }));
  
              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
  
  
  function getSessionid() {
    var request = __webpack_require__(92);
    console.log('genSessionid - calling API');
    var url = 'http://' + _config.apihost + '/genSessionid';
    console.log("getSeesionid - URL: " + url);
  
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('genSessionid - Response from API' + body);
          sessionid = body;
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
/* 98 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(43);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Register = __webpack_require__(99);
  
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
  
  exports.default = {
  
    path: '/register',
  
    action: function action() {
      return _react2.default.createElement(_Register2.default, null);
    }
  };

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(43);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(58);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Register = __webpack_require__(100);
  
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
  
  function Register(props, context) {
    context.setTitle(title);
    return _react2.default.createElement(
      'div',
      { className: _Register2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Register2.default.container },
        _react2.default.createElement(
          'h1',
          null,
          title
        ),
        _react2.default.createElement(
          'form',
          { name: 'form1', method: 'put', action: 'savecustomer' },
          _react2.default.createElement(
            'div',
            { classname: _Register2.default.leftContainer },
            _react2.default.createElement('input', { id: 'modifieddate', type: 'hidden', value: currentdate, name: 'modifieddate' }),
            _react2.default.createElement(
              'label',
              { className: _Register2.default.label, htmlFor: 'firstname' },
              'User First Name:'
            ),
            _react2.default.createElement('input', {
              className: _Register2.default.input,
              id: 'firstname',
              type: 'text',
              name: 'firstname',
              autoFocus: true,
              required: true
            })
          ),
          _react2.default.createElement(
            'div',
            { classname: _Register2.default.rightContainer },
            _react2.default.createElement(
              'label',
              { className: _Register2.default.label, htmlFor: 'Last Name' },
              _react2.default.createElement(
                'span',
                null,
                'User Last Name: '
              )
            ),
            _react2.default.createElement('input', {
              className: _Register2.default.input,
              id: 'lname',
              type: 'text',
              name: 'lname',
              required: true
            })
          ),
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'label',
              { className: _Register2.default.label, htmlFor: 'address' },
              _react2.default.createElement(
                'span',
                null,
                'User Address: '
              )
            ),
            _react2.default.createElement('input', {
              className: _Register2.default.input,
              id: 'address',
              type: 'text',
              name: 'address',
              required: true
            }),
            _react2.default.createElement(
              'label',
              { className: _Register2.default.label, htmlFor: 'city' },
              _react2.default.createElement(
                'span',
                null,
                'City: '
              )
            ),
            _react2.default.createElement('input', {
              className: _Register2.default.input,
              id: 'city',
              type: 'text',
              name: 'city',
              required: true
            }),
            _react2.default.createElement(
              'label',
              { className: _Register2.default.label, htmlFor: 'zipcode' },
              _react2.default.createElement(
                'span',
                null,
                'Zipcode: '
              )
            ),
            _react2.default.createElement('input', {
              className: _Register2.default.input,
              id: 'zipcode',
              type: 'number',
              name: 'zipcode',
              required: true
            })
          ),
          _react2.default.createElement(
            'div',
            { className: _Register2.default.formGroup },
            _react2.default.createElement(
              'label',
              { className: _Register2.default.label, htmlFor: 'email' },
              'E-mail:'
            ),
            _react2.default.createElement('input', {
              className: _Register2.default.input,
              id: 'email',
              type: 'email',
              name: 'email',
              required: true
            }),
            _react2.default.createElement(
              'label',
              { className: _Register2.default.label, htmlFor: 'Phone' },
              'phone:'
            ),
            _react2.default.createElement('input', {
              className: _Register2.default.input,
              id: 'phone',
              type: 'text',
              name: 'phone',
              required: true
            })
          ),
          _react2.default.createElement(
            'div',
            { className: _Register2.default.formGroup },
            _react2.default.createElement(
              'button',
              { className: _Register2.default.button, value: 'submit', type: 'submit' },
              'Register'
            )
          )
        )
      )
    );
  }
  
  Register.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Register2.default)(Register);

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(101);
      var insertCss = __webpack_require__(54);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Register.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Register.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(53)();
  // imports
  
  
  // module
  exports.push([module.id, " .Register_root_3RB {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.Register_container_1Lf {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 380px;\n}\n\n.Register_lead_2sJ {\n  font-size: 1.25em;\n}\n\n.Register_formGroup_1Ge {\n  margin-bottom: 20px;\n  \n}\n\n.Register_label_sr8 {\n  \n  margin-bottom: 5px;\n  max-width: 100%;\n  font-weight: 700;\n  float: left;\n}\n\n.Register_input_3So {\n  display: block;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  padding: 10px 16px;\n  width: 100%;\n  height: 46px;\n  outline: 0;\n  border: 1px solid #ccc;\n  border-radius: 10;\n  background: #fff;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  color: #616161;\n  font-size: 18px;\n  line-height: 1.3333333;\n  -webkit-transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\n  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\n  size: 15;\n  max-width: 30; \n}\n\n.Register_input_3So:focus {\n  border-color: #0074c2;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\n}\n\n.Register_button_3Si {\n  display: block;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  margin: 0;\n  padding: 10px 16px;\n  width: 100%;\n  outline: 0;\n  border: 1px solid #373277;\n  border-radius: 0;\n  background: #373277;\n  color: #fff;\n  text-align: center;\n  text-decoration: none;\n  font-size: 18px;\n  line-height: 1.3333333;\n  cursor: pointer;\n}\n\n.Register_button_3Si:hover {\n  background: rgba(54, 50, 119, 0.8);\n}\n\n.Register_button_3Si:focus {\n  border-color: #0074c2;\n  -webkit-box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n          box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n}\n\n.Register_leftContainer_3EI {\n   float:left;\n}\n\n.Register_rightContainer_25i {\n   float:right;\n}\n\n.Register_icon_3KC {\n  display: inline-block;\n  margin: -2px 12px -2px 0;\n  width: 20px;\n  height: 20px;\n  vertical-align: middle;\n  fill: currentColor;\n}\n\n.Register_lineThrough_2IJ {\n  position: relative;\n  z-index: 1;\n  display: block;\n  margin-bottom: 15px;\n  width: 100%;\n  color: #757575;\n  text-align: center;\n  font-size: 80%;\n}\n\n.Register_lineThrough_2IJ::before {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  z-index: -1;\n  margin-top: -5px;\n  margin-left: -20px;\n  width: 40px;\n  height: 10px;\n  background-color: #fff;\n  content: '';\n}\n\n.Register_lineThrough_2IJ::after {\n  position: absolute;\n  top: 49%;\n  z-index: -2;\n  display: block;\n  width: 100%;\n  border-bottom: 1px solid #ddd;\n  content: '';\n}\n\n#Register_lastname_27Z{\n    max-width:100px;\n    float:left;\n}\n\n.Register_div_17d {\n  float:right;\n}", "", {"version":3,"sources":["/./routes/register/Register.css"],"names":[],"mappings":"CAAC;EACC,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,iBAAiB;CAClB;;AAED;EACE,kBAAkB;CACnB;;AAED;EACE,oBAAoB;;CAErB;;AAED;;EAEE,mBAAmB;EACnB,gBAAgB;EAChB,iBAAiB;EACjB,YAAY;CACb;;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,WAAW;EACX,uBAAuB;EACvB,kBAAkB;EAClB,iBAAiB;EACjB,yDAAiD;UAAjD,iDAAiD;EACjD,eAAe;EACf,gBAAgB;EAChB,uBAAuB;EACvB,yFAAyE;EAAzE,iFAAyE;EAAzE,4EAAyE;EAAzE,yEAAyE;EAAzE,+GAAyE;EACzE,SAAS;EACT,cAAc;CACf;;AAED;EACE,sBAAsB;EACtB,yFAAiF;UAAjF,iFAAiF;CAClF;;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,UAAU;EACV,mBAAmB;EACnB,YAAY;EACZ,WAAW;EACX,0BAA0B;EAC1B,iBAAiB;EACjB,oBAAoB;EACpB,YAAY;EACZ,mBAAmB;EACnB,sBAAsB;EACtB,gBAAgB;EAChB,uBAAuB;EACvB,gBAAgB;CACjB;;AAED;EACE,mCAAmC;CACpC;;AAED;EACE,sBAAsB;EACtB,mDAA2C;UAA3C,2CAA2C;CAC5C;;AAED;GACG,WAAW;CACb;;AAED;GACG,YAAY;CACd;;AAED;EACE,sBAAsB;EACtB,yBAAyB;EACzB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,mBAAmB;CACpB;;AAED;EACE,mBAAmB;EACnB,WAAW;EACX,eAAe;EACf,oBAAoB;EACpB,YAAY;EACZ,eAAe;EACf,mBAAmB;EACnB,eAAe;CAChB;;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,UAAU;EACV,YAAY;EACZ,iBAAiB;EACjB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,YAAY;CACb;;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,YAAY;EACZ,eAAe;EACf,YAAY;EACZ,8BAA8B;EAC9B,YAAY;CACb;;AACD;IACI,gBAAgB;IAChB,WAAW;CACd;;AAED;EACE,YAAY;CACb","file":"Register.css","sourcesContent":[" .root {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.container {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 380px;\n}\n\n.lead {\n  font-size: 1.25em;\n}\n\n.formGroup {\n  margin-bottom: 20px;\n  \n}\n\n.label {\n  \n  margin-bottom: 5px;\n  max-width: 100%;\n  font-weight: 700;\n  float: left;\n}\n\n.input {\n  display: block;\n  box-sizing: border-box;\n  padding: 10px 16px;\n  width: 100%;\n  height: 46px;\n  outline: 0;\n  border: 1px solid #ccc;\n  border-radius: 10;\n  background: #fff;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  color: #616161;\n  font-size: 18px;\n  line-height: 1.3333333;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n  size: 15;\n  max-width: 30; \n}\n\n.input:focus {\n  border-color: #0074c2;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\n}\n\n.button {\n  display: block;\n  box-sizing: border-box;\n  margin: 0;\n  padding: 10px 16px;\n  width: 100%;\n  outline: 0;\n  border: 1px solid #373277;\n  border-radius: 0;\n  background: #373277;\n  color: #fff;\n  text-align: center;\n  text-decoration: none;\n  font-size: 18px;\n  line-height: 1.3333333;\n  cursor: pointer;\n}\n\n.button:hover {\n  background: rgba(54, 50, 119, 0.8);\n}\n\n.button:focus {\n  border-color: #0074c2;\n  box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n}\n\n.leftContainer {\n   float:left;\n}\n\n.rightContainer {\n   float:right;\n}\n\n.icon {\n  display: inline-block;\n  margin: -2px 12px -2px 0;\n  width: 20px;\n  height: 20px;\n  vertical-align: middle;\n  fill: currentColor;\n}\n\n.lineThrough {\n  position: relative;\n  z-index: 1;\n  display: block;\n  margin-bottom: 15px;\n  width: 100%;\n  color: #757575;\n  text-align: center;\n  font-size: 80%;\n}\n\n.lineThrough::before {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  z-index: -1;\n  margin-top: -5px;\n  margin-left: -20px;\n  width: 40px;\n  height: 10px;\n  background-color: #fff;\n  content: '';\n}\n\n.lineThrough::after {\n  position: absolute;\n  top: 49%;\n  z-index: -2;\n  display: block;\n  width: 100%;\n  border-bottom: 1px solid #ddd;\n  content: '';\n}\n#lastname{\n    max-width:100px;\n    float:left;\n}\n\n.div {\n  float:right;\n}"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Register_root_3RB",
  	"container": "Register_container_1Lf",
  	"lead": "Register_lead_2sJ",
  	"formGroup": "Register_formGroup_1Ge",
  	"label": "Register_label_sr8",
  	"input": "Register_input_3So",
  	"button": "Register_button_3Si",
  	"leftContainer": "Register_leftContainer_3EI",
  	"rightContainer": "Register_rightContainer_25i",
  	"icon": "Register_icon_3KC",
  	"lineThrough": "Register_lineThrough_2IJ",
  	"lastname": "Register_lastname_27Z",
  	"div": "Register_div_17d"
  };

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _promise = __webpack_require__(83);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _stringify = __webpack_require__(55);
  
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
  
  var _react = __webpack_require__(43);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Savecustomer = __webpack_require__(103);
  
  var _Savecustomer2 = _interopRequireDefault(_Savecustomer);
  
  var _Login = __webpack_require__(106);
  
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
  
  var request = __webpack_require__(92);
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
                return _context.abrupt('return', _react2.default.createElement(_Savecustomer2.default, { message: message, redirectlink: href, message1: message1 }));
  
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
/* 103 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(43);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(58);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Savecustomer = __webpack_require__(104);
  
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
  
  function Savecustomer(_ref, context) {
    var message = _ref.message,
        redirectlink = _ref.redirectlink,
        message1 = _ref.message1;
  
    context.setTitle(title);
    return _react2.default.createElement(
      'div',
      { className: _Savecustomer2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Savecustomer2.default.container },
        _react2.default.createElement(
          'h1',
          null,
          title
        ),
        _react2.default.createElement(
          'p',
          null,
          message
        ),
        _react2.default.createElement(
          'a',
          { href: redirectlink },
          message1,
          ' '
        )
      )
    );
  }
  
  Savecustomer.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Savecustomer2.default)(Savecustomer);

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(105);
      var insertCss = __webpack_require__(54);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Savecustomer.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Savecustomer.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(53)();
  // imports
  
  
  // module
  exports.push([module.id, " .Savecustomer_root_1nS {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.Savecustomer_container_lBN {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 380px;\n}\n\n.Savecustomer_lead_EIt {\n  font-size: 1.25em;\n}\n\n.Savecustomer_formGroup_3qk {\n  margin-bottom: 20px;\n  \n}\n\n.Savecustomer_label_2Fo {\n  \n  margin-bottom: 5px;\n  max-width: 100%;\n  font-weight: 700;\n  float: left;\n}\n\n.Savecustomer_input_2C9 {\n  display: block;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  padding: 10px 16px;\n  width: 100%;\n  height: 46px;\n  outline: 0;\n  border: 1px solid #ccc;\n  border-radius: 10;\n  background: #fff;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  color: #616161;\n  font-size: 18px;\n  line-height: 1.3333333;\n  -webkit-transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\n  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\n}\n\n.Savecustomer_input_2C9:focus {\n  border-color: #0074c2;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\n}\n\n.Savecustomer_button_1Za {\n  display: block;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  margin: 0;\n  padding: 10px 16px;\n  width: 100%;\n  outline: 0;\n  border: 1px solid #373277;\n  border-radius: 0;\n  background: #373277;\n  color: #fff;\n  text-align: center;\n  text-decoration: none;\n  font-size: 18px;\n  line-height: 1.3333333;\n  cursor: pointer;\n}\n\n.Savecustomer_button_1Za:hover {\n  background: rgba(54, 50, 119, 0.8);\n}\n\n.Savecustomer_button_1Za:focus {\n  border-color: #0074c2;\n  -webkit-box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n          box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n}\n\n.\n\n.Savecustomer_icon_2t6 {\n  display: inline-block;\n  margin: -2px 12px -2px 0;\n  width: 20px;\n  height: 20px;\n  vertical-align: middle;\n  fill: currentColor;\n}\n\n.Savecustomer_lineThrough_1yJ {\n  position: relative;\n  z-index: 1;\n  display: block;\n  margin-bottom: 15px;\n  width: 100%;\n  color: #757575;\n  text-align: center;\n  font-size: 80%;\n}\n\n.Savecustomer_lineThrough_1yJ::before {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  z-index: -1;\n  margin-top: -5px;\n  margin-left: -20px;\n  width: 40px;\n  height: 10px;\n  background-color: #fff;\n  content: '';\n}\n\n.Savecustomer_lineThrough_1yJ::after {\n  position: absolute;\n  top: 49%;\n  z-index: -2;\n  display: block;\n  width: 100%;\n  border-bottom: 1px solid #ddd;\n  content: '';\n}\n\n#Savecustomer_lastname_3YE{\n    max-width:100px;\n    float:left;\n}\n\n.Savecustomer_div_3UG {\n  float:right;\n}\n\n#Savecustomer_leftContainer_3RP {\n   float:left;\n}\n\n#Savecustomer_rightContainer_L4- {\n   float:right;\n}", "", {"version":3,"sources":["/./routes/savecustomer/Savecustomer.css"],"names":[],"mappings":"CAAC;EACC,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,iBAAiB;CAClB;;AAED;EACE,kBAAkB;CACnB;;AAED;EACE,oBAAoB;;CAErB;;AAED;;EAEE,mBAAmB;EACnB,gBAAgB;EAChB,iBAAiB;EACjB,YAAY;CACb;;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,WAAW;EACX,uBAAuB;EACvB,kBAAkB;EAClB,iBAAiB;EACjB,yDAAiD;UAAjD,iDAAiD;EACjD,eAAe;EACf,gBAAgB;EAChB,uBAAuB;EACvB,yFAAyE;EAAzE,iFAAyE;EAAzE,4EAAyE;EAAzE,yEAAyE;EAAzE,+GAAyE;CAC1E;;AAED;EACE,sBAAsB;EACtB,yFAAiF;UAAjF,iFAAiF;CAClF;;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,UAAU;EACV,mBAAmB;EACnB,YAAY;EACZ,WAAW;EACX,0BAA0B;EAC1B,iBAAiB;EACjB,oBAAoB;EACpB,YAAY;EACZ,mBAAmB;EACnB,sBAAsB;EACtB,gBAAgB;EAChB,uBAAuB;EACvB,gBAAgB;CACjB;;AAED;EACE,mCAAmC;CACpC;;AAED;EACE,sBAAsB;EACtB,mDAA2C;UAA3C,2CAA2C;CAC5C;;AAED;;;EAGE,sBAAsB;EACtB,yBAAyB;EACzB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,mBAAmB;CACpB;;AAED;EACE,mBAAmB;EACnB,WAAW;EACX,eAAe;EACf,oBAAoB;EACpB,YAAY;EACZ,eAAe;EACf,mBAAmB;EACnB,eAAe;CAChB;;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,UAAU;EACV,YAAY;EACZ,iBAAiB;EACjB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,YAAY;CACb;;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,YAAY;EACZ,eAAe;EACf,YAAY;EACZ,8BAA8B;EAC9B,YAAY;CACb;;AACD;IACI,gBAAgB;IAChB,WAAW;CACd;;AAED;EACE,YAAY;CACb;;AAED;GACG,WAAW;CACb;;AAED;GACG,YAAY;CACd","file":"Savecustomer.css","sourcesContent":[" .root {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.container {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 380px;\n}\n\n.lead {\n  font-size: 1.25em;\n}\n\n.formGroup {\n  margin-bottom: 20px;\n  \n}\n\n.label {\n  \n  margin-bottom: 5px;\n  max-width: 100%;\n  font-weight: 700;\n  float: left;\n}\n\n.input {\n  display: block;\n  box-sizing: border-box;\n  padding: 10px 16px;\n  width: 100%;\n  height: 46px;\n  outline: 0;\n  border: 1px solid #ccc;\n  border-radius: 10;\n  background: #fff;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  color: #616161;\n  font-size: 18px;\n  line-height: 1.3333333;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n}\n\n.input:focus {\n  border-color: #0074c2;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\n}\n\n.button {\n  display: block;\n  box-sizing: border-box;\n  margin: 0;\n  padding: 10px 16px;\n  width: 100%;\n  outline: 0;\n  border: 1px solid #373277;\n  border-radius: 0;\n  background: #373277;\n  color: #fff;\n  text-align: center;\n  text-decoration: none;\n  font-size: 18px;\n  line-height: 1.3333333;\n  cursor: pointer;\n}\n\n.button:hover {\n  background: rgba(54, 50, 119, 0.8);\n}\n\n.button:focus {\n  border-color: #0074c2;\n  box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n}\n\n.\n\n.icon {\n  display: inline-block;\n  margin: -2px 12px -2px 0;\n  width: 20px;\n  height: 20px;\n  vertical-align: middle;\n  fill: currentColor;\n}\n\n.lineThrough {\n  position: relative;\n  z-index: 1;\n  display: block;\n  margin-bottom: 15px;\n  width: 100%;\n  color: #757575;\n  text-align: center;\n  font-size: 80%;\n}\n\n.lineThrough::before {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  z-index: -1;\n  margin-top: -5px;\n  margin-left: -20px;\n  width: 40px;\n  height: 10px;\n  background-color: #fff;\n  content: '';\n}\n\n.lineThrough::after {\n  position: absolute;\n  top: 49%;\n  z-index: -2;\n  display: block;\n  width: 100%;\n  border-bottom: 1px solid #ddd;\n  content: '';\n}\n#lastname{\n    max-width:100px;\n    float:left;\n}\n\n.div {\n  float:right;\n}\n\n#leftContainer {\n   float:left;\n}\n\n#rightContainer {\n   float:right;\n}"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Savecustomer_root_1nS",
  	"container": "Savecustomer_container_lBN",
  	"lead": "Savecustomer_lead_EIt",
  	"formGroup": "Savecustomer_formGroup_3qk",
  	"label": "Savecustomer_label_2Fo",
  	"input": "Savecustomer_input_2C9",
  	"button": "Savecustomer_button_1Za",
  	"icon": "Savecustomer_icon_2t6",
  	"lineThrough": "Savecustomer_lineThrough_1yJ",
  	"lastname": "Savecustomer_lastname_3YE",
  	"div": "Savecustomer_div_3UG",
  	"leftContainer": "Savecustomer_leftContainer_3RP",
  	"rightContainer": "Savecustomer_rightContainer_L4-"
  };

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _promise = __webpack_require__(83);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(43);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Login = __webpack_require__(107);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  var _config = __webpack_require__(20);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var sessionid = '';
  
  exports.default = {
  
    path: '/login',
  
    action: function action() {
      var _this = this;
  
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var body;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return getSessionid();
  
              case 2:
                body = _context.sent;
  
                console.log("SessionId-Login: " + sessionid);
                return _context.abrupt('return', _react2.default.createElement(_Login2.default, { sessionid: sessionid }));
  
              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
  
  
  function getSessionid() {
    var request = __webpack_require__(92);
    console.log('genSessionid - calling API');
    var url = 'http://' + _config.apihost + '/genSessionid';
    console.log("getSeesionid - URL: " + url);
  
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('genSessionid - Response from API' + body);
          sessionid = body;
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
/* 107 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(43);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactDom = __webpack_require__(88);
  
  var _reactDom2 = _interopRequireDefault(_reactDom);
  
  var _withStyles = __webpack_require__(58);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Login = __webpack_require__(108);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  var _Link = __webpack_require__(61);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  var _formsyReact = __webpack_require__(91);
  
  var _formsyReact2 = _interopRequireDefault(_formsyReact);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Entering Credentials';
  //var classNames = require('classnames');
  
  function Login(_ref, context) {
    var sessionid = _ref.sessionid;
  
    context.setTitle(title);
    console.log("Login.js-SessionId: " + { sessionid: sessionid });
    return _react2.default.createElement(
      'div',
      { className: _Login2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Login2.default.container },
        _react2.default.createElement(
          'h1',
          null,
          title
        ),
        _react2.default.createElement(
          'p',
          { className: _Login2.default.lead },
          'Log in with your username or personal email address.'
        ),
        _react2.default.createElement(
          'div',
          { className: _Login2.default.formGroup },
          _react2.default.createElement(
            'a',
            { className: _Login2.default.facebook, href: '/login/facebook' },
            _react2.default.createElement(
              'svg',
              {
                className: _Login2.default.icon,
                width: '10',
                height: '10',
                viewBox: '0 0 10 10',
                xmlns: 'http://www.w3.org/2000/svg'
              },
              _react2.default.createElement('path', {
                d: 'M22 16l1-5h-5V7c0-1.544.784-2 3-2h2V0h-4c-4.072 0-7 2.435-7 7v4H7v5h5v14h6V16h4z'
              })
            ),
            _react2.default.createElement(
              'span',
              null,
              'Log in with Facebook'
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: _Login2.default.formGroup },
          _react2.default.createElement(
            'a',
            { className: _Login2.default.google, href: '/login/google' },
            _react2.default.createElement(
              'svg',
              {
                className: _Login2.default.icon,
                width: '30',
                height: '30',
                viewBox: '0 0 30 30',
                xmlns: 'http://www.w3.org/2000/svg'
              },
              _react2.default.createElement('path', {
                d: 'M30 13h-4V9h-2v4h-4v2h4v4h2v-4h4m-15 2s-2-1.15-2-2c0 0-.5-1.828 1-3 ' + '1.537-1.2 3-3.035 3-5 0-2.336-1.046-5-3-6h3l2.387-1H10C5.835 0 2 3.345 2 7c0 ' + '3.735 2.85 6.56 7.086 6.56.295 0 .58-.006.86-.025-.273.526-.47 1.12-.47 1.735 ' + '0 1.037.817 2.042 1.523 2.73H9c-5.16 0-9 2.593-9 6 0 3.355 4.87 6 10.03 6 5.882 ' + '0 9.97-3 9.97-7 0-2.69-2.545-4.264-5-6zm-4-4c-2.395 0-5.587-2.857-6-6C4.587 ' + '3.856 6.607.93 9 1c2.394.07 4.603 2.908 5.017 6.052C14.43 10.195 13 13 11 ' + '13zm-1 15c-3.566 0-7-1.29-7-4 0-2.658 3.434-5.038 7-5 .832.01 2 0 2 0 1 0 ' + '2.88.88 4 2 1 1 1 2.674 1 3 0 3-1.986 4-7 4z'
              })
            ),
            _react2.default.createElement(
              'span',
              null,
              'Log in with Google'
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: _Login2.default.formGroup },
          _react2.default.createElement(
            'a',
            { className: _Login2.default.twitter, href: '/login/twitter' },
            _react2.default.createElement(
              'svg',
              {
                className: _Login2.default.icon,
                width: '30',
                height: '30',
                viewBox: '0 0 30 30',
                xmlns: 'http://www.w3.org/2000/svg'
              },
              _react2.default.createElement('path', {
                d: 'M30 6.708c-1.105.49-2.756 1.143-4 1.292 1.273-.762 2.54-2.56 ' + '3-4-.97.577-2.087 1.355-3.227 1.773L25 5c-1.12-1.197-2.23-2-4-2-3.398 0-6 ' + '2.602-6 6 0 .4.047.7.11.956L15 10C9 10 5.034 8.724 2 5c-.53.908-1 1.872-1 ' + '3 0 2.136 1.348 3.894 3 5-1.01-.033-2.17-.542-3-1 0 2.98 4.186 6.432 7 7-1 ' + '1-4.623.074-5 0 .784 2.447 3.31 3.95 6 4-2.105 1.648-4.647 2.51-7.53 2.51-.5 ' + '0-.988-.03-1.47-.084C2.723 27.17 6.523 28 10 28c11.322 0 17-8.867 17-17 ' + '0-.268.008-.736 0-1 1.2-.868 2.172-2.058 3-3.292z'
              })
            ),
            _react2.default.createElement(
              'span',
              null,
              'Log in with Twitter'
            )
          )
        ),
        _react2.default.createElement(
          'strong',
          { className: _Login2.default.lineThrough },
          'OR'
        ),
        _react2.default.createElement(
          'form',
          { name: 'form1', method: 'get', action: 'verifypass' },
          _react2.default.createElement(
            'div',
            { className: _Login2.default.formGroup },
            _react2.default.createElement(
              'label',
              { className: _Login2.default.label, htmlFor: 'usernameOrEmail' },
              'Username or email address:'
            ),
            _react2.default.createElement('input', {
              className: _Login2.default.input,
              id: 'usernameOrEmail',
              type: 'email',
              name: 'usernameOrEmail',
              required: 'required',
              autoFocus: true
            })
          ),
          _react2.default.createElement(
            'div',
            { className: _Login2.default.formGroup },
            _react2.default.createElement(
              'label',
              { className: _Login2.default.label, htmlFor: 'password' },
              'Password:'
            ),
            _react2.default.createElement('input', {
              className: _Login2.default.input,
              id: 'password',
              type: 'password',
              name: 'password',
              required: 'required'
            })
          ),
          _react2.default.createElement(
            'div',
            { className: _Login2.default.formGroup },
            _react2.default.createElement(
              'button',
              { className: _Login2.default.button1, type: 'submit' },
              'Log in'
            ),
            _react2.default.createElement(
              _Link2.default,
              { to: '/forgotpass' },
              'Forgot Password'
            ),
            _react2.default.createElement(
              'span',
              { className: _Login2.default.spacer },
              ' | '
            ),
            _react2.default.createElement(
              _Link2.default,
              { to: '/register' },
              'Sign Up'
            ),
            _react2.default.createElement('input', {
              id: 'sessionid',
              type: 'hidden',
              name: 'sessionid',
              value: sessionid
            })
          )
        )
      )
    );
  }
  
  Login.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Login2.default)(Login);

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(109);
      var insertCss = __webpack_require__(54);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Login.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Login.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(53)();
  // imports
  
  
  // module
  exports.push([module.id, "\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n}\n\n.Login_root_2w1 {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\nhtml {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n\n.Login_container__GI {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 380px;\n}\n\n.Login_lead_1kn {\n  font-size: 1.25em;\n}\n\n.Login_formGroup_1oM {\n  margin-bottom: 15px;\n}\n\n.Login_label_1Gy {\n  display: inline-block;\n  margin-bottom: 5px;\n  max-width: 100%;\n  font-weight: 700;\n}\n\n.Login_input_3Hu {\n  display: block;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  padding: 10px 16px;\n  width: 100%;\n  height: 26px;\n  outline: 0;\n  border: 1px solid #ccc;\n  border-radius: 0;\n  background: #fff;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  color: #616161;\n  font-size: 18px;\n  line-height: 1.3333333;\n  -webkit-transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\n  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\n}\n\n.Login_input_3Hu:focus {\n  border-color: #0074c2;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\n}\n\n.Login_button_2e4 {\n  display: block;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  margin: 0;\n  padding: 10px 16px;\n  width: 80%;\n  outline: 10;\n  border: 1px solid #373277;\n  border-radius: 0;\n  background: #373277;\n  color: #fff;\n  text-align: center;\n  text-decoration: none;\n  font-size: 18px;\n  line-height: 1.3333333;\n  cursor: pointer;\n}\n\n.Login_button1_Mej {\n  display: block;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  margin: 0;\n  padding: 10px 16px;\n  width: 50%;\n  outline: 0;\n  border: 1px solid #373277;\n  border-radius: 0;\n  background: #373388;\n  color: #fff;\n  text-align: center;\n  text-decoration: none;\n  font-size: 14px;\n  line-height: 1.3333333;\n  cursor: pointer;\n}\n\n.Login_button_2e4:hover {\n  background: rgba(54, 50, 119, 0.8);\n}\n\n.Login_button_2e4:focus {\n  border-color: #0074c2;\n  -webkit-box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n          box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n}\n\n.Login_facebook_1Zm {\n  border-color: #3b5998;\n  background: #3b5998;\n}\n\n.Login_facebook_1Zm:hover {\n  background: #2d4373;\n}\n\n.Login_google_U0z {\n  border-color: #dd4b39;\n  background: #dd4b39;\n}\n\n.Login_google_U0z:hover {\n  background: #c23321;\n}\n\n.Login_twitter_1C5 {\n  border-color: #55acee;\n  background: #55acee;\n}\n\n.Login_twitter_1C5:hover {\n  background: #2795e9;\n}\n\n.Login_icon_2K7 {\n  display: inline-block;\n  margin: -2px 12px -2px 0;\n  width: 10px;\n  height: 10px;\n  vertical-align: middle;\n  fill: currentColor;\n}\n\n.Login_lineThrough_1sW {\n  position: relative;\n  z-index: 1;\n  display: block;\n  margin-bottom: 15px;\n  width: 100%;\n  color: #757575;\n  text-align: center;\n  font-size: 80%;\n}\n\n.Login_lineThrough_1sW::before {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  z-index: -1;\n  margin-top: -5px;\n  margin-left: -20px;\n  width: 40px;\n  height: 10px;\n  background-color: #fff;\n  content: '';\n}\n\n.Login_lineThrough_1sW::after {\n  position: absolute;\n  top: 49%;\n  z-index: -2;\n  display: block;\n  width: 100%;\n  border-bottom: 1px solid #ddd;\n  content: '';\n}\n", "", {"version":3,"sources":["/./components/variables.css","/./routes/Login/Login.css"],"names":[],"mappings":";;AAEA;EACE;;gFAE8E;;EAI9E;;gFAE8E;;EAI9E;;gFAE8E,EAErD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;CAC3D;;ACpBD;EACE,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,+BAAuB;UAAvB,uBAAuB;CACxB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,iBAAiB;CAClB;;AAED;EACE,kBAAkB;CACnB;;AAED;EACE,oBAAoB;CACrB;;AAED;EACE,sBAAsB;EACtB,mBAAmB;EACnB,gBAAgB;EAChB,iBAAiB;CAClB;;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,WAAW;EACX,uBAAuB;EACvB,iBAAiB;EACjB,iBAAiB;EACjB,yDAAiD;UAAjD,iDAAiD;EACjD,eAAe;EACf,gBAAgB;EAChB,uBAAuB;EACvB,yFAAyE;EAAzE,iFAAyE;EAAzE,4EAAyE;EAAzE,yEAAyE;EAAzE,+GAAyE;CAC1E;;AAED;EACE,sBAAsB;EACtB,yFAAiF;UAAjF,iFAAiF;CAClF;;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,UAAU;EACV,mBAAmB;EACnB,WAAW;EACX,YAAY;EACZ,0BAA0B;EAC1B,iBAAiB;EACjB,oBAAoB;EACpB,YAAY;EACZ,mBAAmB;EACnB,sBAAsB;EACtB,gBAAgB;EAChB,uBAAuB;EACvB,gBAAgB;CACjB;;AACD;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,UAAU;EACV,mBAAmB;EACnB,WAAW;EACX,WAAW;EACX,0BAA0B;EAC1B,iBAAiB;EACjB,oBAAoB;EACpB,YAAY;EACZ,mBAAmB;EACnB,sBAAsB;EACtB,gBAAgB;EAChB,uBAAuB;EACvB,gBAAgB;CACjB;;AAED;EACE,mCAAmC;CACpC;;AAED;EACE,sBAAsB;EACtB,mDAA2C;UAA3C,2CAA2C;CAC5C;;AAED;EACE,sBAAsB;EACtB,oBAAoB;CAErB;;AAED;EACE,oBAAoB;CACrB;;AAED;EACE,sBAAsB;EACtB,oBAAoB;CAErB;;AAED;EACE,oBAAoB;CACrB;;AAED;EACE,sBAAsB;EACtB,oBAAoB;CAErB;;AAED;EACE,oBAAoB;CACrB;;AAED;EACE,sBAAsB;EACtB,yBAAyB;EACzB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,mBAAmB;CACpB;;AAED;EACE,mBAAmB;EACnB,WAAW;EACX,eAAe;EACf,oBAAoB;EACpB,YAAY;EACZ,eAAe;EACf,mBAAmB;EACnB,eAAe;CAChB;;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,UAAU;EACV,YAAY;EACZ,iBAAiB;EACjB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,YAAY;CACb;;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,YAAY;EACZ,eAAe;EACf,YAAY;EACZ,8BAA8B;EAC9B,YAAY;CACb","file":"Login.css","sourcesContent":["\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  --font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  --max-content-width: 1000px;\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */\n\n  --screen-xs-min: 480px;  /* Extra small screen / phone */\n  --screen-sm-min: 768px;  /* Small screen / tablet */\n  --screen-md-min: 992px;  /* Medium screen / desktop */\n  --screen-lg-min: 1200px; /* Large screen / wide desktop */\n}\n","\n@import '../../components/variables.css';\n\n.root {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\nhtml {\n  box-sizing: border-box;\n}\n\n.container {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 380px;\n}\n\n.lead {\n  font-size: 1.25em;\n}\n\n.formGroup {\n  margin-bottom: 15px;\n}\n\n.label {\n  display: inline-block;\n  margin-bottom: 5px;\n  max-width: 100%;\n  font-weight: 700;\n}\n\n.input {\n  display: block;\n  box-sizing: border-box;\n  padding: 10px 16px;\n  width: 100%;\n  height: 26px;\n  outline: 0;\n  border: 1px solid #ccc;\n  border-radius: 0;\n  background: #fff;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  color: #616161;\n  font-size: 18px;\n  line-height: 1.3333333;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n}\n\n.input:focus {\n  border-color: #0074c2;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\n}\n\n.button {\n  display: block;\n  box-sizing: border-box;\n  margin: 0;\n  padding: 10px 16px;\n  width: 80%;\n  outline: 10;\n  border: 1px solid #373277;\n  border-radius: 0;\n  background: #373277;\n  color: #fff;\n  text-align: center;\n  text-decoration: none;\n  font-size: 18px;\n  line-height: 1.3333333;\n  cursor: pointer;\n}\n.button1 {\n  display: block;\n  box-sizing: border-box;\n  margin: 0;\n  padding: 10px 16px;\n  width: 50%;\n  outline: 0;\n  border: 1px solid #373277;\n  border-radius: 0;\n  background: #373388;\n  color: #fff;\n  text-align: center;\n  text-decoration: none;\n  font-size: 14px;\n  line-height: 1.3333333;\n  cursor: pointer;\n}\n\n.button:hover {\n  background: rgba(54, 50, 119, 0.8);\n}\n\n.button:focus {\n  border-color: #0074c2;\n  box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n}\n\n.facebook {\n  border-color: #3b5998;\n  background: #3b5998;\n  composes: button;\n}\n\n.facebook:hover {\n  background: #2d4373;\n}\n\n.google {\n  border-color: #dd4b39;\n  background: #dd4b39;\n  composes: button;\n}\n\n.google:hover {\n  background: #c23321;\n}\n\n.twitter {\n  border-color: #55acee;\n  background: #55acee;\n  composes: button;\n}\n\n.twitter:hover {\n  background: #2795e9;\n}\n\n.icon {\n  display: inline-block;\n  margin: -2px 12px -2px 0;\n  width: 10px;\n  height: 10px;\n  vertical-align: middle;\n  fill: currentColor;\n}\n\n.lineThrough {\n  position: relative;\n  z-index: 1;\n  display: block;\n  margin-bottom: 15px;\n  width: 100%;\n  color: #757575;\n  text-align: center;\n  font-size: 80%;\n}\n\n.lineThrough::before {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  z-index: -1;\n  margin-top: -5px;\n  margin-left: -20px;\n  width: 40px;\n  height: 10px;\n  background-color: #fff;\n  content: '';\n}\n\n.lineThrough::after {\n  position: absolute;\n  top: 49%;\n  z-index: -2;\n  display: block;\n  width: 100%;\n  border-bottom: 1px solid #ddd;\n  content: '';\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Login_root_2w1",
  	"container": "Login_container__GI",
  	"lead": "Login_lead_1kn",
  	"formGroup": "Login_formGroup_1oM",
  	"label": "Login_label_1Gy",
  	"input": "Login_input_3Hu",
  	"button": "Login_button_2e4",
  	"button1": "Login_button1_Mej",
  	"facebook": "Login_facebook_1Zm Login_button_2e4",
  	"google": "Login_google_U0z Login_button_2e4",
  	"twitter": "Login_twitter_1C5 Login_button_2e4",
  	"icon": "Login_icon_2K7",
  	"lineThrough": "Login_lineThrough_1sW"
  };

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _stringify = __webpack_require__(55);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(43);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Content = __webpack_require__(111);
  
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
/* 111 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(45);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(46);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(47);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(48);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(49);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(43);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(58);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Content = __webpack_require__(112);
  
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
        return _react2.default.createElement(
          'div',
          { className: _Content2.default.root },
          _react2.default.createElement(
            'div',
            { className: _Content2.default.container },
            this.props.path === '/' ? null : _react2.default.createElement(
              'h1',
              null,
              this.props.title
            ),
            _react2.default.createElement('div', { dangerouslySetInnerHTML: { __html: this.props.content || '' } })
          )
        );
      }
    }]);
    return Content;
  }(_react.Component);
  
  Content.contextTypes = {
    setTitle: _react.PropTypes.func.isRequired
  };
  Content.propTypes = {
    path: _react.PropTypes.string.isRequired,
    content: _react.PropTypes.string.isRequired,
    title: _react.PropTypes.string
  };
  exports.default = (0, _withStyles2.default)(_Content2.default)(Content);

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(113);
      var insertCss = __webpack_require__(54);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Content.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Content.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(53)();
  // imports
  
  
  // module
  exports.push([module.id, "\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n}\n\n.Content_root_2X0 {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.Content_container_20T {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 1000px;\n}\n", "", {"version":3,"sources":["/./components/variables.css","/./routes/content/Content.css"],"names":[],"mappings":";;AAEA;EACE;;gFAE8E;;EAI9E;;gFAE8E;;EAI9E;;gFAE8E,EAErD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;CAC3D;;ACnBD;EACE,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,kBAAoC;CACrC","file":"Content.css","sourcesContent":["\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  --font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  --max-content-width: 1000px;\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */\n\n  --screen-xs-min: 480px;  /* Extra small screen / phone */\n  --screen-sm-min: 768px;  /* Small screen / tablet */\n  --screen-md-min: 992px;  /* Medium screen / desktop */\n  --screen-lg-min: 1200px; /* Large screen / wide desktop */\n}\n","\n\n@import '../../components/variables.css';\n\n.root {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.container {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: var(--max-content-width);\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Content_root_2X0",
  	"container": "Content_container_20T"
  };

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(43);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _App = __webpack_require__(44);
  
  var _App2 = _interopRequireDefault(_App);
  
  var _ErrorPage = __webpack_require__(115);
  
  var _ErrorPage2 = _interopRequireDefault(_ErrorPage);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
  
    path: '/error',
  
    action: function action(_ref) {
      var render = _ref.render,
          context = _ref.context,
          error = _ref.error;
  
      return render(_react2.default.createElement(
        _App2.default,
        { context: context, error: error },
        _react2.default.createElement(_ErrorPage2.default, { error: error })
      ), error.status || 500);
    }
  };

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(43);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(58);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _ErrorPage = __webpack_require__(116);
  
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
    } else if (true) {
      errorMessage = _react2.default.createElement(
        'pre',
        null,
        error.stack
      );
    }
  
    context.setTitle(title);
  
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'h1',
        null,
        title
      ),
      _react2.default.createElement(
        'p',
        null,
        content
      ),
      errorMessage
    );
  }
  
  ErrorPage.propTypes = { error: _react.PropTypes.object.isRequired };
  ErrorPage.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_ErrorPage2.default)(ErrorPage);

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(117);
      var insertCss = __webpack_require__(54);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./ErrorPage.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./ErrorPage.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(53)();
  // imports
  
  
  // module
  exports.push([module.id, "\n* {\n  line-height: 1.2;\n  margin: 0;\n}\n\nhtml {\n  color: #888;\n  display: table;\n  font-family: sans-serif;\n  height: 100%;\n  text-align: center;\n  width: 100%;\n}\n\nbody {\n  display: table-cell;\n  vertical-align: middle;\n  /* stylelint-disable */\n  margin: 2em auto;\n  /* stylelint-enable */\n}\n\nh1 {\n  color: #555;\n  font-size: 2em;\n  font-weight: 400;\n}\n\np {\n  margin: 0 auto;\n  width: 280px;\n}\n\npre {\n  text-align: left;\n  margin-top: 32px;\n  margin-top: 2rem;\n}\n\n@media only screen and (max-width: 280px) {\n\n  body,\n  p {\n    width: 95%;\n  }\n\n  h1 {\n    font-size: 1.5em;\n    margin: 0 0 0.3em;\n  }\n\n}\n", "", {"version":3,"sources":["/./routes/error/ErrorPage.css"],"names":[],"mappings":";AACA;EACE,iBAAiB;EACjB,UAAU;CACX;;AAED;EACE,YAAY;EACZ,eAAe;EACf,wBAAwB;EACxB,aAAa;EACb,mBAAmB;EACnB,YAAY;CACb;;AAED;EACE,oBAAoB;EACpB,uBAAuB;EACvB,uBAAuB;EACvB,iBAAiB;EACjB,sBAAsB;CACvB;;AAED;EACE,YAAY;EACZ,eAAe;EACf,iBAAiB;CAClB;;AAED;EACE,eAAe;EACf,aAAa;CACd;;AAED;EACE,iBAAiB;EACjB,iBAAiB;EAAjB,iBAAiB;CAClB;;AAED;;EAEE;;IAEE,WAAW;GACZ;;EAED;IACE,iBAAiB;IACjB,kBAAkB;GACnB;;CAEF","file":"ErrorPage.css","sourcesContent":["\n* {\n  line-height: 1.2;\n  margin: 0;\n}\n\nhtml {\n  color: #888;\n  display: table;\n  font-family: sans-serif;\n  height: 100%;\n  text-align: center;\n  width: 100%;\n}\n\nbody {\n  display: table-cell;\n  vertical-align: middle;\n  /* stylelint-disable */\n  margin: 2em auto;\n  /* stylelint-enable */\n}\n\nh1 {\n  color: #555;\n  font-size: 2em;\n  font-weight: 400;\n}\n\np {\n  margin: 0 auto;\n  width: 280px;\n}\n\npre {\n  text-align: left;\n  margin-top: 2rem;\n}\n\n@media only screen and (max-width: 280px) {\n\n  body,\n  p {\n    width: 95%;\n  }\n\n  h1 {\n    font-size: 1.5em;\n    margin: 0 0 0.3em;\n  }\n\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports


/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _promise = __webpack_require__(83);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(43);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Verifypass = __webpack_require__(119);
  
  var _Verifypass2 = _interopRequireDefault(_Verifypass);
  
  var _Login = __webpack_require__(87);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  var _ErrorPage = __webpack_require__(115);
  
  var _ErrorPage2 = _interopRequireDefault(_ErrorPage);
  
  var _Home = __webpack_require__(84);
  
  var _Home2 = _interopRequireDefault(_Home);
  
  var _config = __webpack_require__(20);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var request = __webpack_require__(92);
  
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
        var body;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
  
                console.log("inside the verifypass");
                // var sess = request.session;
                //session.sessionid = query.sessionid;
                //console.log("Session ID: "+query.sessionid);
                userEmail = query.usernameOrEmail;
                password = query.password;
                sessionid = query.sessionid;
                console.log(userEmail);
                console.log(password);
                console.log("SessionId: ") + sessionid;
                url = 'http://' + _config.apihost + '/checklogin?usernameOrEmail=' + userEmail + '&password=' + password;
  
                _context.next = 10;
                return verifylogin(url);
  
              case 10:
                validLogin = _context.sent;
  
                console.log("Result from API call: " + validLogin);
  
                if (!(validLogin == 'true')) {
                  _context.next = 20;
                  break;
                }
  
                _context.next = 15;
                return SaveSessionData();
  
              case 15:
                body = _context.sent;
  
                console.log(" Going to Home Page");
                return _context.abrupt('return', _react2.default.createElement(_Home2.default, { sessionid: sessionid, email: userEmail }));
  
              case 20:
                console.log(" Invalid Credential return to Login Page");
                return _context.abrupt('return', _react2.default.createElement(_Login2.default, null));
  
              case 22:
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

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(43);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(58);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _VerifyPass = __webpack_require__(120);
  
  var _VerifyPass2 = _interopRequireDefault(_VerifyPass);
  
  var _me = __webpack_require__(27);
  
  var _me2 = _interopRequireDefault(_me);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Verify Credential';
  var user = 'Customer';
  
  function VerifyPass(_ref, props, context) {
    var message = _ref.message,
        sessionid = _ref.sessionid;
  
    context.setUser(user);
    context.setTitle(title);
  
    return _react2.default.createElement(
      'div',
      { className: _VerifyPass2.default.root },
      _react2.default.createElement(
        'div',
        { className: _VerifyPass2.default.container },
        _react2.default.createElement(
          'h1',
          null,
          title
        ),
        _react2.default.createElement(
          'p',
          null,
          message
        ),
        _react2.default.createElement(
          'a',
          { href: redirectlink },
          'Click Here to Login '
        ),
        _react2.default.createElement('input', {
          id: 'sessionid',
          type: 'hidden',
          name: 'sessionid',
          value: sessionid
        })
      )
    );
  }
  
  VerifyPass.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_VerifyPass2.default)(VerifyPass);

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(121);
      var insertCss = __webpack_require__(54);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./VerifyPass.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./VerifyPass.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(53)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n}\n.VerifyPass_root_3U8 {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n.VerifyPass_container_270 {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 380px;\n}\n.VerifyPass_lead_M-y {\n  font-size: 1.25em;\n}\n.VerifyPass_formGroup_K23 {\n  margin-bottom: 20px;\n}\n.VerifyPass_label_1xU {\n  display: inline-block;\n  margin-bottom: 5px;\n  max-width: 100%;\n  font-weight: 700;\n}\n.VerifyPass_input_3ir {\n  display: block;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  padding: 10px 16px;\n  width: 100%;\n  height: 46px;\n  outline: 0;\n  border: 1px solid #ccc;\n  border-radius: 10;\n  background: #fff;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  color: #616161;\n  font-size: 18px;\n  line-height: 1.3333333;\n  -webkit-transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\n  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\n}\n.VerifyPass_input_3ir:focus {\n  border-color: #0074c2;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\n}\n.VerifyPass_button_YQ7 {\n  display: block;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  margin: 0;\n  padding: 10px 16px;\n  width: 100%;\n  outline: 0;\n  border: 1px solid #373277;\n  border-radius: 0;\n  background: #373277;\n  color: #fff;\n  text-align: center;\n  text-decoration: none;\n  font-size: 18px;\n  line-height: 1.3333333;\n  cursor: pointer;\n}\n.VerifyPass_button_YQ7:hover {\n  background: rgba(54, 50, 119, 0.8);\n}\n.VerifyPass_button_YQ7:focus {\n  border-color: #0074c2;\n  -webkit-box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n          box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n}\n.VerifyPass_facebook_3az {\n  border-color: #3b5998;\n  background: #3b5998;\n}\n.VerifyPass_facebook_3az:hover {\n  background: #2d4373;\n}\n.VerifyPass_google_2t1 {\n  border-color: #dd4b39;\n  background: #dd4b39;\n}\n.VerifyPass_google_2t1:hover {\n  background: #c23321;\n}\n.VerifyPass_twitter_3GY {\n  border-color: #55acee;\n  background: #55acee;\n}\n.VerifyPass_twitter_3GY:hover {\n  background: #2795e9;\n}\n.VerifyPass_icon_2IJ {\n  display: inline-block;\n  margin: -2px 12px -2px 0;\n  width: 20px;\n  height: 20px;\n  vertical-align: middle;\n  fill: currentColor;\n}\n.VerifyPass_lineThrough_1A5 {\n  position: relative;\n  z-index: 1;\n  display: block;\n  margin-bottom: 15px;\n  width: 100%;\n  color: #757575;\n  text-align: center;\n  font-size: 80%;\n}\n.VerifyPass_lineThrough_1A5::before {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  z-index: -1;\n  margin-top: -5px;\n  margin-left: -20px;\n  width: 40px;\n  height: 10px;\n  background-color: #fff;\n  content: '';\n}\n.VerifyPass_lineThrough_1A5::after {\n  position: absolute;\n  top: 49%;\n  z-index: -2;\n  display: block;\n  width: 100%;\n  border-bottom: 1px solid #ddd;\n  content: '';\n}\n", "", {"version":3,"sources":["/./routes/verifypass/VerifyPass.css","/./components/variables.css"],"names":[],"mappings":"AAAA;;;;;;;GAOG;ACLH;EACE;;gFAE8E;;EAI9E;;gFAE8E;;EAI9E;;gFAE8E,EAErD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;CAC3D;ADbD;EACE,mBAAmB;EACnB,oBAAoB;CACrB;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,iBAAiB;CAClB;AAED;EACE,kBAAkB;CACnB;AAED;EACE,oBAAoB;CACrB;AAED;EACE,sBAAsB;EACtB,mBAAmB;EACnB,gBAAgB;EAChB,iBAAiB;CAClB;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,WAAW;EACX,uBAAuB;EACvB,kBAAkB;EAClB,iBAAiB;EACjB,yDAAiD;UAAjD,iDAAiD;EACjD,eAAe;EACf,gBAAgB;EAChB,uBAAuB;EACvB,yFAAyE;EAAzE,iFAAyE;EAAzE,4EAAyE;EAAzE,yEAAyE;EAAzE,+GAAyE;CAC1E;AAED;EACE,sBAAsB;EACtB,yFAAiF;UAAjF,iFAAiF;CAClF;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,UAAU;EACV,mBAAmB;EACnB,YAAY;EACZ,WAAW;EACX,0BAA0B;EAC1B,iBAAiB;EACjB,oBAAoB;EACpB,YAAY;EACZ,mBAAmB;EACnB,sBAAsB;EACtB,gBAAgB;EAChB,uBAAuB;EACvB,gBAAgB;CACjB;AAED;EACE,mCAAmC;CACpC;AAED;EACE,sBAAsB;EACtB,mDAA2C;UAA3C,2CAA2C;CAC5C;AAED;EACE,sBAAsB;EACtB,oBAAoB;CAErB;AAED;EACE,oBAAoB;CACrB;AAED;EACE,sBAAsB;EACtB,oBAAoB;CAErB;AAED;EACE,oBAAoB;CACrB;AAED;EACE,sBAAsB;EACtB,oBAAoB;CAErB;AAED;EACE,oBAAoB;CACrB;AAED;EACE,sBAAsB;EACtB,yBAAyB;EACzB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,mBAAmB;CACpB;AAED;EACE,mBAAmB;EACnB,WAAW;EACX,eAAe;EACf,oBAAoB;EACpB,YAAY;EACZ,eAAe;EACf,mBAAmB;EACnB,eAAe;CAChB;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,UAAU;EACV,YAAY;EACZ,iBAAiB;EACjB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,YAAY;CACb;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,YAAY;EACZ,eAAe;EACf,YAAY;EACZ,8BAA8B;EAC9B,YAAY;CACb","file":"VerifyPass.css","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n@import '../../components/variables.css';\n\n.root {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.container {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 380px;\n}\n\n.lead {\n  font-size: 1.25em;\n}\n\n.formGroup {\n  margin-bottom: 20px;\n}\n\n.label {\n  display: inline-block;\n  margin-bottom: 5px;\n  max-width: 100%;\n  font-weight: 700;\n}\n\n.input {\n  display: block;\n  box-sizing: border-box;\n  padding: 10px 16px;\n  width: 100%;\n  height: 46px;\n  outline: 0;\n  border: 1px solid #ccc;\n  border-radius: 10;\n  background: #fff;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  color: #616161;\n  font-size: 18px;\n  line-height: 1.3333333;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n}\n\n.input:focus {\n  border-color: #0074c2;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\n}\n\n.button {\n  display: block;\n  box-sizing: border-box;\n  margin: 0;\n  padding: 10px 16px;\n  width: 100%;\n  outline: 0;\n  border: 1px solid #373277;\n  border-radius: 0;\n  background: #373277;\n  color: #fff;\n  text-align: center;\n  text-decoration: none;\n  font-size: 18px;\n  line-height: 1.3333333;\n  cursor: pointer;\n}\n\n.button:hover {\n  background: rgba(54, 50, 119, 0.8);\n}\n\n.button:focus {\n  border-color: #0074c2;\n  box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n}\n\n.facebook {\n  border-color: #3b5998;\n  background: #3b5998;\n  composes: button;\n}\n\n.facebook:hover {\n  background: #2d4373;\n}\n\n.google {\n  border-color: #dd4b39;\n  background: #dd4b39;\n  composes: button;\n}\n\n.google:hover {\n  background: #c23321;\n}\n\n.twitter {\n  border-color: #55acee;\n  background: #55acee;\n  composes: button;\n}\n\n.twitter:hover {\n  background: #2795e9;\n}\n\n.icon {\n  display: inline-block;\n  margin: -2px 12px -2px 0;\n  width: 20px;\n  height: 20px;\n  vertical-align: middle;\n  fill: currentColor;\n}\n\n.lineThrough {\n  position: relative;\n  z-index: 1;\n  display: block;\n  margin-bottom: 15px;\n  width: 100%;\n  color: #757575;\n  text-align: center;\n  font-size: 80%;\n}\n\n.lineThrough::before {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  z-index: -1;\n  margin-top: -5px;\n  margin-left: -20px;\n  width: 40px;\n  height: 10px;\n  background-color: #fff;\n  content: '';\n}\n\n.lineThrough::after {\n  position: absolute;\n  top: 49%;\n  z-index: -2;\n  display: block;\n  width: 100%;\n  border-bottom: 1px solid #ddd;\n  content: '';\n}\n","\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  --font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  --max-content-width: 1000px;\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */\n\n  --screen-xs-min: 480px;  /* Extra small screen / phone */\n  --screen-sm-min: 768px;  /* Small screen / tablet */\n  --screen-md-min: 992px;  /* Medium screen / desktop */\n  --screen-lg-min: 1200px; /* Large screen / wide desktop */\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "VerifyPass_root_3U8",
  	"container": "VerifyPass_container_270",
  	"lead": "VerifyPass_lead_M-y",
  	"formGroup": "VerifyPass_formGroup_K23",
  	"label": "VerifyPass_label_1xU",
  	"input": "VerifyPass_input_3ir",
  	"button": "VerifyPass_button_YQ7",
  	"facebook": "VerifyPass_facebook_3az VerifyPass_button_YQ7",
  	"google": "VerifyPass_google_2t1 VerifyPass_button_YQ7",
  	"twitter": "VerifyPass_twitter_3GY VerifyPass_button_YQ7",
  	"icon": "VerifyPass_icon_2IJ",
  	"lineThrough": "VerifyPass_lineThrough_1A5"
  };

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _promise = __webpack_require__(83);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(43);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Forgotpass = __webpack_require__(123);
  
  var _Forgotpass2 = _interopRequireDefault(_Forgotpass);
  
  var _Login = __webpack_require__(87);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  var _config = __webpack_require__(20);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var request = __webpack_require__(92);
  
  var status = 'false';
  var errormessage = '';
  
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
  
  
                console.log("Email ID:" + email);
  
                if (!(typeof email === 'undefined')) {
                  _context.next = 6;
                  break;
                }
  
                return _context.abrupt('return', _react2.default.createElement(_Forgotpass2.default, null));
  
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
                return _context.abrupt('return', _react2.default.createElement(_Login2.default, null));
  
              case 26:
                console.log("Error in Reseting password request");
                return _context.abrupt('return', _react2.default.createElement(_Forgotpass2.default, { errormessage: errormessage }));
  
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
  
    console.log('calling API');
    var url = 'http://' + _config.apihost + '/findemail?email=' + email;
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
/* 123 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(43);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(58);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Forgotpass = __webpack_require__(124);
  
  var _Forgotpass2 = _interopRequireDefault(_Forgotpass);
  
  var _Link = __webpack_require__(61);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Changing Password';
  
  function Forgotpass(props, context) {
    context.setTitle(title);
    return _react2.default.createElement(
      'div',
      { className: _Forgotpass2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Forgotpass2.default.container },
        _react2.default.createElement(
          'h1',
          null,
          title
        ),
        _react2.default.createElement(
          'form',
          { name: 'form1', method: 'put', action: 'forgotpass' },
          _react2.default.createElement(
            'div',
            { className: _Forgotpass2.default.formGroup },
            _react2.default.createElement(
              'label',
              { className: _Forgotpass2.default.label, htmlFor: 'email' },
              'Email:'
            ),
            _react2.default.createElement('input', {
              className: _Forgotpass2.default.input,
              id: 'email',
              type: 'email',
              name: 'email',
              placeholder: 'Enter E-mail',
              required: 'required'
            })
          ),
          _react2.default.createElement(
            'div',
            { className: _Forgotpass2.default.formGroup },
            _react2.default.createElement(
              'button',
              { className: _Forgotpass2.default.button, type: 'submit' },
              'Send Reset Email'
            )
          )
        )
      )
    );
  }
  
  Forgotpass.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Forgotpass2.default)(Forgotpass);

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(125);
      var insertCss = __webpack_require__(54);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Forgotpass.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Forgotpass.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(53)();
  // imports
  
  
  // module
  exports.push([module.id, "\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n}\n\n.Forgotpass_root_2bx {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.Forgotpass_container_2z1 {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 380px;\n}\n\n.Forgotpass_lead_3Qz {\n  font-size: 1.25em;\n}\n\n.Forgotpass_formGroup_xHr {\n  margin-bottom: 20px;\n}\n\n.Forgotpass_label_1Je {\n  display: inline-block;\n  margin-bottom: 5px;\n  max-width: 100%;\n  font-weight: 700;\n}\n\n.Forgotpass_input_hyq {\n  display: block;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  padding: 10px 16px;\n  width: 100%;\n  height: 46px;\n  outline: 0;\n  border: 1px solid #ccc;\n  border-radius: 10;\n  background: #fff;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  color: #616161;\n  font-size: 18px;\n  line-height: 1.3333333;\n  -webkit-transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\n  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\n}\n\n.Forgotpass_input_hyq:focus {\n  border-color: #0074c2;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\n}\n\n.Forgotpass_button_7B_ {\n  display: block;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  margin: 0;\n  padding: 10px 16px;\n  width: 100%;\n  outline: 0;\n  border: 1px solid #373277;\n  border-radius: 0;\n  background: #373277;\n  color: #fff;\n  text-align: center;\n  text-decoration: none;\n  font-size: 18px;\n  line-height: 1.3333333;\n  cursor: pointer;\n}\n\n.Forgotpass_button_7B_:hover {\n  background: rgba(54, 50, 119, 0.8);\n}\n\n.Forgotpass_button_7B_:focus {\n  border-color: #0074c2;\n  -webkit-box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n          box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n}\n\n.Forgotpass_facebook_2eZ {\n  border-color: #3b5998;\n  background: #3b5998;\n}\n\n.Forgotpass_facebook_2eZ:hover {\n  background: #2d4373;\n}\n\n.Forgotpass_google_TMn {\n  border-color: #dd4b39;\n  background: #dd4b39;\n}\n\n.Forgotpass_google_TMn:hover {\n  background: #c23321;\n}\n\n.Forgotpass_twitter_XfU {\n  border-color: #55acee;\n  background: #55acee;\n}\n\n.Forgotpass_twitter_XfU:hover {\n  background: #2795e9;\n}\n\n.Forgotpass_icon_2y1 {\n  display: inline-block;\n  margin: -2px 12px -2px 0;\n  width: 20px;\n  height: 20px;\n  vertical-align: middle;\n  fill: currentColor;\n}\n\n.Forgotpass_lineThrough_34a {\n  position: relative;\n  z-index: 1;\n  display: block;\n  margin-bottom: 15px;\n  width: 100%;\n  color: #757575;\n  text-align: center;\n  font-size: 80%;\n}\n\n.Forgotpass_lineThrough_34a::before {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  z-index: -1;\n  margin-top: -5px;\n  margin-left: -20px;\n  width: 40px;\n  height: 10px;\n  background-color: #fff;\n  content: '';\n}\n\n.Forgotpass_lineThrough_34a::after {\n  position: absolute;\n  top: 49%;\n  z-index: -2;\n  display: block;\n  width: 100%;\n  border-bottom: 1px solid #ddd;\n  content: '';\n}\n", "", {"version":3,"sources":["/./components/variables.css","/./routes/forgotpass/Forgotpass.css"],"names":[],"mappings":";;AAEA;EACE;;gFAE8E;;EAI9E;;gFAE8E;;EAI9E;;gFAE8E,EAErD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;CAC3D;;ACpBD;EACE,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,iBAAiB;CAClB;;AAED;EACE,kBAAkB;CACnB;;AAED;EACE,oBAAoB;CACrB;;AAED;EACE,sBAAsB;EACtB,mBAAmB;EACnB,gBAAgB;EAChB,iBAAiB;CAClB;;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,WAAW;EACX,uBAAuB;EACvB,kBAAkB;EAClB,iBAAiB;EACjB,yDAAiD;UAAjD,iDAAiD;EACjD,eAAe;EACf,gBAAgB;EAChB,uBAAuB;EACvB,yFAAyE;EAAzE,iFAAyE;EAAzE,4EAAyE;EAAzE,yEAAyE;EAAzE,+GAAyE;CAC1E;;AAED;EACE,sBAAsB;EACtB,yFAAiF;UAAjF,iFAAiF;CAClF;;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,UAAU;EACV,mBAAmB;EACnB,YAAY;EACZ,WAAW;EACX,0BAA0B;EAC1B,iBAAiB;EACjB,oBAAoB;EACpB,YAAY;EACZ,mBAAmB;EACnB,sBAAsB;EACtB,gBAAgB;EAChB,uBAAuB;EACvB,gBAAgB;CACjB;;AAED;EACE,mCAAmC;CACpC;;AAED;EACE,sBAAsB;EACtB,mDAA2C;UAA3C,2CAA2C;CAC5C;;AAED;EACE,sBAAsB;EACtB,oBAAoB;CAErB;;AAED;EACE,oBAAoB;CACrB;;AAED;EACE,sBAAsB;EACtB,oBAAoB;CAErB;;AAED;EACE,oBAAoB;CACrB;;AAED;EACE,sBAAsB;EACtB,oBAAoB;CAErB;;AAED;EACE,oBAAoB;CACrB;;AAED;EACE,sBAAsB;EACtB,yBAAyB;EACzB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,mBAAmB;CACpB;;AAED;EACE,mBAAmB;EACnB,WAAW;EACX,eAAe;EACf,oBAAoB;EACpB,YAAY;EACZ,eAAe;EACf,mBAAmB;EACnB,eAAe;CAChB;;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,UAAU;EACV,YAAY;EACZ,iBAAiB;EACjB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,YAAY;CACb;;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,YAAY;EACZ,eAAe;EACf,YAAY;EACZ,8BAA8B;EAC9B,YAAY;CACb","file":"Forgotpass.css","sourcesContent":["\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  --font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  --max-content-width: 1000px;\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */\n\n  --screen-xs-min: 480px;  /* Extra small screen / phone */\n  --screen-sm-min: 768px;  /* Small screen / tablet */\n  --screen-md-min: 992px;  /* Medium screen / desktop */\n  --screen-lg-min: 1200px; /* Large screen / wide desktop */\n}\n","\n@import '../../components/variables.css';\n\n.root {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.container {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 380px;\n}\n\n.lead {\n  font-size: 1.25em;\n}\n\n.formGroup {\n  margin-bottom: 20px;\n}\n\n.label {\n  display: inline-block;\n  margin-bottom: 5px;\n  max-width: 100%;\n  font-weight: 700;\n}\n\n.input {\n  display: block;\n  box-sizing: border-box;\n  padding: 10px 16px;\n  width: 100%;\n  height: 46px;\n  outline: 0;\n  border: 1px solid #ccc;\n  border-radius: 10;\n  background: #fff;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  color: #616161;\n  font-size: 18px;\n  line-height: 1.3333333;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n}\n\n.input:focus {\n  border-color: #0074c2;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\n}\n\n.button {\n  display: block;\n  box-sizing: border-box;\n  margin: 0;\n  padding: 10px 16px;\n  width: 100%;\n  outline: 0;\n  border: 1px solid #373277;\n  border-radius: 0;\n  background: #373277;\n  color: #fff;\n  text-align: center;\n  text-decoration: none;\n  font-size: 18px;\n  line-height: 1.3333333;\n  cursor: pointer;\n}\n\n.button:hover {\n  background: rgba(54, 50, 119, 0.8);\n}\n\n.button:focus {\n  border-color: #0074c2;\n  box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n}\n\n.facebook {\n  border-color: #3b5998;\n  background: #3b5998;\n  composes: button;\n}\n\n.facebook:hover {\n  background: #2d4373;\n}\n\n.google {\n  border-color: #dd4b39;\n  background: #dd4b39;\n  composes: button;\n}\n\n.google:hover {\n  background: #c23321;\n}\n\n.twitter {\n  border-color: #55acee;\n  background: #55acee;\n  composes: button;\n}\n\n.twitter:hover {\n  background: #2795e9;\n}\n\n.icon {\n  display: inline-block;\n  margin: -2px 12px -2px 0;\n  width: 20px;\n  height: 20px;\n  vertical-align: middle;\n  fill: currentColor;\n}\n\n.lineThrough {\n  position: relative;\n  z-index: 1;\n  display: block;\n  margin-bottom: 15px;\n  width: 100%;\n  color: #757575;\n  text-align: center;\n  font-size: 80%;\n}\n\n.lineThrough::before {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  z-index: -1;\n  margin-top: -5px;\n  margin-left: -20px;\n  width: 40px;\n  height: 10px;\n  background-color: #fff;\n  content: '';\n}\n\n.lineThrough::after {\n  position: absolute;\n  top: 49%;\n  z-index: -2;\n  display: block;\n  width: 100%;\n  border-bottom: 1px solid #ddd;\n  content: '';\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Forgotpass_root_2bx",
  	"container": "Forgotpass_container_2z1",
  	"lead": "Forgotpass_lead_3Qz",
  	"formGroup": "Forgotpass_formGroup_xHr",
  	"label": "Forgotpass_label_1Je",
  	"input": "Forgotpass_input_hyq",
  	"button": "Forgotpass_button_7B_",
  	"facebook": "Forgotpass_facebook_2eZ Forgotpass_button_7B_",
  	"google": "Forgotpass_google_TMn Forgotpass_button_7B_",
  	"twitter": "Forgotpass_twitter_XfU Forgotpass_button_7B_",
  	"icon": "Forgotpass_icon_2y1",
  	"lineThrough": "Forgotpass_lineThrough_34a"
  };

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _promise = __webpack_require__(83);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(43);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Changepassword = __webpack_require__(127);
  
  var _Changepassword2 = _interopRequireDefault(_Changepassword);
  
  var _Login = __webpack_require__(87);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  var _config = __webpack_require__(20);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var status = false;
  
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
  
                return _context.abrupt('return', _react2.default.createElement(_Changepassword2.default, { email: email, passCode: code }));
  
              case 14:
                return _context.abrupt('return', _react2.default.createElement(_Login2.default, null));
  
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
    var request = __webpack_require__(92);
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
/* 127 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(43);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(58);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _changepassword = __webpack_require__(128);
  
  var _changepassword2 = _interopRequireDefault(_changepassword);
  
  var _Link = __webpack_require__(61);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Changing Password';
  
  function Changepassword(_ref, context) {
    var email = _ref.email,
        passCode = _ref.passCode,
        message = _ref.message;
  
    console.log("Changepassword: " + email);
    context.setTitle(title);
    return _react2.default.createElement(
      'div',
      { className: _changepassword2.default.root },
      _react2.default.createElement(
        'div',
        { className: _changepassword2.default.container },
        _react2.default.createElement(
          'h1',
          null,
          title
        ),
        _react2.default.createElement(
          'form',
          { name: 'form1', method: 'put', action: 'updatepass' },
          _react2.default.createElement(
            'div',
            { className: _changepassword2.default.formGroup },
            _react2.default.createElement(
              'label',
              { className: _changepassword2.default.label, htmlFor: 'password' },
              'New Password:'
            ),
            _react2.default.createElement('input', {
              className: _changepassword2.default.input,
              id: 'newpass',
              type: 'password',
              name: 'newpass',
              autoFocus: true,
              required: true
            })
          ),
          _react2.default.createElement(
            'div',
            { className: _changepassword2.default.formGroup },
            _react2.default.createElement(
              'label',
              { className: _changepassword2.default.label, htmlFor: 'password' },
              'Confirm Password:'
            ),
            _react2.default.createElement('input', {
              className: _changepassword2.default.input,
              id: 'confirmpass',
              type: 'password',
              name: 'confirmpass'
            }),
            _react2.default.createElement(
              'label',
              { className: _changepassword2.default.label1, htmlFor: 'message' },
              message
            )
          ),
          _react2.default.createElement(
            'div',
            { className: _changepassword2.default.formGroup },
            _react2.default.createElement(
              'button',
              { className: _changepassword2.default.button, value: 'Change Password', type: 'submit' },
              'Change Password'
            ),
            _react2.default.createElement('input', {
              className: _changepassword2.default.input,
              id: 'email',
              type: 'hidden',
              name: 'email',
              value: email
            }),
            _react2.default.createElement('input', {
              id: 'code',
              type: 'hidden',
              name: 'code',
              value: passCode
            })
          ),
          _react2.default.createElement('script', null)
        )
      )
    );
  }
  
  Changepassword.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_changepassword2.default)(Changepassword);

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(129);
      var insertCss = __webpack_require__(54);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./changepassword.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./changepassword.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(53)();
  // imports
  
  
  // module
  exports.push([module.id, "\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n}\n\n.changepassword_root_2hw {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.changepassword_container_vd0 {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 380px;\n}\n\n.changepassword_lead_337 {\n  font-size: 1.25em;\n}\n\n.changepassword_formGroup_2cz {\n  margin-bottom: 20px;\n}\n\n.changepassword_label_1io {\n  display: inline-block;\n  margin-bottom: 5px;\n  max-width: 100%;\n  font-weight: 700;\n}\n\n.changepassword_label1_2Xu {\n  display: inline-block;\n  margin-bottom: 5px;\n  max-width: 100%;\n  font-weight: 300;\n  color: #FF0000;\n}\n\n.changepassword_input_3LT {\n  display: block;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  padding: 10px 16px;\n  width: 100%;\n  height: 46px;\n  outline: 0;\n  border: 1px solid #ccc;\n  border-radius: 10;\n  background: #fff;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  color: #616161;\n  font-size: 18px;\n  line-height: 1.3333333;\n  -webkit-transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\n  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\n}\n\n.changepassword_input_3LT:focus {\n  border-color: #0074c2;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\n}\n\n.changepassword_button_CSn {\n  display: block;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  margin: 0;\n  padding: 10px 16px;\n  width: 100%;\n  outline: 0;\n  border: 1px solid #373277;\n  border-radius: 0;\n  background: #373277;\n  color: #fff;\n  text-align: center;\n  text-decoration: none;\n  font-size: 18px;\n  line-height: 1.3333333;\n  cursor: pointer;\n}\n\n.changepassword_button_CSn:hover {\n  background: rgba(54, 50, 119, 0.8);\n}\n\n.changepassword_button_CSn:focus {\n  border-color: #0074c2;\n  -webkit-box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n          box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n}\n\n", "", {"version":3,"sources":["/./components/variables.css","/./routes/changepassword/changepassword.css"],"names":[],"mappings":";;AAEA;EACE;;gFAE8E;;EAI9E;;gFAE8E;;EAI9E;;gFAE8E,EAErD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;CAC3D;;ACpBD;EACE,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,iBAAiB;CAClB;;AAED;EACE,kBAAkB;CACnB;;AAED;EACE,oBAAoB;CACrB;;AAED;EACE,sBAAsB;EACtB,mBAAmB;EACnB,gBAAgB;EAChB,iBAAiB;CAClB;;AAED;EACE,sBAAsB;EACtB,mBAAmB;EACnB,gBAAgB;EAChB,iBAAiB;EACjB,eAAe;CAChB;;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,WAAW;EACX,uBAAuB;EACvB,kBAAkB;EAClB,iBAAiB;EACjB,yDAAiD;UAAjD,iDAAiD;EACjD,eAAe;EACf,gBAAgB;EAChB,uBAAuB;EACvB,yFAAyE;EAAzE,iFAAyE;EAAzE,4EAAyE;EAAzE,yEAAyE;EAAzE,+GAAyE;CAC1E;;AAED;EACE,sBAAsB;EACtB,yFAAiF;UAAjF,iFAAiF;CAClF;;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,UAAU;EACV,mBAAmB;EACnB,YAAY;EACZ,WAAW;EACX,0BAA0B;EAC1B,iBAAiB;EACjB,oBAAoB;EACpB,YAAY;EACZ,mBAAmB;EACnB,sBAAsB;EACtB,gBAAgB;EAChB,uBAAuB;EACvB,gBAAgB;CACjB;;AAED;EACE,mCAAmC;CACpC;;AAED;EACE,sBAAsB;EACtB,mDAA2C;UAA3C,2CAA2C;CAC5C","file":"changepassword.css","sourcesContent":["\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  --font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  --max-content-width: 1000px;\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */\n\n  --screen-xs-min: 480px;  /* Extra small screen / phone */\n  --screen-sm-min: 768px;  /* Small screen / tablet */\n  --screen-md-min: 992px;  /* Medium screen / desktop */\n  --screen-lg-min: 1200px; /* Large screen / wide desktop */\n}\n","\n@import '../../components/variables.css';\n\n.root {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.container {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 380px;\n}\n\n.lead {\n  font-size: 1.25em;\n}\n\n.formGroup {\n  margin-bottom: 20px;\n}\n\n.label {\n  display: inline-block;\n  margin-bottom: 5px;\n  max-width: 100%;\n  font-weight: 700;\n}\n\n.label1 {\n  display: inline-block;\n  margin-bottom: 5px;\n  max-width: 100%;\n  font-weight: 300;\n  color: #FF0000;\n}\n\n.input {\n  display: block;\n  box-sizing: border-box;\n  padding: 10px 16px;\n  width: 100%;\n  height: 46px;\n  outline: 0;\n  border: 1px solid #ccc;\n  border-radius: 10;\n  background: #fff;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  color: #616161;\n  font-size: 18px;\n  line-height: 1.3333333;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n}\n\n.input:focus {\n  border-color: #0074c2;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\n}\n\n.button {\n  display: block;\n  box-sizing: border-box;\n  margin: 0;\n  padding: 10px 16px;\n  width: 100%;\n  outline: 0;\n  border: 1px solid #373277;\n  border-radius: 0;\n  background: #373277;\n  color: #fff;\n  text-align: center;\n  text-decoration: none;\n  font-size: 18px;\n  line-height: 1.3333333;\n  cursor: pointer;\n}\n\n.button:hover {\n  background: rgba(54, 50, 119, 0.8);\n}\n\n.button:focus {\n  border-color: #0074c2;\n  box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n}\n\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "changepassword_root_2hw",
  	"container": "changepassword_container_vd0",
  	"lead": "changepassword_lead_337",
  	"formGroup": "changepassword_formGroup_2cz",
  	"label": "changepassword_label_1io",
  	"label1": "changepassword_label1_2Xu",
  	"input": "changepassword_input_3LT",
  	"button": "changepassword_button_CSn"
  };

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _promise = __webpack_require__(83);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(43);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Updatepass = __webpack_require__(131);
  
  var _Updatepass2 = _interopRequireDefault(_Updatepass);
  
  var _Changepassword = __webpack_require__(127);
  
  var _Changepassword2 = _interopRequireDefault(_Changepassword);
  
  var _config = __webpack_require__(20);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var status = true;
  var message = 'Password Sucessfully Updated';
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
                return _context.abrupt('return', _react2.default.createElement(_Changepassword2.default, { email: email, message: message }));
  
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
                return _context.abrupt('return', _react2.default.createElement(_Updatepass2.default, { message: message }));
  
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
    var request = __webpack_require__(92);
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
    var request = __webpack_require__(92);
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
/* 131 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(43);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(58);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _updatepass = __webpack_require__(132);
  
  var _updatepass2 = _interopRequireDefault(_updatepass);
  
  var _Link = __webpack_require__(61);
  
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
  
  function Updatepass(_ref, context) {
    var message = _ref.message;
  
    context.setTitle(title);
    return _react2.default.createElement(
      'div',
      { className: _updatepass2.default.root },
      _react2.default.createElement(
        'div',
        { className: _updatepass2.default.container },
        _react2.default.createElement(
          'h1',
          null,
          title
        ),
        _react2.default.createElement(
          'p',
          null,
          message
        )
      )
    );
  }
  
  Updatepass.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_updatepass2.default)(Updatepass);

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(133);
      var insertCss = __webpack_require__(54);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./updatepass.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./updatepass.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(53)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n}\n.updatepass_root_Q_n {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n.updatepass_container_n8c {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 380px;\n}\n.updatepass_lead_1Xi {\n  font-size: 1.25em;\n}\n.updatepass_formGroup_1Fj {\n  margin-bottom: 20px;\n}\n.updatepass_label_3lc {\n  display: inline-block;\n  margin-bottom: 5px;\n  max-width: 100%;\n  font-weight: 700;\n}\n.updatepass_input_3tg {\n  display: block;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  padding: 10px 16px;\n  width: 100%;\n  height: 46px;\n  outline: 0;\n  border: 1px solid #ccc;\n  border-radius: 10;\n  background: #fff;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  color: #616161;\n  font-size: 18px;\n  line-height: 1.3333333;\n  -webkit-transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\n  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\n}\n.updatepass_input_3tg:focus {\n  border-color: #0074c2;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\n}\n.updatepass_button_1mT {\n  display: block;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  margin: 0;\n  padding: 10px 16px;\n  width: 100%;\n  outline: 0;\n  border: 1px solid #373277;\n  border-radius: 0;\n  background: #373277;\n  color: #fff;\n  text-align: center;\n  text-decoration: none;\n  font-size: 18px;\n  line-height: 1.3333333;\n  cursor: pointer;\n}\n.updatepass_button_1mT:hover {\n  background: rgba(54, 50, 119, 0.8);\n}\n.updatepass_button_1mT:focus {\n  border-color: #0074c2;\n  -webkit-box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n          box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n}\n.updatepass_facebook_2jX {\n  border-color: #3b5998;\n  background: #3b5998;\n}\n.updatepass_facebook_2jX:hover {\n  background: #2d4373;\n}\n.updatepass_google_1WT {\n  border-color: #dd4b39;\n  background: #dd4b39;\n}\n.updatepass_google_1WT:hover {\n  background: #c23321;\n}\n.updatepass_twitter_3cW {\n  border-color: #55acee;\n  background: #55acee;\n}\n.updatepass_twitter_3cW:hover {\n  background: #2795e9;\n}\n.updatepass_icon_IAX {\n  display: inline-block;\n  margin: -2px 12px -2px 0;\n  width: 20px;\n  height: 20px;\n  vertical-align: middle;\n  fill: currentColor;\n}\n.updatepass_lineThrough_3LS {\n  position: relative;\n  z-index: 1;\n  display: block;\n  margin-bottom: 15px;\n  width: 100%;\n  color: #757575;\n  text-align: center;\n  font-size: 80%;\n}\n.updatepass_lineThrough_3LS::before {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  z-index: -1;\n  margin-top: -5px;\n  margin-left: -20px;\n  width: 40px;\n  height: 10px;\n  background-color: #fff;\n  content: '';\n}\n.updatepass_lineThrough_3LS::after {\n  position: absolute;\n  top: 49%;\n  z-index: -2;\n  display: block;\n  width: 100%;\n  border-bottom: 1px solid #ddd;\n  content: '';\n}\n", "", {"version":3,"sources":["/./routes/updatepass/updatepass.css","/./components/variables.css"],"names":[],"mappings":"AAAA;;;;;;;GAOG;ACLH;EACE;;gFAE8E;;EAI9E;;gFAE8E;;EAI9E;;gFAE8E,EAErD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;CAC3D;ADbD;EACE,mBAAmB;EACnB,oBAAoB;CACrB;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,iBAAiB;CAClB;AAED;EACE,kBAAkB;CACnB;AAED;EACE,oBAAoB;CACrB;AAED;EACE,sBAAsB;EACtB,mBAAmB;EACnB,gBAAgB;EAChB,iBAAiB;CAClB;AAGD;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,WAAW;EACX,uBAAuB;EACvB,kBAAkB;EAClB,iBAAiB;EACjB,yDAAiD;UAAjD,iDAAiD;EACjD,eAAe;EACf,gBAAgB;EAChB,uBAAuB;EACvB,yFAAyE;EAAzE,iFAAyE;EAAzE,4EAAyE;EAAzE,yEAAyE;EAAzE,+GAAyE;CAC1E;AAED;EACE,sBAAsB;EACtB,yFAAiF;UAAjF,iFAAiF;CAClF;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,UAAU;EACV,mBAAmB;EACnB,YAAY;EACZ,WAAW;EACX,0BAA0B;EAC1B,iBAAiB;EACjB,oBAAoB;EACpB,YAAY;EACZ,mBAAmB;EACnB,sBAAsB;EACtB,gBAAgB;EAChB,uBAAuB;EACvB,gBAAgB;CACjB;AAED;EACE,mCAAmC;CACpC;AAED;EACE,sBAAsB;EACtB,mDAA2C;UAA3C,2CAA2C;CAC5C;AAED;EACE,sBAAsB;EACtB,oBAAoB;CAErB;AAED;EACE,oBAAoB;CACrB;AAED;EACE,sBAAsB;EACtB,oBAAoB;CAErB;AAED;EACE,oBAAoB;CACrB;AAED;EACE,sBAAsB;EACtB,oBAAoB;CAErB;AAED;EACE,oBAAoB;CACrB;AAED;EACE,sBAAsB;EACtB,yBAAyB;EACzB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,mBAAmB;CACpB;AAED;EACE,mBAAmB;EACnB,WAAW;EACX,eAAe;EACf,oBAAoB;EACpB,YAAY;EACZ,eAAe;EACf,mBAAmB;EACnB,eAAe;CAChB;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,UAAU;EACV,YAAY;EACZ,iBAAiB;EACjB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,YAAY;CACb;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,YAAY;EACZ,eAAe;EACf,YAAY;EACZ,8BAA8B;EAC9B,YAAY;CACb","file":"updatepass.css","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n@import '../../components/variables.css';\n\n.root {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.container {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 380px;\n}\n\n.lead {\n  font-size: 1.25em;\n}\n\n.formGroup {\n  margin-bottom: 20px;\n}\n\n.label {\n  display: inline-block;\n  margin-bottom: 5px;\n  max-width: 100%;\n  font-weight: 700;\n}\n\n\n.input {\n  display: block;\n  box-sizing: border-box;\n  padding: 10px 16px;\n  width: 100%;\n  height: 46px;\n  outline: 0;\n  border: 1px solid #ccc;\n  border-radius: 10;\n  background: #fff;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  color: #616161;\n  font-size: 18px;\n  line-height: 1.3333333;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n}\n\n.input:focus {\n  border-color: #0074c2;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\n}\n\n.button {\n  display: block;\n  box-sizing: border-box;\n  margin: 0;\n  padding: 10px 16px;\n  width: 100%;\n  outline: 0;\n  border: 1px solid #373277;\n  border-radius: 0;\n  background: #373277;\n  color: #fff;\n  text-align: center;\n  text-decoration: none;\n  font-size: 18px;\n  line-height: 1.3333333;\n  cursor: pointer;\n}\n\n.button:hover {\n  background: rgba(54, 50, 119, 0.8);\n}\n\n.button:focus {\n  border-color: #0074c2;\n  box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n}\n\n.facebook {\n  border-color: #3b5998;\n  background: #3b5998;\n  composes: button;\n}\n\n.facebook:hover {\n  background: #2d4373;\n}\n\n.google {\n  border-color: #dd4b39;\n  background: #dd4b39;\n  composes: button;\n}\n\n.google:hover {\n  background: #c23321;\n}\n\n.twitter {\n  border-color: #55acee;\n  background: #55acee;\n  composes: button;\n}\n\n.twitter:hover {\n  background: #2795e9;\n}\n\n.icon {\n  display: inline-block;\n  margin: -2px 12px -2px 0;\n  width: 20px;\n  height: 20px;\n  vertical-align: middle;\n  fill: currentColor;\n}\n\n.lineThrough {\n  position: relative;\n  z-index: 1;\n  display: block;\n  margin-bottom: 15px;\n  width: 100%;\n  color: #757575;\n  text-align: center;\n  font-size: 80%;\n}\n\n.lineThrough::before {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  z-index: -1;\n  margin-top: -5px;\n  margin-left: -20px;\n  width: 40px;\n  height: 10px;\n  background-color: #fff;\n  content: '';\n}\n\n.lineThrough::after {\n  position: absolute;\n  top: 49%;\n  z-index: -2;\n  display: block;\n  width: 100%;\n  border-bottom: 1px solid #ddd;\n  content: '';\n}\n","\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  --font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  --max-content-width: 1000px;\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */\n\n  --screen-xs-min: 480px;  /* Extra small screen / phone */\n  --screen-sm-min: 768px;  /* Small screen / tablet */\n  --screen-md-min: 992px;  /* Medium screen / desktop */\n  --screen-lg-min: 1200px; /* Large screen / wide desktop */\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "updatepass_root_Q_n",
  	"container": "updatepass_container_n8c",
  	"lead": "updatepass_lead_1Xi",
  	"formGroup": "updatepass_formGroup_1Fj",
  	"label": "updatepass_label_3lc",
  	"input": "updatepass_input_3tg",
  	"button": "updatepass_button_1mT",
  	"facebook": "updatepass_facebook_2jX updatepass_button_1mT",
  	"google": "updatepass_google_1WT updatepass_button_1mT",
  	"twitter": "updatepass_twitter_3cW updatepass_button_1mT",
  	"icon": "updatepass_icon_IAX",
  	"lineThrough": "updatepass_lineThrough_3LS"
  };

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(43);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Serviceprovider = __webpack_require__(135);
  
  var _Serviceprovider2 = _interopRequireDefault(_Serviceprovider);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
  
    path: '/serviceprovider',
  
    action: function action() {
      return _react2.default.createElement(_Serviceprovider2.default, null);
    }
  };

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(43);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(58);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Serviceprovider = __webpack_require__(136);
  
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
  
  function Serviceprovider(props, context) {
    context.setTitle(title);
    return _react2.default.createElement(
      'div',
      { className: _Serviceprovider2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Serviceprovider2.default.container },
        _react2.default.createElement(
          'h2',
          null,
          title
        ),
        _react2.default.createElement(
          'form',
          { name: 'form1', method: 'put', action: 'saveprovider' },
          _react2.default.createElement(
            'div',
            { className: _Serviceprovider2.default.leftContainer },
            _react2.default.createElement('input', { id: 'modifieddate', type: 'hidden', value: currentdate, name: 'modifieddate' }),
            _react2.default.createElement(
              'label',
              { className: _Serviceprovider2.default.label, htmlFor: 'firstname' },
              'User First Name:'
            ),
            _react2.default.createElement('input', {
              className: _Serviceprovider2.default.input,
              id: 'firstname',
              type: 'text',
              name: 'firstname',
              placeholder: 'First Name',
              autoFocus: true,
              required: true
            }),
            _react2.default.createElement(
              'label',
              { className: _Serviceprovider2.default.label, htmlFor: 'Last Name' },
              _react2.default.createElement(
                'span',
                null,
                'User Last Name: '
              )
            ),
            _react2.default.createElement('input', {
              className: _Serviceprovider2.default.input,
              id: 'lname',
              type: 'text',
              name: 'lname',
              placeholder: 'Last Name',
              required: true
            })
          ),
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'label',
              { className: _Serviceprovider2.default.label, htmlFor: 'address' },
              _react2.default.createElement(
                'span',
                null,
                'User Address: '
              )
            ),
            _react2.default.createElement('input', {
              className: _Serviceprovider2.default.input,
              id: 'address',
              type: 'text',
              name: 'address',
              placeholder: 'Address',
              required: true
            }),
            _react2.default.createElement(
              'label',
              { className: _Serviceprovider2.default.label, htmlFor: 'city' },
              _react2.default.createElement(
                'span',
                null,
                'City: '
              )
            ),
            _react2.default.createElement('input', {
              className: _Serviceprovider2.default.input,
              id: 'city',
              type: 'text',
              name: 'city',
              placeholder: 'City',
              required: true
            }),
            _react2.default.createElement(
              'label',
              { className: _Serviceprovider2.default.label, htmlFor: 'zipcode' },
              _react2.default.createElement(
                'span',
                null,
                'Zipcode: '
              )
            ),
            _react2.default.createElement('input', {
              className: _Serviceprovider2.default.input,
              id: 'zipcode',
              type: 'number',
              name: 'zipcode',
              placeholder: 'Zipcode',
              required: true
            })
          ),
          _react2.default.createElement(
            'div',
            { className: _Serviceprovider2.default.formGroup },
            _react2.default.createElement(
              'label',
              { className: _Serviceprovider2.default.label, htmlFor: 'email' },
              'E-mail:'
            ),
            _react2.default.createElement('input', {
              className: _Serviceprovider2.default.input,
              id: 'email',
              type: 'email',
              name: 'email',
              placeholder: 'Your E-mail',
              required: true
            }),
            _react2.default.createElement(
              'label',
              { className: _Serviceprovider2.default.label, htmlFor: 'Phone' },
              'phone:'
            ),
            _react2.default.createElement('input', {
              className: _Serviceprovider2.default.input,
              id: 'phone',
              type: 'text',
              name: 'phone',
              placeholder: 'Mobile Number',
              required: true
            })
          ),
          _react2.default.createElement(
            'div',
            { className: _Serviceprovider2.default.formGroup },
            _react2.default.createElement(
              'label',
              { className: _Serviceprovider2.default.label, htmlFor: 'servicetype' },
              'Service Type:'
            ),
            _react2.default.createElement('input', {
              className: _Serviceprovider2.default.input,
              id: 'servicetype',
              type: 'servicetype',
              name: 'servicetype',
              placeholder: 'Service Type Catering, Astrology etc.',
              required: true
            })
          ),
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'label',
              { className: _Serviceprovider2.default.label, htmlFor: 'serve' },
              'Serve Outside:'
            ),
            _react2.default.createElement('input', { className: _Serviceprovider2.default.squaredOne,
              id: 'serveoutside',
              type: 'checkbox',
              name: 'serveoutside'
  
            })
          ),
          _react2.default.createElement(
            'div',
            { className: _Serviceprovider2.default.formGroup },
            _react2.default.createElement(
              'button',
              { className: _Serviceprovider2.default.button, value: 'submit', type: 'submit' },
              'Save'
            )
          )
        )
      )
    );
  }
  
  Serviceprovider.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Serviceprovider2.default)(Serviceprovider);

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(137);
      var insertCss = __webpack_require__(54);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Serviceprovider.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Serviceprovider.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(53)();
  // imports
  
  
  // module
  exports.push([module.id, " .Serviceprovider_root_3Ll {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.Serviceprovider_container_c6Z {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 380px;\n  max-height:100x\n}\n\n.Serviceprovider_lead_35E {\n  font-size: 1.25em;\n}\n\n.Serviceprovider_formGroup_3-S {\n  margin-bottom: 20px;\n  \n}\n\n.Serviceprovider_label_15b {\n  \n  margin-bottom: 5px;\n  max-width: 100%;\n  font-weight: 700;\n  float: left;\n}\n\n.Serviceprovider_input_354 {\n  display: block;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  padding: 10px 16px;\n  width: 100%;\n  height: 26px;\n  outline: 0;\n  border: 1px solid #ccc;\n  border-radius: 10;\n  background: #fff;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  color: #616161;\n  font-size: 18px;\n  line-height: 1.3333333;\n  -webkit-transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\n  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\n  size: 15;\n  max-width: 30; \n}\n\n.Serviceprovider_input_354:focus {\n  border-color: red;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\n}\n\n.Serviceprovider_button_vnx {\n  display: block;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  margin: 0;\n  padding: 10px 16px;\n  width: 50%;\n  outline: 0;\n  border: 1px solid #373277;\n  border-radius: 0;\n  background: #373277;\n  color: #fff;\n  text-align: center;\n  text-decoration: none;\n  font-size: 14px;\n  line-height: 1.3333333;\n  cursor: pointer;\n}\n\n.Serviceprovider_button_vnx:hover {\n  background: rgba(54, 50, 119, 0.8);\n}\n\n.Serviceprovider_button_vnx:focus {\n  border-color: #0074c2;\n  -webkit-box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n          box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n}\n\n.Serviceprovider_leftContainer_31v {\n   float:left;\n}\n\n.Serviceprovider_rightContainer_2M6 {\n   float:right;\n}\n\n.Serviceprovider_icon_1-O {\n  display: inline-block;\n  margin: -2px 12px -2px 0;\n  width: 20px;\n  height: 20px;\n  vertical-align: middle;\n  fill: currentColor;\n}\n\n.Serviceprovider_lineThrough_2lM {\n  position: relative;\n  z-index: 1;\n  display: block;\n  margin-bottom: 15px;\n  width: 100%;\n  color: #757575;\n  text-align: center;\n  font-size: 80%;\n}\n\n.Serviceprovider_lineThrough_2lM::before {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  z-index: -1;\n  margin-top: -5px;\n  margin-left: -20px;\n  width: 40px;\n  height: 10px;\n  background-color: #fff;\n  content: '';\n}\n\n.Serviceprovider_lineThrough_2lM::after {\n  position: absolute;\n  top: 49%;\n  z-index: -2;\n  display: block;\n  width: 100%;\n  border-bottom: 1px solid #ddd;\n  content: '';\n}\n\n.Serviceprovider_squaredOne_5rn {\n  width: 28px;\n  height: 28px;\n  position: relative;\n  margin: 20px auto;\n  background: #fcfff4;\n  background: -webkit-gradient(linear, left top, left bottom, from(top), color-stop(0%, #fcfff4), color-stop(40%, #dfe5d7), to(#b3bead));\n  background: -webkit-linear-gradient(top, #fcfff4 0%, #dfe5d7 40%, #b3bead 100%);\n  background: -o-linear-gradient(top, #fcfff4 0%, #dfe5d7 40%, #b3bead 100%);\n  background: linear-gradient(top, #fcfff4 0%, #dfe5d7 40%, #b3bead 100%);\n  -webkit-box-shadow: inset 0px 1px 1px white, 0px 1px 3px rgba(0,0,0,0.5);\n          box-shadow: inset 0px 1px 1px white, 0px 1px 3px rgba(0,0,0,0.5);\n  label {\n    width: 20px;\n    height: 20px;\n    position: absolute;\n    top: 4px;\n    left: 4px;\n    cursor: pointer;\n    background: -webkit-gradient(linear, left top, left bottom, from(#222), to(#45484d));\n    background: -webkit-linear-gradient(top, #222 0%, #45484d 100%);\n    background: -o-linear-gradient(top, #222 0%, #45484d 100%);\n    background: linear-gradient(top, #222 0%, #45484d 100%);\n    -webkit-box-shadow: inset 0px 1px 1px rgba(0,0,0,0.5), 0px 1px 0px rgba(255,255,255,1);\n            box-shadow: inset 0px 1px 1px rgba(0,0,0,0.5), 0px 1px 0px rgba(255,255,255,1)\n  }\n  label:after {\n    content: '';\n    width: 16px;\n    height: 16px;\n    position: absolute;\n    top: 2px;\n    left: 2px;\n    background: $activeColor;\n    background: -webkit-gradient(linear, left top, left bottom, from(top), color-stop(0%, $activeColor), to($darkenColor));\n    background: -webkit-linear-gradient(top, $activeColor 0%, $darkenColor 100%);\n    background: -o-linear-gradient(top, $activeColor 0%, $darkenColor 100%);\n    background: linear-gradient(top, $activeColor 0%, $darkenColor 100%);\n    -webkit-box-shadow: inset 0px 1px 1px white, 0px 1px 3px rgba(0,0,0,0.5);\n            box-shadow: inset 0px 1px 1px white, 0px 1px 3px rgba(0,0,0,0.5);\n    opacity: 0;\n  }\n  label:hover::after {\n    opacity: 0.3;\n  }\n  input[type=checkbox] {\n    visibility: hidden   \n  }\n  input[type=checkbox]:checked + label:after {\n    opacity: 1;\n  } \n}\n\nhtml {\n  min-height: 100%;\n}\n\nbody {\n  min-height: 100vh;\n}", "", {"version":3,"sources":["/./routes/serviceprovider/Serviceprovider.css"],"names":[],"mappings":"CAAC;EACC,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,iBAAiB;EACjB,eAAe;CAChB;;AAED;EACE,kBAAkB;CACnB;;AAED;EACE,oBAAoB;;CAErB;;AAED;;EAEE,mBAAmB;EACnB,gBAAgB;EAChB,iBAAiB;EACjB,YAAY;CACb;;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,WAAW;EACX,uBAAuB;EACvB,kBAAkB;EAClB,iBAAiB;EACjB,yDAAiD;UAAjD,iDAAiD;EACjD,eAAe;EACf,gBAAgB;EAChB,uBAAuB;EACvB,yFAAyE;EAAzE,iFAAyE;EAAzE,4EAAyE;EAAzE,yEAAyE;EAAzE,+GAAyE;EACzE,SAAS;EACT,cAAc;CACf;;AAED;EACE,kBAAkB;EAClB,yFAAiF;UAAjF,iFAAiF;CAClF;;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,UAAU;EACV,mBAAmB;EACnB,WAAW;EACX,WAAW;EACX,0BAA0B;EAC1B,iBAAiB;EACjB,oBAAoB;EACpB,YAAY;EACZ,mBAAmB;EACnB,sBAAsB;EACtB,gBAAgB;EAChB,uBAAuB;EACvB,gBAAgB;CACjB;;AAED;EACE,mCAAmC;CACpC;;AAED;EACE,sBAAsB;EACtB,mDAA2C;UAA3C,2CAA2C;CAC5C;;AAED;GACG,WAAW;CACb;;AAED;GACG,YAAY;CACd;;AAED;EACE,sBAAsB;EACtB,yBAAyB;EACzB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,mBAAmB;CACpB;;AAED;EACE,mBAAmB;EACnB,WAAW;EACX,eAAe;EACf,oBAAoB;EACpB,YAAY;EACZ,eAAe;EACf,mBAAmB;EACnB,eAAe;CAChB;;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,UAAU;EACV,YAAY;EACZ,iBAAiB;EACjB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,YAAY;CACb;;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,YAAY;EACZ,eAAe;EACf,YAAY;EACZ,8BAA8B;EAC9B,YAAY;CACb;;AAED;EACE,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,kBAAkB;EAClB,oBAAoB;EACpB,uIAAwE;EAAxE,gFAAwE;EAAxE,2EAAwE;EAAxE,wEAAwE;EACxE,yEAAiE;UAAjE,iEAAiE;EACjE;IACE,YAAY;IACZ,aAAa;IACb,mBAAmB;IACnB,SAAS;IACT,UAAU;IACV,gBAAgB;IAChB,qFAAwD;IAAxD,gEAAwD;IAAxD,2DAAwD;IAAxD,wDAAwD;IACxD,uFAA+E;YAA/E,8EAA+E;GAgBhF;EAfC;IACE,YAAY;IACZ,YAAY;IACZ,aAAa;IACb,mBAAmB;IACnB,SAAS;IACT,UAAU;IACV,yBAAyB;IACzB,uHAAqE;IAArE,6EAAqE;IAArE,wEAAqE;IAArE,qEAAqE;IACrE,yEAAiE;YAAjE,iEAAiE;IACjE,WAAW;GACZ;EACD;IACE,aAAa;GACd;EAEH;IACE,kBAAmB;GAIpB;EAHC;IACE,WAAW;GACZ;CAEJ;;AAED;EACE,iBAAiB;CAClB;;AAED;EACE,kBAAkB;CACnB","file":"Serviceprovider.css","sourcesContent":[" .root {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.container {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 380px;\n  max-height:100x\n}\n\n.lead {\n  font-size: 1.25em;\n}\n\n.formGroup {\n  margin-bottom: 20px;\n  \n}\n\n.label {\n  \n  margin-bottom: 5px;\n  max-width: 100%;\n  font-weight: 700;\n  float: left;\n}\n\n.input {\n  display: block;\n  box-sizing: border-box;\n  padding: 10px 16px;\n  width: 100%;\n  height: 26px;\n  outline: 0;\n  border: 1px solid #ccc;\n  border-radius: 10;\n  background: #fff;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  color: #616161;\n  font-size: 18px;\n  line-height: 1.3333333;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n  size: 15;\n  max-width: 30; \n}\n\n.input:focus {\n  border-color: red;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\n}\n\n.button {\n  display: block;\n  box-sizing: border-box;\n  margin: 0;\n  padding: 10px 16px;\n  width: 50%;\n  outline: 0;\n  border: 1px solid #373277;\n  border-radius: 0;\n  background: #373277;\n  color: #fff;\n  text-align: center;\n  text-decoration: none;\n  font-size: 14px;\n  line-height: 1.3333333;\n  cursor: pointer;\n}\n\n.button:hover {\n  background: rgba(54, 50, 119, 0.8);\n}\n\n.button:focus {\n  border-color: #0074c2;\n  box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n}\n\n.leftContainer {\n   float:left;\n}\n\n.rightContainer {\n   float:right;\n}\n\n.icon {\n  display: inline-block;\n  margin: -2px 12px -2px 0;\n  width: 20px;\n  height: 20px;\n  vertical-align: middle;\n  fill: currentColor;\n}\n\n.lineThrough {\n  position: relative;\n  z-index: 1;\n  display: block;\n  margin-bottom: 15px;\n  width: 100%;\n  color: #757575;\n  text-align: center;\n  font-size: 80%;\n}\n\n.lineThrough::before {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  z-index: -1;\n  margin-top: -5px;\n  margin-left: -20px;\n  width: 40px;\n  height: 10px;\n  background-color: #fff;\n  content: '';\n}\n\n.lineThrough::after {\n  position: absolute;\n  top: 49%;\n  z-index: -2;\n  display: block;\n  width: 100%;\n  border-bottom: 1px solid #ddd;\n  content: '';\n}\n\n.squaredOne {\n  width: 28px;\n  height: 28px;\n  position: relative;\n  margin: 20px auto;\n  background: #fcfff4;\n  background: linear-gradient(top, #fcfff4 0%, #dfe5d7 40%, #b3bead 100%);\n  box-shadow: inset 0px 1px 1px white, 0px 1px 3px rgba(0,0,0,0.5);\n  label {\n    width: 20px;\n    height: 20px;\n    position: absolute;\n    top: 4px;\n    left: 4px;\n    cursor: pointer;\n    background: linear-gradient(top, #222 0%, #45484d 100%);\n    box-shadow: inset 0px 1px 1px rgba(0,0,0,0.5), 0px 1px 0px rgba(255,255,255,1);\n    &:after {\n      content: '';\n      width: 16px;\n      height: 16px;\n      position: absolute;\n      top: 2px;\n      left: 2px;\n      background: $activeColor;\n      background: linear-gradient(top, $activeColor 0%, $darkenColor 100%);\n      box-shadow: inset 0px 1px 1px white, 0px 1px 3px rgba(0,0,0,0.5);\n      opacity: 0;\n    }\n    &:hover::after {\n      opacity: 0.3;\n    }\n  }\n  input[type=checkbox] {\n    visibility: hidden;\n    &:checked + label:after {\n      opacity: 1;\n    }   \n  } \n}\n\nhtml {\n  min-height: 100%;\n}\n\nbody {\n  min-height: 100vh;\n}"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Serviceprovider_root_3Ll",
  	"container": "Serviceprovider_container_c6Z",
  	"lead": "Serviceprovider_lead_35E",
  	"formGroup": "Serviceprovider_formGroup_3-S",
  	"label": "Serviceprovider_label_15b",
  	"input": "Serviceprovider_input_354",
  	"button": "Serviceprovider_button_vnx",
  	"leftContainer": "Serviceprovider_leftContainer_31v",
  	"rightContainer": "Serviceprovider_rightContainer_2M6",
  	"icon": "Serviceprovider_icon_1-O",
  	"lineThrough": "Serviceprovider_lineThrough_2lM",
  	"squaredOne": "Serviceprovider_squaredOne_5rn"
  };

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _promise = __webpack_require__(83);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _stringify = __webpack_require__(55);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(43);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Saveprovider = __webpack_require__(139);
  
  var _Saveprovider2 = _interopRequireDefault(_Saveprovider);
  
  var _Login = __webpack_require__(106);
  
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
  
  var request = __webpack_require__(92);
  
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
  
  exports.default = {
  
    path: '/saveprovider',
  
    action: function action(_ref, _ref2) {
      var _this = this;
  
      var query = _ref.query;
      var path = _ref2.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var result, password, savelogin;
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
                  _context.next = 16;
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
                if (!status) {
                  message = 'Error in Provider Data';
                  href = 'http://' + _config.host + '/serviceprovider';
                  message1 = 'Click here to Register';
                }
                return _context.abrupt('return', _react2.default.createElement(_Saveprovider2.default, { message: message, href: href, message1: message1 }));
  
              case 18:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
  
  
  function SaveproviderData(data) {
    var request = __webpack_require__(92);
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

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(43);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(58);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Saveprovider = __webpack_require__(140);
  
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
  
  function Saveprovider(_ref, context) {
    var message = _ref.message,
        message1 = _ref.message1,
        href = _ref.href;
  
    context.setTitle(title);
    return _react2.default.createElement(
      'div',
      { className: _Saveprovider2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Saveprovider2.default.container },
        _react2.default.createElement(
          'h1',
          null,
          title
        ),
        _react2.default.createElement(
          'p',
          null,
          message
        ),
        _react2.default.createElement(
          'a',
          { href: href },
          message1,
          ' '
        )
      )
    );
  }
  
  Saveprovider.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Saveprovider2.default)(Saveprovider);

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(141);
      var insertCss = __webpack_require__(54);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Saveprovider.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Saveprovider.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(53)();
  // imports
  
  
  // module
  exports.push([module.id, " .Saveprovider_root_5OP {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.Saveprovider_container_9Qm {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 380px;\n}\n\n.Saveprovider_lead_3sp {\n  font-size: 1.25em;\n}\n\n.Saveprovider_formGroup_3Mj {\n  margin-bottom: 20px;\n  \n}\n\n.Saveprovider_label_CAg {\n  \n  margin-bottom: 5px;\n  max-width: 100%;\n  font-weight: 700;\n  float: left;\n}\n\n.Saveprovider_input_2b_ {\n  display: block;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  padding: 10px 16px;\n  width: 100%;\n  height: 46px;\n  outline: 0;\n  border: 1px solid #ccc;\n  border-radius: 10;\n  background: #fff;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  color: #616161;\n  font-size: 18px;\n  line-height: 1.3333333;\n  -webkit-transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\n  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\n}\n\n.Saveprovider_input_2b_:focus {\n  border-color: #0074c2;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\n}\n\n.Saveprovider_button_2yF {\n  display: block;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  margin: 0;\n  padding: 10px 16px;\n  width: 100%;\n  outline: 0;\n  border: 1px solid #373277;\n  border-radius: 0;\n  background: #373277;\n  color: #fff;\n  text-align: center;\n  text-decoration: none;\n  font-size: 18px;\n  line-height: 1.3333333;\n  cursor: pointer;\n}\n\n.Saveprovider_button_2yF:hover {\n  background: rgba(54, 50, 119, 0.8);\n}\n\n.Saveprovider_button_2yF:focus {\n  border-color: #0074c2;\n  -webkit-box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n          box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n}\n\n.\n\n.Saveprovider_icon_JKA {\n  display: inline-block;\n  margin: -2px 12px -2px 0;\n  width: 20px;\n  height: 20px;\n  vertical-align: middle;\n  fill: currentColor;\n}\n\n.Saveprovider_lineThrough_VeA {\n  position: relative;\n  z-index: 1;\n  display: block;\n  margin-bottom: 15px;\n  width: 100%;\n  color: #757575;\n  text-align: center;\n  font-size: 80%;\n}\n\n.Saveprovider_lineThrough_VeA::before {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  z-index: -1;\n  margin-top: -5px;\n  margin-left: -20px;\n  width: 40px;\n  height: 10px;\n  background-color: #fff;\n  content: '';\n}\n\n.Saveprovider_lineThrough_VeA::after {\n  position: absolute;\n  top: 49%;\n  z-index: -2;\n  display: block;\n  width: 100%;\n  border-bottom: 1px solid #ddd;\n  content: '';\n}\n\n#Saveprovider_lastname_2oF{\n    max-width:100px;\n    float:left;\n}\n\n.Saveprovider_div_2ZK {\n  float:right;\n}\n\n#Saveprovider_leftContainer_142 {\n   float:left;\n}\n\n#Saveprovider_rightContainer_3H9 {\n   float:right;\n}", "", {"version":3,"sources":["/./routes/saveprovider/Saveprovider.css"],"names":[],"mappings":"CAAC;EACC,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,iBAAiB;CAClB;;AAED;EACE,kBAAkB;CACnB;;AAED;EACE,oBAAoB;;CAErB;;AAED;;EAEE,mBAAmB;EACnB,gBAAgB;EAChB,iBAAiB;EACjB,YAAY;CACb;;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,WAAW;EACX,uBAAuB;EACvB,kBAAkB;EAClB,iBAAiB;EACjB,yDAAiD;UAAjD,iDAAiD;EACjD,eAAe;EACf,gBAAgB;EAChB,uBAAuB;EACvB,yFAAyE;EAAzE,iFAAyE;EAAzE,4EAAyE;EAAzE,yEAAyE;EAAzE,+GAAyE;CAC1E;;AAED;EACE,sBAAsB;EACtB,yFAAiF;UAAjF,iFAAiF;CAClF;;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,UAAU;EACV,mBAAmB;EACnB,YAAY;EACZ,WAAW;EACX,0BAA0B;EAC1B,iBAAiB;EACjB,oBAAoB;EACpB,YAAY;EACZ,mBAAmB;EACnB,sBAAsB;EACtB,gBAAgB;EAChB,uBAAuB;EACvB,gBAAgB;CACjB;;AAED;EACE,mCAAmC;CACpC;;AAED;EACE,sBAAsB;EACtB,mDAA2C;UAA3C,2CAA2C;CAC5C;;AAED;;;EAGE,sBAAsB;EACtB,yBAAyB;EACzB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,mBAAmB;CACpB;;AAED;EACE,mBAAmB;EACnB,WAAW;EACX,eAAe;EACf,oBAAoB;EACpB,YAAY;EACZ,eAAe;EACf,mBAAmB;EACnB,eAAe;CAChB;;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,UAAU;EACV,YAAY;EACZ,iBAAiB;EACjB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,YAAY;CACb;;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,YAAY;EACZ,eAAe;EACf,YAAY;EACZ,8BAA8B;EAC9B,YAAY;CACb;;AACD;IACI,gBAAgB;IAChB,WAAW;CACd;;AAED;EACE,YAAY;CACb;;AAED;GACG,WAAW;CACb;;AAED;GACG,YAAY;CACd","file":"Saveprovider.css","sourcesContent":[" .root {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.container {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 380px;\n}\n\n.lead {\n  font-size: 1.25em;\n}\n\n.formGroup {\n  margin-bottom: 20px;\n  \n}\n\n.label {\n  \n  margin-bottom: 5px;\n  max-width: 100%;\n  font-weight: 700;\n  float: left;\n}\n\n.input {\n  display: block;\n  box-sizing: border-box;\n  padding: 10px 16px;\n  width: 100%;\n  height: 46px;\n  outline: 0;\n  border: 1px solid #ccc;\n  border-radius: 10;\n  background: #fff;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  color: #616161;\n  font-size: 18px;\n  line-height: 1.3333333;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n}\n\n.input:focus {\n  border-color: #0074c2;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\n}\n\n.button {\n  display: block;\n  box-sizing: border-box;\n  margin: 0;\n  padding: 10px 16px;\n  width: 100%;\n  outline: 0;\n  border: 1px solid #373277;\n  border-radius: 0;\n  background: #373277;\n  color: #fff;\n  text-align: center;\n  text-decoration: none;\n  font-size: 18px;\n  line-height: 1.3333333;\n  cursor: pointer;\n}\n\n.button:hover {\n  background: rgba(54, 50, 119, 0.8);\n}\n\n.button:focus {\n  border-color: #0074c2;\n  box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n}\n\n.\n\n.icon {\n  display: inline-block;\n  margin: -2px 12px -2px 0;\n  width: 20px;\n  height: 20px;\n  vertical-align: middle;\n  fill: currentColor;\n}\n\n.lineThrough {\n  position: relative;\n  z-index: 1;\n  display: block;\n  margin-bottom: 15px;\n  width: 100%;\n  color: #757575;\n  text-align: center;\n  font-size: 80%;\n}\n\n.lineThrough::before {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  z-index: -1;\n  margin-top: -5px;\n  margin-left: -20px;\n  width: 40px;\n  height: 10px;\n  background-color: #fff;\n  content: '';\n}\n\n.lineThrough::after {\n  position: absolute;\n  top: 49%;\n  z-index: -2;\n  display: block;\n  width: 100%;\n  border-bottom: 1px solid #ddd;\n  content: '';\n}\n#lastname{\n    max-width:100px;\n    float:left;\n}\n\n.div {\n  float:right;\n}\n\n#leftContainer {\n   float:left;\n}\n\n#rightContainer {\n   float:right;\n}"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Saveprovider_root_5OP",
  	"container": "Saveprovider_container_9Qm",
  	"lead": "Saveprovider_lead_3sp",
  	"formGroup": "Saveprovider_formGroup_3Mj",
  	"label": "Saveprovider_label_CAg",
  	"input": "Saveprovider_input_2b_",
  	"button": "Saveprovider_button_2yF",
  	"icon": "Saveprovider_icon_JKA",
  	"lineThrough": "Saveprovider_lineThrough_VeA",
  	"lastname": "Saveprovider_lastname_2oF",
  	"div": "Saveprovider_div_2ZK",
  	"leftContainer": "Saveprovider_leftContainer_142",
  	"rightContainer": "Saveprovider_rightContainer_3H9"
  };

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _promise = __webpack_require__(83);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(43);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Booking = __webpack_require__(143);
  
  var _Booking2 = _interopRequireDefault(_Booking);
  
  var _Login = __webpack_require__(87);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  var _config = __webpack_require__(20);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
  
    path: '/booking',
  
    action: function action(_ref) {
      var _this = this;
  
      var query = _ref.query;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var date, currentdate, sessionid, body;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                date = new Date();
                currentdate = date.getDate() + '/' + date.getMonth() + 1 + '/' + date.getFullYear();
                sessionid = query.sessionid;
  
                console.log("Sessionid - index.js - Booking : " + sessionid);
  
                if (!(sessionid === undefined || sessionid == '')) {
                  _context.next = 12;
                  break;
                }
  
                _context.next = 7;
                return getSessionid();
  
              case 7:
                body = _context.sent;
  
                console.log("Sessionid: " + body);
                return _context.abrupt('return', _react2.default.createElement(_Login2.default, { sessionid: body }));
  
              case 12:
                return _context.abrupt('return', _react2.default.createElement(_Booking2.default, { sessionid: sessionid }));
  
              case 13:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
  
  
  function getSessionid() {
    var request = __webpack_require__(92);
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

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(43);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(58);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Booking = __webpack_require__(144);
  
  var _Booking2 = _interopRequireDefault(_Booking);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'New Event Booking';
  
  var date = new Date();
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  var currentdate = day + '/' + month + '/' + year;
  
  function Booking(_ref, context) {
    var sessionid = _ref.sessionid;
  
    context.setTitle(title);
    return _react2.default.createElement(
      'div',
      { className: _Booking2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Booking2.default.container },
        _react2.default.createElement(
          'h1',
          null,
          title
        ),
        _react2.default.createElement(
          'form',
          { name: 'form1', method: 'put', action: 'savebooking' },
          _react2.default.createElement(
            'div',
            { className: _Booking2.default.rightContainer },
            _react2.default.createElement('input', { id: 'status', type: 'hidden', value: 'booked', name: 'status' }),
            _react2.default.createElement(
              'label',
              { className: _Booking2.default.label, htmlFor: 'dateofbooking' },
              'Date of Booking:'
            ),
            _react2.default.createElement('input', {
              className: _Booking2.default.input,
              id: 'dateofbooking',
              type: 'text',
              name: 'dateofbooking',
              value: currentdate,
              autoFocus: true,
              readOnly: true
            }),
            _react2.default.createElement(
              'label',
              { className: _Booking2.default.label, htmlFor: 'eventdate' },
              _react2.default.createElement(
                'span',
                null,
                'Event Date: '
              )
            ),
            _react2.default.createElement('input', {
              className: _Booking2.default.input,
              id: 'functiondate',
              type: 'date',
              name: 'functiondate',
              required: true
            })
          ),
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'label',
              { className: _Booking2.default.label, htmlFor: 'email' },
              _react2.default.createElement(
                'span',
                null,
                'E-mail: '
              )
            ),
            _react2.default.createElement('input', {
              className: _Booking2.default.input,
              id: 'email',
              type: 'email',
              name: 'email',
              required: true
            }),
            _react2.default.createElement(
              'label',
              { className: _Booking2.default.label, htmlFor: 'mobile' },
              _react2.default.createElement(
                'span',
                null,
                'Mobile Number: '
              )
            ),
            _react2.default.createElement('input', {
              className: _Booking2.default.input,
              id: 'mobile',
              type: 'number',
              name: 'mobile',
              required: true
            })
          ),
          _react2.default.createElement(
            'div',
            { className: _Booking2.default.formGroup },
            _react2.default.createElement(
              'label',
              { className: _Booking2.default.label, htmlFor: 'catering' },
              'Need Catering:'
            ),
            _react2.default.createElement('input', {
              className: _Booking2.default.squaredOne,
              id: 'catering',
              type: 'checkbox',
              name: 'catering'
  
            }),
            _react2.default.createElement('br', null),
            _react2.default.createElement(
              'label',
              { className: _Booking2.default.label, htmlFor: 'Travel' },
              'Need Travel Arrangment:'
            ),
            _react2.default.createElement('input', {
              className: _Booking2.default.squaredOne,
              id: 'travel',
              type: 'checkbox',
              name: 'travel'
  
            })
          ),
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'label',
              { className: _Booking2.default.label, htmlFor: 'Function' },
              _react2.default.createElement(
                'span',
                null,
                'Function: '
              )
            ),
            _react2.default.createElement(
              'select',
              { name: 'eventtype' },
              _react2.default.createElement(
                'option',
                { value: 'House Warming' },
                'House Warming'
              ),
              _react2.default.createElement(
                'option',
                { value: 'Ayush  Homam' },
                'Ayush  Homam'
              ),
              _react2.default.createElement(
                'option',
                { value: '60th Birthday' },
                '60th Birthday'
              ),
              _react2.default.createElement(
                'option',
                { value: '80th Birthday' },
                '80th Birthday'
              )
            ),
            _react2.default.createElement('input', {
              id: 'sessionid',
              type: 'hidden',
              name: 'sessionid',
              value: sessionid
            })
          ),
          _react2.default.createElement(
            'div',
            { className: _Booking2.default.formGroup },
            _react2.default.createElement(
              'button',
              { className: _Booking2.default.button, value: 'submit', type: 'submit' },
              'Book Event'
            )
          )
        )
      )
    );
  }
  
  Booking.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Booking2.default)(Booking);

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(145);
      var insertCss = __webpack_require__(54);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Booking.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Booking.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(53)();
  // imports
  
  
  // module
  exports.push([module.id, " .Booking_root_16d {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.Booking_container_3w7 {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 380px;\n}\n\n.Booking_lead_oXi {\n  font-size: 1.25em;\n}\n\n.Booking_formGroup_1Wc {\n  margin-bottom: 20px;\n  \n}\n\n.Booking_label_yqN {\n  \n  margin-bottom: 5px;\n  max-width: 100%;\n  font-weight: 700;\n  float: left;\n}\n\n.Booking_input_b9l {\n  display: block;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  padding: 10px 16px;\n  width: 100%;\n  height: 46px;\n  outline: 0;\n  border: 1px solid #ccc;\n  border-radius: 10;\n  background: #fff;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  color: #616161;\n  font-size: 18px;\n  line-height: 1.3333333;\n  -webkit-transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\n  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\n  size: 15;\n  max-width: 30; \n}\n\n.Booking_input_b9l:focus {\n  border-color: #0074c2;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\n}\n\n.Booking_button_1QB {\n  display: block;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  margin: 0;\n  padding: 10px 16px;\n  width: 100%;\n  outline: 0;\n  border: 1px solid #373277;\n  border-radius: 0;\n  background: #483288;\n  color: #fff;\n  text-align: center;\n  text-decoration: none;\n  font-size: 18px;\n  line-height: 1.3333333;\n  cursor:  pointer;\n}\n\n.Booking_button_1QB:hover {\n  background: rgba(54, 50, 119, 0.8);\n}\n\n.Booking_button_1QB:focus {\n  border-color: #0074c2;\n  -webkit-box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n          box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n}\n\n.Booking_leftContainer_3QX {\n   float:left;\n}\n\n.Booking_rightContainer_35N {\n   float:right;\n}\n\n.Booking_icon_1b7 {\n  display: inline-block;\n  margin: -2px 12px -2px 0;\n  width: 20px;\n  height: 20px;\n  vertical-align: middle;\n  fill: currentColor;\n}\n\n.Booking_lineThrough_SuZ {\n  position: relative;\n  z-index: 1;\n  display: block;\n  margin-bottom: 15px;\n  width: 100%;\n  color: #757575;\n  text-align: center;\n  font-size: 80%;\n}\n\n.Booking_lineThrough_SuZ::before {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  z-index: -1;\n  margin-top: -5px;\n  margin-left: -20px;\n  width: 40px;\n  height: 10px;\n  background-color: #fff;\n  content: '';\n}\n\n.Booking_lineThrough_SuZ::after {\n  position: absolute;\n  top: 49%;\n  z-index: -2;\n  display: block;\n  width: 100%;\n  border-bottom: 1px solid #ddd;\n  content: '';\n}\n\n#Booking_lastname_1vn{\n    max-width:100px;\n    float:left;\n}\n\n.Booking_squaredOne_2tF {\n  width: 28px;\n  height: 28px;\n  position: relative;\n  margin: 20px auto;\n  background: #fcfff4;\n  background: -webkit-gradient(linear, left top, left bottom, from(#fcfff4), color-stop(40%, #dfe5d7), to(#b3bead));\n  background: -webkit-linear-gradient(top, #fcfff4 0%, #dfe5d7 40%, #b3bead 100%);\n  background: -o-linear-gradient(top, #fcfff4 0%, #dfe5d7 40%, #b3bead 100%);\n  background: linear-gradient(top, #fcfff4 0%, #dfe5d7 40%, #b3bead 100%);\n  -webkit-box-shadow: inset 0px 1px 1px white, 0px 1px 3px rgba(0,0,0,0.5);\n          box-shadow: inset 0px 1px 1px white, 0px 1px 3px rgba(0,0,0,0.5);\n  label {\n    width: 20px;\n    height: 20px;\n    position: absolute;\n    top: 4px;\n    left: 4px;\n    cursor: pointer;\n    background: -webkit-gradient(linear, left top, left bottom, from(top), color-stop(0%, #222), to(#45484d));\n    background: -webkit-linear-gradient(top, #222 0%, #45484d 100%);\n    background: -o-linear-gradient(top, #222 0%, #45484d 100%);\n    background: linear-gradient(top, #222 0%, #45484d 100%);\n    -webkit-box-shadow: inset 0px 1px 1px rgba(0,0,0,0.5), 0px 1px 0px rgba(255,255,255,1);\n            box-shadow: inset 0px 1px 1px rgba(0,0,0,0.5), 0px 1px 0px rgba(255,255,255,1)\n  }\n  label:after {\n    content: '';\n    width: 16px;\n    height: 16px;\n    position: absolute;\n    top: 2px;\n    left: 2px;\n    background: $activeColor;\n    background: -webkit-gradient(linear, left top, left bottom, from($activeColor), to($darkenColor));\n    background: -webkit-linear-gradient(top, $activeColor 0%, $darkenColor 100%);\n    background: -o-linear-gradient(top, $activeColor 0%, $darkenColor 100%);\n    background: linear-gradient(top, $activeColor 0%, $darkenColor 100%);\n    -webkit-box-shadow: inset 0px 1px 1px white, 0px 1px 3px rgba(0,0,0,0.5);\n            box-shadow: inset 0px 1px 1px white, 0px 1px 3px rgba(0,0,0,0.5);\n    opacity: 0;\n  }\n  label:hover::after {\n    opacity: 0.3;\n  }\n  input[type=checkbox] {\n    visibility: hidden   \n  }\n  input[type=checkbox]:checked + label:after {\n    opacity: 1;\n  } \n}", "", {"version":3,"sources":["/./routes/booking/Booking.css"],"names":[],"mappings":"CAAC;EACC,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,iBAAiB;CAClB;;AAED;EACE,kBAAkB;CACnB;;AAED;EACE,oBAAoB;;CAErB;;AAED;;EAEE,mBAAmB;EACnB,gBAAgB;EAChB,iBAAiB;EACjB,YAAY;CACb;;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,WAAW;EACX,uBAAuB;EACvB,kBAAkB;EAClB,iBAAiB;EACjB,yDAAiD;UAAjD,iDAAiD;EACjD,eAAe;EACf,gBAAgB;EAChB,uBAAuB;EACvB,yFAAyE;EAAzE,iFAAyE;EAAzE,4EAAyE;EAAzE,yEAAyE;EAAzE,+GAAyE;EACzE,SAAS;EACT,cAAc;CACf;;AAED;EACE,sBAAsB;EACtB,yFAAiF;UAAjF,iFAAiF;CAClF;;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,UAAU;EACV,mBAAmB;EACnB,YAAY;EACZ,WAAW;EACX,0BAA0B;EAC1B,iBAAiB;EACjB,oBAAoB;EACpB,YAAY;EACZ,mBAAmB;EACnB,sBAAsB;EACtB,gBAAgB;EAChB,uBAAuB;EACvB,iBAAiB;CAClB;;AAED;EACE,mCAAmC;CACpC;;AAED;EACE,sBAAsB;EACtB,mDAA2C;UAA3C,2CAA2C;CAC5C;;AAED;GACG,WAAW;CACb;;AAED;GACG,YAAY;CACd;;AAGD;EACE,sBAAsB;EACtB,yBAAyB;EACzB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,mBAAmB;CACpB;;AAED;EACE,mBAAmB;EACnB,WAAW;EACX,eAAe;EACf,oBAAoB;EACpB,YAAY;EACZ,eAAe;EACf,mBAAmB;EACnB,eAAe;CAChB;;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,UAAU;EACV,YAAY;EACZ,iBAAiB;EACjB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,YAAY;CACb;;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,YAAY;EACZ,eAAe;EACf,YAAY;EACZ,8BAA8B;EAC9B,YAAY;CACb;;AACD;IACI,gBAAgB;IAChB,WAAW;CACd;;AAED;EACE,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,kBAAkB;EAClB,oBAAoB;EACpB,kHAAwE;EAAxE,gFAAwE;EAAxE,2EAAwE;EAAxE,wEAAwE;EACxE,yEAAiE;UAAjE,iEAAiE;EACjE;IACE,YAAY;IACZ,aAAa;IACb,mBAAmB;IACnB,SAAS;IACT,UAAU;IACV,gBAAgB;IAChB,0GAAwD;IAAxD,gEAAwD;IAAxD,2DAAwD;IAAxD,wDAAwD;IACxD,uFAA+E;YAA/E,8EAA+E;GAgBhF;EAfC;IACE,YAAY;IACZ,YAAY;IACZ,aAAa;IACb,mBAAmB;IACnB,SAAS;IACT,UAAU;IACV,yBAAyB;IACzB,kGAAqE;IAArE,6EAAqE;IAArE,wEAAqE;IAArE,qEAAqE;IACrE,yEAAiE;YAAjE,iEAAiE;IACjE,WAAW;GACZ;EACD;IACE,aAAa;GACd;EAEH;IACE,kBAAmB;GAIpB;EAHC;IACE,WAAW;GACZ;CAEJ","file":"Booking.css","sourcesContent":[" .root {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.container {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 380px;\n}\n\n.lead {\n  font-size: 1.25em;\n}\n\n.formGroup {\n  margin-bottom: 20px;\n  \n}\n\n.label {\n  \n  margin-bottom: 5px;\n  max-width: 100%;\n  font-weight: 700;\n  float: left;\n}\n\n.input {\n  display: block;\n  box-sizing: border-box;\n  padding: 10px 16px;\n  width: 100%;\n  height: 46px;\n  outline: 0;\n  border: 1px solid #ccc;\n  border-radius: 10;\n  background: #fff;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  color: #616161;\n  font-size: 18px;\n  line-height: 1.3333333;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n  size: 15;\n  max-width: 30; \n}\n\n.input:focus {\n  border-color: #0074c2;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\n}\n\n.button {\n  display: block;\n  box-sizing: border-box;\n  margin: 0;\n  padding: 10px 16px;\n  width: 100%;\n  outline: 0;\n  border: 1px solid #373277;\n  border-radius: 0;\n  background: #483288;\n  color: #fff;\n  text-align: center;\n  text-decoration: none;\n  font-size: 18px;\n  line-height: 1.3333333;\n  cursor:  pointer;\n}\n\n.button:hover {\n  background: rgba(54, 50, 119, 0.8);\n}\n\n.button:focus {\n  border-color: #0074c2;\n  box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n}\n\n.leftContainer {\n   float:left;\n}\n\n.rightContainer {\n   float:right;\n}\n\n\n.icon {\n  display: inline-block;\n  margin: -2px 12px -2px 0;\n  width: 20px;\n  height: 20px;\n  vertical-align: middle;\n  fill: currentColor;\n}\n\n.lineThrough {\n  position: relative;\n  z-index: 1;\n  display: block;\n  margin-bottom: 15px;\n  width: 100%;\n  color: #757575;\n  text-align: center;\n  font-size: 80%;\n}\n\n.lineThrough::before {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  z-index: -1;\n  margin-top: -5px;\n  margin-left: -20px;\n  width: 40px;\n  height: 10px;\n  background-color: #fff;\n  content: '';\n}\n\n.lineThrough::after {\n  position: absolute;\n  top: 49%;\n  z-index: -2;\n  display: block;\n  width: 100%;\n  border-bottom: 1px solid #ddd;\n  content: '';\n}\n#lastname{\n    max-width:100px;\n    float:left;\n}\n\n.squaredOne {\n  width: 28px;\n  height: 28px;\n  position: relative;\n  margin: 20px auto;\n  background: #fcfff4;\n  background: linear-gradient(top, #fcfff4 0%, #dfe5d7 40%, #b3bead 100%);\n  box-shadow: inset 0px 1px 1px white, 0px 1px 3px rgba(0,0,0,0.5);\n  label {\n    width: 20px;\n    height: 20px;\n    position: absolute;\n    top: 4px;\n    left: 4px;\n    cursor: pointer;\n    background: linear-gradient(top, #222 0%, #45484d 100%);\n    box-shadow: inset 0px 1px 1px rgba(0,0,0,0.5), 0px 1px 0px rgba(255,255,255,1);\n    &:after {\n      content: '';\n      width: 16px;\n      height: 16px;\n      position: absolute;\n      top: 2px;\n      left: 2px;\n      background: $activeColor;\n      background: linear-gradient(top, $activeColor 0%, $darkenColor 100%);\n      box-shadow: inset 0px 1px 1px white, 0px 1px 3px rgba(0,0,0,0.5);\n      opacity: 0;\n    }\n    &:hover::after {\n      opacity: 0.3;\n    }\n  }\n  input[type=checkbox] {\n    visibility: hidden;\n    &:checked + label:after {\n      opacity: 1;\n    }   \n  } \n}"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Booking_root_16d",
  	"container": "Booking_container_3w7",
  	"lead": "Booking_lead_oXi",
  	"formGroup": "Booking_formGroup_1Wc",
  	"label": "Booking_label_yqN",
  	"input": "Booking_input_b9l",
  	"button": "Booking_button_1QB",
  	"leftContainer": "Booking_leftContainer_3QX",
  	"rightContainer": "Booking_rightContainer_35N",
  	"icon": "Booking_icon_1b7",
  	"lineThrough": "Booking_lineThrough_SuZ",
  	"lastname": "Booking_lastname_1vn",
  	"squaredOne": "Booking_squaredOne_2tF"
  };

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _promise = __webpack_require__(83);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _stringify = __webpack_require__(55);
  
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
  
  var _react = __webpack_require__(43);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Savebooking = __webpack_require__(147);
  
  var _Savebooking2 = _interopRequireDefault(_Savebooking);
  
  var _Providerlist = __webpack_require__(150);
  
  var _Providerlist2 = _interopRequireDefault(_Providerlist);
  
  var _Login = __webpack_require__(106);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  var _config = __webpack_require__(20);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var request = __webpack_require__(92);
  
  var message = 'Booking done Sucessfully  ';
  var href = 'http://' + _config.host + '/';
  var message1 = 'Click here to login';
  var status = true;
  var email;
  var phone;
  var zipcode;
  var providerlist;
  var sessionid;
  
  exports.default = {
  
    path: '/savebooking',
  
    action: function action(_ref, _ref2) {
      var _this = this;
  
      var query = _ref.query;
      var path = _ref2.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var sessionbody, body, mail, sms;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log("Query String - index.js - Savebooking: " + (0, _stringify2.default)(query));
                phone = query.mobile;
                email = query.email;
                console.log("Email: " + email);
                sessionid = query.sessionid;
                console.log("Sessionid - index.js - Savebooking " + sessionid);
  
                if (!(sessionid === undefined || sessionid == '')) {
                  _context.next = 11;
                  break;
                }
  
                _context.next = 9;
                return getSessionid();
  
              case 9:
                sessionbody = _context.sent;
                return _context.abrupt('return', _react2.default.createElement(_Login2.default, { sessionid: sessionbody }));
  
              case 11:
                _context.next = 13;
                return SavebookingData(query);
  
              case 13:
                body = _context.sent;
  
                console.log("Calling SendEmail");
                _context.next = 17;
                return sendEmail();
  
              case 17:
                mail = _context.sent;
  
                console.log("Calling sendSMS");
                _context.next = 21;
                return sendSMS();
  
              case 21:
                sms = _context.sent;
  
                console.log("Body: " + body);
  
                if (status) {
                  _context.next = 30;
                  break;
                }
  
                message = 'Unable to book the Event';
                href = 'http://' + _config.host + '/booking';
                message1 = 'Click here to Register.';
                return _context.abrupt('return', _react2.default.createElement(_Savebooking2.default, { message: message, redirectlink: href, message1: message1, sessionid: sessionid }));
  
              case 30:
                _context.next = 32;
                return getProviderData();
  
              case 32:
                providerlist = _context.sent;
  
                console.log("Service Provider List: " + providerlist);
                return _context.abrupt('return', _react2.default.createElement(_Providerlist2.default, { providerlist: providerlist, customeremail: email, sessionid: sessionid }));
  
              case 35:
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
  
  function getProviderData() {
    var request = __webpack_require__(92);
  
    console.log('calling API');
    var url = 'http://' + _config.apihost + '/searchByType?servicetype=Pooja';
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
    var request = __webpack_require__(92);
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
/* 147 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(43);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(58);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Savebooking = __webpack_require__(148);
  
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
  
  function Savebooking(_ref, context) {
    var message = _ref.message,
        redirectlink = _ref.redirectlink,
        message1 = _ref.message1,
        sessionid = _ref.sessionid;
  
    context.setTitle(title);
    return _react2.default.createElement(
      'div',
      { className: _Savebooking2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Savebooking2.default.container },
        _react2.default.createElement(
          'h1',
          null,
          title
        ),
        _react2.default.createElement(
          'p',
          null,
          message
        ),
        _react2.default.createElement(
          'a',
          { href: redirectlink },
          message1,
          ' '
        ),
        _react2.default.createElement('input', {
          id: 'sessionid',
          type: 'hidden',
          name: 'sessionid',
          value: sessionid
        })
      )
    );
  }
  
  Savebooking.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Savebooking2.default)(Savebooking);

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(149);
      var insertCss = __webpack_require__(54);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Savebooking.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Savebooking.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(53)();
  // imports
  
  
  // module
  exports.push([module.id, " .Savebooking_root_1qY {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.Savebooking_container_2d_ {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 380px;\n}\n\n.Savebooking_lead_1N_ {\n  font-size: 1.25em;\n}\n\n.Savebooking_formGroup_-cl {\n  margin-bottom: 20px;\n  \n}\n\n.Savebooking_label_2o3 {\n  \n  margin-bottom: 5px;\n  max-width: 100%;\n  font-weight: 700;\n  float: left;\n}\n\n.Savebooking_input_TmP {\n  display: block;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  padding: 10px 16px;\n  width: 100%;\n  height: 46px;\n  outline: 0;\n  border: 1px solid #ccc;\n  border-radius: 10;\n  background: #fff;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  color: #616161;\n  font-size: 18px;\n  line-height: 1.3333333;\n  -webkit-transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\n  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\n}\n\n.Savebooking_input_TmP:focus {\n  border-color: #0074c2;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\n}\n\n.Savebooking_button_1_L {\n  display: block;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  margin: 0;\n  padding: 10px 16px;\n  width: 100%;\n  outline: 0;\n  border: 1px solid #373277;\n  border-radius: 0;\n  background: #373277;\n  color: #fff;\n  text-align: center;\n  text-decoration: none;\n  font-size: 18px;\n  line-height: 1.3333333;\n  cursor: pointer;\n}\n\n.Savebooking_button_1_L:hover {\n  background: rgba(54, 50, 119, 0.8);\n}\n\n.Savebooking_button_1_L:focus {\n  border-color: #0074c2;\n  -webkit-box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n          box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n}\n\n.Savebooking_icon_hHj {\n  display: inline-block;\n  margin: -2px 12px -2px 0;\n  width: 20px;\n  height: 20px;\n  vertical-align: middle;\n  fill: currentColor;\n}\n\n.Savebooking_lineThrough_LPA {\n  position: relative;\n  z-index: 1;\n  display: block;\n  margin-bottom: 15px;\n  width: 100%;\n  color: #757575;\n  text-align: center;\n  font-size: 80%;\n}\n\n.Savebooking_lineThrough_LPA::before {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  z-index: -1;\n  margin-top: -5px;\n  margin-left: -20px;\n  width: 40px;\n  height: 10px;\n  background-color: #fff;\n  content: '';\n}\n\n.Savebooking_lineThrough_LPA::after {\n  position: absolute;\n  top: 49%;\n  z-index: -2;\n  display: block;\n  width: 100%;\n  border-bottom: 1px solid #ddd;\n  content: '';\n}\n\n#Savebooking_lastname_3wM{\n    max-width:100px;\n    float:left;\n}\n\n.Savebooking_div_33s {\n  float:right;\n}\n\n#Savebooking_leftContainer_2Oo {\n   float:left;\n}\n\n#Savebooking_rightContainer_2aP {\n   float:right;\n}", "", {"version":3,"sources":["/./routes/savebooking/Savebooking.css"],"names":[],"mappings":"CAAC;EACC,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,iBAAiB;CAClB;;AAED;EACE,kBAAkB;CACnB;;AAED;EACE,oBAAoB;;CAErB;;AAED;;EAEE,mBAAmB;EACnB,gBAAgB;EAChB,iBAAiB;EACjB,YAAY;CACb;;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,WAAW;EACX,uBAAuB;EACvB,kBAAkB;EAClB,iBAAiB;EACjB,yDAAiD;UAAjD,iDAAiD;EACjD,eAAe;EACf,gBAAgB;EAChB,uBAAuB;EACvB,yFAAyE;EAAzE,iFAAyE;EAAzE,4EAAyE;EAAzE,yEAAyE;EAAzE,+GAAyE;CAC1E;;AAED;EACE,sBAAsB;EACtB,yFAAiF;UAAjF,iFAAiF;CAClF;;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,UAAU;EACV,mBAAmB;EACnB,YAAY;EACZ,WAAW;EACX,0BAA0B;EAC1B,iBAAiB;EACjB,oBAAoB;EACpB,YAAY;EACZ,mBAAmB;EACnB,sBAAsB;EACtB,gBAAgB;EAChB,uBAAuB;EACvB,gBAAgB;CACjB;;AAED;EACE,mCAAmC;CACpC;;AAED;EACE,sBAAsB;EACtB,mDAA2C;UAA3C,2CAA2C;CAC5C;;AAID;EACE,sBAAsB;EACtB,yBAAyB;EACzB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,mBAAmB;CACpB;;AAED;EACE,mBAAmB;EACnB,WAAW;EACX,eAAe;EACf,oBAAoB;EACpB,YAAY;EACZ,eAAe;EACf,mBAAmB;EACnB,eAAe;CAChB;;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,UAAU;EACV,YAAY;EACZ,iBAAiB;EACjB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,YAAY;CACb;;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,YAAY;EACZ,eAAe;EACf,YAAY;EACZ,8BAA8B;EAC9B,YAAY;CACb;;AACD;IACI,gBAAgB;IAChB,WAAW;CACd;;AAED;EACE,YAAY;CACb;;AAED;GACG,WAAW;CACb;;AAED;GACG,YAAY;CACd","file":"Savebooking.css","sourcesContent":[" .root {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.container {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 380px;\n}\n\n.lead {\n  font-size: 1.25em;\n}\n\n.formGroup {\n  margin-bottom: 20px;\n  \n}\n\n.label {\n  \n  margin-bottom: 5px;\n  max-width: 100%;\n  font-weight: 700;\n  float: left;\n}\n\n.input {\n  display: block;\n  box-sizing: border-box;\n  padding: 10px 16px;\n  width: 100%;\n  height: 46px;\n  outline: 0;\n  border: 1px solid #ccc;\n  border-radius: 10;\n  background: #fff;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  color: #616161;\n  font-size: 18px;\n  line-height: 1.3333333;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n}\n\n.input:focus {\n  border-color: #0074c2;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\n}\n\n.button {\n  display: block;\n  box-sizing: border-box;\n  margin: 0;\n  padding: 10px 16px;\n  width: 100%;\n  outline: 0;\n  border: 1px solid #373277;\n  border-radius: 0;\n  background: #373277;\n  color: #fff;\n  text-align: center;\n  text-decoration: none;\n  font-size: 18px;\n  line-height: 1.3333333;\n  cursor: pointer;\n}\n\n.button:hover {\n  background: rgba(54, 50, 119, 0.8);\n}\n\n.button:focus {\n  border-color: #0074c2;\n  box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n}\n\n\n\n.icon {\n  display: inline-block;\n  margin: -2px 12px -2px 0;\n  width: 20px;\n  height: 20px;\n  vertical-align: middle;\n  fill: currentColor;\n}\n\n.lineThrough {\n  position: relative;\n  z-index: 1;\n  display: block;\n  margin-bottom: 15px;\n  width: 100%;\n  color: #757575;\n  text-align: center;\n  font-size: 80%;\n}\n\n.lineThrough::before {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  z-index: -1;\n  margin-top: -5px;\n  margin-left: -20px;\n  width: 40px;\n  height: 10px;\n  background-color: #fff;\n  content: '';\n}\n\n.lineThrough::after {\n  position: absolute;\n  top: 49%;\n  z-index: -2;\n  display: block;\n  width: 100%;\n  border-bottom: 1px solid #ddd;\n  content: '';\n}\n#lastname{\n    max-width:100px;\n    float:left;\n}\n\n.div {\n  float:right;\n}\n\n#leftContainer {\n   float:left;\n}\n\n#rightContainer {\n   float:right;\n}"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Savebooking_root_1qY",
  	"container": "Savebooking_container_2d_",
  	"lead": "Savebooking_lead_1N_",
  	"formGroup": "Savebooking_formGroup_-cl",
  	"label": "Savebooking_label_2o3",
  	"input": "Savebooking_input_TmP",
  	"button": "Savebooking_button_1_L",
  	"icon": "Savebooking_icon_hHj",
  	"lineThrough": "Savebooking_lineThrough_LPA",
  	"lastname": "Savebooking_lastname_3wM",
  	"div": "Savebooking_div_33s",
  	"leftContainer": "Savebooking_leftContainer_2Oo",
  	"rightContainer": "Savebooking_rightContainer_2aP"
  };

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(43);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(58);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Providerlist = __webpack_require__(151);
  
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
  
  function Providerlist(_ref, props, context) {
    var providerlist = _ref.providerlist,
        customeremail = _ref.customeremail,
        sessionid = _ref.sessionid;
  
    //context.setTitle(title);
  
    var providerdata = JSON.parse(providerlist);
  
    console.log("Provider Data: " + providerdata);
    return _react2.default.createElement(
      'div',
      { className: _Providerlist2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Providerlist2.default.container },
        _react2.default.createElement(
          'h1',
          null,
          'Service Provider Search'
        ),
        _react2.default.createElement(
          'p',
          null,
          'Select Provider near by you'
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'form',
            { name: 'form1', method: 'put', action: 'linkprovider' },
            _react2.default.createElement(
              'div',
              { className: _Providerlist2.default.formGroup },
              _react2.default.createElement(
                'table',
                null,
                _react2.default.createElement(
                  'caption',
                  null,
                  'Service Providers'
                ),
                _react2.default.createElement(
                  'thead',
                  null,
                  _react2.default.createElement(
                    'tr',
                    null,
                    _react2.default.createElement(
                      'th',
                      null,
                      'Select'
                    ),
                    _react2.default.createElement(
                      'th',
                      null,
                      'Email'
                    ),
                    _react2.default.createElement(
                      'th',
                      null,
                      'First Name'
                    ),
                    _react2.default.createElement(
                      'th',
                      null,
                      'Last Name'
                    ),
                    _react2.default.createElement(
                      'th',
                      null,
                      'Address'
                    ),
                    _react2.default.createElement(
                      'th',
                      null,
                      'City'
                    ),
                    _react2.default.createElement(
                      'th',
                      null,
                      'Phone'
                    )
                  )
                ),
                _react2.default.createElement(
                  'tbody',
                  null,
                  providerdata.map(function (obj, index) {
                    return _react2.default.createElement(
                      'tr',
                      { key: index },
                      _react2.default.createElement(
                        'td',
                        null,
                        _react2.default.createElement('input', { type: 'radio', name: 'provideremail', value: obj.email }),
                        ' '
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ' ',
                        _react2.default.createElement('input', { id: 'email', type: 'hidden', value: obj.email }),
                        obj.email,
                        ' '
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ' ',
                        obj.firstname
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ' ',
                        obj.lname,
                        ' '
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ' ',
                        obj.address
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ' ',
                        obj.city
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        obj.phone
                      )
                    );
                  })
                )
              )
            ),
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement('br', null),
              _react2.default.createElement('input', { type: 'hidden', name: 'customeremail', value: customeremail }),
              _react2.default.createElement('input', { type: 'hidden', name: 'sessionid', value: sessionid }),
              _react2.default.createElement(
                'button',
                { className: _Providerlist2.default.button, type: 'submit' },
                'Submit'
              )
            )
          )
        )
      )
    );
  }
  
  Providerlist.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Providerlist2.default)(Providerlist);

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(152);
      var insertCss = __webpack_require__(54);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Providerlist.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Providerlist.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(53)();
  // imports
  
  
  // module
  exports.push([module.id, " .Providerlist_root_2fr {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.Providerlist_container_3Q4 {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 380px;\n  max-height:100x\n}\n\nhtml {\n  min-height: 100%;\n}\n\nbody {\n  min-height: 100vh;\n}\n\ntable, th, td {\n  border: 1px solid black;\n}\n\ntr:hover {background-color: #f5f5f5}\n\nth {\n  background-color: #4CAF50;\n  color: white;\n}\n\n.Providerlist_button_Tyf {\n  display: block;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  margin: 0;\n  padding: 10px 16px;\n  width: 30%;\n  outline: 0;\n  border: 1px solid #373277;\n  border-radius: 0;\n  background: #373277;\n  color: #fff;\n  text-align: center;\n  text-decoration: none;\n  font-size: 18px;\n  line-height: 1.3333333;\n  cursor: pointer;\n}\n\n.Providerlist_button_Tyf:hover {\n  background: rgba(54, 50, 119, 0.8);\n}\n\n.Providerlist_button_Tyf:focus {\n  border-color: #0074c2;\n  -webkit-box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n          box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n}\n\ndiv {\n  overflow-x:visible;\n   \n}\n\n.Providerlist_formGroup_2cf {\n  margin-bottom: 15px;\n}", "", {"version":3,"sources":["/./routes/providerlist/Providerlist.css"],"names":[],"mappings":"CAAC;EACC,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,iBAAiB;EACjB,eAAe;CAChB;;AAID;EACE,iBAAiB;CAClB;;AAED;EACE,kBAAkB;CACnB;;AAED;EACE,wBAAwB;CACzB;;AACD,UAAU,yBAAyB,CAAC;;AACpC;EACE,0BAA0B;EAC1B,aAAa;CACd;;AACD;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,UAAU;EACV,mBAAmB;EACnB,WAAW;EACX,WAAW;EACX,0BAA0B;EAC1B,iBAAiB;EACjB,oBAAoB;EACpB,YAAY;EACZ,mBAAmB;EACnB,sBAAsB;EACtB,gBAAgB;EAChB,uBAAuB;EACvB,gBAAgB;CACjB;;AAED;EACE,mCAAmC;CACpC;;AAED;EACE,sBAAsB;EACtB,mDAA2C;UAA3C,2CAA2C;CAC5C;;AAED;EACE,mBAAmB;;CAEpB;;AAGD;EACE,oBAAoB;CACrB","file":"Providerlist.css","sourcesContent":[" .root {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.container {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 380px;\n  max-height:100x\n}\n\n\n\nhtml {\n  min-height: 100%;\n}\n\nbody {\n  min-height: 100vh;\n}\n\ntable, th, td {\n  border: 1px solid black;\n} \ntr:hover {background-color: #f5f5f5}\nth {\n  background-color: #4CAF50;\n  color: white;\n}\n.button {\n  display: block;\n  box-sizing: border-box;\n  margin: 0;\n  padding: 10px 16px;\n  width: 30%;\n  outline: 0;\n  border: 1px solid #373277;\n  border-radius: 0;\n  background: #373277;\n  color: #fff;\n  text-align: center;\n  text-decoration: none;\n  font-size: 18px;\n  line-height: 1.3333333;\n  cursor: pointer;\n}\n\n.button:hover {\n  background: rgba(54, 50, 119, 0.8);\n}\n\n.button:focus {\n  border-color: #0074c2;\n  box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n}\n\ndiv {\n  overflow-x:visible;\n   \n}\n\n\n.formGroup {\n  margin-bottom: 15px;\n}"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Providerlist_root_2fr",
  	"container": "Providerlist_container_3Q4",
  	"button": "Providerlist_button_Tyf",
  	"formGroup": "Providerlist_formGroup_2cf"
  };

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(43);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _providerlogin = __webpack_require__(154);
  
  var _providerlogin2 = _interopRequireDefault(_providerlogin);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
  
    path: '/providerlogin',
  
    action: function action() {
      return _react2.default.createElement(_providerlogin2.default, null);
    }
  };

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(43);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactDom = __webpack_require__(88);
  
  var _reactDom2 = _interopRequireDefault(_reactDom);
  
  var _withStyles = __webpack_require__(58);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Providerlogin = __webpack_require__(155);
  
  var _Providerlogin2 = _interopRequireDefault(_Providerlogin);
  
  var _Link = __webpack_require__(61);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Entering Credentials';
  
  function Providerlogin(props, context) {
    context.setTitle(title);
  
    return _react2.default.createElement(
      'div',
      { className: _Providerlogin2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Providerlogin2.default.container },
        _react2.default.createElement(
          'h1',
          null,
          title
        ),
        _react2.default.createElement(
          'p',
          { className: _Providerlogin2.default.lead },
          'Log in with your username or email address.'
        ),
        _react2.default.createElement(
          'div',
          { className: _Providerlogin2.default.formGroup },
          _react2.default.createElement(
            'form',
            { name: 'form1', method: 'get', action: 'verifyproviderlogin' },
            _react2.default.createElement(
              'div',
              { className: _Providerlogin2.default.formGroup },
              _react2.default.createElement(
                'label',
                { className: _Providerlogin2.default.label, htmlFor: 'usernameOrEmail' },
                'Username or email address:'
              ),
              _react2.default.createElement('input', {
                className: _Providerlogin2.default.input,
                id: 'email',
                type: 'email',
                name: 'email',
                required: 'required',
                autoFocus: true
              })
            ),
            _react2.default.createElement(
              'div',
              { className: _Providerlogin2.default.formGroup },
              _react2.default.createElement(
                'label',
                { className: _Providerlogin2.default.label, htmlFor: 'password' },
                'Password:'
              ),
              _react2.default.createElement('input', {
                className: _Providerlogin2.default.input,
                id: 'password',
                type: 'password',
                name: 'password',
                required: 'required'
              })
            ),
            _react2.default.createElement(
              'div',
              { className: _Providerlogin2.default.formGroup },
              _react2.default.createElement(
                'button',
                { className: _Providerlogin2.default.button1, type: 'submit' },
                'Log in'
              ),
              _react2.default.createElement(
                _Link2.default,
                { to: '/forgotpass' },
                'Forgot Password'
              ),
              _react2.default.createElement(
                'span',
                { className: _Providerlogin2.default.spacer },
                ' | '
              ),
              _react2.default.createElement(
                _Link2.default,
                { to: '/register' },
                'Sign Up'
              )
            )
          )
        )
      )
    );
  }
  
  Providerlogin.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Providerlogin2.default)(Providerlogin);

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(156);
      var insertCss = __webpack_require__(54);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Providerlogin.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Providerlogin.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(53)();
  // imports
  
  
  // module
  exports.push([module.id, "\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n}\n\n.Providerlogin_root_2kF {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.Providerlogin_container_20Q {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 380px;\n  max-height: 580px\n}\n\n.Providerlogin_lead_3Nd {\n  font-size: 1.25em;\n}\n\n.Providerlogin_formGroup_lA5 {\n  margin-bottom: 15px;\n}\n\n.Providerlogin_label_15r {\n  display: inline-block;\n  margin-bottom: 5px;\n  max-width: 100%;\n  font-weight: 700;\n}\n\n.Providerlogin_input_2Ay {\n  display: block;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  padding: 10px 16px;\n  width: 100%;\n  height: 26px;\n  outline: 0;\n  border: 1px solid #ccc;\n  border-radius: 0;\n  background: #fff;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  color: #616161;\n  font-size: 18px;\n  line-height: 1.3333333;\n  -webkit-transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\n  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\n}\n\n.Providerlogin_input_2Ay:focus {\n  border-color: #0074c2;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\n}\n\n.Providerlogin_button_2il {\n  display: block;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  margin: 0;\n  padding: 10px 16px;\n  width: 80%;\n  outline: 10;\n  border: 1px solid #373277;\n  border-radius: 0;\n  background: #373277;\n  color: #fff;\n  text-align: center;\n  text-decoration: none;\n  font-size: 18px;\n  line-height: 1.3333333;\n  cursor: pointer;\n}\n\n.Providerlogin_button1_120 {\n  display: block;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  margin: 0;\n  padding: 10px 16px;\n  width: 50%;\n  outline: 0;\n  border: 1px solid #373277;\n  border-radius: 0;\n  background: #373388;\n  color: #fff;\n  text-align: center;\n  text-decoration: none;\n  font-size: 14px;\n  line-height: 1.3333333;\n  cursor: pointer;\n}\n\n.Providerlogin_button_2il:hover {\n  background: rgba(54, 50, 119, 0.8);\n}\n\n.Providerlogin_button_2il:focus {\n  border-color: #0074c2;\n  -webkit-box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n          box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n}\n\n.Providerlogin_facebook_1jW {\n  border-color: #3b5998;\n  background: #3b5998;\n}\n\n.Providerlogin_facebook_1jW:hover {\n  background: #2d4373;\n}\n\n.Providerlogin_google_1Ct {\n  border-color: #dd4b39;\n  background: #dd4b39;\n}\n\n.Providerlogin_google_1Ct:hover {\n  background: #c23321;\n}\n\n.Providerlogin_twitter_3bX {\n  border-color: #55acee;\n  background: #55acee;\n}\n\n.Providerlogin_twitter_3bX:hover {\n  background: #2795e9;\n}\n\n.Providerlogin_icon_3e1 {\n  display: inline-block;\n  margin: -2px 12px -2px 0;\n  width: 20px;\n  height: 20px;\n  vertical-align: middle;\n  fill: currentColor;\n}\n\n.Providerlogin_lineThrough_1ur {\n  position: relative;\n  z-index: 1;\n  display: block;\n  margin-bottom: 15px;\n  width: 100%;\n  color: #757575;\n  text-align: center;\n  font-size: 80%;\n}\n\n.Providerlogin_lineThrough_1ur::before {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  z-index: -1;\n  margin-top: -5px;\n  margin-left: -20px;\n  width: 40px;\n  height: 10px;\n  background-color: #fff;\n  content: '';\n}\n\n.Providerlogin_lineThrough_1ur::after {\n  position: absolute;\n  top: 49%;\n  z-index: -2;\n  display: block;\n  width: 100%;\n  border-bottom: 1px solid #ddd;\n  content: '';\n}\n", "", {"version":3,"sources":["/./components/variables.css","/./routes/providerlogin/Providerlogin.css"],"names":[],"mappings":";;AAEA;EACE;;gFAE8E;;EAI9E;;gFAE8E;;EAI9E;;gFAE8E,EAErD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;CAC3D;;ACpBD;EACE,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,iBAAiB;EACjB,iBAAiB;CAClB;;AAED;EACE,kBAAkB;CACnB;;AAED;EACE,oBAAoB;CACrB;;AAED;EACE,sBAAsB;EACtB,mBAAmB;EACnB,gBAAgB;EAChB,iBAAiB;CAClB;;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,WAAW;EACX,uBAAuB;EACvB,iBAAiB;EACjB,iBAAiB;EACjB,yDAAiD;UAAjD,iDAAiD;EACjD,eAAe;EACf,gBAAgB;EAChB,uBAAuB;EACvB,yFAAyE;EAAzE,iFAAyE;EAAzE,4EAAyE;EAAzE,yEAAyE;EAAzE,+GAAyE;CAC1E;;AAED;EACE,sBAAsB;EACtB,yFAAiF;UAAjF,iFAAiF;CAClF;;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,UAAU;EACV,mBAAmB;EACnB,WAAW;EACX,YAAY;EACZ,0BAA0B;EAC1B,iBAAiB;EACjB,oBAAoB;EACpB,YAAY;EACZ,mBAAmB;EACnB,sBAAsB;EACtB,gBAAgB;EAChB,uBAAuB;EACvB,gBAAgB;CACjB;;AACD;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,UAAU;EACV,mBAAmB;EACnB,WAAW;EACX,WAAW;EACX,0BAA0B;EAC1B,iBAAiB;EACjB,oBAAoB;EACpB,YAAY;EACZ,mBAAmB;EACnB,sBAAsB;EACtB,gBAAgB;EAChB,uBAAuB;EACvB,gBAAgB;CACjB;;AAED;EACE,mCAAmC;CACpC;;AAED;EACE,sBAAsB;EACtB,mDAA2C;UAA3C,2CAA2C;CAC5C;;AAED;EACE,sBAAsB;EACtB,oBAAoB;CAErB;;AAED;EACE,oBAAoB;CACrB;;AAED;EACE,sBAAsB;EACtB,oBAAoB;CAErB;;AAED;EACE,oBAAoB;CACrB;;AAED;EACE,sBAAsB;EACtB,oBAAoB;CAErB;;AAED;EACE,oBAAoB;CACrB;;AAED;EACE,sBAAsB;EACtB,yBAAyB;EACzB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,mBAAmB;CACpB;;AAED;EACE,mBAAmB;EACnB,WAAW;EACX,eAAe;EACf,oBAAoB;EACpB,YAAY;EACZ,eAAe;EACf,mBAAmB;EACnB,eAAe;CAChB;;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,UAAU;EACV,YAAY;EACZ,iBAAiB;EACjB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,YAAY;CACb;;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,YAAY;EACZ,eAAe;EACf,YAAY;EACZ,8BAA8B;EAC9B,YAAY;CACb","file":"Providerlogin.css","sourcesContent":["\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  --font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  --max-content-width: 1000px;\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */\n\n  --screen-xs-min: 480px;  /* Extra small screen / phone */\n  --screen-sm-min: 768px;  /* Small screen / tablet */\n  --screen-md-min: 992px;  /* Medium screen / desktop */\n  --screen-lg-min: 1200px; /* Large screen / wide desktop */\n}\n","\n@import '../../components/variables.css';\n\n.root {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.container {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 380px;\n  max-height: 580px\n}\n\n.lead {\n  font-size: 1.25em;\n}\n\n.formGroup {\n  margin-bottom: 15px;\n}\n\n.label {\n  display: inline-block;\n  margin-bottom: 5px;\n  max-width: 100%;\n  font-weight: 700;\n}\n\n.input {\n  display: block;\n  box-sizing: border-box;\n  padding: 10px 16px;\n  width: 100%;\n  height: 26px;\n  outline: 0;\n  border: 1px solid #ccc;\n  border-radius: 0;\n  background: #fff;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  color: #616161;\n  font-size: 18px;\n  line-height: 1.3333333;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n}\n\n.input:focus {\n  border-color: #0074c2;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\n}\n\n.button {\n  display: block;\n  box-sizing: border-box;\n  margin: 0;\n  padding: 10px 16px;\n  width: 80%;\n  outline: 10;\n  border: 1px solid #373277;\n  border-radius: 0;\n  background: #373277;\n  color: #fff;\n  text-align: center;\n  text-decoration: none;\n  font-size: 18px;\n  line-height: 1.3333333;\n  cursor: pointer;\n}\n.button1 {\n  display: block;\n  box-sizing: border-box;\n  margin: 0;\n  padding: 10px 16px;\n  width: 50%;\n  outline: 0;\n  border: 1px solid #373277;\n  border-radius: 0;\n  background: #373388;\n  color: #fff;\n  text-align: center;\n  text-decoration: none;\n  font-size: 14px;\n  line-height: 1.3333333;\n  cursor: pointer;\n}\n\n.button:hover {\n  background: rgba(54, 50, 119, 0.8);\n}\n\n.button:focus {\n  border-color: #0074c2;\n  box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n}\n\n.facebook {\n  border-color: #3b5998;\n  background: #3b5998;\n  composes: button;\n}\n\n.facebook:hover {\n  background: #2d4373;\n}\n\n.google {\n  border-color: #dd4b39;\n  background: #dd4b39;\n  composes: button;\n}\n\n.google:hover {\n  background: #c23321;\n}\n\n.twitter {\n  border-color: #55acee;\n  background: #55acee;\n  composes: button;\n}\n\n.twitter:hover {\n  background: #2795e9;\n}\n\n.icon {\n  display: inline-block;\n  margin: -2px 12px -2px 0;\n  width: 20px;\n  height: 20px;\n  vertical-align: middle;\n  fill: currentColor;\n}\n\n.lineThrough {\n  position: relative;\n  z-index: 1;\n  display: block;\n  margin-bottom: 15px;\n  width: 100%;\n  color: #757575;\n  text-align: center;\n  font-size: 80%;\n}\n\n.lineThrough::before {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  z-index: -1;\n  margin-top: -5px;\n  margin-left: -20px;\n  width: 40px;\n  height: 10px;\n  background-color: #fff;\n  content: '';\n}\n\n.lineThrough::after {\n  position: absolute;\n  top: 49%;\n  z-index: -2;\n  display: block;\n  width: 100%;\n  border-bottom: 1px solid #ddd;\n  content: '';\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Providerlogin_root_2kF",
  	"container": "Providerlogin_container_20Q",
  	"lead": "Providerlogin_lead_3Nd",
  	"formGroup": "Providerlogin_formGroup_lA5",
  	"label": "Providerlogin_label_15r",
  	"input": "Providerlogin_input_2Ay",
  	"button": "Providerlogin_button_2il",
  	"button1": "Providerlogin_button1_120",
  	"facebook": "Providerlogin_facebook_1jW Providerlogin_button_2il",
  	"google": "Providerlogin_google_1Ct Providerlogin_button_2il",
  	"twitter": "Providerlogin_twitter_3bX Providerlogin_button_2il",
  	"icon": "Providerlogin_icon_3e1",
  	"lineThrough": "Providerlogin_lineThrough_1ur"
  };

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _promise = __webpack_require__(83);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _stringify = __webpack_require__(55);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(43);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _LinkProvider = __webpack_require__(158);
  
  var _LinkProvider2 = _interopRequireDefault(_LinkProvider);
  
  var _config = __webpack_require__(20);
  
  var _Login = __webpack_require__(87);
  
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
  
  exports.default = {
  
    path: '/linkprovider',
  
    action: function action(_ref, _ref2) {
      var _this = this;
  
      var query = _ref.query;
      var path = _ref2.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var provideremail, customeremail, sessionid, body, url, result;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log("Query String - index.js - linkprovider: " + (0, _stringify2.default)(query));
                provideremail = query.provideremail;
                customeremail = query.customeremail;
                sessionid = query.sessionid;
  
                console.log("Sessionid - index.js - Home " + sessionid);
  
                if (!(sessionid === undefined || sessionid == '')) {
                  _context.next = 10;
                  break;
                }
  
                _context.next = 8;
                return getSessionid();
  
              case 8:
                body = _context.sent;
                return _context.abrupt('return', _react2.default.createElement(_Login2.default, { sessionid: body }));
  
              case 10:
                url = 'http://' + _config.apihost + '/updateProviderLink?provideremail=' + provideremail + '&email=' + customeremail;
  
                console.log("Link Provider - Provider Email: " + provideremail);
                console.log("Link Provider - Customer Email: " + customeremail);
                console.log("URL: " + url);
                _context.next = 16;
                return LinkProviderData(url);
  
              case 16:
                result = _context.sent;
  
                console.log("Return from LinkProviderData");
                if (!status) {
                  message = 'Error in Saving Booking Data';
                  href = 'http://' + _config.host + '/booking';
                  message1 = 'Click here to Re-booking';
                }
  
                return _context.abrupt('return', _react2.default.createElement(_LinkProvider2.default, { message: message, redirectlink: href, message1: message1, sessionid: sessionid }));
  
              case 20:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
  
  
  function LinkProviderData(url) {
    var request = __webpack_require__(92);
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
  
  function getSessionid() {
    var request = __webpack_require__(92);
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
/* 158 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(43);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(58);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _LinkProvider = __webpack_require__(159);
  
  var _LinkProvider2 = _interopRequireDefault(_LinkProvider);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'New Boooking';
  
  function LinkProvider(_ref, context) {
    var message = _ref.message,
        redirectlink = _ref.redirectlink,
        message1 = _ref.message1,
        sessionid = _ref.sessionid;
  
    context.setTitle(title);
    return _react2.default.createElement(
      'div',
      { className: _LinkProvider2.default.root },
      _react2.default.createElement(
        'div',
        { className: _LinkProvider2.default.container },
        _react2.default.createElement(
          'h1',
          null,
          title
        ),
        _react2.default.createElement(
          'p',
          null,
          message
        ),
        _react2.default.createElement(
          'a',
          { href: redirectlink },
          message1,
          ' '
        ),
        _react2.default.createElement('input', { type: 'hidden', name: 'sessionid', value: sessionid })
      )
    );
  }
  
  LinkProvider.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_LinkProvider2.default)(LinkProvider);

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(160);
      var insertCss = __webpack_require__(54);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./LinkProvider.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./LinkProvider.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(53)();
  // imports
  
  
  // module
  exports.push([module.id, " .LinkProvider_root_r-g {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.LinkProvider_container_3Z8 {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 380px;\n}\n\n.LinkProvider_lead_102 {\n  font-size: 1.25em;\n}\n\n.LinkProvider_formGroup_2xX {\n  margin-bottom: 20px;\n  \n}\n\n.LinkProvider_label_1tq {\n  \n  margin-bottom: 5px;\n  max-width: 100%;\n  font-weight: 700;\n  float: left;\n}\n\n.LinkProvider_input_3Aq {\n  display: block;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  padding: 10px 16px;\n  width: 100%;\n  height: 46px;\n  outline: 0;\n  border: 1px solid #ccc;\n  border-radius: 10;\n  background: #fff;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  color: #616161;\n  font-size: 18px;\n  line-height: 1.3333333;\n  -webkit-transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\n  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\n}\n\n.LinkProvider_input_3Aq:focus {\n  border-color: #0074c2;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\n}\n\n.LinkProvider_button_296 {\n  display: block;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  margin: 0;\n  padding: 10px 16px;\n  width: 100%;\n  outline: 0;\n  border: 1px solid #373277;\n  border-radius: 0;\n  background: #373277;\n  color: #fff;\n  text-align: center;\n  text-decoration: none;\n  font-size: 18px;\n  line-height: 1.3333333;\n  cursor: pointer;\n}\n\n.LinkProvider_button_296:hover {\n  background: rgba(54, 50, 119, 0.8);\n}\n\n.LinkProvider_button_296:focus {\n  border-color: #0074c2;\n  -webkit-box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n          box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n}\n\n.LinkProvider_icon_2pS {\n  display: inline-block;\n  margin: -2px 12px -2px 0;\n  width: 20px;\n  height: 20px;\n  vertical-align: middle;\n  fill: currentColor;\n}\n\n.LinkProvider_lineThrough_2QD {\n  position: relative;\n  z-index: 1;\n  display: block;\n  margin-bottom: 15px;\n  width: 100%;\n  color: #757575;\n  text-align: center;\n  font-size: 80%;\n}\n\n.LinkProvider_lineThrough_2QD::before {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  z-index: -1;\n  margin-top: -5px;\n  margin-left: -20px;\n  width: 40px;\n  height: 10px;\n  background-color: #fff;\n  content: '';\n}\n\n.LinkProvider_lineThrough_2QD::after {\n  position: absolute;\n  top: 49%;\n  z-index: -2;\n  display: block;\n  width: 100%;\n  border-bottom: 1px solid #ddd;\n  content: '';\n}\n\n#LinkProvider_lastname_3Uq{\n    max-width:100px;\n    float:left;\n}\n\n.LinkProvider_div_314 {\n  float:right;\n}\n\n#LinkProvider_leftContainer_1J2 {\n   float:left;\n}\n\n#LinkProvider_rightContainer_3SK {\n   float:right;\n}", "", {"version":3,"sources":["/./routes/linkprovider/LinkProvider.css"],"names":[],"mappings":"CAAC;EACC,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,iBAAiB;CAClB;;AAED;EACE,kBAAkB;CACnB;;AAED;EACE,oBAAoB;;CAErB;;AAED;;EAEE,mBAAmB;EACnB,gBAAgB;EAChB,iBAAiB;EACjB,YAAY;CACb;;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,WAAW;EACX,uBAAuB;EACvB,kBAAkB;EAClB,iBAAiB;EACjB,yDAAiD;UAAjD,iDAAiD;EACjD,eAAe;EACf,gBAAgB;EAChB,uBAAuB;EACvB,yFAAyE;EAAzE,iFAAyE;EAAzE,4EAAyE;EAAzE,yEAAyE;EAAzE,+GAAyE;CAC1E;;AAED;EACE,sBAAsB;EACtB,yFAAiF;UAAjF,iFAAiF;CAClF;;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,UAAU;EACV,mBAAmB;EACnB,YAAY;EACZ,WAAW;EACX,0BAA0B;EAC1B,iBAAiB;EACjB,oBAAoB;EACpB,YAAY;EACZ,mBAAmB;EACnB,sBAAsB;EACtB,gBAAgB;EAChB,uBAAuB;EACvB,gBAAgB;CACjB;;AAED;EACE,mCAAmC;CACpC;;AAED;EACE,sBAAsB;EACtB,mDAA2C;UAA3C,2CAA2C;CAC5C;;AAID;EACE,sBAAsB;EACtB,yBAAyB;EACzB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,mBAAmB;CACpB;;AAED;EACE,mBAAmB;EACnB,WAAW;EACX,eAAe;EACf,oBAAoB;EACpB,YAAY;EACZ,eAAe;EACf,mBAAmB;EACnB,eAAe;CAChB;;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,UAAU;EACV,YAAY;EACZ,iBAAiB;EACjB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,YAAY;CACb;;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,YAAY;EACZ,eAAe;EACf,YAAY;EACZ,8BAA8B;EAC9B,YAAY;CACb;;AACD;IACI,gBAAgB;IAChB,WAAW;CACd;;AAED;EACE,YAAY;CACb;;AAED;GACG,WAAW;CACb;;AAED;GACG,YAAY;CACd","file":"LinkProvider.css","sourcesContent":[" .root {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.container {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 380px;\n}\n\n.lead {\n  font-size: 1.25em;\n}\n\n.formGroup {\n  margin-bottom: 20px;\n  \n}\n\n.label {\n  \n  margin-bottom: 5px;\n  max-width: 100%;\n  font-weight: 700;\n  float: left;\n}\n\n.input {\n  display: block;\n  box-sizing: border-box;\n  padding: 10px 16px;\n  width: 100%;\n  height: 46px;\n  outline: 0;\n  border: 1px solid #ccc;\n  border-radius: 10;\n  background: #fff;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  color: #616161;\n  font-size: 18px;\n  line-height: 1.3333333;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n}\n\n.input:focus {\n  border-color: #0074c2;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\n}\n\n.button {\n  display: block;\n  box-sizing: border-box;\n  margin: 0;\n  padding: 10px 16px;\n  width: 100%;\n  outline: 0;\n  border: 1px solid #373277;\n  border-radius: 0;\n  background: #373277;\n  color: #fff;\n  text-align: center;\n  text-decoration: none;\n  font-size: 18px;\n  line-height: 1.3333333;\n  cursor: pointer;\n}\n\n.button:hover {\n  background: rgba(54, 50, 119, 0.8);\n}\n\n.button:focus {\n  border-color: #0074c2;\n  box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n}\n\n\n\n.icon {\n  display: inline-block;\n  margin: -2px 12px -2px 0;\n  width: 20px;\n  height: 20px;\n  vertical-align: middle;\n  fill: currentColor;\n}\n\n.lineThrough {\n  position: relative;\n  z-index: 1;\n  display: block;\n  margin-bottom: 15px;\n  width: 100%;\n  color: #757575;\n  text-align: center;\n  font-size: 80%;\n}\n\n.lineThrough::before {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  z-index: -1;\n  margin-top: -5px;\n  margin-left: -20px;\n  width: 40px;\n  height: 10px;\n  background-color: #fff;\n  content: '';\n}\n\n.lineThrough::after {\n  position: absolute;\n  top: 49%;\n  z-index: -2;\n  display: block;\n  width: 100%;\n  border-bottom: 1px solid #ddd;\n  content: '';\n}\n#lastname{\n    max-width:100px;\n    float:left;\n}\n\n.div {\n  float:right;\n}\n\n#leftContainer {\n   float:left;\n}\n\n#rightContainer {\n   float:right;\n}"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "LinkProvider_root_r-g",
  	"container": "LinkProvider_container_3Z8",
  	"lead": "LinkProvider_lead_102",
  	"formGroup": "LinkProvider_formGroup_2xX",
  	"label": "LinkProvider_label_1tq",
  	"input": "LinkProvider_input_3Aq",
  	"button": "LinkProvider_button_296",
  	"icon": "LinkProvider_icon_2pS",
  	"lineThrough": "LinkProvider_lineThrough_2QD",
  	"lastname": "LinkProvider_lastname_3Uq",
  	"div": "LinkProvider_div_314",
  	"leftContainer": "LinkProvider_leftContainer_1J2",
  	"rightContainer": "LinkProvider_rightContainer_3SK"
  };

/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _promise = __webpack_require__(83);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(43);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Verifyproviderlogin = __webpack_require__(162);
  
  var _Verifyproviderlogin2 = _interopRequireDefault(_Verifyproviderlogin);
  
  var _Providerlogin = __webpack_require__(165);
  
  var _Providerlogin2 = _interopRequireDefault(_Providerlogin);
  
  var _ErrorPage = __webpack_require__(115);
  
  var _ErrorPage2 = _interopRequireDefault(_ErrorPage);
  
  var _Home = __webpack_require__(84);
  
  var _Home2 = _interopRequireDefault(_Home);
  
  var _config = __webpack_require__(20);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var req = __webpack_require__(92);
  /*var Fiber = require('fibers');
  var Future = require('fibers/future');
  var req = Future.wrap(require('request'));*/
  var res;
  var userEmail;
  var password;
  var validLogin = true;
  var url;
  
  exports.default = {
  
    path: '/verifyproviderlogin',
  
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
  
                console.log("inside the verifypass");
                //console.log(JSON.stringify(query));
                userEmail = query.email;
                password = query.password;
                console.log(userEmail);
                console.log(password);
  
                console.log('calling checkLogin');
                _context.next = 8;
                return checklogin();
  
              case 8:
                body = _context.sent;
  
                if (!validLogin) {
                  _context.next = 14;
                  break;
                }
  
                console.log(" Going to Home Page");
                return _context.abrupt('return', _react2.default.createElement(_Home2.default, null));
  
              case 14:
                console.log(" Invalid Credential return to Login Page");
                return _context.abrupt('return', _react2.default.createElement(_Providerlogin2.default, null));
  
              case 16:
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
    console.log("API Endpoing: " + url);
  
    return new _promise2.default(function (resolve, reject) {
      var results = req(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Response from API' + body);
          validLogin = body;
          resolve(body);
        } else {
          console.log("Server not responding");
          validLogin = false;
        }
      });
      console.log("ValidLogin status: " + validLogin);
    });
  }

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(43);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(58);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Verifyproviderlogin = __webpack_require__(163);
  
  var _Verifyproviderlogin2 = _interopRequireDefault(_Verifyproviderlogin);
  
  var _me = __webpack_require__(27);
  
  var _me2 = _interopRequireDefault(_me);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var title = 'Verify Credential';
  
  function Verifyproviderlogin(props, context) {
  
    context.setTitle(title);
  
    return _react2.default.createElement(
      'div',
      { className: _Verifyproviderlogin2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Verifyproviderlogin2.default.container },
        _react2.default.createElement(
          'h1',
          null,
          title
        ),
        _react2.default.createElement(
          'p',
          null,
          'Password Verified'
        )
      )
    );
  }
  
  Verifyproviderlogin.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Verifyproviderlogin2.default)(Verifyproviderlogin);

/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(164);
      var insertCss = __webpack_require__(54);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Verifyproviderlogin.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Verifyproviderlogin.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(53)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n}\n.Verifyproviderlogin_root_17V {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n.Verifyproviderlogin_container_1HV {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 380px;\n}\n.Verifyproviderlogin_lead_1lw {\n  font-size: 1.25em;\n}\n.Verifyproviderlogin_formGroup_bCk {\n  margin-bottom: 20px;\n}\n.Verifyproviderlogin_label_qt5 {\n  display: inline-block;\n  margin-bottom: 5px;\n  max-width: 100%;\n  font-weight: 700;\n}\n.Verifyproviderlogin_input_2dV {\n  display: block;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  padding: 10px 16px;\n  width: 100%;\n  height: 46px;\n  outline: 0;\n  border: 1px solid #ccc;\n  border-radius: 10;\n  background: #fff;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  color: #616161;\n  font-size: 18px;\n  line-height: 1.3333333;\n  -webkit-transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\n  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\n}\n.Verifyproviderlogin_input_2dV:focus {\n  border-color: #0074c2;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\n}\n.Verifyproviderlogin_button_25r {\n  display: block;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  margin: 0;\n  padding: 10px 16px;\n  width: 100%;\n  outline: 0;\n  border: 1px solid #373277;\n  border-radius: 0;\n  background: #373277;\n  color: #fff;\n  text-align: center;\n  text-decoration: none;\n  font-size: 18px;\n  line-height: 1.3333333;\n  cursor: pointer;\n}\n.Verifyproviderlogin_button_25r:hover {\n  background: rgba(54, 50, 119, 0.8);\n}\n.Verifyproviderlogin_button_25r:focus {\n  border-color: #0074c2;\n  -webkit-box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n          box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n}\n.Verifyproviderlogin_facebook_WUa {\n  border-color: #3b5998;\n  background: #3b5998;\n}\n.Verifyproviderlogin_facebook_WUa:hover {\n  background: #2d4373;\n}\n.Verifyproviderlogin_google_2OY {\n  border-color: #dd4b39;\n  background: #dd4b39;\n}\n.Verifyproviderlogin_google_2OY:hover {\n  background: #c23321;\n}\n.Verifyproviderlogin_twitter_1Xg {\n  border-color: #55acee;\n  background: #55acee;\n}\n.Verifyproviderlogin_twitter_1Xg:hover {\n  background: #2795e9;\n}\n.Verifyproviderlogin_icon_39U {\n  display: inline-block;\n  margin: -2px 12px -2px 0;\n  width: 20px;\n  height: 20px;\n  vertical-align: middle;\n  fill: currentColor;\n}\n.Verifyproviderlogin_lineThrough_2z_ {\n  position: relative;\n  z-index: 1;\n  display: block;\n  margin-bottom: 15px;\n  width: 100%;\n  color: #757575;\n  text-align: center;\n  font-size: 80%;\n}\n.Verifyproviderlogin_lineThrough_2z_::before {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  z-index: -1;\n  margin-top: -5px;\n  margin-left: -20px;\n  width: 40px;\n  height: 10px;\n  background-color: #fff;\n  content: '';\n}\n.Verifyproviderlogin_lineThrough_2z_::after {\n  position: absolute;\n  top: 49%;\n  z-index: -2;\n  display: block;\n  width: 100%;\n  border-bottom: 1px solid #ddd;\n  content: '';\n}\n", "", {"version":3,"sources":["/./routes/verifyproviderlogin/Verifyproviderlogin.css","/./components/variables.css"],"names":[],"mappings":"AAAA;;;;;;;GAOG;ACLH;EACE;;gFAE8E;;EAI9E;;gFAE8E;;EAI9E;;gFAE8E,EAErD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;CAC3D;ADbD;EACE,mBAAmB;EACnB,oBAAoB;CACrB;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,iBAAiB;CAClB;AAED;EACE,kBAAkB;CACnB;AAED;EACE,oBAAoB;CACrB;AAED;EACE,sBAAsB;EACtB,mBAAmB;EACnB,gBAAgB;EAChB,iBAAiB;CAClB;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,WAAW;EACX,uBAAuB;EACvB,kBAAkB;EAClB,iBAAiB;EACjB,yDAAiD;UAAjD,iDAAiD;EACjD,eAAe;EACf,gBAAgB;EAChB,uBAAuB;EACvB,yFAAyE;EAAzE,iFAAyE;EAAzE,4EAAyE;EAAzE,yEAAyE;EAAzE,+GAAyE;CAC1E;AAED;EACE,sBAAsB;EACtB,yFAAiF;UAAjF,iFAAiF;CAClF;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,UAAU;EACV,mBAAmB;EACnB,YAAY;EACZ,WAAW;EACX,0BAA0B;EAC1B,iBAAiB;EACjB,oBAAoB;EACpB,YAAY;EACZ,mBAAmB;EACnB,sBAAsB;EACtB,gBAAgB;EAChB,uBAAuB;EACvB,gBAAgB;CACjB;AAED;EACE,mCAAmC;CACpC;AAED;EACE,sBAAsB;EACtB,mDAA2C;UAA3C,2CAA2C;CAC5C;AAED;EACE,sBAAsB;EACtB,oBAAoB;CAErB;AAED;EACE,oBAAoB;CACrB;AAED;EACE,sBAAsB;EACtB,oBAAoB;CAErB;AAED;EACE,oBAAoB;CACrB;AAED;EACE,sBAAsB;EACtB,oBAAoB;CAErB;AAED;EACE,oBAAoB;CACrB;AAED;EACE,sBAAsB;EACtB,yBAAyB;EACzB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,mBAAmB;CACpB;AAED;EACE,mBAAmB;EACnB,WAAW;EACX,eAAe;EACf,oBAAoB;EACpB,YAAY;EACZ,eAAe;EACf,mBAAmB;EACnB,eAAe;CAChB;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,UAAU;EACV,YAAY;EACZ,iBAAiB;EACjB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,YAAY;CACb;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,YAAY;EACZ,eAAe;EACf,YAAY;EACZ,8BAA8B;EAC9B,YAAY;CACb","file":"Verifyproviderlogin.css","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n@import '../../components/variables.css';\n\n.root {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.container {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 380px;\n}\n\n.lead {\n  font-size: 1.25em;\n}\n\n.formGroup {\n  margin-bottom: 20px;\n}\n\n.label {\n  display: inline-block;\n  margin-bottom: 5px;\n  max-width: 100%;\n  font-weight: 700;\n}\n\n.input {\n  display: block;\n  box-sizing: border-box;\n  padding: 10px 16px;\n  width: 100%;\n  height: 46px;\n  outline: 0;\n  border: 1px solid #ccc;\n  border-radius: 10;\n  background: #fff;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  color: #616161;\n  font-size: 18px;\n  line-height: 1.3333333;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n}\n\n.input:focus {\n  border-color: #0074c2;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\n}\n\n.button {\n  display: block;\n  box-sizing: border-box;\n  margin: 0;\n  padding: 10px 16px;\n  width: 100%;\n  outline: 0;\n  border: 1px solid #373277;\n  border-radius: 0;\n  background: #373277;\n  color: #fff;\n  text-align: center;\n  text-decoration: none;\n  font-size: 18px;\n  line-height: 1.3333333;\n  cursor: pointer;\n}\n\n.button:hover {\n  background: rgba(54, 50, 119, 0.8);\n}\n\n.button:focus {\n  border-color: #0074c2;\n  box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n}\n\n.facebook {\n  border-color: #3b5998;\n  background: #3b5998;\n  composes: button;\n}\n\n.facebook:hover {\n  background: #2d4373;\n}\n\n.google {\n  border-color: #dd4b39;\n  background: #dd4b39;\n  composes: button;\n}\n\n.google:hover {\n  background: #c23321;\n}\n\n.twitter {\n  border-color: #55acee;\n  background: #55acee;\n  composes: button;\n}\n\n.twitter:hover {\n  background: #2795e9;\n}\n\n.icon {\n  display: inline-block;\n  margin: -2px 12px -2px 0;\n  width: 20px;\n  height: 20px;\n  vertical-align: middle;\n  fill: currentColor;\n}\n\n.lineThrough {\n  position: relative;\n  z-index: 1;\n  display: block;\n  margin-bottom: 15px;\n  width: 100%;\n  color: #757575;\n  text-align: center;\n  font-size: 80%;\n}\n\n.lineThrough::before {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  z-index: -1;\n  margin-top: -5px;\n  margin-left: -20px;\n  width: 40px;\n  height: 10px;\n  background-color: #fff;\n  content: '';\n}\n\n.lineThrough::after {\n  position: absolute;\n  top: 49%;\n  z-index: -2;\n  display: block;\n  width: 100%;\n  border-bottom: 1px solid #ddd;\n  content: '';\n}\n","\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  --font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  --max-content-width: 1000px;\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */\n\n  --screen-xs-min: 480px;  /* Extra small screen / phone */\n  --screen-sm-min: 768px;  /* Small screen / tablet */\n  --screen-md-min: 992px;  /* Medium screen / desktop */\n  --screen-lg-min: 1200px; /* Large screen / wide desktop */\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Verifyproviderlogin_root_17V",
  	"container": "Verifyproviderlogin_container_1HV",
  	"lead": "Verifyproviderlogin_lead_1lw",
  	"formGroup": "Verifyproviderlogin_formGroup_bCk",
  	"label": "Verifyproviderlogin_label_qt5",
  	"input": "Verifyproviderlogin_input_2dV",
  	"button": "Verifyproviderlogin_button_25r",
  	"facebook": "Verifyproviderlogin_facebook_WUa Verifyproviderlogin_button_25r",
  	"google": "Verifyproviderlogin_google_2OY Verifyproviderlogin_button_25r",
  	"twitter": "Verifyproviderlogin_twitter_1Xg Verifyproviderlogin_button_25r",
  	"icon": "Verifyproviderlogin_icon_39U",
  	"lineThrough": "Verifyproviderlogin_lineThrough_2z_"
  };

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(43);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactDom = __webpack_require__(88);
  
  var _reactDom2 = _interopRequireDefault(_reactDom);
  
  var _withStyles = __webpack_require__(58);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Providerlogin = __webpack_require__(155);
  
  var _Providerlogin2 = _interopRequireDefault(_Providerlogin);
  
  var _Link = __webpack_require__(61);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Entering Credentials';
  
  function Providerlogin(props, context) {
    context.setTitle(title);
  
    return _react2.default.createElement(
      'div',
      { className: _Providerlogin2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Providerlogin2.default.container },
        _react2.default.createElement(
          'h1',
          null,
          title
        ),
        _react2.default.createElement(
          'p',
          { className: _Providerlogin2.default.lead },
          'Log in with your username or email address.'
        ),
        _react2.default.createElement(
          'div',
          { className: _Providerlogin2.default.formGroup },
          _react2.default.createElement(
            'form',
            { name: 'form1', method: 'get', action: 'verifyproviderlogin' },
            _react2.default.createElement(
              'div',
              { className: _Providerlogin2.default.formGroup },
              _react2.default.createElement(
                'label',
                { className: _Providerlogin2.default.label, htmlFor: 'usernameOrEmail' },
                'Username or email address:'
              ),
              _react2.default.createElement('input', {
                className: _Providerlogin2.default.input,
                id: 'email',
                type: 'email',
                name: 'email',
                required: 'required',
                autoFocus: true
              })
            ),
            _react2.default.createElement(
              'div',
              { className: _Providerlogin2.default.formGroup },
              _react2.default.createElement(
                'label',
                { className: _Providerlogin2.default.label, htmlFor: 'password' },
                'Password:'
              ),
              _react2.default.createElement('input', {
                className: _Providerlogin2.default.input,
                id: 'password',
                type: 'password',
                name: 'password',
                required: 'required'
              })
            ),
            _react2.default.createElement(
              'div',
              { className: _Providerlogin2.default.formGroup },
              _react2.default.createElement(
                'button',
                { className: _Providerlogin2.default.button1, type: 'submit' },
                'Log in'
              ),
              _react2.default.createElement(
                _Link2.default,
                { to: '/forgotpass' },
                'Forgot Password'
              ),
              _react2.default.createElement(
                'span',
                { className: _Providerlogin2.default.spacer },
                ' | '
              ),
              _react2.default.createElement(
                _Link2.default,
                { to: '/register' },
                'Sign Up'
              )
            )
          )
        )
      )
    );
  }
  
  Providerlogin.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Providerlogin2.default)(Providerlogin);

/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _promise = __webpack_require__(83);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(43);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Providerlist = __webpack_require__(150);
  
  var _Providerlist2 = _interopRequireDefault(_Providerlist);
  
  var _config = __webpack_require__(20);
  
  var _Login = __webpack_require__(87);
  
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
                console.log("Sessionid - index.js - Home " + sessionid);
  
                if (!(sessionid === undefined || sessionid == '')) {
                  _context.next = 7;
                  break;
                }
  
                _context.next = 5;
                return getSessionid();
  
              case 5:
                body = _context.sent;
                return _context.abrupt('return', _react2.default.createElement(_Login2.default, { sessionid: body }));
  
              case 7:
                _context.next = 9;
                return getProviderData();
  
              case 9:
                body = _context.sent;
  
                //console.log("Body: "+body);
                customeremail = query.customeremail;
  
                console.log("customer Email: " + customeremail);
                return _context.abrupt('return', _react2.default.createElement(_Providerlist2.default, { providerlist: providerlist, customeremail: customeremail, sessionid: sessionid }));
  
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
    var request = __webpack_require__(92);
  
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
    var request = __webpack_require__(92);
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
/* 167 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _promise = __webpack_require__(83);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(43);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Logout = __webpack_require__(168);
  
  var _Logout2 = _interopRequireDefault(_Logout);
  
  var _Login = __webpack_require__(87);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  var _config = __webpack_require__(20);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var message = 'Thanks for visiting our website. You have Sucessfully Logged out ';
  var message1 = 'Click here to login';
  var href = 'http://' + _config.host + '/login';
  var status;
  var sessionid;
  
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
                return _context.abrupt('return', _react2.default.createElement(_Logout2.default, { message: message, redirectlink: href, message1: message1 }));
  
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
    var request = __webpack_require__(92);
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
/* 168 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(43);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(58);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Logout = __webpack_require__(169);
  
  var _Logout2 = _interopRequireDefault(_Logout);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Logout';
  
  function Logout(_ref, context) {
    var message = _ref.message,
        redirectlink = _ref.redirectlink,
        message1 = _ref.message1;
  
    context.setTitle(title);
    return _react2.default.createElement(
      'div',
      { className: _Logout2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Logout2.default.container },
        _react2.default.createElement(
          'h1',
          null,
          title
        ),
        _react2.default.createElement(
          'p',
          null,
          message
        ),
        _react2.default.createElement(
          'a',
          { href: redirectlink },
          message1
        )
      )
    );
  }
  
  Logout.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Logout2.default)(Logout);

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(170);
      var insertCss = __webpack_require__(54);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Logout.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Logout.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(53)();
  // imports
  
  
  // module
  exports.push([module.id, " .Logout_root_3lw {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.Logout_container_Wra {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 380px;\n}\n\n.Logout_lead_RHc {\n  font-size: 1.25em;\n}\n\n.Logout_formGroup_2i2 {\n  margin-bottom: 20px;\n  \n}\n\n.Logout_label_3-A {\n  \n  margin-bottom: 5px;\n  max-width: 100%;\n  font-weight: 700;\n  float: left;\n}\n", "", {"version":3,"sources":["/./routes/logout/Logout.css"],"names":[],"mappings":"CAAC;EACC,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,iBAAiB;CAClB;;AAED;EACE,kBAAkB;CACnB;;AAED;EACE,oBAAoB;;CAErB;;AAED;;EAEE,mBAAmB;EACnB,gBAAgB;EAChB,iBAAiB;EACjB,YAAY;CACb","file":"Logout.css","sourcesContent":[" .root {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.container {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 380px;\n}\n\n.lead {\n  font-size: 1.25em;\n}\n\n.formGroup {\n  margin-bottom: 20px;\n  \n}\n\n.label {\n  \n  margin-bottom: 5px;\n  max-width: 100%;\n  font-weight: 700;\n  float: left;\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Logout_root_3lw",
  	"container": "Logout_container_Wra",
  	"lead": "Logout_lead_RHc",
  	"formGroup": "Logout_formGroup_2i2",
  	"label": "Logout_label_3-A"
  };

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _promise = __webpack_require__(83);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(43);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Bookinglist = __webpack_require__(172);
  
  var _Bookinglist2 = _interopRequireDefault(_Bookinglist);
  
  var _config = __webpack_require__(20);
  
  var _Login = __webpack_require__(87);
  
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
                return _context.abrupt('return', _react2.default.createElement(_Login2.default, { sessionid: body }));
  
              case 9:
                _context.next = 11;
                return getBookingData();
  
              case 11:
                bookingdata = _context.sent;
                return _context.abrupt('return', _react2.default.createElement(_Bookinglist2.default, { Bookingdata: bookingdata, customeremail: email, sessionid: sessionid }));
  
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
    var request = __webpack_require__(92);
  
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
    var request = __webpack_require__(92);
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
/* 172 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(43);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(58);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Bookinglist = __webpack_require__(173);
  
  var _Bookinglist2 = _interopRequireDefault(_Bookinglist);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Service booking Search';
  
  function Bookinglist(_ref, props, context) {
    var Bookingdata = _ref.Bookingdata,
        customeremail = _ref.customeremail,
        sessionid = _ref.sessionid;
  
    //context.setTitle(title);
  
    var bookingdata = JSON.parse(Bookingdata);
  
    console.log("booking Data: " + bookingdata);
    return _react2.default.createElement(
      'div',
      { className: _Bookinglist2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Bookinglist2.default.container },
        _react2.default.createElement(
          'h1',
          null,
          'My Booking'
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'form',
            { name: 'form1' },
            _react2.default.createElement(
              'div',
              { className: _Bookinglist2.default.formGroup },
              _react2.default.createElement(
                'table',
                null,
                _react2.default.createElement(
                  'caption',
                  null,
                  'Service Providers'
                ),
                _react2.default.createElement(
                  'thead',
                  null,
                  _react2.default.createElement(
                    'tr',
                    null,
                    _react2.default.createElement(
                      'th',
                      null,
                      'Email'
                    ),
                    _react2.default.createElement('th', null),
                    _react2.default.createElement(
                      'th',
                      null,
                      'Booking Date'
                    ),
                    _react2.default.createElement(
                      'th',
                      null,
                      'Function Date'
                    ),
                    _react2.default.createElement(
                      'th',
                      null,
                      'Mobile'
                    ),
                    _react2.default.createElement(
                      'th',
                      null,
                      'Status'
                    ),
                    _react2.default.createElement(
                      'th',
                      null,
                      'Event Type'
                    )
                  )
                ),
                _react2.default.createElement(
                  'tbody',
                  null,
                  bookingdata.map(function (obj, index) {
                    return _react2.default.createElement(
                      'tr',
                      { key: index },
                      _react2.default.createElement(
                        'td',
                        null,
                        _react2.default.createElement('input', { type: 'radio', name: 'customeremail', value: obj.email }),
                        ' '
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ' ',
                        _react2.default.createElement('input', { id: 'email', type: 'hidden', value: obj.email }),
                        obj.email,
                        ' '
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ' ',
                        obj.bookingdate
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ' ',
                        obj.functiondate
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ' ',
                        obj.mobile,
                        ' '
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ' ',
                        obj.status
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ' ',
                        obj.eventtype
                      )
                    );
                  })
                )
              )
            ),
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement('br', null),
              _react2.default.createElement('input', { type: 'hidden', name: 'customeremail', value: customeremail }),
              _react2.default.createElement('input', { type: 'hidden', name: 'sessionid', value: sessionid })
            )
          )
        )
      )
    );
  }
  
  Bookinglist.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Bookinglist2.default)(Bookinglist);

/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(174);
      var insertCss = __webpack_require__(54);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Bookinglist.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Bookinglist.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(53)();
  // imports
  
  
  // module
  exports.push([module.id, " .Bookinglist_root_W57 {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.Bookinglist_container_27i {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 380px;\n  max-height:100x\n}\n\nhtml {\n  min-height: 100%;\n}\n\nbody {\n  min-height: 100vh;\n}\n\ntable, th, td {\n  border: 1px solid black;\n}\n\ntr:hover {background-color: #f5f5f5}\n\nth {\n  background-color: #4CAF50;\n  color: white;\n}\n\n.Bookinglist_button_2HE {\n  display: block;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  margin: 0;\n  padding: 10px 16px;\n  width: 30%;\n  outline: 0;\n  border: 1px solid #373277;\n  border-radius: 0;\n  background: #373277;\n  color: #fff;\n  text-align: center;\n  text-decoration: none;\n  font-size: 18px;\n  line-height: 1.3333333;\n  cursor: pointer;\n}\n\n.Bookinglist_button_2HE:hover {\n  background: rgba(54, 50, 119, 0.8);\n}\n\n.Bookinglist_button_2HE:focus {\n  border-color: #0074c2;\n  -webkit-box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n          box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n}\n\ndiv {\n  overflow-x:visible;\n   \n}\n\n.Bookinglist_formGroup_2hT {\n  margin-bottom: 15px;\n}", "", {"version":3,"sources":["/./routes/bookinglist/Bookinglist.css"],"names":[],"mappings":"CAAC;EACC,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,iBAAiB;EACjB,eAAe;CAChB;;AAID;EACE,iBAAiB;CAClB;;AAED;EACE,kBAAkB;CACnB;;AAED;EACE,wBAAwB;CACzB;;AACD,UAAU,yBAAyB,CAAC;;AACpC;EACE,0BAA0B;EAC1B,aAAa;CACd;;AACD;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,UAAU;EACV,mBAAmB;EACnB,WAAW;EACX,WAAW;EACX,0BAA0B;EAC1B,iBAAiB;EACjB,oBAAoB;EACpB,YAAY;EACZ,mBAAmB;EACnB,sBAAsB;EACtB,gBAAgB;EAChB,uBAAuB;EACvB,gBAAgB;CACjB;;AAED;EACE,mCAAmC;CACpC;;AAED;EACE,sBAAsB;EACtB,mDAA2C;UAA3C,2CAA2C;CAC5C;;AAED;EACE,mBAAmB;;CAEpB;;AAGD;EACE,oBAAoB;CACrB","file":"Bookinglist.css","sourcesContent":[" .root {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.container {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 380px;\n  max-height:100x\n}\n\n\n\nhtml {\n  min-height: 100%;\n}\n\nbody {\n  min-height: 100vh;\n}\n\ntable, th, td {\n  border: 1px solid black;\n} \ntr:hover {background-color: #f5f5f5}\nth {\n  background-color: #4CAF50;\n  color: white;\n}\n.button {\n  display: block;\n  box-sizing: border-box;\n  margin: 0;\n  padding: 10px 16px;\n  width: 30%;\n  outline: 0;\n  border: 1px solid #373277;\n  border-radius: 0;\n  background: #373277;\n  color: #fff;\n  text-align: center;\n  text-decoration: none;\n  font-size: 18px;\n  line-height: 1.3333333;\n  cursor: pointer;\n}\n\n.button:hover {\n  background: rgba(54, 50, 119, 0.8);\n}\n\n.button:focus {\n  border-color: #0074c2;\n  box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n}\n\ndiv {\n  overflow-x:visible;\n   \n}\n\n\n.formGroup {\n  margin-bottom: 15px;\n}"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Bookinglist_root_W57",
  	"container": "Bookinglist_container_27i",
  	"button": "Bookinglist_button_2HE",
  	"formGroup": "Bookinglist_formGroup_2hT"
  };

/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

  var extend = __webpack_require__(176);
  
  function Assets(options) {
    if (!(this instanceof Assets)) {
      return new Assets(options);
    }
  
    this.options = extend({}, options);
    Object.freeze(this);
  }
  
  ['data', 'path', 'size', 'url'].forEach(function (resolver) {
    Assets[resolver] = __webpack_require__(177)("./" + resolver);
    Assets.prototype[resolver] = function (path, callback) {
      return Assets[resolver](path, this.options, callback);
    };
  });
  
  module.exports = Assets;


/***/ },
/* 176 */
/***/ function(module, exports) {

  module.exports = require("lodash/object/extend");

/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

  var map = {
  	"./__utils__/composeAbsolutePathname": 178,
  	"./__utils__/composeAbsolutePathname.js": 178,
  	"./__utils__/composeQueryString": 182,
  	"./__utils__/composeQueryString.js": 182,
  	"./__utils__/composeRelativePathname": 183,
  	"./__utils__/composeRelativePathname.js": 183,
  	"./__utils__/convertPathToUrl": 179,
  	"./__utils__/convertPathToUrl.js": 179,
  	"./__utils__/defaultCachebuster": 184,
  	"./__utils__/defaultCachebuster.js": 184,
  	"./__utils__/encodeBuffer": 185,
  	"./__utils__/encodeBuffer.js": 185,
  	"./__utils__/ensureTrailingSlash": 180,
  	"./__utils__/ensureTrailingSlash.js": 180,
  	"./__utils__/exists": 186,
  	"./__utils__/exists.js": 186,
  	"./data": 187,
  	"./data.js": 187,
  	"./index": 175,
  	"./index.js": 175,
  	"./path": 189,
  	"./path.js": 189,
  	"./size": 193,
  	"./size.js": 193,
  	"./url": 195,
  	"./url.js": 195
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
  webpackContext.id = 177;


/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

  var convertPathToUrl = __webpack_require__(179);
  var ensureTrailingSlash = __webpack_require__(180);
  var path = __webpack_require__(4);
  var url = __webpack_require__(181);
  
  module.exports = function (baseUrl, basePath, resolvedPath) {
    var from = ensureTrailingSlash(baseUrl);
    var to = path.relative(basePath, resolvedPath);
    return url.resolve(from, convertPathToUrl(to));
  };


/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

  var sep = __webpack_require__(4).sep;
  
  module.exports = function (path) {
    return path.split(sep).join('/');
  };


/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

  var convertPathToUrl = __webpack_require__(179);
  var path = __webpack_require__(4);
  var url = __webpack_require__(181);
  
  module.exports = function (urlStr) {
    var urlObj = url.parse(urlStr);
    urlObj.pathname = convertPathToUrl(path.join(urlObj.pathname, path.sep));
    return url.format(urlObj);
  };


/***/ },
/* 181 */
/***/ function(module, exports) {

  module.exports = require("url");

/***/ },
/* 182 */
/***/ function(module, exports) {

  module.exports = function (current, addon) {
    if (current) {
      return current + '&' + addon;
    }
    return '?' + addon;
  };


/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

  var convertPathToUrl = __webpack_require__(179);
  var path = __webpack_require__(4);
  
  module.exports = function (basePath, relativeTo, resolvedPath) {
    var from = path.resolve(basePath, relativeTo);
    var relativePath = path.relative(from, resolvedPath);
    return convertPathToUrl(relativePath);
  };


/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

  var fs = __webpack_require__(32);
  
  module.exports = function (resolvedPath) {
    var mtime = fs.statSync(resolvedPath).mtime;
    return mtime.getTime().toString(16);
  };


/***/ },
/* 185 */
/***/ function(module, exports) {

  module.exports = function (buffer, mediaType) {
    if (mediaType === 'image/svg+xml') {
      return 'charset=utf-8,' + encodeURIComponent(buffer.toString('utf8').trim());
    }
    return 'base64,' + buffer.toString('base64');
  };


/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

  var fs = __webpack_require__(32);
  
  module.exports = function (filePath, callback) {
    fs.stat(filePath, function (err) {
      callback(err === null);
    });
  };


/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

  var encodeBuffer = __webpack_require__(185);
  var extend = __webpack_require__(176);
  var fs = __webpack_require__(32);
  var mime = __webpack_require__(188);
  var Promise = __webpack_require__(33);
  var resolvePath = __webpack_require__(189);
  var url = __webpack_require__(181);
  
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
/* 188 */
/***/ function(module, exports) {

  module.exports = require("mime");

/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

  var async = __webpack_require__(190);
  var exists = __webpack_require__(186);
  var extend = __webpack_require__(176);
  var flatten = __webpack_require__(191);
  var glob = __webpack_require__(192);
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
/* 190 */
/***/ function(module, exports) {

  module.exports = require("async");

/***/ },
/* 191 */
/***/ function(module, exports) {

  module.exports = require("lodash/array/flatten");

/***/ },
/* 192 */
/***/ function(module, exports) {

  module.exports = require("glob");

/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

  var calipers = __webpack_require__(194)('webp', 'png', 'jpeg', 'gif', 'svg');
  var Promise = __webpack_require__(33);
  var resolvePath = __webpack_require__(189);
  
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
/* 194 */
/***/ function(module, exports) {

  module.exports = require("calipers");

/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

  var composeAbsolutePathname = __webpack_require__(178);
  var composeQueryString = __webpack_require__(182);
  var composeRelativePathname = __webpack_require__(183);
  var defaultCachebuster = __webpack_require__(184);
  var extend = __webpack_require__(176);
  var resolvePath = __webpack_require__(189);
  var url = __webpack_require__(181);
  
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
/* 196 */
/***/ function(module, exports) {

  module.exports = require("mongodb");

/***/ },
/* 197 */
/***/ function(module, exports) {

  module.exports = require("express-session");

/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

  var jade = __webpack_require__(199);
  
  module.exports = function template(locals) {
  var jade_debug = [ new jade.DebugItem( 1, "C:\\dtsolutions\\bmfApp\\src\\views\\index.jade" ) ];
  try {
  var buf = [];
  var jade_mixins = {};
  var jade_interp;
  ;var locals_for_with = (locals || {});(function (body, css, description, entry, title, trackingId) {
  jade_debug.unshift(new jade.DebugItem( 0, "C:\\dtsolutions\\bmfApp\\src\\views\\index.jade" ));
  jade_debug.unshift(new jade.DebugItem( 1, "C:\\dtsolutions\\bmfApp\\src\\views\\index.jade" ));
  buf.push("<!DOCTYPE html>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 2, "C:\\dtsolutions\\bmfApp\\src\\views\\index.jade" ));
  buf.push("<html lang=\"\" class=\"no-js\">");
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.unshift(new jade.DebugItem( 3, "C:\\dtsolutions\\bmfApp\\src\\views\\index.jade" ));
  buf.push("<head>");
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.unshift(new jade.DebugItem( 4, "C:\\dtsolutions\\bmfApp\\src\\views\\index.jade" ));
  buf.push("<meta charset=\"utf-8\">");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 5, "C:\\dtsolutions\\bmfApp\\src\\views\\index.jade" ));
  buf.push("<meta http-equiv=\"x-ua-compatible\" content=\"ie=edge\">");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 6, "C:\\dtsolutions\\bmfApp\\src\\views\\index.jade" ));
  buf.push("<title>" + (jade.escape(null == (jade_interp = title) ? "" : jade_interp)));
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.shift();
  buf.push("</title>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 7, "C:\\dtsolutions\\bmfApp\\src\\views\\index.jade" ));
  buf.push("<meta name=\"description\"" + (jade.attr("description", description, true, true)) + ">");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 8, "C:\\dtsolutions\\bmfApp\\src\\views\\index.jade" ));
  buf.push("<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 9, "C:\\dtsolutions\\bmfApp\\src\\views\\index.jade" ));
  buf.push("<link rel=\"apple-touch-icon\" href=\"apple-touch-icon.png\">");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 10, "C:\\dtsolutions\\bmfApp\\src\\views\\index.jade" ));
  buf.push("<style id=\"css\">" + (null == (jade_interp = css) ? "" : jade_interp));
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.shift();
  buf.push("</style>");
  jade_debug.shift();
  jade_debug.shift();
  buf.push("</head>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 11, "C:\\dtsolutions\\bmfApp\\src\\views\\index.jade" ));
  buf.push("<body>");
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.unshift(new jade.DebugItem( 12, "C:\\dtsolutions\\bmfApp\\src\\views\\index.jade" ));
  buf.push("<div id=\"app\">" + (null == (jade_interp = body) ? "" : jade_interp));
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.shift();
  buf.push("</div>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 13, "C:\\dtsolutions\\bmfApp\\src\\views\\index.jade" ));
  buf.push("<script" + (jade.attr("src", entry, true, true)) + ">");
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.shift();
  buf.push("</script>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 14, "C:\\dtsolutions\\bmfApp\\src\\views\\index.jade" ));
  buf.push("<script>");
  jade_debug.unshift(new jade.DebugItem( 16, jade_debug[0].filename ));
  jade_debug.unshift(new jade.DebugItem( 16, jade_debug[0].filename ));
  buf.push("window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 16, jade_debug[0].filename ));
  buf.push("ga('create','" + (jade.escape((jade_interp = trackingId) == null ? '' : jade_interp)) + "','auto');ga('send','pageview')");
  jade_debug.shift();
  jade_debug.shift();
  buf.push("</script>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 17, "C:\\dtsolutions\\bmfApp\\src\\views\\index.jade" ));
  if ( trackingId)
  {
  jade_debug.unshift(new jade.DebugItem( 18, "C:\\dtsolutions\\bmfApp\\src\\views\\index.jade" ));
  jade_debug.unshift(new jade.DebugItem( 18, "C:\\dtsolutions\\bmfApp\\src\\views\\index.jade" ));
  buf.push("<script src=\"https://www.google-analytics.com/analytics.js\" async defer>");
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.shift();
  buf.push("</script>");
  jade_debug.shift();
  jade_debug.shift();
  }
  jade_debug.shift();
  jade_debug.shift();
  buf.push("</body>");
  jade_debug.shift();
  jade_debug.shift();
  buf.push("</html>");
  jade_debug.shift();
  jade_debug.shift();}.call(this,"body" in locals_for_with?locals_for_with.body:typeof body!=="undefined"?body:undefined,"css" in locals_for_with?locals_for_with.css:typeof css!=="undefined"?css:undefined,"description" in locals_for_with?locals_for_with.description:typeof description!=="undefined"?description:undefined,"entry" in locals_for_with?locals_for_with.entry:typeof entry!=="undefined"?entry:undefined,"title" in locals_for_with?locals_for_with.title:typeof title!=="undefined"?title:undefined,"trackingId" in locals_for_with?locals_for_with.trackingId:typeof trackingId!=="undefined"?trackingId:undefined));;return buf.join("");
  } catch (err) {
    jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, "doctype html\nhtml(class=\"no-js\", lang=\"\")\n  head\n    meta(charset=\"utf-8\")\n    meta(http-equiv=\"x-ua-compatible\", content=\"ie=edge\")\n    title= title\n    meta(name=\"description\", description=description)\n    meta(name=\"viewport\", content=\"width=device-width, initial-scale=1\")\n    link(rel=\"apple-touch-icon\", href=\"apple-touch-icon.png\")\n    style#css!= css\n  body\n    #app!= body\n    script(src=entry)\n    script.\n      window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;\n      ga('create','#{trackingId}','auto');ga('send','pageview')\n    if trackingId\n      script(src=\"https://www.google-analytics.com/analytics.js\", async=true, defer=true)\n");
  }
  }

/***/ },
/* 199 */
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
/* 200 */
/***/ function(module, exports, __webpack_require__) {

  var jade = __webpack_require__(199);
  
  module.exports = function template(locals) {
  var jade_debug = [ new jade.DebugItem( 1, "C:\\dtsolutions\\bmfApp\\src\\views\\error.jade" ) ];
  try {
  var buf = [];
  var jade_mixins = {};
  var jade_interp;
  ;var locals_for_with = (locals || {});(function (stack) {
  jade_debug.unshift(new jade.DebugItem( 0, "C:\\dtsolutions\\bmfApp\\src\\views\\error.jade" ));
  jade_debug.unshift(new jade.DebugItem( 1, "C:\\dtsolutions\\bmfApp\\src\\views\\error.jade" ));
  buf.push("<!DOCTYPE html>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 2, "C:\\dtsolutions\\bmfApp\\src\\views\\error.jade" ));
  buf.push("<html lang=\"en\">");
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.unshift(new jade.DebugItem( 3, "C:\\dtsolutions\\bmfApp\\src\\views\\error.jade" ));
  buf.push("<head>");
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.unshift(new jade.DebugItem( 4, "C:\\dtsolutions\\bmfApp\\src\\views\\error.jade" ));
  buf.push("<meta charset=\"utf-8\">");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 5, "C:\\dtsolutions\\bmfApp\\src\\views\\error.jade" ));
  buf.push("<title>");
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.unshift(new jade.DebugItem( 5, jade_debug[0].filename ));
  buf.push("Internal Server Error");
  jade_debug.shift();
  jade_debug.shift();
  buf.push("</title>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 6, "C:\\dtsolutions\\bmfApp\\src\\views\\error.jade" ));
  buf.push("<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 7, "C:\\dtsolutions\\bmfApp\\src\\views\\error.jade" ));
  buf.push("<style>");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("* {");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("  line-height: 1.2;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("  margin: 0;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("}");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("html {");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("  color: #888;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("  display: table;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("  font-family: sans-serif;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("  height: 100%;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("  text-align: center;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("  width: 100%;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("}");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("body {");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("  display: table-cell;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("  vertical-align: middle;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("  margin: 2em auto;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("}");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("h1 {");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("  color: #555;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("  font-size: 2em;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("  font-weight: 400;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("}");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("p {");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("  margin: 0 auto;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("  width: 280px;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("}");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("pre {");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("  text-align: left;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("  margin-top: 2rem;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("}");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("@media only screen and (max-width: 280px) {");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("  body, p {");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("    width: 95%;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("  }");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("  h1 {");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("    font-size: 1.5em;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("    margin: 0 0 0.3em;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("  }");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("}");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("");
  jade_debug.shift();
  jade_debug.shift();
  buf.push("</style>");
  jade_debug.shift();
  jade_debug.shift();
  buf.push("</head>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 57, "C:\\dtsolutions\\bmfApp\\src\\views\\error.jade" ));
  buf.push("<body>");
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.unshift(new jade.DebugItem( 58, "C:\\dtsolutions\\bmfApp\\src\\views\\error.jade" ));
  buf.push("<h1>");
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("Internal Server Error");
  jade_debug.shift();
  jade_debug.shift();
  buf.push("</h1>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 59, "C:\\dtsolutions\\bmfApp\\src\\views\\error.jade" ));
  buf.push("<p>");
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.unshift(new jade.DebugItem( 59, jade_debug[0].filename ));
  buf.push("Sorry, something went wrong.");
  jade_debug.shift();
  jade_debug.shift();
  buf.push("</p>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 60, "C:\\dtsolutions\\bmfApp\\src\\views\\error.jade" ));
  buf.push("<pre>" + (jade.escape(null == (jade_interp = stack) ? "" : jade_interp)));
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.shift();
  buf.push("</pre>");
  jade_debug.shift();
  jade_debug.shift();
  buf.push("</body>");
  jade_debug.shift();
  jade_debug.shift();
  buf.push("</html>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 61, "C:\\dtsolutions\\bmfApp\\src\\views\\error.jade" ));
  buf.push("<!-- IE needs 512+ bytes: http://blogs.msdn.com/b/ieinternals/archive/2010/08/19/http-error-pages-in-internet-explorer.aspx-->");
  jade_debug.shift();
  jade_debug.shift();}.call(this,"stack" in locals_for_with?locals_for_with.stack:typeof stack!=="undefined"?stack:undefined));;return buf.join("");
  } catch (err) {
    jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, "doctype html\nhtml(lang=\"en\")\n  head\n    meta(charset=\"utf-8\")\n    title Internal Server Error\n    meta(name=\"viewport\", content=\"width=device-width, initial-scale=1\")\n    style.\n      * {\n        line-height: 1.2;\n        margin: 0;\n      }\n\n      html {\n        color: #888;\n        display: table;\n        font-family: sans-serif;\n        height: 100%;\n        text-align: center;\n        width: 100%;\n      }\n\n      body {\n        display: table-cell;\n        vertical-align: middle;\n        margin: 2em auto;\n      }\n\n      h1 {\n        color: #555;\n        font-size: 2em;\n        font-weight: 400;\n      }\n\n      p {\n        margin: 0 auto;\n        width: 280px;\n      }\n\n      pre {\n        text-align: left;\n        margin-top: 2rem;\n      }\n\n      @media only screen and (max-width: 280px) {\n\n        body, p {\n          width: 95%;\n        }\n\n        h1 {\n          font-size: 1.5em;\n          margin: 0 0 0.3em;\n        }\n\n      }\n\n  body\n    h1 Internal Server Error\n    p Sorry, something went wrong.\n    pre= stack\n// IE needs 512+ bytes: http://blogs.msdn.com/b/ieinternals/archive/2010/08/19/http-error-pages-in-internet-explorer.aspx\n");
  }
  }

/***/ }
/******/ ]);
//# sourceMappingURL=server.js.map