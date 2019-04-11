-- ru: Принт-сервер
-- en: Print-server

if not exists (select * from [sys].[objects] where [object_id] = object_id(N'[t_printserver]') and type in (N'U'))
begin
  create table [t_printserver]
  (
    [id]          [int]           identity(1,1) not null,
	[d]           [int]           not null default (0),
	[cd]          [datetime]      not null default (getdate()),
	[cu]          [int]           not null default (0),
	[ud]          [datetime]      not null default (getdate()),
	[uu]          [int]           not null default (0),
	[name]        [nvarchar](60)  not null default (N''),
	[pskey]       [nvarchar](40)  not null default (N''),
	[description] [nvarchar](250) not null default (N''),
    primary key clustered ([id])
  )
end