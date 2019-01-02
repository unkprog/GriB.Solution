if exists(select [id] from [pos_user_sec] with(nolock) where [id] = @id)
  update [pos_user_sec] 
  set [pass] = @pass where [id] = @id
else
  insert into [pos_user_sec]([id], [pass])
  select @id, @pass