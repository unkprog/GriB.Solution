select [id], [d], [cd], [cu], [ud], [uu], [salepoint], [options]
from [t_change] [t]
where [t].[d] = 0 and [t].[salepoint] = @salepoint and [options] = 0
