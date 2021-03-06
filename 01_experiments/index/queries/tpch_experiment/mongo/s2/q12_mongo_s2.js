printjson(db.getSiblingDB("tpch_mongo_3c").getCollection("orders").explain("allPlansExecution").aggregate([
    { $lookup: {
	from: "lineitem",
	localField: "_id",
	foreignField: "_id.l_orderkey",
	as: "o_lineitems"
    }},
    { $project: {
	orderpriority: "$o_orderpriority",
	lineitems: { 
	    $filter: {
		input: "$o_lineitems",
		as: "l",
		cond: { $and: [
		    {$in: ["$$l.l_shipmode", ["RAIL", "REG AIR"]]},
		    {$lt: ["$$l.l_commitdate", "$$l.l_receiptdate"]},
		    {$lt: ["$$l.l_shipdate", "$$l.l_commitdate"]},
		    {$gte: ["$$l.l_receiptdate", ISODate("1992-01-01T00:00:00Z")]},
		    {$lt: ["$$l.l_receiptdate", ISODate("1993-01-01T00:00:00Z")]}
		]}
	    }
	}
    }},
    { $unwind: "$lineitems" },
    { $project: {
	orderpriority: 1,
	l_shipmode: "$lineitems.l_shipmode"	
    }},
    { $group: {
	_id: "$l_shipmode",
	high_line_count: {$sum: {
	    $switch: {
		branches: [
		    { 
			case: {$or:[{$eq:["$orderpriority", "1-URGENT"]}, 
				    {$eq:["$orderpriority", "2-HIGH"]}]},
			then: 1
		    }
		],
		default: 0
	    }
	}},
	low_line_count: {$sum: {
	    $switch: {
		branches: [
		    {
			case: {$and:[{$ne:["$orderpriority", "1-URGENT"]}, 
				     {$ne:["$orderpriority", "2-HIGH"]}]},
			then: 1
		    }
		],
		default: 0
	    }
	}}
    }},
    { $sort: { "_id": 1 } }
], {
	allowDiskUse: true,
	maxTimeMS: 120000
}));
