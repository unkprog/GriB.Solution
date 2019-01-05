﻿select [t].[id], [t].[doctype], [t].[option], [t].[date], [t].[salepoint], [t].[salepointto], [t].[contractor], [t].[typecost]
from [t_document] [t] with(nolock)
where [t].[d] = 0 and (@id = 0 or (@id <> 0 and [t].[id] = @id))
  and (@doctype = 0 or (@doctype <> 0 and [t].[doctype] = @doctype))
  and (@salepoint = 0 or (@salepoint <> 0 and [t].[salepoint] = @salepoint))
  and (@datefrom = '18991230' or (@datefrom > '18991230' and [t].[date] >= @datefrom))
  and (@dateto = '18991230' or (@dateto > '18991230' and [t].[date] <= @dateto))