select [t].[id], [t].[isaccess], [t].[openonlogin], [t].[defaultsalepoint]
from [t_employee] [t] with(nolock)
where [t].[id] = @id