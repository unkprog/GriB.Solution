select [db].[id], [db].[catalog], [db].[user], [db].[pass]
     , [db].[server], [address]=isnull([srv].[address], '')
from [pos_sqldb] [db] with(nolock)
inner join [pos_sqlsrv] [srv] with(nolock) on [db].[server] = [srv].[id]
where (@id = 0 or (@id <> 0 and [db].[id] = @id))
