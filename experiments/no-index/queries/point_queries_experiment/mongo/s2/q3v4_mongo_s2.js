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
