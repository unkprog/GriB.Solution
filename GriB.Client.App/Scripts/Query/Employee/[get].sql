select [t].[id], [t].[isaccess], [t].[openonlogin]
from [t_employee] [t] with(nolock)
where [t].[id] = @id