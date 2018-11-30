-- ru: Чек
-- en: Check

if not exists (select * from [sys].[objects] where [object_id] = object_id(N'[t_check]') and type in (N'U'))
begin
  create table [t_check]
  (
    [id]       [int]           identity(1,1) not null,
	[d]        [int]           not null default (0),
	[cd]       [datetime]      not null default (getdate()),
	[cu]       [int]           not null default (0),
	[ud]       [datetime]      not null default (getdate()),
	[uu]       [int]           not null default (0),
	[options]  [int]           not null default (0),
	[client]   [int]           not null default (0),
	[number]   [int]           not null default (0),
	[change]   [int]           not null default (0),
	[discount] [float]         not null default (0),
	[comment]  [nvarchar](228) not null default (N''),
    primary key clustered ([id])
  )
end

go

if not exists (select * from [sys].[objects] where [object_id] = object_id(N'[t_check_poition]') and type in (N'U'))
begin
  create table [t_check_poition]
  (
    [id]       [int]           not null,
	[index]    [int]           not null default (0),
	[product]  [int]           not null default (0),
	[quantity] [float]         not null default (0),
	[price]    [float]         not null default (0),
    primary key clustered ([id], [index])
  )
end

go

if exists(select * from [sys].[indexes] where [name] = 'check_idx_1')
  drop index [check_idx_1] on [t_check]

go

create nonclustered index [check_idx_1] ON [t_check] ([cu], [change])

go