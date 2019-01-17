select [t].[id], [t].[doctype], [t].[option], [t].[date], [t].[salepoint], [t].[salepointto], [t].[contractor], [t].[typecost]
     , [salepointname] = isnull([sp].[name], ''), [contractorname] = isnull([c].[name], ''), [sum] = isnull((select sum([quantity] * [price]) from [t_document_position] with(nolock) where [id] = [t].[id]), 0)
from [t_document] [t] with(nolock)
left outer join [t_org]        [sp] with(nolock) on [t].[salepoint]  = [sp].[id]
left outer join [t_contractor] [c]  with(nolock) on [t].[contractor] = [c].[id]
where [t].[d] = 0 and (@id = 0 or (@id <> 0 and [t].[id] = @id))
  and (@doctype = 0 or (@doctype <> 0 and [t].[doctype] = @doctype))
  and (@salepoint = 0 or (@salepoint <> 0 and [t].[salepoint] = @salepoint))
  and (@datefrom <= '18991230' or (@datefrom > '18991230' and [t].[date] >= @datefrom))
  and (@dateto <= '18991230' or (@dateto > '18991230' and [t].[date] <= @dateto))