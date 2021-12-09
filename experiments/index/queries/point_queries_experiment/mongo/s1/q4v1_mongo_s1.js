printjson(db.getSiblingDB("tpch_mongo_1c").getCollection("scale1").explain("allPlansExecution").aggregate([
   { $match: { c_acctbal: { $lt: -10 }}}
], {
	allowDiskUse: true,
	maxTimeMS: 120000
}));
