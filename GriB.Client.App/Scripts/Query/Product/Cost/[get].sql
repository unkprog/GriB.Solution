select [id] = [t].[id], [date] = [t].[date], [price] = [t].[price]
from [t_product_costprice] [t] with(nolock)
where [t].[id] = @id and [t].[date] in (select top 1 [date] from [t_product_costprice] with(nolock) where [date] <= cast(cast(getdate() as date) as datetime))
order by [t].[id], [t].[date] desc