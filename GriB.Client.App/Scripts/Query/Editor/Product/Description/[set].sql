if exists(select [id] from [t_product_description] with(nolock) where [id]=@id)
begin
  update [t_product_description] 
  set [description] = @description
  where [id] = @id 
end
else begin
  insert into [t_product_description]([id], [description])
  select @id, @description
end

select @id

