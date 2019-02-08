select [rep].[salepoint], [salepointname]=isnull([s].[name], ''), [rep].[product], [productname]=isnull([p].[name], ''), [rep].[quantity], [rep].[totalsum]
from (select [d].[salepoint], [p].[product], [quantity] = sum([p].[quantity]), [totalsum]=sum([p].[quantity] * [p].[price])
     from [t_check_position] [p] with(nolock)
     inner join [t_check] [d] with(nolock) on [p].[id] = [d].[id]
     where [d].[d] = 0 and ([d].[options] & 1) = 1 
      and (@datefrom <= '18991230' or (@datefrom > '18991230' and [d].[cd] >= @datefrom))
      and (@dateto <= '18991230' or (@dateto > '18991230' and [d].[cd] <= @dateto))
     group by  [d].[salepoint], [p].[product]
	) [rep]
left outer join [t_product] [p] with(nolock) on [p].[d] = 0 and [rep].[product] = [p].[id]
left outer join [t_org]     [s] with(nolock) on [s].[d] = 0 and [rep].[salepoint] = [s].[id]
order by [rep].[salepoint], [rep].[product]
