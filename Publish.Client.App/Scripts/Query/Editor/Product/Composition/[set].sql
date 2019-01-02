if exists(select [id] from [t_product_composition] with(nolock) where [id]=@id and [index] = @index)
begin
  update [t_product_composition] 
  set [product] = @product, [quantity] = @quantity 
  where [id] = @id and [index] = @index
end
else begin
  insert into [t_product_composition]([id], [index], [product], [quantity])
  select @id, @index, @product, @quantity
end

select @id

