select [t].[id], [t].[address], [t].[schedule]
from [t_org_info1] [t] with(nolock)
where [t].[id] = @id