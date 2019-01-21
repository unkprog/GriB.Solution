-- ru: Оплата
-- en: Payment

if not exists (select * from [sys].[objects] where [object_id] = object_id(N'[t_document]') and type in (N'U'))
begin
  create table [t_document]
  (
    [id]          [int]           identity(1,1) not null,
	[d]           [int]           not null default (0),
	[cd]          [datetime]      not null default (getdate()),
	[cu]          [int]           not null default (0),
	[ud]          [datetime]      not null default (getdate()),
	[uu]          [int]           not null default (0),
	[doctype]     [int]           not null default (0),
	[option]      [int]           not null default (0),
	[date]        [datetime]      not null default (getdate()),
	[salepoint]   [int]           not null default (0),
	[salepointto] [int]           not null default (0),
	[contractor]  [int]           not null default (0),
	[typecost]    [int]           not null default (0),
	[reason]      [int]           not null default (0),
    primary key clustered ([id])
  )
end

go

if not exists (select * from [sys].[objects] where [object_id] = object_id(N'[t_document_position]') and type in (N'U'))
begin
  create table [t_document_position]
  (
    [id]         [int]           not null,
	[index]      [int]           not null default (0),
	[product]    [int]           not null default (0),
	[quantity]   [float]         not null default (0),
	[price]      [float]         not null default (0),
    primary key clustered ([id], [index])
  )
end

go

if not exists (select * from [sys].[objects] where [object_id] = object_id(N'[t_document_comment]') and type in (N'U'))
begin
  create table [t_document_comment]
  (
    [id]         [int]           not null,
	[comment]    [nvarchar]      not null default ('254'),
	primary key clustered ([id])
  )
end