\c tpch
set search_path to scale1;
explain analyze select
       *
from
       lineitem
where
       l_orderkey = 7;