function mapResult(mapResult) { return mapResult; }

function mapCursor(mapResult) { return Cursor(mapResult); }

var callbackMethods = {
  close: mapResult,
  count: mapResult,
  each: mapResult,
  explain: mapResult,
  forEach: mapResult,
  next: mapResult,
  nextObject: mapResult,
  toArray: mapResult
};

var methods = {
  addCursorFlag: mapCursor,
  addQueryModifier: mapCursor,
  batchSize: mapCursor,
  clone: mapCursor,
  comment: mapCursor,
  mapCursorLimit: mapResult,
  mapCursorSkip: mapResult,
  filter: mapCursor,
  isClosed: mapResult,
  limit: mapCursor,
  map: mapResult,
  maxTimeMS: mapCursor,
  pause: mapResult,
  pipe: mapResult,
  project: mapResult,
  read: mapResult,
  resume: mapResult,
  rewind: mapResult,
  setBatchSize: mapResult,
  setCursorLimit: mapResult,
  setCursorOption: mapResult,
  setCursorSkip: mapResult,
  setEncoding: mapResult,
  setReadPreference: mapCursor,
  skip: mapCursor,
  sort: mapCursor,
  stream: mapCursor,
  unpipe: mapResult,
  unshift: mapResult,
  wrap: mapResult
};

var properties = [
  'sortValue',
  'timeout',
  'readPreference'
];

function Cursor(_cursor) {
  var obj = {
  };

  for (var method in methods) {
    if (methods.hasOwnProperty(method)) {
      (function(method) {
        obj[method] = function () {
          return methods[method](_cursor[method].apply(_cursor, arguments));
        }
      })(method);
    }
  }

  for (var callback in callbackMethods) {
    if (callbackMethods.hasOwnProperty(callback)) {
      (function(method) {
        obj[method] = function() {
          var args = Array.prototype.slice.apply(arguments);
          return new Promise(function(resolve, reject) {
            args.push(function(err, mapResult) {
              if (err) {
                reject(err);
              } else {
                var mapped = callbackMethods[method](mapResult);
                resolve(mapped);
              }
            });
            _cursor[method].apply(_cursor, args);
          });
        }
      })(callback);
    }
  }

  properties.forEach(function(propertyName) {
    Object.defineProperty(obj, propertyName, {
      get: function() {
        return _cursor[propertyName];
      }
    });
  });
  return Object.freeze(obj);
}

module.exports = Cursor;