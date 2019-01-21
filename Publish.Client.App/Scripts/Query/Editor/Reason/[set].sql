if exists(select [id] from [t_reason] with(nolock) where [id]=@id)
begin
  update [t_reason] 
  set [ud] = getdate(), [uu] = @u, [name] = @name
  where [id] = @id 
  select @id
end
else begin
  insert into [t_reason]([cu], [uu], [name])
  select @u, @u, @name
  select cast(scope_identity() as int)
end

