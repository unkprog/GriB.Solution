update [t] set [ud] = getdate(), [uu] = @u, [options] = @options
from [t_change] [t]
where [t].[id] = @id
