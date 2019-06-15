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


select [t].[id], [t].[pid], [t].[type], [t].[category], [t].[name], [t].[photo], [t].[putonsale], [categoryname]=isnull([cat].[categoryname],'')
     , [unit]=isnull([pa].[unit], 0), [unitcode]=isnull([u].[code],'')
from [t_product] [t] with(nolock)
left outer join #categories [cat] on [t].[category] = [cat].[id]
left outer join [t_product_account] [pa] with(nolock)  on [t].[id] = [pa].[id]
left outer join [t_unit] [u] with(nolock) on [pa].[unit] = [u].[id]
where [t].[d] = 0
  and (@id = 0 or (@id <> 0 and [t].[id] = @id))
  and (@name = '' or (@name <> '' and  [t].[name] = @name))
order by isnull([cat].[id], 100000000)
drop table #categories