select [t].[id], [t].[d], [t].[cd], [t].[cu], [t].[ud], [t].[uu]
     , [t].[options], [t].[number], [t].[change], [t].[discount], [t].[comment]
     , [t].[salepoint], [salepointname] = isnull([sp].[name], '')
	 , [t].[client], [clientfname]=isnull([cp].[fname], ''), [clientmname]=isnull([cp].[mname],''), [clientlname]=isnull([cp].[lname], '') 
	 , [sum] = (1.0 - ([t].[discount]/100.0)) * isnull((select sum([quantity] * [price]) from [t_check_position] with(nolock) where [id] = [t].[id]), 0)
	 , [t].[discountref], [discountrefname] = isnull([dr].[name], '')
from [t_check] [t] with(nolock)
left outer join [t_org]           [sp] with(nolock) on [t].[salepoint] = [sp].[id]
left outer join [t_client_person] [cp] with(nolock) on [t].[client]    = [cp].[id]
left outer join [t_discount]      [dr] with(nolock) on [t].[discountref] = [dr].[id]
where [t].[d] = 0 and (@id = 0 or (@id <> 0 and [t].[id] = @id))
  and (@salepoint = 0 or (@salepoint <> 0 and [t].[salepoint] = @salepoint))
  and (@datefrom <= '18991230' or (@datefrom > '18991230' and [t].[cd] >= @datefrom))
  and (@dateto <= '18991230' or (@dateto > '18991230' and [t].[cd] <= @dateto))