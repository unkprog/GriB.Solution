 select [rep].[id], [rep].[cd], [rep].[cu], [rep].[doctype]
      , [rep].[salepoint], [salepointname]=isnull([s].[name], '')
	  , [rep].[product], [productname]=isnull([pr].[name], '')
	  , [rep].[quantity], [rep].[totalsum]
 from (
      select [d].[id], [d].[cd], [d].[cu], [doctype] = 0, [d].[salepoint], [p].[product], [p].[quantity], [totalsum] = (1 - [d].[discount]/100.0) * [p].[quantity] * [p].[price] 
      from [t_check_position] [p] with(nolock)
      inner join [t_check] [d] with(nolock) on [p].[id] = [d].[id]
      where [d].[d] = 0 and ([d].[options] & 1) = 1 
	    and (@datefrom <= '18991230' or (@datefrom > '18991230' and [d].[cd] >= @datefrom))
        and (@dateto <= '18991230' or (@dateto > '18991230' and [d].[cd] <= @dateto))
        and (@salepoint = 0 or (@salepoint <> 0 and [d].[salepoint] = @salepoint))
        and (@product = 0 or (@product <> 0 and [p].[product] = @product))
     union all	
      select [d].[id], [d].[cd], [d].[cu], [d].[doctype], [d].[salepoint], [p].[product], [p].[quantity], [totalsum] = [p].[quantity] * [p].[price] 
      from [t_document_position] [p] with(nolock)
      inner join [t_document] [d] with(nolock) on [p].[id] = [d].[id]
      where [d].[d] = 0 and ([d].[options] & 1) = 1 
	    and (@datefrom <= '18991230' or (@datefrom > '18991230' and [d].[cd] >= @datefrom))
        and (@dateto <= '18991230' or (@dateto > '18991230' and [d].[cd] <= @dateto))
        and (@salepoint = 0 or (@salepoint <> 0 and [d].[salepoint] = @salepoint))
        and (@product = 0 or (@product <> 0 and [p].[product] = @product))
      union all
      select [d].[id], [d].[cd], [d].[cu], [doctype] = 51, [d].[salepointto], [p].[product], [p].[quantity], [totalsum] = [p].[quantity] * [p].[price] 
      from [t_document_position] [p] with(nolock)
      inner join [t_document] [d] with(nolock) on [p].[id] = [d].[id]
      where [d].[d] = 0 and ([d].[options] & 1) = 1 and [d].[doctype] in (50)
	    and (@datefrom <= '18991230' or (@datefrom > '18991230' and [d].[cd] >= @datefrom))
        and (@dateto <= '18991230' or (@dateto > '18991230' and [d].[cd] <= @dateto))
        and (@salepoint = 0 or (@salepoint <> 0 and [d].[salepoint] = @salepoint))
        and (@product = 0 or (@product <> 0 and [p].[product] = @product))
      ) [rep]
left outer join [t_product] [pr] with(nolock) on [pr].[d] = 0 and [rep].[product]   = [pr].[id]
left outer join [t_org]     [s]  with(nolock) on [s].[d]  = 0 and [rep].[salepoint] = [s].[id]
order by [rep].[cd] desc, [rep].[id]