select [c].[id], [iscategory]=cast(1 as bit), [c].[name], [c].[photo], [price] = cast(0 as float)
from [t_category] [c]
where [c].[d] = 0 and [c].[pid] = @category and exists(select [cpa].[id] from [t_category_salepointaccess] [cpa] with(nolock) where [cpa].[id] = [c].[id] and [cpa].[salepoint] = @salepoint and [cpa].[isaccess] = 1)
union all
select [p].[id], [iscategory]=cast(0 as bit), [p].[name], [p].[photo], isnull((select top 1 [t].[price] from [t_product_saleprice] [t] with(nolock) where [t].[id] = [p].[id] and [t].[date] = (select top 1 [date] from [t_product_saleprice] with(nolock) where [id] = [p].[id] and [date] <= getdate())), 0)
from [t_product] [p]
where [p].[d] = 0 and [p].[category] <> 0 and [p].[category] = @category and [p].[putonsale] = 1
and exists(select [spa].[id] from [t_product_salepointaccess] [spa] with(nolock) where [spa].[id] = [p].[id] and [spa].[salepoint] = @salepoint and [spa].[isaccess] = 1)