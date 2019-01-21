select [t].[id], [t].[name]
from [t_contractor] [t] with(nolock)
where [d] = 0 and (@id = 0 or (@id <> 0 and [id] = @id))
  and (@name = '' or (@name <> '' and  [t].[name] = @name))
  