select [t].[id], [t].[name], [t].[type]
from [t_costincome] [t] with(nolock)
where [d] = 0 and (@id = 0 or (@id <> 0 and [id] = @id))
  and (@name = 0 or (@name <> 0 and [name] = @name))
  and (@type = 0 or (@type <> 0 and [type] = @type))
  