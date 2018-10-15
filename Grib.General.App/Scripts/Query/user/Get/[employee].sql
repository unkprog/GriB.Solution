select [u].[id], [u].[pid], [u].[phone]
     , [sex] = isnull([up].[sex], 0), [birth] = isnull([up].[birth],'18991230'), [fname]=isnull([up].[fname], ''), [mname]=isnull([up].[mname],''), [lname]=isnull([up].[lname], ''), [email]=isnull([up].[email],'')
     , [pass] = isnull([us].[pass], '')
from [pos_user] [u] with(nolock)
left outer join [pos_user_person] [up] with(nolock) on [u].[id] = [up].[id]
left outer join [pos_user_sec] [us] with(nolock) on [u].[id] = [us].[id]
where [u].[id] in (select [id] from [pos_userdb] with(nolock) where [db] = @db)