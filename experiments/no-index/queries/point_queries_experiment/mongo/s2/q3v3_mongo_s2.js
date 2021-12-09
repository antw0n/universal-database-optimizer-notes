printjson(db.getSiblingDB("tpch_mongo_3c").getCollection("orders").explain("allPlansExecution").aggregate([
   {$lookup:{
	from:"lineitem",
	localField:"_id",
	foreignField:"_id.l_orderkey",
	as:"lineitems"
   }},
   {$unwind:"$lineitems"},
   {$project:{_id:1, l_shipdate:"$lineitems.l_shipdate"}}
], {
	allowDiskUse: true,
	maxTimeMS: 120000
}));
