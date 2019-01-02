select [t].[id], [t].[d], [t].[cd], [t].[cu], [t].[ud], [t].[uu], [t].[salepoint]
     , [t].[options], [t].[client], [t].[number], [t].[change], [t].[discount], [t].[comment]
from [t_check] [t] with(nolock)
where [t].[id] = @id