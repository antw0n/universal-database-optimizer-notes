printjson(db.getSiblingDB("tpch_mongo_1c").getCollection("scale1").explain("allPlansExecution").aggregate([
   {$match:{_id: 7 }}
], {
	allowDiskUse: true,
	maxTimeMS: 120000
}));
