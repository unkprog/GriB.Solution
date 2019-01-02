select [c].[id], [iscategory]=cast(1 as bit), [c].[name], [c].[photo]
from [t_category] [c]
where [c].[d] = 0 and [c].[pid] = @category
union all
select [p].[id], [iscategory]=cast(0 as bit), [p].[name], [p].[photo]
from [t_product] [p]
where [p].[d] = 0 and [p].[category] <> 0 and [p].[category] = @category and [p].[putonsale] = 1
and exists(select [spa].[id] from [t_product_salepointaccess] [spa] with(nolock) where [spa].[id] = [p].[id] and [spa].[salepoint] = @salepoint and [spa].[isaccess] = 1)

  