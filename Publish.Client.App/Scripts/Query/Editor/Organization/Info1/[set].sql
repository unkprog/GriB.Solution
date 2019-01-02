if exists(select [id] from [t_org_info1] with(nolock) where [id]=@id)
begin
  update [t_org_info1] 
  set [address] = @address, [schedule] = @schedule where [id] = @id
end
else begin
  insert into [t_org_info1]([id], [address], [schedule])
  select @id, @address, @schedule
end

select @id