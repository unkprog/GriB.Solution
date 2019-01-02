if exists(select [id] from [pos_user] with(nolock) where [id] = @id)
begin
  update [pos_user] 
  set [uu] = @uu, [phone] = @phone
  where [id] = @id
  select @id
end else
begin
  insert into [pos_user]([pid], [cu], [uu], [phone])
  select (select top 1 [u].[id]
          from [pos_user] [u] with(nolock)
          inner join [pos_userdb] [udb] on [u].[id] = [udb].[id]
          where [u].[pid] = 0 and [udb].[db] = @db), @cu, @uu, @phone
  select cast(scope_identity() as int)
end