printjson(db.getSiblingDB("tpch_mongo_1c").getCollection("scale1").explain("allPlansExecution").aggregate([
   {$unwind:"$c_orders"},
   {$project:{_id:0, orders:"$c_orders"}},
   {$match:{ "orders.o_orderkey":7 }},
   {$unwind:"$orders.o_lineitems"},
   {$project:{lineitems:"$orders.o_lineitems"}},
   {$unwind:"$lineitems"},
   {$replaceRoot:{newRoot:"$lineitems"}}
], {
	allowDiskUse: true,
	maxTimeMS: 120000
}));
