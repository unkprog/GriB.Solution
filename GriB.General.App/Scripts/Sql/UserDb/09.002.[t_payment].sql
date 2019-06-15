-- ru: Оплата
-- en: Payment

if not exists (select * from [sys].[objects] where [object_id] = object_id(N'[t_payment]') and type in (N'U'))
begin
  create table [t_payment]
  (
    [id]         [int]      identity(1,1) not null,
	[d]          [int]      not null default (0),
	[cd]         [datetime] not null default (getdate()),
	[cu]         [int]      not null default (0),
	[ud]         [datetime] not null default (getdate()),
	[uu]         [int]      not null default (0),
	[doctype]    [int]      not null default (10),
	[salepoint]  [int]      not null default (0),
	[check]      [int]      not null default (0),
	[type]       [int]      not null default (0),
	[sum]        [float]    not null default (0),
	[option]     [int]      not null default (0),
	[client]     [int]      not null default (0),
	[account]    [int]      not null default (0),
	[costincome] [int]      not null default (0),
    primary key clustered ([id])
  )
end

go

go

if not exists (select * from [sys].[objects] where [object_id] = object_id(N'[t_payment_comment]') and type in (N'U'))
begin
  create table [t_payment_comment]
  (
    [id]         [int]           not null,
	[comment]    [nvarchar](510) not null default (N''),
	primary key clustered ([id])
  )
end
