printjson(db.getSiblingDB("tpch_mongo_3c").getCollection("customer").explain("allPlansExecution").aggregate([
    { $project: {
	_id: 1
    }},
    { $lookup: {
	from: "orders",
	localField: "_id",
	foreignField: "o_custkey",
	as: "orders"
    }},
    { $unwind: {
    	path: "$orders",
    	preserveNullAndEmptyArrays: true
    }},
    { $project: {
    	_id: 1,
    	ordercomment: "$orders.o_comment"
    }},
    { $match: {
    	ordercomment: {$not: /.*express.*packages.*/}
    }},
    { $group: {
    	_id: "$_id",
    	c_count: { $sum: {
    	    $cond: [ {$eq:["$ordercomment", undefined]}, 0, 1 ]
    	}}
    }},
    { $group: {
    	_id: "$c_count",
    	custdist: {$sum: 1}
    }},
    {$sort: {"custdist": -1, "_id": -1}}
], {
	allowDiskUse: true,
	maxTimeMS: 120000
}));
