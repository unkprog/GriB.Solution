select [id], [sex], [birth], [fname], [mname], [lname], [email]
from [t_client_person] with(nolock)
where [id] = @id