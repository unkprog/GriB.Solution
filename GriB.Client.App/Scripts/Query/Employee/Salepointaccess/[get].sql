select [t].[id], [t].[salepoint], [t].[isaccess], [t].[isdefault]
from [t_employee_salepointaccess] [t] with(nolock)
where [t].[id] = @id