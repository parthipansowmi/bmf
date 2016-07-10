# Description

Wraps ES6 Promises around the MongoDB driver so instead of using callbacks to handle asynchronous requests you can 
use promises. For those who prefer promises to callbacks.

## Installation

    npm install mongodb-p

## Usage

Connecting to MongoDB
---------------------

```js
  var MongoClient = require('mongodb-p').MongoClient;
  var assert = require('assert');
  // Connection URL
  var url = 'mongodb://localhost:27017/myproject';
  // Use connect method to connect to the Server
  MongoClient.connect(url).then(
    function(db) {
      console.log("Connected correctly to server");
      db.close();
    },
    function(err) {
      console.log("Error connecting to server: " + err.message);
    }
  });
```

Inserting a Document
--------------------

```js
  // Get the documents collection
  db.collection('documents').then(
    function(collection) {
      // Insert some documents
      return collection.insert([{a : 1}, {a : 2}, {a : 3} ]);
    }
  ).then(
    function(result) {
      assert.equal(3, result.result.n);
      assert.equal(3, result.ops.length);
      console.log("Inserted 3 documents into the document collection");
  });
```

Updating a document
-------------------

```js
  db.collection('documents').then(
    function(collection) {
      return collection.update({ a : 2 }, { $set: { b : 1 } });
    }
  ).then(
    function(result) {
      assert.equal(1, result.result.n);
      console.log("Updated the document with the field a equal to 2");
    },
    function(err) {
      console.log("Could not update the document: " + err.message);
    }
  );  
```

Remove a document
-----------------

```js
  db.collection('documents').then(
    function(collection) {
      return collection.remove({ a : 3 });
    }
  ).then(
    function(result) {
      assert.equal(1, result.result.n);
      console.log("Removed the document with the field a equal to 3");
    },
    function(err) {
      console.log("Could not remove the document: " + err.message);
    }
  );  
```

Find All Documents
------------------


```js
  // Get the documents collection
  db.collection('documents').then(
    function(collection) {
      // Find some documents
      return collection.find({}).toArray();
    }
  ).then(
    function(result) {
        assert.equal(2, docs.length);
        console.log("Found the following records");
        console.dir(docs);
    },
    function(err) {
      console.log("Could not find all documents: " + err.message);
    )
  );
```

## MongoDB Node.JS Driver Documentation

This wrapper is incomplete and untested but is intended to work exactly like the mongo native driver but instead of 
using callback functions, asynchronous tasks use promises instead.
 
| what          | where                                          |
|---------------|------------------------------------------------|
| documentation | http://mongodb.github.io/node-mongodb-native/  |
| api-doc        | http://mongodb.github.io/node-mongodb-native/  |
| source        | https://github.com/mongodb/node-mongodb-native |
| mongodb       | http://www.mongodb.org/                        |
