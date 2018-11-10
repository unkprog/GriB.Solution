-- ru: Товары, услуги
-- en: Goods, services

if not exists (select * from [sys].[objects] where [object_id] = object_id(N'[t_product_account]') and type in (N'U'))
begin
  create table [t_product_account]
  (
    [id]         [int] not null,
	[vendorcode] [nvarchar](61)  not null default (N''),
	[barcode]    [nvarchar](61)  not null default (N''),
	[unit]       [int]           not null default (0),
	[quantity]   [float]         not null default (0),
	[currency]   [int]           not null default (0),
    primary key clustered ([id])
  )
end

go

if exists(select * from [sys].[indexes] where [name] = '[t_product_account_idx_1]')
  drop index [t_product_account_idx_1] on [t_product_account]

go

create nonclustered index [t_product_account_idx_1] ON [t_product_account] ([vendorcode])

go

if exists(select * from [sys].[indexes] where [name] = '[t_product_account_idx_2]')
  drop index [t_product_account_idx_2] on [t_product_account]

go

create nonclustered index [t_product_account_idx_2] ON [t_product_account] ([barcode])