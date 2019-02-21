  create table #ttimes([order] [int] identity(1,1), [time] nvarchar(2), [timelab] nvarchar(5))

  insert into #ttimes([time], [timelab])
            select '00', '00-01' union all select '01', '01-02' union all select '02', '02-03' union all select '03', '03-04' 
  union all select '04', '04-05' union all select '05', '05-06' union all select '06', '06-07' union all select '07', '07-08'
  union all select '08', '08-09' union all select '09', '09-10' union all select '10', '10-11' union all select '11', '11-12'
  union all select '12', '12-13' union all select '13', '13-14' union all select '14', '14-15' union all select '15', '15-16'
  union all select '16', '16-17' union all select '17', '17-18' union all select '18', '18-19' union all select '19', '19-20'
  union all select '20', '20-21' union all select '21', '21-22' union all select '22', '22-23' union all select '23', '23-24' 

select [cutime], [doc_cnt]=sum([doc_cnt]), [pos_cnt]=sum([pos_cnt]), [pos_sum]=sum([pos_sum])
into #ttimesdoc
from (
      select [y]=DATEPART(YEAR, [d].[cd]), [m]=DATEPART(MONTH, [d].[cd]), [d]=DATEPART(DAY, [d].[cd])
           , [cutime]=substring('00', 1, 2 - len(ltrim(str(DATEPART(HOUR, [d].[cd]))))) + ltrim(str(DATEPART(HOUR, [d].[cd])))
	       , [doc_cnt]=cast(count([d].[id]) as float), [pos_cnt]=sum([p].[pos_cnt]), [pos_sum]=sum([p].[pos_sum])
	  from (
            select [d].[id], [pos_cnt]=cast(count([p].[id]) as float), [pos_sum]= sum((1.0 - ([d].[discount]/100.0)) *  [p].[quantity] * [p].[price])
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
  
  select [t].[timelab], [doc_cnt]=isnull([tt].[doc_cnt], 0), [pos_cnt]=isnull([tt].[pos_cnt], 0), [pos_sum]=isnull([tt].[pos_sum], 0)
  from #ttimes [t]
  left outer join #ttimesdoc [tt] on [t].[time] = [tt].[cutime]
  order by [t].[order]
 -- select * from #ttimesdoc

drop table #ttimes
drop table #ttimesdoc