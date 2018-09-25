-- ru: Структура организации
-- en: Structure of the organization

if not exists (select * from [sys].[objects] where [object_id] = object_id(N'[t_orginfo]') and type in (N'U'))
begin
  create table [t_orginfo]
  (
    [id]       [int]           identity(1,1) not null,
	[typeinfo] [int]           not null default (0),
	[value]    [nvarchar](238) not null default (N''),
    primary key clustered ([id])
  )
end

