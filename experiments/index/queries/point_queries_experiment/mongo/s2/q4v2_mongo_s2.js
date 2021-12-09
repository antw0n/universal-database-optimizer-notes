db.getSiblingDB("tpch_mongo_3c").getCollection("customer").createIndex({c_acctbal:1}, {name: "idx_c_acctbal_mc"});
printjson(db.getSiblingDB("tpch_mongo_3c").getCollection("customer").explain("allPlansExecution").aggregate([
   { $match: { c_acctbal: { $lt: -10 }}}
], {
	allowDiskUse: true,
	maxTimeMS: 120000
}));
db.getSiblingDB("tpch_mongo_3c").getCollection("customer").dropIndex("idx_c_acctbal_mc");
