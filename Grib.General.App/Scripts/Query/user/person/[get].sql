select [id], [sex], [birth], [fname], [mname], [lname], [email]
from [pos_user_person] with(nolock)
where [id] = @id