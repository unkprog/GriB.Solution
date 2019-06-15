-- ru: Структура организации
-- en: Structure of the organization

if not exists (select * from [sys].[objects] where [object_id] = object_id(N'[t_orgtype]') and type in (N'U'))
begin
  create table [t_orgtype]
  (
    [id]      [int]           identity(1,1) not null,
    [options] [int]           not null default (0),
	[name]    [nvarchar](124) not null default (N''),
    primary key clustered ([id])
  )
end

go

set identity_insert [t_orgtype] on;

if not exists (select [id] from [t_orgtype] where [id] = 1) insert into [t_orgtype]([id], [options], [name]) values(1, 1, 'Компания')
if not exists (select [id] from [t_orgtype] where [id] = 2) insert into [t_orgtype]([id], [options], [name]) values(2, 1, 'Город')
if not exists (select [id] from [t_orgtype] where [id] = 3) insert into [t_orgtype]([id], [options], [name]) values(3, 1, 'Подразделение (торговая точка, склад)')
if not exists (select [id] from [t_orgtype] where [id] = 4) insert into [t_orgtype]([id], [options], [name]) values(4, 1, 'Отдел (зал, цех)')

set identity_insert [t_orgtype] off;

go


