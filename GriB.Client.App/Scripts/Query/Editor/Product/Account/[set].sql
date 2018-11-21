if exists(select [id] from [t_product_account] with(nolock) where [id]=@id)
begin
  update [t_product_account] 
  set [vendorcode] = @vendorcode, [barcode] = @barcode, [unit] = @unit, [quantity] = @quantity, [currency] = @currency
  where [id] = @id
end
else begin
  insert into [t_product_account]([id], [vendorcode], [barcode], [unit], [quantity], [currency])
  select @id, @vendorcode, @barcode, @unit, @quantity, @currency
end

select @id