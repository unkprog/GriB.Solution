if exists(select [id] from [t_costincome] with(nolock) where [id]=@id)
begin
  update [t_costincome] 
  set [ud] = getdate(), [uu] = @u, [name] = @name, [type] = @type
  where [id] = @id 
  select @id
end
else begin
  insert into [t_costincome]([cu], [uu], [name], [type])
  select @u, @u, @name, @type
  select cast(scope_identity() as int)
end

