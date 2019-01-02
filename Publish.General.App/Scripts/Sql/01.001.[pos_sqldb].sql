-- ru: Базы данных
-- en: Databases

if not exists (select * from [sys].[objects] where [object_id] = object_id(N'[pos_sqlsrv]') and type in (N'U'))
begin
  create table [pos_sqlsrv]
  (
	[id]         [int]          identity(1,1) not null,
	[address]    [nvarchar](50) not null default (N''),
	[user]       [nvarchar](50) not null default (N''),
	[pass]       [nvarchar](50) not null default (N''),
    primary key clustered ([id])
  )
end

if not exists (select * from [sys].[objects] where [object_id] = object_id(N'[pos_sqldb]') and type in (N'U'))
begin
  create table [pos_sqldb]
  (
	[id]         [int]          identity(1,1) not null,
	[server]     [int]          not null,
	[catalog]    [nvarchar](50) not null default (N''),
	[user]       [nvarchar](50) not null default (N''),
	[pass]       [nvarchar](50) not null default (N''),
    primary key clustered ([id])
  )
end

go

if exists(select * from [sys].[indexes] where [name] = 'pos_sqldb_idx_1')
  drop index [pos_sqldb_idx_1] on [pos_sqldb]

go

create nonclustered index [pos_sqldb_idx_1] ON [pos_sqldb] ([server])

go

if exists(select * from [sys].[indexes] where [name] = 'pos_sqldb_idx_2')
  drop index [pos_sqldb_idx_2] on [pos_sqldb]

go

create unique nonclustered index [pos_sqldb_idx_2] ON [pos_sqldb] ([server], [catalog])



 

