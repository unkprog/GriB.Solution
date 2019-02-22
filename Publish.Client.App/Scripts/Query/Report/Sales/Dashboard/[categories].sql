with [treecategory] ([id], [categoryname]) as 
(
  select [id], cast([name] as nvarchar(max)) from [t_category] with(nolock) where [d] = 0 and [pid] = 0 
  union all
  select [c].id, [tc].[categoryname] + N'->' + [c].[name]
  from [t_category] [c]
  inner join [treecategory] [tc] on [tc].id = [c].[pid]
  where [c].[d] = 0 
) 
select [id], [categoryname]
into #categories
from [treecategory] 


select [rep].[category], [categoryname]=isnull([cat].[categoryname], ''), [rep].[quantity], [rep].[totalsum]
from (
      select [p].[category], [quantity]=sum([s].[quantity]), [totalsum]=sum([s].[totalsum])
      from (
	        select [p].[product],  [quantity] = sum([p].[quantity]), [totalsum]=sum((1.0 - ([d].[discount]/100.0)) * [p].[quantity] * [p].[price])
            from [t_check_position] [p] with(nolock)
            inner join [t_check] [d] with(nolock) on [p].[id] = [d].[id]
			where [d].[d] = 0 and ([d].[options] & 1) = 1 
              and (@datefrom <= '18991230' or (@datefrom > '18991230' and [d].[cd] >= @datefrom))
              and (@dateto <= '18991230' or (@dateto > '18991230' and [d].[cd] <= @dateto))
              and (@salepoint = 0 or (@salepoint <> 0 and [d].[salepoint] = @salepoint))
              and (@product = 0 or (@product <> 0 and [p].[product] = @product))
            group by [p].[product]
		   ) [s]
      left outer join [t_product] [p] with(nolock) on [s].[product] = [p].[id]
      group by [p].[category]
) [rep]
inner join #categories [cat] on [rep].[category] = [cat].[id]

drop table #categories