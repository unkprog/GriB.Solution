select [u].[id], [u].[d], [u].[cd], [u].[cu], [u].[ud], [u].[uu], [u].[pid], [u].[phone]
     , [sex] = isnull([up].[sex], 0), [birth] = isnull([up].[birth],'18991230'), [fname]=isnull([up].[fname], ''), [mname]=isnull([up].[mname],''), [lname]=isnull([up].[lname], ''), [email]=isnull([up].[email],'')
     , [pass] = isnull([us].[pass], '')
	 , [db_id] = isnull([db].[id], 0), [db_catalog] = isnull([db].[catalog], '')
	 , [srv_id] = isnull([srv].[id], 0), [srv_address] = isnull([srv].[address], '')
from [pos_user] [u] with(nolock)
left outer join [pos_user_person] [up] with(nolock) on [u].[id] = [up].[id]
left outer join [pos_user_sec] [us] with(nolock) on [u].[id] = [us].[id]
left outer join [pos_userdb] [udb] with(nolock) on [u].[id] = [udb].[id]
left outer join [pos_sqldb] [db] with(nolock) on [udb].[db] = [db].[id]
left outer join [pos_sqlsrv] [srv] with(nolock) on [db].[server] = [srv].[id]
where (@id = 0 or (@id <> 0 and [u].[id] = @id))