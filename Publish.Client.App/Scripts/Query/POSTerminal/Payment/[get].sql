select [t].[id], [t].[check], [t].[type], [t].[sum], [t].[option], [t].[client], [t].[comment]
from [t_payment] [t] with(nolock)
where [d] = 0 and (@id = 0 or (@id <> 0 and [id] = @id))
  