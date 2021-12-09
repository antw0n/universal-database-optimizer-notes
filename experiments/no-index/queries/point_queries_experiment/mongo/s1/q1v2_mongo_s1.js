printjson(db.getSiblingDB("tpch_mongo_1c").getCollection("scale1").explain("allPlansExecution").aggregate([
   {$project: {
      c_orders:{
         $filter:{
            input: "$c_orders",
            as: "o",
            cond: {$eq:["$$o.o_orderkey", 7]}
          }
      }
   }},
   {$unwind:"$c_orders"},
   {$project:{_id:0, orders:"$c_orders"}},
   {$unwind:"$orders.o_lineitems"},
   {$project:{lineitems:"$orders.o_lineitems"}},
   {$unwind:"$lineitems"},
   {$replaceRoot:{newRoot:"$lineitems"}}
], {
	allowDiskUse: true,
	maxTimeMS: 120000
}));
