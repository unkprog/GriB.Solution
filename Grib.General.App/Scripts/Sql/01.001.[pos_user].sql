-- ru: Пользователи
-- en: Users

if not exists (select * from [sys].[objects] where [object_id] = object_id(N'[pos_user]') and type in (N'U'))
begin
  create table [pos_user]
  (
	[id]       [int]          identity(1,1) not null,
	[cd]       [datetime]     not null default (getdate()),
	[cu]       [nvarchar](50) not null default (N'unknown'),
	[ud]       [datetime]     not null default (getdate()),
	[uu]       [nvarchar](50) not null default (N'unknown'),
	[regtype]  [int]          not null default (0),              -- Тип регистрации : 0 - по номеру телефона
	                                                             --                   1 - по e-mail
	[phone]    [nvarchar](50) not null default (N''),
	[email]    [nvarchar](50) not null default (N''),
    primary key clustered ([id])
  )
end

go

if not exists (select * from [sys].[objects] where [object_id] = object_id(N'[pos_user_sec]') and type in (N'U'))
begin
  create table pos_user_sec
  (
	[id]       [int]          not null,
	[pass]     [nvarchar](50) not null default (N''),
    primary key clustered ([id])
  )
end

go

if exists(select * from [sys].[indexes] where [name] = 'pos_user_idx_1')
  drop index [pos_user_idx_1] on [pos_user]

go

create nonclustered index [pos_user_idx_1] ON [pos_user] ([regtype], [phone])

go

if exists(select * from [sys].[indexes] where [name] = 'pos_user_idx_2')
  drop index [pos_user_idx_2] on [pos_user]

go

create nonclustered index [pos_user_idx_2] ON [pos_user] ([regtype], [email])
