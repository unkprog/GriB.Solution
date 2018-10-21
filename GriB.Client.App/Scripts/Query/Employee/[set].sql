if exists(select [id] from [t_employee] with(nolock) where [id]=@id)
begin
  update [t_employee] 
  set [isaccess] = @isaccess, [openonlogin] = @openonlogin
  where [id] = @id 
end
else begin
  insert into [t_org_info1]([id], [isaccess], [openonlogin])
  select @id, @isaccess, @openonlogin
end

select @id