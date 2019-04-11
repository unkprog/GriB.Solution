if exists(select [id] from [t_printserver] with(nolock) where [id]=@id)
begin
  update [t_printserver] 
  set [ud] = getdate(), [uu] = @u, [name] = @name, [pskey] = @pskey, [description] = @description
  where [id] = @id 
  select @id
end
else begin
  insert into [t_printserver]([cu], [uu], [name], [pskey], [description])
  select @u, @u, @name, @pskey, @description
  select cast(scope_identity() as int)
end

