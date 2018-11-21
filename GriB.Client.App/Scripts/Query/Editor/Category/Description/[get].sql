select [t].[id], [t].[description]
from [t_category_description] [t] with(nolock)
where [t].[id] = @id
  