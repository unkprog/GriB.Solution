if exists(select [id] from [t_document_position] with(nolock) where [id]=@id and [index] = @index)
begin
  update [t_document_position] 
  set [product] = @product, [quantity] = @quantity, [price] = @price
  where [id]=@id and [product] = @product
end
else begin
  insert into [t_document_position]([id], [index], [product], [quantity], [price])
  select @id, @index, @product, @quantity, @price
end

select [p].[id], [p].[index], [p].[product], [product_name]=isnull([pr].[name], ''), [p].[quantity], [p].[price]
from [t_document_position] [p] with(nolock)
left outer join [t_product] [pr] with(nolock) on [p].[product] = [pr].[id]
where [p].[id] = @id and [p].[index] = @index