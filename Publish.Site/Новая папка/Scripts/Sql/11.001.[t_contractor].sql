-- ru: Контрагент
-- en: Contractor

if not exists (select * from [sys].[objects] where [object_id] = object_id(N'[t_contractor]') and type in (N'U'))
begin
  create table [t_contractor]
  (
    [id]       [int]           identity(1,1) not null,
	[d]        [int]           not null default (0),
	[cd]       [datetime]      not null default (getdate()),
	[cu]       [int]           not null default (0),
	[ud]       [datetime]      not null default (getdate()),
	[uu]       [int]           not null default (0),
	[name]     [nvarchar](112) not null default (N''),
    primary key clustered ([id])
  )
end



