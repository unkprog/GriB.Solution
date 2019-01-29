select [t].[id], [t].[comment]
from [t_payment_comment] [t] with(nolock)
where [t].[id] = @id
  