var express = require('express');
var router = express.Router();
var assert = require('assert');

var carpoolDb = undefined;
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect("mongodb://localhost:27017/carpool", function (err, db) {
    if (!err) {
        carpoolDb = db;
        console.log("We are connected");
    } else {
        console.log(err);
    }
});

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});


/* GET home page. */
router.post('/registerUser', function (req, res, next) {
    //console.log("inside register memebers = " + req.body);
    var memberInfo = req.body;
    console.log(memberInfo['firstName']);
    carpoolDb.collection('members').insert(memberInfo, function (err, result) {
        console.log(result);
        if (result.insertedCount === 1) {
            res.send({ 'status': 'success' });
        } else {
            console.log(err.message);
            if (err.message.indexOf('email_1 dup key') > -1)
                res.send({ 'status': 'failure', 'statusMsg': 'User already registered with the email ' + memberInfo.email });
        }
    });
});


var findUser = function (UserName, Pws, res, callback) {
    console.log('This is find User');
    console.log(UserName);
    console.log(Pws);

    carpoolDb.collection('members').findOne({ "email": UserName, "password": Pws }, function (err, document) {
        if (document != null) {
            console.log(" Successfully loggedin ");
            console.log(document._id);
            res.send({ 'status': 'success', 'UserID ': Result});
        } else {
            console.log(" FAILED ... loggedin ");
             res.send({ 'status': 'failure' });
        }
    });

    /*
    var result = "false";
    cursor.each(function (err, doc) {
    assert.equal(err, null);
    if (doc != null) {
    console.log(" Successfully loggedin ");
    console.log(doc);
    result = "true";
    callback(result);
    } else {
    if (result != "true") {
    result = "false";
    console.log(" FAILED ... loggedin ");
    callback(result);
    }
            
    }
    });*/

};


var findusers = function (callback) {
    var cursor = carpoolDb.collection('members').find();
    cursor.each(function (err, doc) {
        assert.equal(err, null);
        if (doc != null) {
            console.dir(doc);
        } else {
            callback();
        }
    });
};

router.post('/loginUser', function (req, res, next) {
    // console.log("inside register memebers = " + req.body);
    console.log("inside loginuser post");
    var memberInfo = req.body;
    console.log(memberInfo['email']);
    console.log(memberInfo['password']);
    //findusers(function() {  
    //});
    findUser(memberInfo['email'], memberInfo['password'], res, function (Result) { 
  /*  if(Result == null)
    {
        res.send({ 'status': 'failure' });
    } else{*/
        
    //}
    });
});




module.exports = router;
