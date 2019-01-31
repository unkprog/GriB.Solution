﻿select [t].[id], [t].[cd], [t].[check], [t].[type], [t].[sum], [t].[option]
     , [comment]=isnull([tc].[comment], N'')
	 , [t].[salepoint], [salepointname] = isnull([sp].[name], '')
	 , [t].[client], [clientfname]=isnull([cp].[fname], ''), [clientmname]=isnull([cp].[mname],''), [clientlname]=isnull([cp].[lname], '') 
	 , [t].[cu], [t].[doctype]
from [t_payment] [t] with(nolock)
left outer join [t_payment_comment] [tc] with(nolock) on [t].[id] = [tc].[id]
left outer join [t_org]             [sp] with(nolock) on [t].[salepoint] = [sp].[id]
left outer join [t_client_person]   [cp] with(nolock) on [t].[client]    = [cp].[id]
where [t].[d] = 0 and (@id = 0 or (@id <> 0 and [t].[id] = @id))
  and (@doctype = 0 or (@doctype <> 0 and [t].[doctype] = @doctype))
  and (@salepoint = 0 or (@salepoint <> 0 and [t].[salepoint] = @salepoint))
  and (@employee = 0 or (@employee <> 0 and [t].[cu] = @employee))
  and (@option = 0 or (@option <> 0 and ([t].[option] & @option) = @option))
  and (@client = 0 or (@client <> 0 and [t].[client] = @client))
  and (@datefrom <= '18991230' or (@datefrom > '18991230' and [t].[cd] >= @datefrom))
  and (@dateto <= '18991230' or (@dateto > '18991230' and [t].[cd] <= @dateto))