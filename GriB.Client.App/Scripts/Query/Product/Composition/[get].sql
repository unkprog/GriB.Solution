select [c].[id], [c].[index], [c].[product], [c].[quantity]
     , [name] = isnull([t].[name], N''), [price] = isnull([sp].[price], 0)
from [t_product_composition] [c] with(nolock)
left outer join [t_product] [t] with(nolock) on [t].[id] = [c].[product]
left outer join (select [id] = [p].[id], [date] = [p].[date], [price] = [p].[price]
                 from [t_product_saleprice] [p] with(nolock)
                 where [p].[id] in (select [id] from [t_product_composition] with(nolock) where [id] = @id)
				   and [p].[date] = (select top 1 [date] from [t_product_saleprice] with(nolock) where [id] = [p].[id] and [date] <= getdate())
				) [sp] on [sp].[id] = [c].[product]
where [c].[id] = @id 
order by [c].[id], [c].[index]