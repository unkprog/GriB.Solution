if exists(select [id] from [t_employee] with(nolock) where [id]=@id)
begin
  update [t_employee] 
  set [isaccess] = @isaccess, [openonlogin] = @openonlogin, [defaultsalepoint] = @defaultsalepoint
  where [id] = @id 
end
else begin
  insert into [t_employee]([id], [isaccess], [openonlogin], [defaultsalepoint])
  select @id, @isaccess, @openonlogin, @defaultsalepoint
end

select @id