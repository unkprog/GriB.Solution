if exists(select [id] from [t_product_map] with(nolock) where [id]=@id)
begin
  update [t_product_map] 
  set [approver] = @approver, [signer] = @signer, [finishproduct] = @finishproduct, [finishdish] = @finishdish
  where [id] = @id 
end
else begin
  insert into [t_product_map]([id], [approver], [signer], [finishproduct], [finishdish])
  select @id, @approver, @signer, @finishproduct, @finishdish
end

select @id