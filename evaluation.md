# Evaluation

This file contains notes on evaluation of UDO.

## Point Queries Experiments

Point queries experiment according to the research work:

T. F. Llano-Ríos, M. Khalefa and A. Badia, "Evaluating NoSQL Systems for Decision Support: An Experimental Approach," 2020 IEEE International Conference on Big Data (Big Data), 2020, pp. 2802-2811, doi: 10.1109/BigData50022.2020.9377881.

Abstract: We design and implement an experimental analysis comparing two relational systems (PostgreSQL and MariaDB) and two document-based NoSQL systems (MongoDB and CouchBase). We compare their performance on a single server, Decision Support (DSS) scenario. We argue that DSS is becoming an important case study for NoSQL. We experiment with several database designs and several query translations in order to investigate the effect of physical design and query optimization in document-based stores. Our results show that design is very important for MongoDB's performance, and that query optimization over documents is much less sophisticated on document-based stores than in relational data bases and needs to improve. Our results also offer some ideas to guide further development in this area.

URL: https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=9377881&isnumber=9377728

### Point Queries Experiment S1

**Setup**

Connected to mongo database: tpch_mongo_1c  

Heavy horizon: 4  
Light horizon: 6  
Horizon: 10  
Applicable indexes: 4  
System parameters: 6  

Action space: 22  
Index state space: 16  
Parameter state space: 729  

Tuning time: 1.0017146569490434 hours  

**Results**

Index Recommendation from MCTS according to metric 1:  
```js
({'createIndexes': 'scale1', 'indexes': [{'key': {'c_acctbal': -1}, 'name': 'idx_customer_d', 'unique': False}]}, ['q4v1_mongo_s1.json'], 150000)
({'createIndexes': 'scale1', 'indexes': [{'key': {'c_orders.o_orderdate': 1}, 'name': 'idx_customer_c', 'unique': False}]}, ['q4v1_mongo_s1.json'], 150000)
({'createIndexes': 'scale1', 'indexes': [{'key': {'c_mktsegment': 1}, 'name': 'idx_customer_b', 'unique': False}]}, ['q4v1_mongo_s1.json'], 150000)
({'createIndexes': 'scale1', 'indexes': [{'key': {'c_acctbal': 1}, 'name': 'idx_customer_a', 'unique': False}]}, ['q4v1_mongo_s1.json'], 150000)
```
Index Recommendation from MCTS according to metric 2:  
```js
({'createIndexes': 'scale1', 'indexes': [{'key': {'c_acctbal': -1}, 'name': 'idx_customer_d', 'unique': False}]}, ['q4v1_mongo_s1.json'], 150000)
({'createIndexes': 'scale1', 'indexes': [{'key': {'c_orders.o_orderdate': 1}, 'name': 'idx_customer_c', 'unique': False}]}, ['q4v1_mongo_s1.json'], 150000)
({'createIndexes': 'scale1', 'indexes': [{'key': {'c_mktsegment': 1}, 'name': 'idx_customer_b', 'unique': False}]}, ['q4v1_mongo_s1.json'], 150000)
({'createIndexes': 'scale1', 'indexes': [{'key': {'c_acctbal': 1}, 'name': 'idx_customer_a', 'unique': False}]}, ['q4v1_mongo_s1.json'], 150000)
```
System Parameter Recommendation from MCTS according to metric 1:  
```js
{'wiredTigerEngineRuntimeConfig': 'cache_size=3G'}
{'cursorTimeoutMillis': 200000}
{'wiredTigerMaxCacheOverflowSizeGB': 2}
{'wiredTigerConcurrentWriteTransactions': 256}
{'wiredTigerConcurrentReadTransactions': 256}
{'maxIndexBuildMemoryUsageMegabytes': 2000}
```

System Parameter Recommendation form MCTS according to metric 2:  
```js
{'wiredTigerEngineRuntimeConfig': 'cache_size=3G'}
{'wiredTigerConcurrentWriteTransactions': 256}
{'wiredTigerMaxCacheOverflowSizeGB': 2}
{'cursorTimeoutMillis': 300000}
{'maxIndexBuildMemoryUsageMegabytes': 3000}
{'wiredTigerConcurrentReadTransactions': 256}
```

### Point Queries Experiment S2

**Setup**

Connected to mongo database: tpch_mongo_3c  

Heavy horizon: 25  
Light horizon: 6  
Horizon: 31  
Applicable indexes: 25  
System parameters: 6  

Action space: 43  
Index state space: 33554432  
Parameter state space: 729  

Tuning time: 1.2926379364066654 hours

**Results**

Index Recommendation from MCTS according to metric 1:  
```js
({'createIndexes': 'orders', 'indexes': [{'key': {'o_custkey': 1, 'o_orderkey': 1}, 'name': 'idx_orders_h', 'unique': False}]}, ['q3v2_mongo_s2.json'], 1500000)
({'createIndexes': 'orders', 'indexes': [{'key': {'o_orderkey': 1, 'o_shippriority': 1, 'o_orderdate': 1}, 'name': 'idx_orders_e', 'unique': False}]}, ['q3v2_mongo_s2.json'], 1500000)
({'createIndexes': 'orders', 'indexes': [{'key': {'o_orderpriority': 1}, 'name': 'idx_orders_f', 'unique': False}]}, ['q3v2_mongo_s2.json'], 1500000)
({'createIndexes': 'customer', 'indexes': [{'key': {'c_phone': 1}, 'name': 'idx_customer_f', 'unique': False}]}, ['q3v2_mongo_s2.json', 'q4v1_mongo_s2.json'], 150000)
({'createIndexes': 'customer', 'indexes': [{'key': {'c_custkey': 1}, 'name': 'idx_customer_b', 'unique': False}]}, ['q3v2_mongo_s2.json', 'q4v1_mongo_s2.json'], 150000)
({'createIndexes': 'customer', 'indexes': [{'key': {'c_nationkey': 1}, 'name': 'idx_customer_a', 'unique': False}]}, ['q3v2_mongo_s2.json', 'q4v1_mongo_s2.json'], 150000)
({'createIndexes': 'orders', 'indexes': [{'key': {'o_clerk': 1}, 'name': 'idx_orders_g', 'unique': False}]}, ['q3v2_mongo_s2.json'], 1500000)
({'createIndexes': 'customer', 'indexes': [{'key': {'c_mktsegment': 1}, 'name': 'idx_customer_c', 'unique': False}]}, ['q3v2_mongo_s2.json', 'q4v1_mongo_s2.json'], 150000)
({'createIndexes': 'orders', 'indexes': [{'key': {'o_orderstatus': 1}, 'name': 'idx_orders_b', 'unique': False}]}, ['q3v2_mongo_s2.json'], 1500000)
({'createIndexes': 'customer', 'indexes': [{'key': {'c_acctbal': 1}, 'name': 'idx_customer_e', 'unique': False}]}, ['q3v2_mongo_s2.json', 'q4v1_mongo_s2.json'], 150000)
({'createIndexes': 'customer', 'indexes': [{'key': {'c_name': 1}, 'name': 'idx_customer_h', 'unique': False}]}, ['q3v2_mongo_s2.json', 'q4v1_mongo_s2.json'], 150000)
```

Index Recommendation from MCTS according to metric 2:  
```js
({'createIndexes': 'orders', 'indexes': [{'key': {'o_custkey': 1, 'o_orderkey': 1}, 'name': 'idx_orders_h', 'unique': False}]}, ['q3v2_mongo_s2.json'], 1500000)
({'createIndexes': 'orders', 'indexes': [{'key': {'o_orderkey': 1, 'o_shippriority': 1, 'o_orderdate': 1}, 'name': 'idx_orders_e', 'unique': False}]}, ['q3v2_mongo_s2.json'], 1500000)
({'createIndexes': 'orders', 'indexes': [{'key': {'o_orderpriority': 1}, 'name': 'idx_orders_f', 'unique': False}]}, ['q3v2_mongo_s2.json'], 1500000)
({'createIndexes': 'customer', 'indexes': [{'key': {'c_phone': 1}, 'name': 'idx_customer_f', 'unique': False}]}, ['q3v2_mongo_s2.json', 'q4v1_mongo_s2.json'], 150000)
({'createIndexes': 'customer', 'indexes': [{'key': {'c_custkey': 1}, 'name': 'idx_customer_b', 'unique': False}]}, ['q3v2_mongo_s2.json', 'q4v1_mongo_s2.json'], 150000)
({'createIndexes': 'customer', 'indexes': [{'key': {'c_nationkey': 1}, 'name': 'idx_customer_a', 'unique': False}]}, ['q3v2_mongo_s2.json', 'q4v1_mongo_s2.json'], 150000)
({'createIndexes': 'orders', 'indexes': [{'key': {'o_clerk': 1}, 'name': 'idx_orders_g', 'unique': False}]}, ['q3v2_mongo_s2.json'], 1500000)
({'createIndexes': 'customer', 'indexes': [{'key': {'c_mktsegment': 1}, 'name': 'idx_customer_c', 'unique': False}]}, ['q3v2_mongo_s2.json', 'q4v1_mongo_s2.json'], 150000)
({'createIndexes': 'orders', 'indexes': [{'key': {'o_orderstatus': 1}, 'name': 'idx_orders_b', 'unique': False}]}, ['q3v2_mongo_s2.json'], 1500000)
({'createIndexes': 'customer', 'indexes': [{'key': {'c_acctbal': 1}, 'name': 'idx_customer_e', 'unique': False}]}, ['q3v2_mongo_s2.json', 'q4v1_mongo_s2.json'], 150000)
({'createIndexes': 'customer', 'indexes': [{'key': {'c_name': 1}, 'name': 'idx_customer_h', 'unique': False}]}, ['q3v2_mongo_s2.json', 'q4v1_mongo_s2.json'], 150000)
```

System Parameter Recommendation from MCTS according to metric 1:   
```js
{'maxIndexBuildMemoryUsageMegabytes': 3000}
{'cursorTimeoutMillis': 200000}
{'wiredTigerConcurrentWriteTransactions': 256}
{'wiredTigerConcurrentReadTransactions': 256}
{'wiredTigerMaxCacheOverflowSizeGB': 2}
```

System Parameter Recommendation form MCTS according to metric 2:  
```js
{'wiredTigerConcurrentReadTransactions': 256}
{'maxIndexBuildMemoryUsageMegabytes': 3000}
{'wiredTigerConcurrentWriteTransactions': 512}
{'wiredTigerMaxCacheOverflowSizeGB': 1}
{'cursorTimeoutMillis': 300000}
{'wiredTigerEngineRuntimeConfig': 'cache_size=3G'}
```

### Point Queries Experiment S3

**Setup**

Connected to mongo database: tpch_mongo_2c  

Heavy horizon: 16  
Light horizon: 6  
Horizon: 22  
Applicable indexes: 16  
System parameters: 6  

Action space: 34  
Index state space: 65536  
Parameter state space: 729  

Tuning time: 1.2929454021983677 hours

**Results**

Index Recommendation from MCTS according to metric 1:  
```js
({'createIndexes': 'orders-lineitem', 'indexes': [{'key': {'o_custkey': 1}, 'name': 'idx_orders-lineitem_a', 'unique': False}]}, ['q3v2_mongo_s3.json'], 1500000)
({'createIndexes': 'customer', 'indexes': [{'key': {'c_phone': 1}, 'name': 'idx_customer_f', 'unique': False}]}, ['q3v2_mongo_s3.json'], 150000)
({'createIndexes': 'customer', 'indexes': [{'key': {'c_custkey': 1, 'c_nationkey': 1, 'c_mktsegment': 1}, 'name': 'idx_customer_l', 'unique': False}]}, ['q3v2_mongo_s3.json'], 150000)
({'createIndexes': 'orders-lineitem', 'indexes': [{'key': {'o_orderdate': 1}, 'name': 'idx_orders-lineitem_b', 'unique': False}]}, ['q3v2_mongo_s3.json'], 1500000)
({'createIndexes': 'customer', 'indexes': [{'key': {'c_acctbal': 1}, 'name': 'idx_customer_e', 'unique': False}]}, ['q3v2_mongo_s3.json'], 150000)
({'createIndexes': 'customer', 'indexes': [{'key': {'c_name': 1}, 'name': 'idx_customer_h', 'unique': False}]}, ['q3v2_mongo_s3.json'], 150000)
```

Index Recommendation from MCTS according to metric 2:  
```js
({'createIndexes': 'orders-lineitem', 'indexes': [{'key': {'o_custkey': 1}, 'name': 'idx_orders-lineitem_a', 'unique': False}]}, ['q3v2_mongo_s3.json'], 1500000)
({'createIndexes': 'customer', 'indexes': [{'key': {'c_phone': 1}, 'name': 'idx_customer_f', 'unique': False}]}, ['q3v2_mongo_s3.json'], 150000)
({'createIndexes': 'customer', 'indexes': [{'key': {'c_custkey': 1, 'c_nationkey': 1, 'c_mktsegment': 1}, 'name': 'idx_customer_l', 'unique': False}]}, ['q3v2_mongo_s3.json'], 150000)
({'createIndexes': 'orders-lineitem', 'indexes': [{'key': {'o_orderdate': 1}, 'name': 'idx_orders-lineitem_b', 'unique': False}]}, ['q3v2_mongo_s3.json'], 1500000)
({'createIndexes': 'customer', 'indexes': [{'key': {'c_acctbal': 1}, 'name': 'idx_customer_e', 'unique': False}]}, ['q3v2_mongo_s3.json'], 150000)
({'createIndexes': 'customer', 'indexes': [{'key': {'c_name': 1}, 'name': 'idx_customer_h', 'unique': False}]}, ['q3v2_mongo_s3.json'], 150000)
```

System Parameter Recommendation from MCTS according to metric 1:   
```js
{'wiredTigerConcurrentWriteTransactions': 256}
{'wiredTigerEngineRuntimeConfig': 'cache_size=3G'}
{'maxIndexBuildMemoryUsageMegabytes': 2000}
```

System Parameter Recommendation form MCTS according to metric 2:  
```js
{'wiredTigerEngineRuntimeConfig': 'cache_size=3G'}
{'wiredTigerMaxCacheOverflowSizeGB': 2}
{'maxIndexBuildMemoryUsageMegabytes': 3000}
{'wiredTigerConcurrentReadTransactions': 256}
{'wiredTigerConcurrentWriteTransactions': 512}
{'cursorTimeoutMillis': 200000}
```

## TPC-H Experiments

TPC-H experiment according to the research work:

T. F. Llano-Ríos, M. Khalefa and A. Badia, "Evaluating NoSQL Systems for Decision Support: An Experimental Approach," 2020 IEEE International Conference on Big Data (Big Data), 2020, pp. 2802-2811, doi: 10.1109/BigData50022.2020.9377881.

Abstract: We design and implement an experimental analysis comparing two relational systems (PostgreSQL and MariaDB) and two document-based NoSQL systems (MongoDB and CouchBase). We compare their performance on a single server, Decision Support (DSS) scenario. We argue that DSS is becoming an important case study for NoSQL. We experiment with several database designs and several query translations in order to investigate the effect of physical design and query optimization in document-based stores. Our results show that design is very important for MongoDB's performance, and that query optimization over documents is much less sophisticated on document-based stores than in relational data bases and needs to improve. Our results also offer some ideas to guide further development in this area.

URL: https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=9377881&isnumber=9377728

### TPC-H Experiment S1

**Setup**

Connected to mongo database: tpch_mongo_1c  

Heavy horizon: 4  
Light horizon: 6  
Horizon: 10  
Applicable indexes: 4  
System parameters: 6  

Action space: 22  
Index state space: 16  
Parameter state space: 729  

Tuning time: 1.067702930238512 hours  

**Results**

Index Recommendation from MCTS according to metric 1:  
```js
({'createIndexes': 'scale1', 'indexes': [{'key': {'c_acctbal': -1}, 'name': 'idx_customer_d', 'unique': False}]}, ['q22_mongo_s1.json', 'q3v1_mongo_s1.json', 'q3v2_mongo_s1.json', 'q3v3_mongo_s1.json'], 150000)
({'createIndexes': 'scale1', 'indexes': [{'key': {'c_mktsegment': 1}, 'name': 'idx_customer_b', 'unique': False}]}, ['q22_mongo_s1.json', 'q3v1_mongo_s1.json', 'q3v2_mongo_s1.json', 'q3v3_mongo_s1.json'], 150000)
({'createIndexes': 'scale1', 'indexes': [{'key': {'c_acctbal': 1}, 'name': 'idx_customer_a', 'unique': False}]}, ['q22_mongo_s1.json', 'q3v1_mongo_s1.json', 'q3v2_mongo_s1.json', 'q3v3_mongo_s1.json'], 150000)
({'createIndexes': 'scale1', 'indexes': [{'key': {'c_orders.o_orderdate': 1}, 'name': 'idx_customer_c', 'unique': False}]}, ['q22_mongo_s1.json', 'q3v1_mongo_s1.json', 'q3v2_mongo_s1.json', 'q3v3_mongo_s1.json'], 150000)
```
Index Recommendation from MCTS according to metric 2:  
```js
({'createIndexes': 'scale1', 'indexes': [{'key': {'c_acctbal': -1}, 'name': 'idx_customer_d', 'unique': False}]}, ['q22_mongo_s1.json', 'q3v1_mongo_s1.json', 'q3v2_mongo_s1.json', 'q3v3_mongo_s1.json'], 150000)
({'createIndexes': 'scale1', 'indexes': [{'key': {'c_mktsegment': 1}, 'name': 'idx_customer_b', 'unique': False}]}, ['q22_mongo_s1.json', 'q3v1_mongo_s1.json', 'q3v2_mongo_s1.json', 'q3v3_mongo_s1.json'], 150000)
({'createIndexes': 'scale1', 'indexes': [{'key': {'c_acctbal': 1}, 'name': 'idx_customer_a', 'unique': False}]}, ['q22_mongo_s1.json', 'q3v1_mongo_s1.json', 'q3v2_mongo_s1.json', 'q3v3_mongo_s1.json'], 150000)
({'createIndexes': 'scale1', 'indexes': [{'key': {'c_orders.o_orderdate': 1}, 'name': 'idx_customer_c', 'unique': False}]}, ['q22_mongo_s1.json', 'q3v1_mongo_s1.json', 'q3v2_mongo_s1.json', 'q3v3_mongo_s1.json'], 150000)
```
System Parameter Recommendation from MCTS according to metric 1:  
```js
{'wiredTigerEngineRuntimeConfig': 'cache_size=3G'}
{'wiredTigerConcurrentReadTransactions': 512}
{'wiredTigerMaxCacheOverflowSizeGB': 1}
{'wiredTigerConcurrentWriteTransactions': 256}
{'cursorTimeoutMillis': 200000}
{'maxIndexBuildMemoryUsageMegabytes': 2000}
```
System Parameter Recommendation form MCTS according to metric 2:  
```js
{'wiredTigerEngineRuntimeConfig': 'cache_size=3G'}
{'wiredTigerConcurrentReadTransactions': 512}
{'wiredTigerMaxCacheOverflowSizeGB': 1}
{'wiredTigerConcurrentWriteTransactions': 256}
{'cursorTimeoutMillis': 200000}
{'maxIndexBuildMemoryUsageMegabytes': 3000}
```

### TPC-H Experiment S2

**Setup**

Connected to mongo database: tpch_mongo_3c  

Heavy horizon: 45  
Light horizon: 6  
Horizon: 51  
Applicable indexes: 45  
System parameters: 6  

Action space: 63  
Index state space: 35184372088832  
Parameter state space: 729  

Tuning time: 10.723576557238896 hours  

**Results**

Index Recommendation from MCTS according to metric 1:  
```js
({'createIndexes': 'orders', 'indexes': [{'key': {'o_custkey': 1, 'o_orderkey': 1, 'o_shippriority': 1}, 'name': 'idx_orders_i', 'unique': False}]}, ['q3v1_mongo_s2.json', 'q3v2_mongo_s2.json', 'q3v3_mongo_s2.json'], 1500000)
({'createIndexes': 'customer', 'indexes': [{'key': {'c_custkey': 1, 'c_nationkey': 1, 'c_acctbal': 1}, 'name': 'idx_customer_k', 'unique': False}]}, ['q22_mongo_s2.json', 'q3v1_mongo_s2.json', 'q3v2_mongo_s2.json', 'q3v3_mongo_s2.json'], 150000)
({'createIndexes': 'orders', 'indexes': [{'key': {'o_orderdate': 1}, 'name': 'idx_orders_a', 'unique': False}]}, ['q3v1_mongo_s2.json', 'q3v2_mongo_s2.json', 'q3v3_mongo_s2.json'], 1500000)
({'createIndexes': 'lineitem', 'indexes': [{'key': {'l_shipdate': 1, 'l_discount': 1, 'l_quantity': 1}, 'name': 'idx_lineitem_a', 'unique': False}]}, ['q3v1_mongo_s2.json', 'q3v2_mongo_s2.json', 'q3v3_mongo_s2.json'], 6001215)
({'createIndexes': 'customer', 'indexes': [{'key': {'c_name': 1}, 'name': 'idx_customer_h', 'unique': False}]}, ['q22_mongo_s2.json', 'q3v1_mongo_s2.json', 'q3v2_mongo_s2.json', 'q3v3_mongo_s2.json'], 150000)
({'createIndexes': 'customer', 'indexes': [{'key': {'c_phone': 1}, 'name': 'idx_customer_f', 'unique': False}]}, ['q22_mongo_s2.json', 'q3v1_mongo_s2.json', 'q3v2_mongo_s2.json', 'q3v3_mongo_s2.json'], 150000)
({'createIndexes': 'lineitem', 'indexes': [{'key': {'l_shipinstruct': 1}, 'name': 'idx_lineitem_m', 'unique': False}]}, ['q3v1_mongo_s2.json', 'q3v2_mongo_s2.json', 'q3v3_mongo_s2.json'], 6001215)
({'createIndexes': 'lineitem', 'indexes': [{'key': {'l_orderkey': 1, 'l_suppkey': 1}, 'name': 'idx_lineitem_i', 'unique': False}]}, ['q3v1_mongo_s2.json', 'q3v2_mongo_s2.json', 'q3v3_mongo_s2.json'], 6001215)
({'createIndexes': 'lineitem', 'indexes': [{'key': {'l_returnflag': 1}, 'name': 'idx_lineitem_q', 'unique': False}]}, ['q3v1_mongo_s2.json', 'q3v2_mongo_s2.json', 'q3v3_mongo_s2.json'], 6001215)
({'createIndexes': 'lineitem', 'indexes': [{'key': {'l_shipmode': 1, 'l_partkey': 1}, 'name': 'idx_lineitem_t', 'unique': False}]}, ['q3v1_mongo_s2.json', 'q3v2_mongo_s2.json', 'q3v3_mongo_s2.json'], 6001215)
({'createIndexes': 'lineitem', 'indexes': [{'key': {'l_commitdate': 1}, 'name': 'idx_lineitem_k', 'unique': False}]}, ['q3v1_mongo_s2.json', 'q3v2_mongo_s2.json', 'q3v3_mongo_s2.json'], 6001215)
({'createIndexes': 'lineitem', 'indexes': [{'key': {'l_tax': 1}, 'name': 'idx_lineitem_n', 'unique': False}]}, ['q3v1_mongo_s2.json', 'q3v2_mongo_s2.json', 'q3v3_mongo_s2.json'], 6001215)
({'createIndexes': 'orders', 'indexes': [{'key': {'o_orderstatus': 1}, 'name': 'idx_orders_b', 'unique': False}]}, ['q3v1_mongo_s2.json', 'q3v2_mongo_s2.json', 'q3v3_mongo_s2.json'], 1500000)
({'createIndexes': 'orders', 'indexes': [{'key': {'o_orderpriority': 1}, 'name': 'idx_orders_f', 'unique': False}]}, ['q3v1_mongo_s2.json', 'q3v2_mongo_s2.json', 'q3v3_mongo_s2.json'], 1500000)
({'createIndexes': 'customer', 'indexes': [{'key': {'c_mktsegment': 1}, 'name': 'idx_customer_c', 'unique': False}]}, ['q22_mongo_s2.json', 'q3v1_mongo_s2.json', 'q3v2_mongo_s2.json', 'q3v3_mongo_s2.json'], 150000)
({'createIndexes': 'lineitem', 'indexes': [{'key': {'l_receiptdate': 1}, 'name': 'idx_lineitem_j', 'unique': False}]}, ['q3v1_mongo_s2.json', 'q3v2_mongo_s2.json', 'q3v3_mongo_s2.json'], 6001215)
({'createIndexes': 'lineitem', 'indexes': [{'key': {'_id.l_orderkey': 1}, 'name': 'idx_lineitem_u', 'unique': False}]}, ['q3v1_mongo_s2.json', 'q3v2_mongo_s2.json', 'q3v3_mongo_s2.json'], 6001215)
({'createIndexes': 'lineitem', 'indexes': [{'key': {'l_linestatus': 1}, 'name': 'idx_lineitem_r', 'unique': False}]}, ['q3v1_mongo_s2.json', 'q3v2_mongo_s2.json', 'q3v3_mongo_s2.json'], 6001215)
({'createIndexes': 'orders', 'indexes': [{'key': {'o_clerk': 1}, 'name': 'idx_orders_g', 'unique': False}]}, ['q3v1_mongo_s2.json', 'q3v2_mongo_s2.json', 'q3v3_mongo_s2.json'], 1500000)
```
Index Recommendation from MCTS according to metric 2:  
```js
({'createIndexes': 'orders', 'indexes': [{'key': {'o_custkey': 1, 'o_orderkey': 1, 'o_shippriority': 1}, 'name': 'idx_orders_i', 'unique': False}]}, ['q3v1_mongo_s2.json', 'q3v2_mongo_s2.json', 'q3v3_mongo_s2.json'], 1500000)
({'createIndexes': 'customer', 'indexes': [{'key': {'c_custkey': 1, 'c_nationkey': 1, 'c_acctbal': 1}, 'name': 'idx_customer_k', 'unique': False}]}, ['q22_mongo_s2.json', 'q3v1_mongo_s2.json', 'q3v2_mongo_s2.json', 'q3v3_mongo_s2.json'], 150000)
({'createIndexes': 'orders', 'indexes': [{'key': {'o_orderdate': 1}, 'name': 'idx_orders_a', 'unique': False}]}, ['q3v1_mongo_s2.json', 'q3v2_mongo_s2.json', 'q3v3_mongo_s2.json'], 1500000)
({'createIndexes': 'lineitem', 'indexes': [{'key': {'l_shipdate': 1, 'l_discount': 1, 'l_quantity': 1}, 'name': 'idx_lineitem_a', 'unique': False}]}, ['q3v1_mongo_s2.json', 'q3v2_mongo_s2.json', 'q3v3_mongo_s2.json'], 6001215)
({'createIndexes': 'customer', 'indexes': [{'key': {'c_name': 1}, 'name': 'idx_customer_h', 'unique': False}]}, ['q22_mongo_s2.json', 'q3v1_mongo_s2.json', 'q3v2_mongo_s2.json', 'q3v3_mongo_s2.json'], 150000)
({'createIndexes': 'customer', 'indexes': [{'key': {'c_phone': 1}, 'name': 'idx_customer_f', 'unique': False}]}, ['q22_mongo_s2.json', 'q3v1_mongo_s2.json', 'q3v2_mongo_s2.json', 'q3v3_mongo_s2.json'], 150000)
({'createIndexes': 'lineitem', 'indexes': [{'key': {'l_shipinstruct': 1}, 'name': 'idx_lineitem_m', 'unique': False}]}, ['q3v1_mongo_s2.json', 'q3v2_mongo_s2.json', 'q3v3_mongo_s2.json'], 6001215)
({'createIndexes': 'lineitem', 'indexes': [{'key': {'l_orderkey': 1, 'l_suppkey': 1}, 'name': 'idx_lineitem_i', 'unique': False}]}, ['q3v1_mongo_s2.json', 'q3v2_mongo_s2.json', 'q3v3_mongo_s2.json'], 6001215)
({'createIndexes': 'lineitem', 'indexes': [{'key': {'l_returnflag': 1}, 'name': 'idx_lineitem_q', 'unique': False}]}, ['q3v1_mongo_s2.json', 'q3v2_mongo_s2.json', 'q3v3_mongo_s2.json'], 6001215)
({'createIndexes': 'lineitem', 'indexes': [{'key': {'l_shipmode': 1, 'l_partkey': 1}, 'name': 'idx_lineitem_t', 'unique': False}]}, ['q3v1_mongo_s2.json', 'q3v2_mongo_s2.json', 'q3v3_mongo_s2.json'], 6001215)
({'createIndexes': 'lineitem', 'indexes': [{'key': {'l_commitdate': 1}, 'name': 'idx_lineitem_k', 'unique': False}]}, ['q3v1_mongo_s2.json', 'q3v2_mongo_s2.json', 'q3v3_mongo_s2.json'], 6001215)
({'createIndexes': 'lineitem', 'indexes': [{'key': {'l_tax': 1}, 'name': 'idx_lineitem_n', 'unique': False}]}, ['q3v1_mongo_s2.json', 'q3v2_mongo_s2.json', 'q3v3_mongo_s2.json'], 6001215)
({'createIndexes': 'orders', 'indexes': [{'key': {'o_orderstatus': 1}, 'name': 'idx_orders_b', 'unique': False}]}, ['q3v1_mongo_s2.json', 'q3v2_mongo_s2.json', 'q3v3_mongo_s2.json'], 1500000)
({'createIndexes': 'orders', 'indexes': [{'key': {'o_orderpriority': 1}, 'name': 'idx_orders_f', 'unique': False}]}, ['q3v1_mongo_s2.json', 'q3v2_mongo_s2.json', 'q3v3_mongo_s2.json'], 1500000)
({'createIndexes': 'customer', 'indexes': [{'key': {'c_mktsegment': 1}, 'name': 'idx_customer_c', 'unique': False}]}, ['q22_mongo_s2.json', 'q3v1_mongo_s2.json', 'q3v2_mongo_s2.json', 'q3v3_mongo_s2.json'], 150000)
({'createIndexes': 'lineitem', 'indexes': [{'key': {'l_receiptdate': 1}, 'name': 'idx_lineitem_j', 'unique': False}]}, ['q3v1_mongo_s2.json', 'q3v2_mongo_s2.json', 'q3v3_mongo_s2.json'], 6001215)
({'createIndexes': 'lineitem', 'indexes': [{'key': {'_id.l_orderkey': 1}, 'name': 'idx_lineitem_u', 'unique': False}]}, ['q3v1_mongo_s2.json', 'q3v2_mongo_s2.json', 'q3v3_mongo_s2.json'], 6001215)
({'createIndexes': 'lineitem', 'indexes': [{'key': {'l_linestatus': 1}, 'name': 'idx_lineitem_r', 'unique': False}]}, ['q3v1_mongo_s2.json', 'q3v2_mongo_s2.json', 'q3v3_mongo_s2.json'], 6001215)
({'createIndexes': 'orders', 'indexes': [{'key': {'o_clerk': 1}, 'name': 'idx_orders_g', 'unique': False}]}, ['q3v1_mongo_s2.json', 'q3v2_mongo_s2.json', 'q3v3_mongo_s2.json'], 1500000)
```
System Parameter Recommendation from MCTS according to metric 1:  
```js
{'wiredTigerMaxCacheOverflowSizeGB': 2}
{'wiredTigerEngineRuntimeConfig': 'cache_size=2G'}
{'maxIndexBuildMemoryUsageMegabytes': 2000}
```
System Parameter Recommendation form MCTS according to metric 2:  
```js
{'maxIndexBuildMemoryUsageMegabytes': 2000}
{'wiredTigerConcurrentReadTransactions': 256}
{'wiredTigerEngineRuntimeConfig': 'cache_size=3G'}
{'cursorTimeoutMillis': 300000}
{'wiredTigerMaxCacheOverflowSizeGB': 1}
{'wiredTigerConcurrentWriteTransactions': 256}
```

### TPC-H Experiment S3

**Setup**

Connected to mongo database: tpch_mongo_2c  

Heavy horizon: 16  
Light horizon: 6  
Horizon: 22  
Applicable indexes: 16  
System parameters: 6  

Action space: 34  
Index state space: 65536  
Parameter state space: 729  

Tuning time: 5.4964893358283575 hours  

**Results**

Index Recommendation from MCTS according to metric 1:  
```js
({'createIndexes': 'orders-lineitem', 'indexes': [{'key': {'o_custkey': 1}, 'name': 'idx_orders-lineitem_a', 'unique': False}]}, ['q3v1_mongo_s3.json', 'q3v2_mongo_s3.json'], 1500000)
({'createIndexes': 'orders-lineitem', 'indexes': [{'key': {'o_orderdate': 1}, 'name': 'idx_orders-lineitem_b', 'unique': False}]}, ['q3v1_mongo_s3.json', 'q3v2_mongo_s3.json'], 1500000)
({'createIndexes': 'customer', 'indexes': [{'key': {'c_custkey': 1}, 'name': 'idx_customer_b', 'unique': False}]}, ['q22_mongo_s3.json', 'q3v1_mongo_s3.json', 'q3v2_mongo_s3.json'], 150000)
({'createIndexes': 'customer', 'indexes': [{'key': {'c_name': 1}, 'name': 'idx_customer_h', 'unique': False}]}, ['q22_mongo_s3.json', 'q3v1_mongo_s3.json', 'q3v2_mongo_s3.json'], 150000)
({'createIndexes': 'customer', 'indexes': [{'key': {'c_nationkey': 1}, 'name': 'idx_customer_a', 'unique': False}]}, ['q22_mongo_s3.json', 'q3v1_mongo_s3.json', 'q3v2_mongo_s3.json'], 150000)
({'createIndexes': 'customer', 'indexes': [{'key': {'c_mktsegment': 1}, 'name': 'idx_customer_c', 'unique': False}]}, ['q22_mongo_s3.json', 'q3v1_mongo_s3.json', 'q3v2_mongo_s3.json'], 150000)
({'createIndexes': 'customer', 'indexes': [{'key': {'c_phone': 1}, 'name': 'idx_customer_f', 'unique': False}]}, ['q22_mongo_s3.json', 'q3v1_mongo_s3.json', 'q3v2_mongo_s3.json'], 150000)
({'createIndexes': 'customer', 'indexes': [{'key': {'c_acctbal': 1}, 'name': 'idx_customer_e', 'unique': False}]}, ['q22_mongo_s3.json', 'q3v1_mongo_s3.json', 'q3v2_mongo_s3.json'], 150000)
```
Index Recommendation from MCTS according to metric 2:  
```js
({'createIndexes': 'orders-lineitem', 'indexes': [{'key': {'o_custkey': 1}, 'name': 'idx_orders-lineitem_a', 'unique': False}]}, ['q3v1_mongo_s3.json', 'q3v2_mongo_s3.json'], 1500000)
({'createIndexes': 'orders-lineitem', 'indexes': [{'key': {'o_orderdate': 1}, 'name': 'idx_orders-lineitem_b', 'unique': False}]}, ['q3v1_mongo_s3.json', 'q3v2_mongo_s3.json'], 1500000)
({'createIndexes': 'customer', 'indexes': [{'key': {'c_custkey': 1}, 'name': 'idx_customer_b', 'unique': False}]}, ['q22_mongo_s3.json', 'q3v1_mongo_s3.json', 'q3v2_mongo_s3.json'], 150000)
({'createIndexes': 'customer', 'indexes': [{'key': {'c_name': 1}, 'name': 'idx_customer_h', 'unique': False}]}, ['q22_mongo_s3.json', 'q3v1_mongo_s3.json', 'q3v2_mongo_s3.json'], 150000)
({'createIndexes': 'customer', 'indexes': [{'key': {'c_nationkey': 1}, 'name': 'idx_customer_a', 'unique': False}]}, ['q22_mongo_s3.json', 'q3v1_mongo_s3.json', 'q3v2_mongo_s3.json'], 150000)
({'createIndexes': 'customer', 'indexes': [{'key': {'c_mktsegment': 1}, 'name': 'idx_customer_c', 'unique': False}]}, ['q22_mongo_s3.json', 'q3v1_mongo_s3.json', 'q3v2_mongo_s3.json'], 150000)
({'createIndexes': 'customer', 'indexes': [{'key': {'c_phone': 1}, 'name': 'idx_customer_f', 'unique': False}]}, ['q22_mongo_s3.json', 'q3v1_mongo_s3.json', 'q3v2_mongo_s3.json'], 150000)
({'createIndexes': 'customer', 'indexes': [{'key': {'c_acctbal': 1}, 'name': 'idx_customer_e', 'unique': False}]}, ['q22_mongo_s3.json', 'q3v1_mongo_s3.json', 'q3v2_mongo_s3.json'], 150000)
```
System Parameter Recommendation from MCTS according to metric 1:  
```js
{'wiredTigerEngineRuntimeConfig': 'cache_size=3G'}
{'wiredTigerMaxCacheOverflowSizeGB': 1}
{'wiredTigerConcurrentWriteTransactions': 512}
{'cursorTimeoutMillis': 300000}
```
System Parameter Recommendation form MCTS according to metric 2:  
```js
{'wiredTigerEngineRuntimeConfig': 'cache_size=3G'}
{'cursorTimeoutMillis': 300000}
{'wiredTigerConcurrentWriteTransactions': 512}
{'wiredTigerMaxCacheOverflowSizeGB': 1}
{'maxIndexBuildMemoryUsageMegabytes': 3000}
{'wiredTigerConcurrentReadTransactions': 512}
```