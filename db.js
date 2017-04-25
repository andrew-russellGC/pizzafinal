'use strict';
var MongoClient = require('mongodb').MongoClient
var pizzaDb=null;

exports.connect = function(url, callback) {
  if (pizzaDb) return callback();
  MongoClient.connect(url, function(err, db) {
    if (err) return callback(err);
    pizzaDb = db;
    callback();
  })
}
exports.close = function(callback) {
  if (pizzaDb) {
    pizzaDb.close(function(err, result) {
      pizzaDb = null;
      callback(err)
    })
  }
}
exports.getDb = function() {
  return pizzaDb;
}