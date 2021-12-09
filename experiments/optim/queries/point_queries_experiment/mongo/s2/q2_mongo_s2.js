printjson(db.getSiblingDB("tpch_mongo_3c").getCollection("customer").explain("allPlansExecution").aggregate([
   {$match:{_id: 7 }}
], {
	allowDiskUse: true,
	maxTimeMS: 120000
}));
