if exists(select [id] from [t_account] with(nolock) where [id]=@id)
begin
  update [t_account] 
  set [ud] = getdate(), [uu] = @u, [name] = @name, [number] = @number
  where [id] = @id 
  select @id
end
else begin
  insert into [t_account]([cu], [uu], [name], [number])
  select @u, @u, @name, @number
  select cast(scope_identity() as int)
end

