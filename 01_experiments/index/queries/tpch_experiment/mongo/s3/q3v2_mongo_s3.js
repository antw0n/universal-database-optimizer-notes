db.getSiblingDB("tpch_mongo_2c").getCollection("orders-lineitem").createIndex({o_custkey:1}, {name:"idx_o_custkey_mol"});
printjson(db.getSiblingDB("tpch_mongo_2c").getCollection("customer").explain("allPlansExecution").aggregate([
    {$match: {c_mktsegment: "AUTOMOBILE"}},
    {$lookup: {
	from: "orders-lineitem",
	localField: "_id",
	foreignField: "o_custkey",
	as: "orders",
    }},
    {$unwind: "$orders"},
    {$match: {"orders.o_orderdate":{ $lt: ISODate("1992-01-02T00:00:00Z")}}},
    { $project: {
    	o_orderkey: "$orders._id",
    	o_orderdate: "$orders.o_orderdate",
    	o_shippriority: "$orders.o_shippriority",
    	lineitems: { $filter: {
    	    input: "$orders.o_lineitems",
    	    as: "l",
    	    cond: {$gt: ["$$l.l_shipdate", ISODate("1992-01-02T00:00:00Z")]}
    	}}
    }},
    { $unwind: "$lineitems"},
    { $group: { 
    	_id: {l_orderkey:"$o_orderkey", o_orderdate: "$o_orderdate", o_shippriority: "$o_shippriority"},
    	revenue: {$sum: {$multiply: ["$lineitems.l_extendedprice", {$subtract: [1, "$lineitems.l_discount"]}]}}
    }},
    { $sort: { "revenue": -1, "_id.o_orderdate": 1}},
    { $limit : 10 }
], {
	allowDiskUse: true,
	maxTimeMS: 120000
}));
db.getSiblingDB("tpch_mongo_2c").getCollection("orders-lineitem").dropIndex("idx_o_custkey_mol");
