db.getSiblingDB("tpch_mongo_2c").getCollection("orders-lineitem").createIndex({o_custkey:1}, {name:"idx_o_custkey_mol"});
printjson(db.getSiblingDB("tpch_mongo_2c").getCollection("orders-lineitem").explain("allPlansExecution").aggregate([
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
db.getSiblingDB("tpch_mongo_2c").getCollection("orders-lineitem").dropIndex("idx_o_custkey_mol");
