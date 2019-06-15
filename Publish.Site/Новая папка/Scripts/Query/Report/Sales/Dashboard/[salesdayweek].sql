  create table #ttimes([order] [int] identity(1,1), [cudweek] int)

  insert into #ttimes([cudweek])
  select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 1 
  

  select [cudweek]=DATEPART(DW, [p].[cd])
	   , [doc_cnt]=cast(count([p].[id]) as float), [pos_cnt]=sum([p].[pos_cnt]), [pos_sum]=sum([p].[pos_sum])
  into #ttimesdoc
  from (
        select [d].[id], [d].[cd], [pos_cnt]=cast(count([p].[id]) as float), [pos_sum]= sum((1.0 - ([d].[discount]/100.0)) *  [p].[quantity] * [p].[price])
        from [t_check_position] [p] with(nolock)
        inner join [t_check] [d] with(nolock) on [p].[id] = [d].[id]
        where [d].[d] = 0 and ([d].[options] & 1) = 1
         and (@datefrom <= '18991230' or (@datefrom > '18991230' and [d].[cd] >= @datefrom))
         and (@dateto <= '18991230' or (@dateto > '18991230' and [d].[cd] <= @dateto))
         and (@salepoint = 0 or (@salepoint <> 0 and [d].[salepoint] = @salepoint))
         and (@product = 0 or (@product <> 0 and [p].[product] = @product))
        group by [d].[id], [d].[cd]
       ) [p]
  group by DATEPART(DW, [p].[cd])

  
  select [t].[cudweek], [doc_cnt]=isnull([tt].[doc_cnt], 0), [pos_cnt]=isnull([tt].[pos_cnt], 0), [pos_sum]=isnull([tt].[pos_sum], 0)
  from #ttimes [t]
  left outer join #ttimesdoc [tt] on [t].[cudweek] = [tt].[cudweek]
  order by [t].[order]

 -- select * from #ttimesdoc

drop table #ttimes
drop table #ttimesdoc