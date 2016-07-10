var mongo = require('mongodb');
var Db = require('./lib/db.js');

module.exports = {
  MongoClient: {
    connect: function(url, options) {
      return new Promise(function(resolve, reject){
        mongo.MongoClient.connect(url, options, function(err, _db) {
          if (err) {
            reject(err);
          } else {
            var db = Db(_db);
            resolve(db);
          }
        });

      });
    }
  },
  ObjectID: mongo.ObjectID
};
