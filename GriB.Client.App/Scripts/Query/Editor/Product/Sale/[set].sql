declare @_price float, @_date datetime
set @_date = getdate()

select top 1 @_price = [price] from [t_product_saleprice] with(nolock) where [id]=@id and [date] <= @_date

if isnull(@_price, 0) <> @price
begin
  insert into [t_product_saleprice]([id], [uu], [date], [price])
  select @id, @u, @_date, @price
end

select @id