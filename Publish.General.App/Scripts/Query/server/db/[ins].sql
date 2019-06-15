  insert into [pos_sqldb] ([server], [catalog], [user], [pass])
  values(@server, @catalog, @user, @pass)

   select cast(scope_identity() as int)
