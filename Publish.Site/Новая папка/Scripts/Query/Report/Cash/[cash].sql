select [rep].[salepoint], [salepointname]=isnull([s].[name], '')
    ,  [rep].[sumDebBeg], [rep].[sumCreBeg], [rep].[sumyDeb], [rep].[sumCre]
from (select [p].[salepoint] 
           , [sumDebBeg] = sum(case when [p].[cd] <  @datefrom and [p].[doctype] in (10, 20) then [p].[sum] else 0 end)
           , [sumCreBeg] = sum(case when [p].[cd] <  @datefrom and [p].[doctype] in (30, 40) then [p].[sum] else 0 end)
           , [sumyDeb]   = sum(case when [p].[cd] >= @datefrom and [p].[doctype] in (10, 20) then [p].[sum] else 0 end)
           , [sumCre]    = sum(case when [p].[cd] >= @datefrom and [p].[doctype] in (30, 40) then [p].[sum] else 0 end)
      from [t_payment] [p] with(nolock)
      where [p].[d] = 0 and ([p].[option] & 1) = 1 and [p].[type] = 1 and (@salepoint = 0 or (@salepoint <> 0 and [p].[salepoint] = @salepoint))
        and (@dateto <= '18991230' or (@dateto > '18991230' and [p].[cd] <= @dateto))
      group by [p].[salepoint]
) [rep]
left outer join [t_org] [s]  with(nolock) on [s].[d]  = 0 and [rep].[salepoint] = [s].[id]