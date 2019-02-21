select [d].[id], [d].[cd], [d].[cu]
     , [d].[salepoint], [salepointname]=isnull([s].[name], '')
	 , [p].[product], [productname]=isnull([pr].[name], '')
	 , [d].[client], [clientfname]=isnull([cp].[fname], ''), [clientmname]=isnull([cp].[mname],''), [clientlname]=isnull([cp].[lname], '')
     , [p].[quantity], [d].[discount], [totalsum] = (1 - [d].[discount]/100.0) * [p].[quantity] * [p].[price]
from [t_check_position] [p] with(nolock)
inner join [t_check] [d] with(nolock) on [p].[id] = [d].[id]
left outer join [t_product]       [pr] with(nolock) on [pr].[d]     = 0 and [p].[product]   = [pr].[id]
left outer join [t_org]           [s]  with(nolock) on [s].[d]      = 0 and [d].[salepoint] = [s].[id]
left outer join [t_client_person] [cp] with(nolock) on [d].[client] = [cp].[id]
where [d].[d] = 0 and ([d].[options] & 1) = 1
      and (@datefrom <= '18991230' or (@datefrom > '18991230' and [d].[cd] >= @datefrom))
      and (@dateto <= '18991230' or (@dateto > '18991230' and [d].[cd] <= @dateto))
      and (@salepoint = 0 or (@salepoint <> 0 and [d].[salepoint] = @salepoint))
      and (@product = 0 or (@product <> 0 and [p].[product] = @product))
      and (@employee = 0 or (@employee <> 0 and [d].[cu] = @employee))
      and (@client = 0 or (@client <> 0 and [d].[client] = @client))
	  and (@dayweek = 0 or (@dayweek <> 0 and DATEPART(DW, [d].[cd]) = @dayweek))
	  and (@time = '' or (@time <> '' and substring('00', 1, 2 - len(ltrim(str(DATEPART(HOUR, [d].[cd]))))) + ltrim(str(DATEPART(HOUR, [d].[cd]))) = @time))
order by [d].[cd]