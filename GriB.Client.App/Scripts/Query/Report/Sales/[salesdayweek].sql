  create table #ttimes([order] [int] identity(1,1), [cudweek] int)

  insert into #ttimes([cudweek])
  select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 4 union all select 1 
  
select [cudweek], [doc_cnt]=avg([doc_cnt]), [pos_cnt]=avg([pos_cnt])
into #ttimesdoc
from (
      select [y]=DATEPART(YEAR, [d].[cd]), [m]=DATEPART(MONTH, [d].[cd]), [d]=DATEPART(DAY, [d].[cd])
           , [cudweek]=DATEPART(DW, [d].[cd])
	       , [doc_cnt]=cast(count([d].[id]) as float), [pos_cnt]=sum([p].[pos_cnt])
	  from (
            select [d].[id], [pos_cnt]=cast(count([p].[id]) as float)
            from [t_check_position] [p] with(nolock)
            inner join [t_check] [d] with(nolock) on [p].[id] = [d].[id]
            where [d].[d] = 0 and ([d].[options] & 1) = 1
              and (@datefrom <= '18991230' or (@datefrom > '18991230' and [d].[cd] >= @datefrom))
              and (@dateto <= '18991230' or (@dateto > '18991230' and [d].[cd] <= @dateto))
              and (@salepoint = 0 or (@salepoint <> 0 and [d].[salepoint] = @salepoint))
              and (@product = 0 or (@product <> 0 and [p].[product] = @product))
            group by [d].[id]
           ) [p]
      inner join [t_check] [d] with(nolock) on [p].[id] = [d].[id]
      group by DATEPART(YEAR, [d].[cd]), DATEPART(MONTH, [d].[cd]), DATEPART(DAY, [d].[cd])
             , DATEPART(DW, [d].[cd])
     ) [res]
group by [cudweek]
  
  select [t].[cudweek], [doc_cnt]=isnull([tt].[doc_cnt], 0), [pos_cnt]=isnull([tt].[pos_cnt], 0)
  from #ttimes [t]
  left outer join #ttimesdoc [tt] on [t].[cudweek] = [tt].[cudweek]
  order by [t].[order]

 -- select * from #ttimesdoc

drop table #ttimes
drop table #ttimesdoc