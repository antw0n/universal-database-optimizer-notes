db.getSiblingDB("tpch_mongo_3c").getCollection("lineitem").createIndex({"_id.l_orderkey":1}, {name:"idx_l_orderkey_ml"});
printjson(db.getSiblingDB("tpch_mongo_3c").getCollection("lineitem").explain("allPlansExecution").aggregate([
   {$lookup:{
	from:"orders",
	localField:"_id.l_orderkey",
	foreignField:"_id",
	as:"order"
   }},
   {$unwind:"$order"},
   {$project:{_id:"$order._id", l_shipdate:1}}
], {
	allowDiskUse: true,
	maxTimeMS: 120000
}));
db.getSiblingDB("tpch_mongo_3c").getCollection("lineitem").dropIndex("idx_l_orderkey_ml");
