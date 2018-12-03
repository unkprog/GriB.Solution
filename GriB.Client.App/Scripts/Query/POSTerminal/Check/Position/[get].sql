select [p].[id], [p].[index], [p].[product], [product_name]=isnull([pr].[name], ''), [p].[quantity], [p].[price]
from [t_check_position] [p] with(nolock)
left outer join [t_product] [pr] with(nolock) on [p].[product] = [pr].[id]
where [p].[id] = @id