select [t].[id], [t].[name], [t].[number]
from [t_account] [t] with(nolock)
where [d] = 0 and (@id = 0 or (@id <> 0 and [id] = @id))
  and (@name = 0 or (@name <> 0 and [name] = @name))
  and (@number = '' or (@number <> '' and  [t].[number] = @number))
  