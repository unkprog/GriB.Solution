select [t].[product], [productname]=isnull([p].[name], ''), [t].[quantity], [t].[totalsum] 
from (select [dp].[product],  [quantity] = sum([dp].[quantity]), [totalsum]=sum((1.0 - ([d].[discount]/100.0)) * [dp].[quantity] * [dp].[price])
      from [t_check] [d] with(nolock)
      inner join (select [id], [d], [cd], [cu], [ud], [uu], [salepoint], [options] 
                  from [t_change] [t] with(nolock)
                  where [t].[id] = @change) [c] on [d].[cd] >= [c].[cd] and (([c].[cd] = [c].[ud] and [d].[cd] < getdate()) or ([d].[cd] <= [c].[ud])) and [d].[salepoint] = [c].[salepoint]
      inner join [t_check_position] [dp] with(nolock) on [dp].[id] = [d].[id]
      group by [dp].[product]) [t]
inner join [t_product]        [p]  with(nolock) on [t].[product] = [p].[id]