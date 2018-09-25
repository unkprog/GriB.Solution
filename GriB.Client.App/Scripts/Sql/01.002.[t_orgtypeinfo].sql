-- ru: Тип данных
-- en: Data type

if not exists (select * from [sys].[objects] where [object_id] = object_id(N'[t_orgtypeinfo]') and type in (N'U'))
begin
  create table [t_orgtypeinfo]
  (
    [id]        [int]           identity(1,1) not null,
	[typeval]   [int]           not null default (0),
	[name]      [nvarchar](124) not null default (N''),
    primary key clustered ([id])
  )
end

go 

if not exists (select [id] from [t_orgtypeinfo] where [name] = 'Телефон')        insert into [t_orgtypeinfo]([typeval], [name]) values(0, 'Телефон')
if not exists (select [id] from [t_orgtypeinfo] where [name] = 'E-mail')         insert into [t_orgtypeinfo]([typeval], [name]) values(0, 'E-mail')
if not exists (select [id] from [t_orgtypeinfo] where [name] = 'Сайт')           insert into [t_orgtypeinfo]([typeval], [name]) values(0, 'Сайт')
if not exists (select [id] from [t_orgtypeinfo] where [name] = 'Адрес')          insert into [t_orgtypeinfo]([typeval], [name]) values(0, 'Адрес')
if not exists (select [id] from [t_orgtypeinfo] where [name] = 'Время работы')   insert into [t_orgtypeinfo]([typeval], [name]) values(0, 'Время работы')
if not exists (select [id] from [t_orgtypeinfo] where [name] = 'Местоположение') insert into [t_orgtypeinfo]([typeval], [name]) values(0, 'Местоположение')

go