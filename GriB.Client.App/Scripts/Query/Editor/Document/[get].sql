select [t].[id], [t].[doctype], [t].[options], [t].[date], [t].[salepoint], [t].[salepointto], [t].[contractor], [t].[typecost], [t].[reason]
     , [salepointname] = isnull([sp].[name], ''), [salepointtoname] = isnull([spto].[name], ''), [contractorname] = isnull([c].[name], ''), [reasonname] = isnull([r].[name], ''), [sum] = isnull((select sum([quantity] * [price]) from [t_document_position] with(nolock) where [id] = [t].[id]), 0)
from [t_document] [t] with(nolock)
left outer join [t_org]        [sp]   with(nolock) on [t].[salepoint]   = [sp].[id]
left outer join [t_org]        [spto] with(nolock) on [t].[salepointto] = [spto].[id]
left outer join [t_contractor] [c]    with(nolock) on [t].[contractor]  = [c].[id]
left outer join [t_reason]     [r]    with(nolock) on [t].[reason]      = [r].[id]
where [t].[d] = 0 and (@id = 0 or (@id <> 0 and [t].[id] = @id))
  and (@doctype = 0 or (@doctype <> 0 and [t].[doctype] = @doctype))
  and (@salepoint = 0 or (@salepoint <> 0 and [t].[salepoint] = @salepoint))
  and (@salepointto = 0 or (@salepointto <> 0 and [t].[salepointto] = @salepointto))
  and (@contractor = 0 or (@contractor <> 0 and [t].[contractor] = @contractor))
  and (@reason = 0 or (@reason <> 0 and [t].[reason] = @reason))
  and (@datefrom <= '18991230' or (@datefrom > '18991230' and [t].[date] >= @datefrom))
  and (@dateto <= '18991230' or (@dateto > '18991230' and [t].[date] <= @dateto))