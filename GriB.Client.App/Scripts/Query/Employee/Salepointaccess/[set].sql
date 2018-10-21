if exists(select [id] from [t_employee_salepointaccess] with(nolock) where [id]=@id and [salepoint]=@salepoint)
begin
  update [t_employee_salepointaccess] 
  set [isaccess] = @isaccess, [isdefault] = @isdefault
  where [id] = @id and [salepoint]=@salepoint
end
else begin
  insert into [t_org_info1]([id], [salepoint], [isaccess], [isdefault])
  select @id, @salepoint, @isaccess, @isdefault
end

select @id