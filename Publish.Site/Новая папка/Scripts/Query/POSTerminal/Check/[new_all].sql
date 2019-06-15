select [t].[id], [t].[d], [t].[cd], [t].[cu], [t].[ud], [t].[uu], [t].[salepoint], [t].[options]
     , [t].[client], [clientfname]=isnull([cp].[fname], ''), [clientmname]=isnull([cp].[mname],''), [clientlname]=isnull([cp].[lname], '')
     , [t].[number], [t].[change], [t].[discount], [t].[comment]
	 , [t].[discountref], [discountrefname] = isnull([dr].[name], '')
from [t_check] [t] with(nolock)
left outer join [t_client_person] [cp] with(nolock) on [t].[client]      = [cp].[id]
left outer join [t_discount]      [dr] with(nolock) on [t].[discountref] = [dr].[id]
where [t].[d] = 0 and [t].[salepoint] = @salepoint and [t].[cu] = @u and [t].[change] = @change and [t].[options] = 0