var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var carpoolDb = undefined;
MongoClient.connect("mongodb://localhost:27017/exampleDb", function(err, db) {
  if(!err) {
  	carpoolDb = db;
  } else {
    console.log(err);
  }
});

/* GET users listing. */
router.get('/registerUser', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
