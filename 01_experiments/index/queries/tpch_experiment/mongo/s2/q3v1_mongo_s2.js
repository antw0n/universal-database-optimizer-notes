printjson(db.getSiblingDB("tpch_mongo_3c").getCollection("orders").explain("allPlansExecution").aggregate([
    {$match: {o_orderdate:{ $lt: ISODate("1992-01-02T00:00:00Z")}}},
    // Because there is a 1-M relationship between customer and order,
    // only one customer will be in the array
    {$lookup: {
	from: "customer",
	localField: "o_custkey",
	foreignField: "_id",
	as: "customer",
    }},
    {$match: {"customer.c_mktsegment": "AUTOMOBILE"}},
    {$lookup: {
	from: "lineitem",
	localField: "_id",
	foreignField: "_id.l_orderkey",
	as: "lineitems",
    }},    
    { $project: {
	_id: 1,
    	o_orderdate: 1,
    	o_shippriority: 1,
	lineitems: { $filter: {
	    input: "$lineitems",
	    as: "l",
	    cond: {$gt: ["$$l.l_shipdate", ISODate("1992-01-02T00:00:00Z")]}
	}}
    }},
    { $unwind: "$lineitems"},
    { $group: { 
    	_id: {l_orderkey:"$_id", o_orderdate: "$o_orderdate", o_shippriority: "$o_shippriority"},
    	revenue: {$sum: {$multiply: ["$lineitems.l_extendedprice", {$subtract: [1, "$lineitems.l_discount"]}]}}
    }},
    { $sort: { "revenue": -1, "_id.o_orderdate": 1}},
    { $limit : 10 }
], {
	allowDiskUse: true,
	maxTimeMS: 120000
}));
