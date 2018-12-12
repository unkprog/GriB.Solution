-- ru: Клиенты
-- en: Clients

if not exists (select * from [sys].[objects] where [object_id] = object_id(N'[t_client]') and type in (N'U'))
begin
  create table [t_client]
  (
    [id]    [int]          identity(1,1) not null,
	[d]     [int]          not null default (0),
	[cd]    [datetime]     not null default (getdate()),
	[cu]    [int]          not null default (0),
	[ud]    [datetime]     not null default (getdate()),
	[uu]    [int]          not null default (0),
	[phone] [nvarchar](16) not null default (N''),
	primary key clustered ([id])
  )
end

go

if not exists (select * from [sys].[objects] where [object_id] = object_id(N'[t_client_person]') and type in (N'U'))
begin
  create table [t_client_person]
  (
    [id]    [int]          identity(1,1) not null,
	[sex]   [int]          not null default (0),
	[birth] [datetime]     not null default ('18991230'),
	[fname] [nvarchar](62) not null default (N''),
	[mname] [nvarchar](62) not null default (N''),
	[lname] [nvarchar](62) not null default (N''),
	[email] [nvarchar](62) not null default (N''),
    primary key clustered ([id])
  )
end