db.getSiblingDB("tpch_mongo_3c").getCollection("orders").createIndex({o_custkey:1}, {name:"idx_o_custkey_mo"});
printjson(db.getSiblingDB("tpch_mongo_3c").getCollection("orders").explain("allPlansExecution").aggregate([
   {$lookup:{
	from:"customer",
	localField:"o_custkey",
	foreignField:"_id",
	as:"customer"
   }},
   {$unwind:"$customer"},
   {$project:{c_name:"$customer.c_name", o_orderdate:1}}
], {
	allowDiskUse: true,
	maxTimeMS: 120000
}));
db.getSiblingDB("tpch_mongo_3c").getCollection("orders").dropIndex("idx_o_custkey_mo");
