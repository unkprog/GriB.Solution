-- ru: Принтер
-- en: Printer

if not exists (select * from [sys].[objects] where [object_id] = object_id(N'[t_printer]') and type in (N'U'))
begin
  create table [t_printer]
  (
    [id]          [int]            identity(1,1) not null,
	[d]           [int]            not null default (0),
	[cd]          [datetime]       not null default (getdate()),
	[cu]          [int]            not null default (0),
	[ud]          [datetime]       not null default (getdate()),
	[uu]          [int]            not null default (0),
	[name]        [nvarchar](60)   not null default (N''),
	[printserver] [int]            not null default (0),
	[salepoint]   [int]            not null default (0),
	[labelsize]   [int]            not null default (0),
	[logo]        [nvarchar](200)  not null default (N''),
	[header]      [nvarchar](2000) not null default (N''),
	[footer]      [nvarchar](2000) not null default (N''),
    primary key clustered ([id])
  )
end