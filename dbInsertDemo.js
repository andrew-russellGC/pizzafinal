var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var dbLink=require("./json/config.json");


var url = dbLink.dbServer.url;
//var url = 'mongodb://localhost:27017/test';
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  var collection=db.collection('customers');
   collection.insert({name:"Cathy Liu",pwd:"password",phone:"4784453344"},
  		 function(err, result) {
  		 	  assert.equal(null, err);
  		 	  console.log("Success: "+result.insertedCount);
         // console.log("Success: "+JSON.stringify(result));
         	db.close();
       		});
  });
