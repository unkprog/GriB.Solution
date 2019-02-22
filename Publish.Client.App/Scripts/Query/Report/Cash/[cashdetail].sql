select [d].[id], [d].[cd], [d].[cu]
     , [d].[salepoint], [salepointname]=isnull([s].[name], '')
     , [d].[doctype], [d].[sum]
from [t_payment] [d] with(nolock)
left outer join [t_org]           [s]  with(nolock) on [s].[d]      = 0 and [d].[salepoint] = [s].[id]
where [d].[d] = 0 and ([d].[option] & 1) = 1 and [d].[type] = 1
      and (@datefrom <= '18991230' or (@datefrom > '18991230' and [d].[cd] >= @datefrom))
      and (@dateto <= '18991230' or (@dateto > '18991230' and [d].[cd] <= @dateto))
      and (@salepoint = 0 or (@salepoint <> 0 and [d].[salepoint] = @salepoint))
order by [d].[cd]