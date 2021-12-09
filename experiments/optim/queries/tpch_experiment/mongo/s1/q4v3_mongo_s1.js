printjson(db.getSiblingDB("tpch_mongo_1c").getCollection("scale1").explain("allPlansExecution").aggregate([
    { $project: {
	_id:0, 
	orders: {
	    $filter:{
	 	 input: "$c_orders",
	 	 as: "o",
	 	 cond: {
		     $and: [
			 {
			     $anyElementTrue:{
				 $map: {
				     input: "$$o.o_lineitems",
				     as: "l",
				     in: {$lt: ["$$l.l_commitdate", "$$l.l_receiptdate"]}
				 }
			     }
			 },
			 {$gte:["$$o.o_orderdate", ISODate("1992-01-01T00:00:00Z")]},
			 {$lt:["$$o.o_orderdate", ISODate("1992-04-01T00:00:00Z")]}
		     ]
		     
		 }
	    }
	}
    } },
    { $unwind: "$orders" },
    { $project: {
    	orderpriority: "$orders.o_orderpriority"
    }},
    { $group: {
     	_id: "$orderpriority",
     	order_count: {$sum: 1}	
    }},
    { $sort: {"_id": 1} }
], {
	allowDiskUse: true,
	maxTimeMS: 120000
}));
