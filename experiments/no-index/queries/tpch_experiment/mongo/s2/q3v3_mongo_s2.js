printjson(db.getSiblingDB("tpch_mongo_3c").getCollection("lineitem").explain("allPlansExecution").aggregate([
    {$match: {l_shipdate: {$gt:ISODate("1992-01-02T00:00:00Z")}}},
    // Because there is a 1-M relationship between orders and lineitem,
    // only one order will be in the array
    {$lookup: {
	from: "orders",
	localField: "_id.l_orderkey",
	foreignField: "_id",
	as: "order",
    }},
    {$unwind: "$order"},
    {$match: {"order.o_orderdate":{ $lt: ISODate("1992-01-02T00:00:00Z")}}},
    {$lookup: {
	from: "customer",
	localField: "order.o_custkey",
	foreignField: "_id",
	as: "customer"
    }},
    {$unwind: "$customer"},
    {$match: {"customer.c_mktsegment": "AUTOMOBILE"}},
    { $project: {
	l_orderkey: "$_id.l_orderkey",
    	o_orderdate: "$order.o_orderdate",
    	o_shippriority: "$order.o_shippriority",
	l_extendedprice: 1,
	l_discount: 1,
    }},
    { $group: { 
    	_id: {l_orderkey:"$l_orderkey", o_orderdate: "$o_orderdate", o_shippriority: "$o_shippriority"},
    	revenue: {$sum: {$multiply: ["$l_extendedprice", {$subtract: [1, "$l_discount"]}]}}
    }},
    { $sort: { "revenue": -1, "_id.o_orderdate": 1}},
    { $limit : 10 }
], {
	allowDiskUse: true,
	maxTimeMS: 120000
}));
