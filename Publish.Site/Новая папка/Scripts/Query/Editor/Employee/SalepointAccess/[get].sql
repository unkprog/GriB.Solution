select [id] = [t].[id], [name] = [t].[name]
     , [company_id] = isnull([t1].[pid], 0), [city] = isnull([t1].[name], '')
	 , [address] = isnull([ti].[address], ''), [schedule] = isnull([ti].[schedule], '')
	 , [isaccess] = isnull([sa].[isaccess], '')
from [t_org] [t] with(nolock)
left join [t_org] [t1] with(nolock) on [t].[pid] = [t1].[id]
left join [t_org_info1] [ti] with(nolock) on [ti].[id] = [t].[id]
left join (select [salepoint], [isaccess] from [t_employee_salepointaccess] with(nolock) where [id] = @id) [sa] on [t].[id] = [sa].[salepoint]
where [t].[d] = 0 and [t].[type] = @type