printjson(db.getSiblingDB("tpch_mongo_3c").getCollection("customer").explain("allPlansExecution").aggregate([
   { $match: { c_acctbal: { $lt: -10 }}}
], {
	allowDiskUse: true,
	maxTimeMS: 120000
}));
