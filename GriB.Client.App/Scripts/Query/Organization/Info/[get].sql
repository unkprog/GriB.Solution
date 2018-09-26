select [t].[id], [t].[value]
     , [t].[typeinfo], [typeinfo.typeval]=isnull([tt].[typeval],0), [typeinfo.name]=[tt].[name]
from [t_orginfo] [t] with(nolock)
left join [t_orgtypeinfo] [ti]  with(nolock) on [t].[typeinfo] = [tt].[id]
where [t].[id] = @id