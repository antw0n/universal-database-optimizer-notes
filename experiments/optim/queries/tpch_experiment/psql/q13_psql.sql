\c tpch
explain analyze select
	c_count,
	count(*) as custdist
from
	(
		select
			c_custkey,
			count(o_orderkey)
		from
			scale1.customer left outer join scale1.orders on
				c_custkey = o_custkey
				and o_comment not like '%express%packages%'
		group by
			c_custkey
	) as c_orders (c_custkey, c_count)
group by
	c_count
order by
	custdist desc,
	c_count desc;