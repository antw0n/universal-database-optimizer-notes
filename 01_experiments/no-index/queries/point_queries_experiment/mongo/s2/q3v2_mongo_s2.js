printjson(db.getSiblingDB("tpch_mongo_3c").getCollection("customer").explain("allPlansExecution").aggregate([
   {$lookup:{
	from:"orders",
	localField:"_id",
	foreignField:"o_custkey",
	as:"orders"
   }},
   {$unwind:"$orders"}, 
   {$project:{c_name:1, o_orderdate:"$orders.o_orderdate"}}
], {
	allowDiskUse: true,
	maxTimeMS: 120000
}));
