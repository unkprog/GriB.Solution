if exists(select [id] from [t_product_salepointaccess] with(nolock) where [id]=@id and [salepoint]=@salepoint)
begin
  update [t_product_salepointaccess] 
  set [isaccess] = @isaccess
  where [id] = @id and [salepoint]=@salepoint
end
else begin
  insert into [t_product_salepointaccess]([id], [salepoint], [isaccess])
  select @id, @salepoint, @isaccess
end

select @id