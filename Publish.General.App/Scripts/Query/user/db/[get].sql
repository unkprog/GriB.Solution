select [id], [db]
from [pos_userdb] with(nolock) 
where [id] = @id
