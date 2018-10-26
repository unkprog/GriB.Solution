-- ru: Категории
-- en: Categories

if not exists (select * from [sys].[objects] where [object_id] = object_id(N'[t_category]') and type in (N'U'))
begin
  create table [t_category]
  (
    [id]    [int]           identity(1,1) not null,
	[pid]   [int]           not null default (0),
	[d]     [int]           not null default (0),
	[cd]    [datetime]      not null default (getdate()),
	[cu]    [int]           not null default (0),
	[ud]    [datetime]      not null default (getdate()),
	[uu]    [int]           not null default (0),
	[name]  [nvarchar](60)  not null default (N''),
	[photo] [nvarchar](178) not null default (N''),
    primary key clustered ([id])
  )
end


if not exists (select * from [sys].[objects] where [object_id] = object_id(N'[t_category_salepointaccess]') and type in (N'U'))
begin
  create table [t_category_salepointaccess]
  (
    [id]        [int] not null,
	[salepoint] [int] not null,
	[isaccess]  [bit] not null default (0),
    primary key clustered ([id], [salepoint])
  )
end