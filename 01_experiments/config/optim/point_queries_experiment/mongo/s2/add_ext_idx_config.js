db.getSiblingDB("tpch_mongo_3c").runCommand({
    'createIndexes': 'orders', 'indexes': [{'key': {'o_orderpriority': 1}, 'name': 'idx_orders_f', 'unique': false}]
});
db.getSiblingDB("tpch_mongo_3c").runCommand({
    'createIndexes': 'customer', 'indexes': [{'key': {'c_phone': 1}, 'name': 'idx_customer_f', 'unique': false}]
});
db.getSiblingDB("tpch_mongo_3c").runCommand({
    'createIndexes': 'customer', 'indexes': [{'key': {'c_custkey': 1}, 'name': 'idx_customer_b', 'unique': false}]
});
db.getSiblingDB("tpch_mongo_3c").runCommand({
    'createIndexes': 'customer', 'indexes': [{'key': {'c_nationkey': 1}, 'name': 'idx_customer_a', 'unique': false}]
});
db.getSiblingDB("tpch_mongo_3c").runCommand({
    'createIndexes': 'orders', 'indexes': [{'key': {'o_clerk': 1}, 'name': 'idx_orders_g', 'unique': false}]
});
db.getSiblingDB("tpch_mongo_3c").runCommand({
    'createIndexes': 'customer', 'indexes': [{'key': {'c_mktsegment': 1}, 'name': 'idx_customer_c', 'unique': false}]
});
db.getSiblingDB("tpch_mongo_3c").runCommand({
    'createIndexes': 'orders', 'indexes': [{'key': {'o_orderstatus': 1}, 'name': 'idx_orders_b', 'unique': false}]
});
db.getSiblingDB("tpch_mongo_3c").runCommand({
    'createIndexes': 'customer', 'indexes': [{'key': {'c_acctbal': 1}, 'name': 'idx_customer_e', 'unique': false}]
});
db.getSiblingDB("tpch_mongo_3c").runCommand({
    'createIndexes': 'customer', 'indexes': [{'key': {'c_name': 1}, 'name': 'idx_customer_h', 'unique': false}]
});

