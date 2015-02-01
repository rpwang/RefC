var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var BSON = mongo.BSONPure;

/* GET home page. */
router.get('/', function(req, res, next) {
    var db = req.db;
    var collection = db.get('test');
    var o_id = new BSON.ObjectID(req.query.ref_id);
    collection.find({'_id':o_id},{},function(error,docs){
        console.log(docs);
        var ref = docs[0].reference;
        var lengthDisData = ref.LengthDis;

        var arr_gapLength = lengthDisData.Gap;
        var json_gapLength = [];
        for (var arr_dataIndex = 0; arr_dataIndex < arr_gapLength.length; arr_dataIndex++){
        json_gapLength.push({frequency:arr_gapLength[arr_dataIndex],seq:arr_dataIndex})
        }

        var arr_contigLengthWithN = lengthDisData.Contig.WithN;
        var json_contigLengthWithN = [];
        for (var index = 0; index < arr_contigLengthWithN.length; index++){
            json_contigLengthWithN.push({frequency:arr_contigLengthWithN[index],seq:index})
        }

        var arr_contigLengthWithoutN = lengthDisData.Contig.WithoutN;
        var json_contigLengthWithoutN = [];
        for (var index = 0; index < arr_contigLengthWithoutN.length; index++){
            json_contigLengthWithoutN.push({frequency:arr_contigLengthWithoutN[index],seq:index})
        }
        var arr_scaffoldLength = lengthDisData.Scaffold;





        // D3 test
        var data = [10,22,30,40,53];
        res.render('refdetail', {
            title: 'Reference Detail',
            refId: req.query.ref_id,
            refList: docs, data: data,
            json_gapLength: JSON.stringify(json_gapLength),
            json_contigLengthWithN: JSON.stringify(json_contigLengthWithN),
            json_contigLengthWithoutN: JSON.stringify(json_contigLengthWithoutN),
            json_scaffoldLengt: JSON.stringify(json_gapLength)
        });
    });
});

module.exports = router;
