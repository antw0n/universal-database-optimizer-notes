printjson(db.getSiblingDB("tpch_mongo_2c").getCollection("customer").explain("allPlansExecution").aggregate([
    {$match: {
	c_acctbal: {$gt: 0.0}
    }},
    {$project: {
	c_acctbal: 1,
	cntrycode: {$substr:["$c_phone", 0, 2]}
    }},
    {$match: {
	cntrycode: {$in: ['30', '17', '25', '10', '22', '15', '21'] }
    }},
    {$group: {
	_id: null,
	c_acctbal_avg: {$avg: "$c_acctbal"}
    }},
    {$project: { _id:0, c_acctbal_avg: 1 }},
    // TODO: Make a variable for the lookup collection
    {$lookup:{
	from: "customer",
	pipeline:[
	    {$lookup: {
		from: "orders-lineitem",
		localField: "_id",
		foreignField: "o_custkey",
		as: "c_orders"
	    }},
	    {$match: {
		c_acctbal: {$gt: 0.0},
		c_orders: {$eq: []}
	    }},
	    {$project: {
		_id: 0,
		c_acctbal: 1,
		cntrycode: {$substr:["$c_phone", 0, 2]}
	    }},
	    {$match: {
		cntrycode: {$in: ['30', '17', '25', '10', '22', '15', '21'] }
	    }}
	],
	as: "c_acctbals"
    }},
    {$unwind: "$c_acctbals"},
    {$match: {
	$expr: {$gt:["$c_acctbals.c_acctbal", "$c_acctbal_avg"]}
    }},
    {$group: {
	_id: "$c_acctbals.cntrycode",
	numcust: {$sum: 1},
	totacctbal: {$sum: "$c_acctbals.c_acctbal"}
    }},
    {$sort: {"_id": 1}}
], {
	allowDiskUse: true,
	maxTimeMS: 120000
}));
