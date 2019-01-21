if exists(select [id] from [t_document] with(nolock) where [id]=@id)
begin
  update [t_document] 
  set [ud] = getdate(), [uu] = @u, [doctype] = @doctype, [option] = @option, [date] = @date, [salepoint] = @salepoint, [salepointto] = @salepointto, [contractor] = @contractor, [typecost] = @typecost, [reason] = @reason
  where [id] = @id 
  select @id
end
else begin
  insert into [t_document]([cu], [uu], [doctype], [option], [date], [salepoint], [salepointto], [contractor], [typecost], [reason])
  select @u, @u, @doctype, @option, @date, @salepoint, @salepointto, @contractor, @typecost, @reason
  select cast(scope_identity() as int)
end

