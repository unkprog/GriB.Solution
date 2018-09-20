select [srv].[id], [srv].[address], [srv].[user], [srv].[pass], [count_db]=isnull([db].[count_db],0)
from [dbo].[pos_sqlsrv] [srv] with(nolock)
left outer join (select [server], [count_db]=count([server]) 
                 from [dbo].[pos_sqldb] with(nolock) 
				 group by [server]) [db] on [srv].[id] = [db].[server]
order by isnull([db].[count_db],0) desc