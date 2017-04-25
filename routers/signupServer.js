var express = require('express'), 
 router = express.Router();
 var db = require('../db');
 var ObjectId = require('mongodb').ObjectID;
 var bodyParser=require("body-Parser");
 router.use(bodyParser.urlencoded({extended: true}));
 router.use(bodyParser.json());
 router.post('/signupServer', function(req, res) {
 	username= req.body.username;
 	pwd = req.body.pwd;
 	var collection = db.getDb().collection("users");
 	//console.log(collection.find({"username": username},{"username": 1}));
 	collection.insert({"username": username, "password": pwd}, function(err, document) {
 		if (err !== null)
 			res.send(false);
 		else
 			res.send(true);
 	}
 	//
 	//	res.send(false);
 	//}
 	//else {
 	//	collection.insert({"username":username, "pwd":pwd}); 	
 	//	res.send(true);
 	//}
)});
module.exports = router;