-- ru: Пользователи
-- en: Users

if not exists (select * from [sys].[objects] where [object_id] = object_id(N'[pos_user]') and type in (N'U'))
begin
  create table [pos_user]
  (
	[id]    [int]          identity(1,1) not null,
	[d]     [int]          not null default (0),
	[cd]    [datetime]     not null default (getdate()),
	[cu]    [int]          not null default (0),
	[uu]    [int]          not null default (0),
	[ud]    [datetime]     not null default (getdate()),
	[phone] [nvarchar](16) not null default (N''),
    primary key clustered ([id])
  )
end

go

if exists(select * from [sys].[indexes] where [name] = 'pos_user_idx_1')
  drop index [pos_user_idx_1] on [pos_user]

go

create unique nonclustered index [pos_user_idx_1] ON [pos_user] ([phone])

go

if not exists (select * from [sys].[objects] where [object_id] = object_id(N'[pos_user_sec]') and type in (N'U'))
begin
  create table [pos_user_sec]
  (
	[id]   [int]          not null,
	[pass] [nvarchar](50) not null default (N''),
    primary key clustered ([id])
  )
end

go

if not exists (select * from [sys].[objects] where [object_id] = object_id(N'[pos_user_role]') and type in (N'U'))
begin
  create table [pos_user_role]
  (
	[id]   [int] identity(1,1) not null,
	[user] [int] not null default (0),
	[role] [int] not null default (0),
    primary key clustered ([id])
  )
end

go


if exists(select * from [sys].[indexes] where [name] = 'pos_user_role_idx_1')
  drop index [pos_user_role_idx_1] on [pos_user_role]

go

create nonclustered index [pos_user_role_idx_1] ON [pos_user_role] ([user])


if not exists (select * from [sys].[objects] where [object_id] = object_id(N'[pos_user_person]') and type in (N'U'))
begin
  create table [pos_user_person]
  (
	[id]    [int]          not null,
	[sex]   [int]          not null default (0),
	[birth] [datetime]     not null default ('18991230'),
	[fname] [nvarchar](62) not null default (N''),
	[mname] [nvarchar](62) not null default (N''),
	[lname] [nvarchar](62) not null default (N''),
	[email] [nvarchar](62) not null default (N''),
    primary key clustered ([id])
  )
end

go


