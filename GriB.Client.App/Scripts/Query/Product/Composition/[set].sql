if exists(select [id] from [t_product_composition] with(nolock) where [id]=@id and [index] = @index)
begin
  update [t_product_composition] 
  set [proudct] = @product, [quantity] = @quantity 
  where [id] = @id and [index] = @index
end
else begin
  insert into [t_product_composition]([id], [index], [proudct], [quantity])
  select @id, @index, @product, @quantity
end

select @id

