printjson(db.getSiblingDB("tpch_mongo_3c").getCollection("lineitem").explain("allPlansExecution").aggregate([
    {$match: {
	l_shipdate: {$lte: new Date(ISODate("1992-04-30T00:00:00Z").getTime() - 119*24*3600*1000)}
    }},
    { $group: {
    	_id: {l_returnflag: "$l_returnflag", l_linestatus: "$l_linestatus"},
    	sum_qty: { $sum: "$l_quantity" }, //sum(l_quantity)
    	sum_base_price: {$sum: "$l_extendedprice"}, //sum(l_extendedprice)
    	sum_disc_price: {$sum: {$multiply: ["$l_extendedprice", {$subtract: [1, "$l_discount"]}]}}, //sum(l_extendedprice * (1 - l_discount))
    	sum_charge: {$sum: {$multiply: ["$l_extendedprice", {$subtract: [1, "$l_discount"]}, {$add: [1, "$l_tax"]}]}}, //sum(l_extendedprice * (1 - l_discount) * (1 + l_tax))
    	avg_qty: {$avg: "$l_quantity"}, //avg(l_quantity)
    	avg_price: {$avg: "$l_extendedprice"}, //avg(l_extendedprice)
    	avg_disc: {$avg: "$l_discount"}, //avg(l_discount)
    	count_order: {$sum: 1} //count(*)
    }},
    // Equivalent to GROUP BY l_returnflag asc, l_linestatus asc
    { $sort: { "_id.l_returnflag": 1, "_id.l_linestatus": 1} }
], {
	allowDiskUse: true,
	maxTimeMS: 120000
}));
