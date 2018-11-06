-- ru: Товары, услуги
-- en: Goods, services

if not exists (select * from [sys].[objects] where [object_id] = object_id(N'[t_product_costprice]') and type in (N'U'))
begin
  create table [t_product_costprice]
  (
    [id]    [int]      not null,
	[date]  [datetime] not null default (cast(cast(getdate() as date) as datetime)),
	[price] [float]    not null default (0),
    primary key clustered ([id], [date])
  )
end

go

if not exists (select * from [sys].[objects] where [object_id] = object_id(N'[t_product_saleprice]') and type in (N'U'))
begin
  create table [t_product_saleprice]
  (
    [id]    [int]      not null,
	[date]  [datetime] not null default (cast(cast(getdate() as date) as datetime)),
	[price] [float]    not null default (0),
    primary key clustered ([id], [date])
  )
end