var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
//  res.render('index', { title: 'Home' });
  var db = req.db;
  var collection = db.get('test');
  collection.find({},{},function(error,docs){
     console.log(docs);

     // count number of ref in db 
     var refcount = docs.length;
     res.render('index', { title: 'Home', referencelist : docs , nOrefs : refcount});
  })
});

/* GET ref page. */
router.get('/', function(req,res,next) {
  res.render('refdetail', { title: 'Reference Detail' });
});

module.exports = router;
