﻿select [t].[id], [t].[name], [t].[value]
from [t_discount] [t] with(nolock)
where [d] = 0 and (@id = 0 or (@id <> 0 and [id] = @id))
  and (@name = '' or (@name <> '' and  [t].[name] = @name))