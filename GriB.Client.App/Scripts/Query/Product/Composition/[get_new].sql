select [id] = 0, [index] = 0, [product] = [t].[id], [quantity] = cast(0 as float)
     , [name] = isnull([t].[name], N''), [price] = isnull([sp].[price], 0)
from [t_product] [t] with(nolock) 
left outer join (select [id] = [p].[id], [date] = [p].[date], [price] = [p].[price]
                 from [t_product_saleprice] [p] with(nolock)
                 where [p].[date] = (select top 1 [date] from [t_product_saleprice] with(nolock) where [id] = [p].[id] and [date] <= getdate())
				) [sp] on [sp].[id] = [t].[id]
where [t].[id] = @id 