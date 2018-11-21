select [t].[id], [t].[description]
from [t_product_description] [t] with(nolock)
where [t].[id] = @id
  