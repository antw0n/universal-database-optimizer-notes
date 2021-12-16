\c tpch
set search_path to scale1;
explain analyze select
       *
from
       customer
where
       c_acctbal < -10;