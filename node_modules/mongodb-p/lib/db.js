var Collection = require('./collection.js');

function mapResult(result) { return result; }

function mapCollection(result) { return Collection(result); }

function mapCollections(result) {
  for(var i=0; i< result.length; i++) {
    result[i] = Collection(result[i]);
  }
  return result;
}

function mapNoResult() { }

function mapDatabase(result){ return Db(result); }

var methods = {
  addUser: mapResult,
  admin: mapDatabase,
  authenticate: mapResult,
  close: mapNoResult,
  collection: mapCollection,
  collections: mapCollections,
  command: mapResult,
  createCollection: mapCollection,
  createIndex: mapResult,
  dropCollection: mapResult,
  dropDatabase: mapResult,
  ensureIndex: mapResult,
  eval: mapResult,
  executeDbAdminCommand: mapResult,
  indexInformation: mapResult,
  listCollections: mapResult,
  logout: mapResult,
  open: mapDatabase,
  removeUser: mapResult,
  renameCollection: mapCollection,
  stats: mapResult
};

var properties = [
  'serverConfig',
  'bufferMaxEntries',
  'databaseName',
  'options',
  'native_parser',
  'slaveOk',
  'writeConcern'
];

function Db(_db) {

  var obj = {};

  for (var method in methods) {
    if (methods.hasOwnProperty(method)) {
      (function(method) {
        obj[method] = function() {
          var args = Array.prototype.slice.apply(arguments);
          return new Promise(function(resolve, reject) {
            args.push(function(err, mapResult) {
              if (err) {
                reject(err);
              } else {
                var mapped = methods[method](mapResult);
                resolve(mapped);
              }
            });
            _db[method].apply(_db, args);
          });
        }
      })(method);
    }
  }


  properties.forEach(function(propertyName) {
    Object.defineProperty(obj, propertyName, {
      get: function() {
        return _db[propertyName];
      }
    });
  });

  return Object.freeze(obj);
}

module.exports = Db;