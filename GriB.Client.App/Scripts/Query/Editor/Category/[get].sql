select [t].[id], [t].[pid], [t].[name], [t].[photo]
from [t_category] [t] with(nolock)
where [d] = 0 and (@id = 0 or (@id <> 0 and [id] = @id))
  and (@name = '' or (@name <> '' and  [t].[name] = @name))
  