if exists(select [id] from [t_client] with(nolock) where [id] = @id)
begin
  update [t_client] 
  set [uu] = @uu, [phone] = @phone
  where [id] = @id
  select @id
end else
begin
  insert into [t_client]([pid], [cu], [uu], [phone])
  select 0, @cu, @uu, @phone
  select cast(scope_identity() as int)
end