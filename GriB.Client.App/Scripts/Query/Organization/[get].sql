select [id], [d], [cd], [cu], [ud], [uu], [name], [type], [pid]
from [t_org] with(nolock)
where [d] = 0 and (@type = 0 or (@type <> 0 and [type] = @type))
  and (@name = '' or (@name <> '' and [t].[name] = @name))
