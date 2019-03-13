if exists(select [id] from [t_product_composition] with(nolock) where [id]=@id and [index] = @index)
begin
  update [t_product_composition] 
  set [product] = @product, [unit] = @unit, [netto] = @netto, [percentcold] = @percentcold, [brutto] = @brutto, [percentheat] = @percentheat, [exitproduct] = @exitproduct, [description] = @description
  where [id] = @id and [index] = @index
end
else begin
  insert into [t_product_composition]([id], [index], [product], [unit], [netto], [percentcold], [brutto], [percentheat], [exitproduct], [description])
  select @id, @index, @product, @unit, @netto, @percentcold, @brutto, @percentheat, @exitproduct, @description
end

select @id

