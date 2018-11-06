select [id] = [t].[id], [vendorcode] = [t].[vendorcode], [barcode] = [t].[barcode], [unit] = [t].[unit], [quantity] = [t].[quantity], [currency] = [t].[currency]
from [t_product_account] [t] with(nolock)
where [t].[id] = @id 
  and (@vendorcode = '' or (@vendorcode <> '' and [t].[vendorcode] = @vendorcode))
  and (@barcode = '' or (@barcode <> '' and [t].[barcode] = @barcode))