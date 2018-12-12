if exists(select [id] from [t_client_person] with(nolock) where [id] = @id)
  update [t_client_person] 
  set [sex] = @sex, [birth] = @birth, [fname] = @fname, [mname] = @mname, [lname] = @lname, [email] = @email
  where [id] = @id
else
  insert into [t_client_person]([id], [sex], [birth], [fname], [mname], [lname], [email])
  select @id, @sex, @birth, @fname, @mname, @lname, @email