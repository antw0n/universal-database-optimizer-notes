db.getSiblingDB('admin').runCommand({'wiredTigerEngineRuntimeConfig': 'cache_size=3G'});
db.getSiblingDB('admin').runCommand({'wiredTigerConcurrentReadTransactions': 512});
db.getSiblingDB('admin').runCommand({'wiredTigerMaxCacheOverflowSizeGB': 1});
db.getSiblingDB('admin').runCommand({'wiredTigerConcurrentWriteTransactions': 256});
db.getSiblingDB('admin').runCommand({'cursorTimeoutMillis': 200000});
db.getSiblingDB('admin').runCommand({'maxIndexBuildMemoryUsageMegabytes': 3000});
