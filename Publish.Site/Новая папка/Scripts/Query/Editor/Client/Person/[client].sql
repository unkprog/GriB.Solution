select [u].[id], [u].[d], [u].[cd], [u].[cu], [u].[ud], [u].[uu], [u].[pid], [u].[phone]
     , [sex] = isnull([up].[sex], 0), [birth] = isnull([up].[birth],'18991230'), [fname]=isnull([up].[fname], ''), [mname]=isnull([up].[mname],''), [lname]=isnull([up].[lname], ''), [email]=isnull([up].[email],'')
from [t_client] [u] with(nolock)
left outer join [t_client_person] [up] with(nolock) on [u].[id] = [up].[id]
where [u].[id] = @id 