var express = require('express');
var router = express.Router();
// var mongoose = require('mongoose');
// var user = require('../models/user').user;
// mongoose.connect('mongodb://localhost/hello-world');
var mongo=require("mongodb");
var host="localhost";
var server=mongo.Server(host,27017,{auto_reconnect:true});
var db=new mongo.Db("hello-world",server,{safe:true});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'index' });
});

/*login*/
router.get('/login', function(req, res) {
  res.render('login', { title: 'login' });
});

/*logout*/
router.get('/logout', function(req, res) {
  res.render('logout', { title: 'logout' });
});

/*hompage*/
router.post('/homepage', function(req, res) {
  var query_doc = {userid: req.body.userid, password: req.body.password};
  (function(){
     //指的是hello-world，所以需要先collection找到users.
    db.open(function (err,db) {
    db.collection("users", function (err,collection) {
        if(err) throw err;
        else{
            collection.find({}).toArray(function(err,docs){
                if(err) throw  err;
                else{
                    console.log(docs);
                    db.close();
                }
            });
        }
    });
    });
  })(query_doc);
});
module.exports = router;