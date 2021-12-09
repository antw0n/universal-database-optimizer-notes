printjson(db.getSiblingDB("tpch_mongo_2c").getCollection("orders-lineitem").explain("allPlansExecution").aggregate([
    { $match: {
	o_orderdate: {$gte:ISODate("1992-01-01T00:00:00Z"), $lt: ISODate("1992-04-01T00:00:00Z")}
    }},
    { $project: {
	orderpriority: "$o_orderpriority",
	lineitems: {
	    $filter: {
		input: "$o_lineitems",
		as: "l",
		cond: {$lt:["$$l.l_commitdate","$$l.l_receiptdate"]}
	    }
	}
    }},
    { $match: {lineitems: { $ne:[] } }},
    { $group: {
	_id: "$orderpriority",
	order_count: {$sum: 1}
    }},
    { $sort: {"_id": 1}}
], {
	allowDiskUse: true,
	maxTimeMS: 120000
}));
