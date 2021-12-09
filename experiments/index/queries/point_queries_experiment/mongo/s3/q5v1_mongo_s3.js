db.getSiblingDB("tpch_mongo_2c").getCollection("orders-lineitem").createIndex({o_custkey:1}, {name:"idx_o_custkey_mol"});
printjson(db.getSiblingDB("tpch_mongo_2c").getCollection("customer").explain("allPlansExecution").aggregate([
   {$lookup:{
	from:"orders-lineitem",
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
db.getSiblingDB("tpch_mongo_2c").getCollection("orders-lineitem").dropIndex("idx_o_custkey_mol");
