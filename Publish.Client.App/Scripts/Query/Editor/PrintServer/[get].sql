select [t].[id], [t].[name], [t].[pskey], [t].[description]
from [t_printserver] [t] with(nolock)
where [d] = 0 and (@id = 0 or (@id <> 0 and [id] = @id))
  and (@name = '' or (@name <> '' and  [t].[name] = @name))
  and (@pskey = '' or (@pskey <> '' and  [t].[pskey] = @pskey))

  
  