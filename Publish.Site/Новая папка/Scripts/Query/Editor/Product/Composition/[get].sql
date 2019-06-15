select [c].[id], [c].[index], [c].[product], [productname]= isnull([t].[name], N'')
     , [c].[unit], [unitcode] = isnull([tu].[code], N'')
     , [c].[netto], [c].[percentcold], [c].[brutto], [c].[percentheat], [c].[exitproduct], [c].[description]
from [t_product_composition] [c] with(nolock)
left outer join [t_product] [t] with(nolock) on [t].[id] = [c].[product]
left outer join [t_unit] [tu] with(nolock) on [c].[unit] = [tu].[id]
left outer join (select [id] = [p].[id], [date] = [p].[date], [price] = [p].[price]
                 from [t_product_saleprice] [p] with(nolock)
                 where [p].[id] in (select [product] from [t_product_composition] with(nolock) where [id] = @id)
				   and [p].[date] = (select top 1 [date] from [t_product_saleprice] with(nolock) where [id] = [p].[id] and [date] <= getdate())
				) [sp] on [sp].[id] = [c].[product]
where [c].[id] = @id 
order by [c].[id], [c].[index]