if exists(select [id] from [t_employee_salepointaccess] with(nolock) where [id]=@id and [salepoint]=@salepoint)
begin
  update [t_employee_salepointaccess] 
  set [isaccess] = @isaccess
  where [id] = @id and [salepoint]=@salepoint
end
else begin
  insert into [t_employee_salepointaccess]([id], [salepoint], [isaccess])
  select @id, @salepoint, @isaccess
end

select @id