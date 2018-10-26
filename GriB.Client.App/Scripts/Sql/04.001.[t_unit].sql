if not exists (select * from [sys].[objects] where [object_id] = object_id(N'[t_unit]') and type in (N'U'))
begin
  create table [t_unit]
  (
    [id]        [int]           identity(1,1) not null,
	[pid]       [int]           not null default (0),
	[d]         [int]           not null default (0),
	[cd]        [datetime]      not null default (getdate()),
	[cu]        [int]           not null default (0),
	[ud]        [datetime]      not null default (getdate()),
	[uu]        [int]           not null default (0),
	[type]      [int]           not null default (0),
	[code]      [nvarchar](28)  not null default (N''),
	[nameshort] [nvarchar](60)  not null default (N''),
	[name]      [nvarchar](150) not null default (N''),
    primary key clustered ([id])
  )
end

if not exists (select * from [sys].[objects] where [object_id] = object_id(N'[t_unit_rate]') and type in (N'U'))
begin
  create table [t_unit_rate]
  (
    [id]    [int] not null,
	[unit]  [int] not null,
	[date]  [datetime] not null default (getdate()),
	[value] [float] not null default (0),
    primary key clustered ([id], [unit], [date])
  )
end

if not exists (select [id] from [t_unit] where [code] = 'RUB') insert into [t_unit]([code], [nameshort], [name]) values('RUB', 'Рубль', 'Российский рубль')
if not exists (select [id] from [t_unit] where [code] = 'USD') insert into [t_unit]([code], [nameshort], [name]) values('USD', 'Доллар', 'Американский доллар')
if not exists (select [id] from [t_unit] where [code] = 'EUR') insert into [t_unit]([code], [nameshort], [name]) values('EUR', 'Евро', 'Единая европейская валюта')

if not exists (select [id] from [t_unit] where [code] = 'шт')   insert into [t_unit]([code], [type], [nameshort], [name]) values('шт'  , 1, 'Штука', 'Штука')
if not exists (select [id] from [t_unit] where [code] = 'кг')   insert into [t_unit]([code], [type], [nameshort], [name]) values('кг'  , 1, 'Килограмм', 'Килограмм')
if not exists (select [id] from [t_unit] where [code] = 'г')    insert into [t_unit]([code], [type], [nameshort], [name]) values('г'   , 1, 'Грамм', 'Грамм')
if not exists (select [id] from [t_unit] where [code] = 'т')    insert into [t_unit]([code], [type], [nameshort], [name]) values('т'   , 1, 'Тонна', 'Тонна')
if not exists (select [id] from [t_unit] where [code] = 'л')    insert into [t_unit]([code], [type], [nameshort], [name]) values('л'   , 1, 'Литр', 'Литр')
if not exists (select [id] from [t_unit] where [code] = 'мл')   insert into [t_unit]([code], [type], [nameshort], [name]) values('мл'  , 1, 'Милилитр', 'Милилитр')
if not exists (select [id] from [t_unit] where [code] = 'м')    insert into [t_unit]([code], [type], [nameshort], [name]) values('м'   , 1, 'Метр', 'Метр')
if not exists (select [id] from [t_unit] where [code] = 'см')   insert into [t_unit]([code], [type], [nameshort], [name]) values('см'  , 1, 'Сантиметр', 'Сантиметр')
if not exists (select [id] from [t_unit] where [code] = 'мм')   insert into [t_unit]([code], [type], [nameshort], [name]) values('мм'  , 1, 'Милиметр', 'Милиметр')
if not exists (select [id] from [t_unit] where [code] = 'м.кв') insert into [t_unit]([code], [type], [nameshort], [name]) values('м.кв', 1, 'Метр квадратный', 'Метр квадратный')
if not exists (select [id] from [t_unit] where [code] = 'п.м')  insert into [t_unit]([code], [type], [nameshort], [name]) values('п.м' , 1, 'Погонный метр', 'Погонный метр')
