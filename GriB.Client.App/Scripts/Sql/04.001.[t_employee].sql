-- ru: Сотрудники
-- en: Employees

if not exists (select * from [sys].[objects] where [object_id] = object_id(N'[t_employee]') and type in (N'U'))
begin
  create table [t_employee]
  (
    [id]               [int]  not null,
	[isaccess]         [bit]  not null default (0),
	[openonlogin]      [int]  not null default (0),
	[defaultsalepoint] [int]  not null default (0),
    primary key clustered ([id])
  )
end

if not exists (select * from [sys].[objects] where [object_id] = object_id(N'[t_employee_salepointaccess]') and type in (N'U'))
begin
  create table [t_employee_salepointaccess]
  (
    [id]        [int] not null,
	[salepoint] [int] not null,
	[isaccess]  [bit] not null default (0),
    primary key clustered ([id], [salepoint])
  )
end
