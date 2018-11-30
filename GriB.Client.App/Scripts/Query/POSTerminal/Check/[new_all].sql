select [t].[id], [t].[d], [t].[cd], [t].[cu], [t].[ud], [t].[uu]
     , [t].[options], [t].[client], [t].[number], [t].[change], [t].[discount], [t].[comment]
from [t_check] [t] with(nolock)
where [t].[cu] = @u and [t].[change] = @change and [t].[options] = 0