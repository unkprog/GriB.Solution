select [t].[id], [t].[phone], [t].[email], [t].[site]
from [t_org_info] [t] with(nolock)
where [t].[id] = @id