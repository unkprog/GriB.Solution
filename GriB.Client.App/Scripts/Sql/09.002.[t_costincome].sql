-- ru: Оплата
-- en: Payment

if not exists (select * from [sys].[objects] where [object_id] = object_id(N'[t_costincome]') and type in (N'U'))
begin
  create table [t_costincome]
  (
    [id]       [int]           identity(1,1) not null,
	[d]        [int]           not null default (0),
	[cd]       [datetime]      not null default (getdate()),
	[cu]       [int]           not null default (0),
	[ud]       [datetime]      not null default (getdate()),
	[uu]       [int]           not null default (0),
    [pid]      [int]           not null default (0),
    [type]     [int]           not null default (0),
	[name]     [nvarchar](60)  not null default (N''),
    primary key clustered ([id])
  )
end

go


