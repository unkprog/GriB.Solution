if exists(select [id] from [t_discount] with(nolock) where [id]=@id)
begin
  update [t_discount] set [ud] = getdate(), [uu] = @u, [name] = @name, [value] = @value
  where [id] = @id 
  select @id
end
else begin
  insert into [t_discount]([cu], [uu], [name], [value])
  select @u, @u, @name, @value
  select cast(scope_identity() as int)
end

