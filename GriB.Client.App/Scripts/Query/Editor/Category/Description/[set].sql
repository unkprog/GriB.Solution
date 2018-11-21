if exists(select [id] from [t_category_description] with(nolock) where [id]=@id)
begin
  update [t_category_description] 
  set [description] = @description
  where [id] = @id 
end
else begin
  insert into [t_category_description]([id], [description])
  select @id, @description
end

select @id

