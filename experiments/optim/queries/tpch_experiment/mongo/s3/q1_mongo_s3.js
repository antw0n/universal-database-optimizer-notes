printjson(db.getSiblingDB("tpch_mongo_2c").getCollection("orders-lineitem").explain("allPlansExecution").aggregate([
   {$project: {
	lineitems: {
	    $filter: {
		input: "$o_lineitems",
		as: "l",
		cond: {$lte:["$$l.l_shipdate",  new Date(ISODate("1992-04-30T00:00:00Z").getTime() - 119*24*3600*1000)]}
	    }
	}
    }},
    { $unwind: "$lineitems"},
    { $group: {
    	_id: {l_returnflag: "$lineitems.l_returnflag", l_linestatus: "$lineitems.l_linestatus"},
    	sum_qty: { $sum: "$lineitems.l_quantity" }, //sum(l_quantity)
    	sum_base_price: {$sum: "$lineitems.l_extendedprice"}, //sum(l_extendedprice)
    	sum_disc_price: {$sum: {$multiply: ["$lineitems.l_extendedprice", {$subtract: [1, "$lineitems.l_discount"]}]}},
    	sum_charge: {$sum: {$multiply: ["$lineitems.l_extendedprice", {$subtract: [1, "$lineitems.l_discount"]}, {$add: [1, "$lineitems.l_tax"]}]}},
    	avg_qty: {$avg: "$lineitems.l_quantity"},
    	avg_price: {$avg: "$lineitems.l_extendedprice"},
    	avg_disc: {$avg: "$lineitems.l_discount"},
    	count_order: {$sum: 1}
    }},
    { $sort: { "_id.l_returnflag": 1, "_id.l_linestatus": 1} }
], {
	allowDiskUse: true,
	maxTimeMS: 120000
}));
