declare @curDate datetime
set @curDate = cast(cast(getdate() as date) as datetime)
if exists(select [id] from [t_product_costprice] with(nolock) where [id]=@id and [date]=@curDate)
begin
  update [t_product_costprice] 
  set [price] = @price
  where [id] = @id and [date] = @curDate
end
else begin
  insert into [t_product_costprice]([id], [date], [price])
  select @id, @curDate, @price
end

select @id