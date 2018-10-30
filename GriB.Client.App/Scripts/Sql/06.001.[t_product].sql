-- ru: Товары, услуги
-- en: Goods, services

if not exists (select * from [sys].[objects] where [object_id] = object_id(N'[t_product]') and type in (N'U'))
begin
  create table [t_product]
  (
    [id]       [int]           identity(1,1) not null,
	[pid]      [int]           not null default (0),
	[d]        [int]           not null default (0),
	[cd]       [datetime]      not null default (getdate()),
	[cu]       [int]           not null default (0),
	[ud]       [datetime]      not null default (getdate()),
	[uu]       [int]           not null default (0),
	[type]     [int]           not null default (0),
	[category] [int]           not null default (0),
	[name]     [nvarchar](60)  not null default (N''),
	[photo]    [nvarchar](174) not null default (N''),
    primary key clustered ([id])
  )
end

if not exists (select * from [sys].[objects] where [object_id] = object_id(N'[t_product_salepointaccess]') and type in (N'U'))
begin
  create table [t_product_salepointaccess]
  (
    [id]        [int] not null,
	[salepoint] [int] not null,
	[isaccess]  [bit] not null default (0),
    primary key clustered ([id], [salepoint])
  )
end


if not exists (select * from [sys].[objects] where [object_id] = object_id(N'[t_product_description]') and type in (N'U'))
begin
  create table [t_product_description]
  (
    [id]          [int]            not null,
	[description] [nvarchar](3098) not null default (N''),
    primary key clustered ([id])
  )
end