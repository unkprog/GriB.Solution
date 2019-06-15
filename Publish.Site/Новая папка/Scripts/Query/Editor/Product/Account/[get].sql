select [id] = [t].[id], [vendorcode] = [t].[vendorcode], [barcode] = [t].[barcode], [unit] = [t].[unit], [unitname]=isnull([u].[name], ''), [quantity] = [t].[quantity], [currency] = [t].[currency], [currencyname]=isnull([c].[name], '')
from [t_product_account] [t] with(nolock)
left outer join [t_unit] [u] with(nolock) on [t].[unit] = [u].[id]
left outer join [t_unit] [c] with(nolock) on [t].[currency] = [c].[id]
where [t].[id] = @id 
  and (@vendorcode = '' or (@vendorcode <> '' and [t].[vendorcode] = @vendorcode))
  and (@barcode = '' or (@barcode <> '' and [t].[barcode] = @barcode))