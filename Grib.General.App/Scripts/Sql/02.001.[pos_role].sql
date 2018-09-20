-- ru: Роли
-- en: Roles

if not exists (select * from [sys].[objects] where [object_id] = object_id(N'[pos_role]') and type in (N'U'))
begin
  create table [pos_role]
  (
	[id]      [int]          not null,
	[name]    [nvarchar](50) not null default (N''),
	[options] [int]          not null default (0),
    primary key clustered ([id])
  )
end

go

if exists(select * from [sys].[indexes] where [name] = 'pos_role_idx_1')
  drop index [pos_role_idx_1] on [pos_role]

go

create nonclustered index [pos_role_idx_1] ON [pos_role] ([name])

go

if not exists (select [id] from [pos_role] where [id] = 1) insert into [pos_role]([id], [name], [options]) values(1, 'Administrator', 0) else update [pos_role] set [options] = 0 where [id] = 1
if not exists (select [id] from [pos_role] where [id] = 2) insert into [pos_role]([id], [name], [options]) values(2, 'User', 1) else update [pos_role] set [options] = 1 where [id] = 2
if not exists (select [id] from [pos_role] where [id] = 3) insert into [pos_role]([id], [name], [options]) values(3, 'Client', 2) else update [pos_role] set [options] = 2 where [id] = 3
 

