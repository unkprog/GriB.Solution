if exists(select [id] from [t_product] with(nolock) where [id]=@id)
begin
  update [t_product] 
  set [ud] = getdate(), [uu] = @u, [pid] = @pid, [type] = @type, [category] = @category, [name] = @name, [photo] = @photo
  where [id] = @id 
  select @id
end
else begin
  insert into [t_product]([cu], [uu], [pid], [type], [category], [name], [photo])
  select @u, @u, @pid, @type, @category, @name, @photo
  select cast(scope_identity() as int)
end

