select top 1 [id], [server], [catalog], [user], [pass]
from [pos_sqldb] with(nolock)
where not [id] in (select [id] from [pos_userdb] with(nolock))
order by [id]