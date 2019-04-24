if exists(select [id] from [t_printer] with(nolock) where [id]=@id)
begin
  update [t_printer] 
  set [ud] = getdate(), [uu] = @u, [name] = @name, [printserver] = @printserver, [salepoint] = @salepoint, [labelsize] = @labelsize, [logo] = @logo, [header] = @header, [footer] = @footer
  where [id] = @id 
  select @id
end
else begin
  insert into [t_printer]([cu], [uu], [name], [printserver], [salepoint], [labelsize], [logo], [header], [footer])
  select @u, @u, @name, @printserver, @salepoint, @labelsize, @logo, @header, @footer
  select cast(scope_identity() as int)
end

