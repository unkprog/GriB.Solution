select [id] = [t].[id], [date] = [t].[date], [price] = [t].[price]
from [t_product_saleprice] [t] with(nolock)
where [t].[id] = @id and [t].[date] = (select top 1 [date] from [t_product_saleprice] with(nolock) where [id] = @id and [date] <= getdate())
order by [t].[id], [t].[date] desc