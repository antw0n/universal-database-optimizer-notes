printjson(db.getSiblingDB("tpch_mongo_2c").getCollection("orders-lineitem").explain("allPlansExecution").aggregate([
    {$match: {o_orderdate:{ $lt: ISODate("1992-01-02T00:00:00Z")}}},
    {$lookup: {
	from: "customer",
	localField: "o_custkey",
	foreignField: "_id",
	as: "customer",
    }},
    // Because there is a 1-M relationship between customer and order,
    // only one customer will be in the array
    {$match: {"customer.c_mktsegment": "AUTOMOBILE"}},
    { $project: {
	_id: 1,
    	o_orderdate: 1,
    	o_shippriority: 1,
	lineitems: "$o_lineitems"
    }},
    { $unwind: "$lineitems"},
    { $match: {"lineitems.l_shipdate": {$gt: ISODate("1992-01-02T00:00:00Z")}}},
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
