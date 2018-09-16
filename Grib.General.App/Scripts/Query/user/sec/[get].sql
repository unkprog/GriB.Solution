select [id], [pass]
from [pos_user_sec] with(nolock) 
where [id] = @id
