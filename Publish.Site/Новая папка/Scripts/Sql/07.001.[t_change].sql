-- ru: Смена
-- en: Change

if not exists (select * from [sys].[objects] where [object_id] = object_id(N'[t_change]') and type in (N'U'))
begin
  create table [t_change]
  (
    [id]       [int]           identity(1,1) not null,
	[d]        [int]           not null default (0),
	[cd]       [datetime]      not null default (getdate()),
	[cu]       [int]           not null default (0),
	[ud]       [datetime]      not null default (getdate()),
	[uu]       [int]           not null default (0),
	[salepoint][int]           not null default (0),
	[options]  [int]           not null default (0),
	primary key clustered ([id])
  )
end

go

if exists(select * from [sys].[indexes] where [name] = 'change_idx_1')
  drop index [change_idx_1] on [t_change]

go

create nonclustered index [change_idx_1] ON [t_change] ([salepoint], [options], [id])

go
