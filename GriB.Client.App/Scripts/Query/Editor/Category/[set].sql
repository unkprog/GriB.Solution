if exists(select [id] from [t_category] with(nolock) where [id]=@id)
begin
  update [t_category] 
  set [ud] = getdate(), [uu] = @u, [pid] = @pid, [name] = @name, [photo] = @photo
  where [id] = @id 
  select @id
end
else begin
  insert into [t_category]([cu], [uu], [pid], [name], [photo])
  select @u, @u, @pid, @name, @photo
  select cast(scope_identity() as int)
end

