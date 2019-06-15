if not exists(select [id] from [pos_sqldb] with(nolock) where [id] = @id)
begin
  insert into [pos_sqldb] ([server], [catalog], [user], [pass])
  values(@server, @catalog, @user, @pass)

   select cast(scope_identity() as int)
end else
begin
  update [pos_sqldb] set [server] = @server, [catalog] = @catalog, [user] = @user, [pass] = @pass
  where [id] = @id

  select @id
end