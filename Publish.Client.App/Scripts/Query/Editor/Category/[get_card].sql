select [t].[id], [t].[pid], [t].[name], [t].[photo]
     , isnull([tt].[name],'')
from [t_category] [t] with(nolock)
left outer join [t_category] [tt] with(nolock) on [t].[pid] = [tt].[id]
where [t].[d] = 0 