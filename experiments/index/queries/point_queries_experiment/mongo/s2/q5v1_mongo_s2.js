db.getSiblingDB("tpch_mongo_3c").getCollection("orders").createIndex({o_custkey:1}, {name:"idx_o_custkey_mo"});
printjson(db.getSiblingDB("tpch_mongo_3c").getCollection("customer").explain("allPlansExecution").aggregate([
   {$lookup:{
	from:"orders",
	localField:"_id",
	foreignField:"o_custkey",
	as:"orders"
   }},
   {$unwind:"$orders"},
   {$match: {"orders.o_totalprice":{$gt:37500 }}},
   {$project:{_id:1, orderkey:"$orders._id"}}
], {
	allowDiskUse: true,
	maxTimeMS: 120000
}));
db.getSiblingDB("tpch_mongo_3c").getCollection("orders").dropIndex("idx_o_custkey_mo");
