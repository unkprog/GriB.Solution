select [t].[id], [t].[name], [t].[labelsize], [t].[logo], [t].[header], [t].[footer]
     , [t].[printserver], [printserver_pskey] = isnull([ps].[pskey], ''), [printserver_description] = isnull([ps].[description], '')
	 , [t].[salepoint], [salepointname] = isnull([sp].[name], '')
from [t_printer] [t] with(nolock)
left outer join [t_printserver] [ps] with(nolock) on [ps].[d] = 0 and [t].[printserver] = [ps].[id]
left outer join [t_org]         [sp] with(nolock) on [sp].[d] = 0 and [t].[salepoint]   = [sp].[id]
where [t].[d] = 0 and (@id = 0 or (@id <> 0 and [t].[id] = @id))
  and (@name = '' or (@name <> '' and  [t].[name] = @name))
  