insert into [pos_userdb] ([id], [db])
values(@id, @db)

if exists(select [id] from [pos_userdb] with(nolock) where [id] = @id)
  update [pos_userdb] 
  set [db] = @db where [id] = @id
else
  insert into [pos_userdb]([id], [db])
  select @id, @db