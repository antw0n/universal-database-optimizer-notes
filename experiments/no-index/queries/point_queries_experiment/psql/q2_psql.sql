\c tpch
set search_path to scale1;
explain analyze select
       *
from
       customer
where
       c_custkey = 7;