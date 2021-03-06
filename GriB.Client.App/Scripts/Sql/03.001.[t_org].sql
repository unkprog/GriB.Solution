-- ru: Структура организации
-- en: Structure of the organization

if not exists (select * from [sys].[objects] where [object_id] = object_id(N'[t_org]') and type in (N'U'))
begin
  create table [t_org]
  (
    [id]      [int]           identity(1,1) not null,
	[pid]     [int]           not null default (0),
	[d]       [int]           not null default (0),
	[cd]      [datetime]      not null default (getdate()),
	[cu]      [int]           not null default (0),
	[ud]      [datetime]      not null default (getdate()),
	[uu]      [int]           not null default (0),
	[type]    [int]           not null default (0),
	[defcurrency] [int]       not null default (0),
	[name]  [nvarchar](238) not null default (N''),
    primary key clustered ([id])
  )
end

if not exists (select * from [sys].[objects] where [object_id] = object_id(N'[t_org_info]') and type in (N'U'))
begin
  create table [t_org_info]
  (
    [id]    [int]          not null,
	[phone] [nvarchar](16) not null default (N''),
	[email] [nvarchar](55) not null default (N''),
	[site]  [nvarchar](55) not null default (N''),
    primary key clustered ([id])
  )
end


if not exists (select * from [sys].[objects] where [object_id] = object_id(N'[t_org_info1]') and type in (N'U'))
begin
  create table [t_org_info1]
  (
    [id]       [int]          not null,
	[address]  [nvarchar](63) not null default (N''),
	[schedule] [nvarchar](63) not null default (N''),
    primary key clustered ([id])
  )
end

