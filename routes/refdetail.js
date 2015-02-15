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

        //console.log(lengthDisData.Scaffold)
        var arr_disData_scaffold = JSON.stringify(lengthDisData.Scaffold)
        var json_scaffold = [];
        for (var index = 0; index < arr_disData_scaffold.length;index++){
		//console.log(arr_disData_scaffold.Seq1[index]);
	} 
	     //json_scaffold.push({seq:seq1,});

	//extract json scaffold Nstats
        var json_scaffold_nstats = ref.ScaffoldStat;
        //console.log(json_scaffold_nstats.Nstats);
        //console.log(json_gapLength);

    //extract json contig Nstats
        var json_contig_withn_nstats = ref.ContigStat;
        var json_contig_withoutn_nstats = ref.ContigStat;



     //extract json gap Nstats
        var json_gap_nstats = ref.GapStat;

        // D3 test
        var data = [10,22,30,40,53];


     // creating json for horizontal grouped stacked bar chart
        var json_scaffold_stacked_bar =[];
        foreach my 

        res.render('refdetail', {
            title: 'Reference Detail',
            refId: req.query.ref_id,
            refList: docs, data: data,
            json_gapLength: JSON.stringify(json_gapLength),
            json_contigLengthWithN: JSON.stringify(json_contigLengthWithN),
            json_contigLengthWithoutN: JSON.stringify(json_contigLengthWithoutN),
            json_scaffoldLengt: JSON.stringify(json_gapLength),
            data_scaffoldNstats: json_scaffold_nstats.Nstats,
            data_contigWithnNstats:json_contig_withn_nstats.WithN.Nstats,
            data_contigWithoutnNstats:json_contig_withoutn_nstats.WithoutN.Nstats,
            data_gapNstats:json_gap_nstats.Nstats
        });
    });
});

module.exports = router;
