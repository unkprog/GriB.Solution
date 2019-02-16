﻿  create table #ttimes([order] [int] identity(1,1), [time] char(5))

  insert into #ttimes([time])
            select '00' union all select '01' union all select '02' union all select '03'
  union all select '04' union all select '05' union all select '06' union all select '07'
  union all select '08' union all select '09' union all select '10' union all select '11'
  union all select '12' union all select '13' union all select '14' union all select '15'
  union all select '16' union all select '17' union all select '18' union all select '19'
  union all select '20' union all select '21' union all select '22' union all select '23' 

select [cutime], [doc_cnt]=avg([doc_cnt]), [pos_cnt]=sum([pos_cnt])
into #ttimesdoc
from (
      select [y]=DATEPART(YEAR, [d].[cd]), [m]=DATEPART(MONTH, [d].[cd]), [d]=DATEPART(DAY, [d].[cd])
           , [cutime]=substring('00', 1, 2 - len(ltrim(str(DATEPART(HOUR, [d].[cd]))))) + ltrim(str(DATEPART(HOUR, [d].[cd])))
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
             , substring('00', 1, 2 - len(ltrim(str(DATEPART(HOUR, [d].[cd]))))) + ltrim(str(DATEPART(HOUR, [d].[cd])))
     ) [res]
group by [cutime]
  
  select [t].[time], [doc_cnt]=isnull([tt].[doc_cnt], 0), [pos_cnt]=isnull([tt].[pos_cnt], 0)
  from #ttimes [t]
  left outer join #ttimesdoc [tt] on [t].[time] = [tt].[cutime]

 -- select * from #ttimesdoc

drop table #ttimes
drop table #ttimesdoc