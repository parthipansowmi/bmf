var Cursor = require('./cursor.js');

function mapResult(mapResult) { return mapResult; }

function mapCollection(mapResult) { return Collection(mapResult); }

var methods = {
  aggregate: mapResult,
  bulkWrite: mapResult,
  count: mapResult,
  createIndex: mapResult,
  createIndexes: mapResult,
  deleteMany: mapResult,
  deleteOne: mapResult,
  distinct: mapResult,
  drop: mapResult,
  dropAllIndexes: mapResult,
  dropIndex: mapResult,
  dropIndexes: mapResult,
  ensureIndex: mapResult,
  findAndModify: mapResult,
  findAndRemove: mapResult,
  findOne: mapResult,
  findOneAndDelete: mapResult,
  findOneAndReplace: mapResult,
  findOneAndUpdate: mapResult,
  geoHaystackSearch: mapResult,
  geoNear: mapResult,
  group: mapResult,
  indexes: mapResult,
  indexExists: mapResult,
  indexInformation: mapResult,
  initializeOrderedBulkOp: mapResult,
  initializeUnorderedBulkOp: mapResult,
  insert: mapResult,
  insertMany: mapResult,
  insertOne: mapResult,
  isCapped: mapResult,
  mapReduce: mapResult,
  options: mapResult,
  parallelCollectionScan: mapResult,
  reIndex: mapResult,
  remove: mapResult,
  rename: mapCollection,
  replaceOne: mapResult,
  save: mapResult,
  stats: mapResult,
  update: mapResult,
  updateMany: mapResult,
  updateOne: mapResult
};

var properties = [
  'collectionName',
  'namespace',
  'writeConcern',
  'hint'
];

function Collection(_col) {
  var obj = {
    find: function() { return Cursor(_col.find.apply(_col, arguments)); }
  };

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
            _col[method].apply(_col, args);
          });
        }
      })(method);
    }
  }

  properties.forEach(function(propertyName) {
    Object.defineProperty(obj, propertyName, {
      get: function() {
        return _col[propertyName];
      }
    });
  });
  return Object.freeze(obj);
}

module.exports = Collection;