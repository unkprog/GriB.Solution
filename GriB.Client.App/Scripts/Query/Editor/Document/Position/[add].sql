if exists(select [id] from [t_document_position] with(nolock) where [id]=@id and [product] = @product)
begin
  update [t_document_position] 
  set [quantity] = [quantity] + @quantity
  where [id]=@id and [product] = @product
end
else begin
  declare @newIndex int
  select @newIndex = isnull(max([index]), 0) from [t_check_position] where [id]=@id
  insert into [t_document_position]([id], [index], [product], [quantity], [price])
  select @id, @newIndex + 1, @product, @quantity, (select top 1 [t].[price] from [t_product_saleprice] [t] with(nolock) where [t].[id] = @product and [t].[date] = (select top 1 [date] from [t_product_saleprice] with(nolock) where [id] = @product and [date] <= getdate()))
end

select [p].[id], [p].[index], [p].[product], [product_name]=isnull([pr].[name], ''), [p].[quantity], [p].[price]
from [t_document_position] [p] with(nolock)
left outer join [t_product] [pr] with(nolock) on [p].[product] = [pr].[id]
where [p].[id] = @id and [p].[product] = @product