\c tpch
explain analyze select
	cntrycode,
	count(*) as numcust,
	sum(c_acctbal) as totacctbal
from
	(
		select
			substring(c_phone from 1 for 2) as cntrycode,
			c_acctbal
		from
			scale1.customer
		where
			substring(c_phone from 1 for 2) in
				('30', '17', '25', '10', '22', '15', '21')
			and c_acctbal > (
				select
					avg(c_acctbal)
				from
					scale1.customer
				where
					c_acctbal > 0.00
					and substring(c_phone from 1 for 2) in
						('30', '17', '25', '10', '22', '15', '21')
			)
			and not exists (
				select
					*
				from
					scale1.orders
				where
					o_custkey = c_custkey
			)
	) as custsale
group by
	cntrycode
order by
	cntrycode;