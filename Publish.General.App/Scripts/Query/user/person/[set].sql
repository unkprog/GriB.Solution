if exists(select [id] from [pos_user_person] with(nolock) where [id] = @id)
  update [pos_user_person] 
  set [sex] = @sex, [birth] = @birth, [fname] = @fname, [mname] = @mname, [lname] = @lname, [email] = @email
  where [id] = @id
else
  insert into [pos_user_person]([id], [sex], [birth], [fname], [mname], [lname], [email])
  select @id, @sex, @birth, @fname, @mname, @lname, @email