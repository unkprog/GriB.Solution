select [id], [cd], [cu], [ud], [uu], [regtype], [phone], [email]
from [pos_user] with(nolock)
where [id] = @id