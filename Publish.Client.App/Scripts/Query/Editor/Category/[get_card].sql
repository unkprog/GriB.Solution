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


select [t].[id], [t].[pid], [t].[name], [t].[photo]
     , isnull([cat].[categoryname],'')
from [t_category] [t] with(nolock)
left outer join #categories [cat] on [t].[pid] = [cat].[id]
where [t].[d] = 0

drop table #categories