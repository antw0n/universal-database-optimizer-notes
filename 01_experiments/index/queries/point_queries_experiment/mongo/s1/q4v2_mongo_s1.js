db.getSiblingDB("tpch_mongo_1c").getCollection("scale1").createIndex({c_acctbal:1}, {name: "idx_c_acctbal_mcol"});
printjson(db.getSiblingDB("tpch_mongo_1c").getCollection("scale1").explain("allPlansExecution").aggregate([
   { $match: { c_acctbal: { $lt: -10 }}}
], {
	allowDiskUse: true,
	maxTimeMS: 120000
}));
db.getSiblingDB("tpch_mongo_1c").getCollection("scale1").dropIndex("idx_c_acctbal_mcol");
