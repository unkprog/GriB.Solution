-- ru: Скидка
-- en: Discount

if not exists (select * from [sys].[objects] where [object_id] = object_id(N'[t_discount]') and type in (N'U'))
begin
  create table [t_discount]
  (
    [id]       [int]           identity(1,1) not null,
	[d]        [int]           not null default (0),
	[cd]       [datetime]      not null default (getdate()),
	[cu]       [int]           not null default (0),
	[ud]       [datetime]      not null default (getdate()),
	[uu]       [int]           not null default (0),
	[name]     [nvarchar](60)  not null default (N''),
	[value]    [float]         not null default (0),
    primary key clustered ([id])
  )
end

go

if not exists (select * from [sys].[objects] where [object_id] = object_id(N'[t_discount_salepointaccess]') and type in (N'U'))
begin
  create table [t_discount_salepointaccess]
  (
    [id]        [int] not null,
	[salepoint] [int] not null,
	[isaccess]  [bit] not null default (0),
    primary key clustered ([id], [salepoint])
  )
end


