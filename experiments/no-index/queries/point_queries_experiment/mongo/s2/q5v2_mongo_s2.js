printjson(db.getSiblingDB("tpch_mongo_3c").getCollection("customer").explain("allPlansExecution").aggregate([
   {$lookup:{
	from:"orders",
	localField:"_id",
	foreignField:"o_custkey",
	as:"orders"
   }},
   {$project:{
	_id:1,
	orders:{
	    $filter: {
	        input:"$orders",
		as:"order",
		cond:{gt:["$$order.o_totalprice", 37500]}
	    }
	}
   }},
   {$unwind:"$orders"},
   {$project:{_id:1, orderkey:"$orders._id"}}
], {
	allowDiskUse: true,
	maxTimeMS: 120000
}));
