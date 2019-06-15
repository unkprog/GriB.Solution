if not exists (select * from [sys].[objects] where [object_id] = object_id(N'[t_product_composition]') and type in (N'U'))
begin
  create table [t_product_composition]
  (
    [id]          [int]           not null,
	[index]       [int]           not null default (0),
	[product]     [int]           not null default (0),
	[unit]        [int]           not null default (0),
	[netto]       [float]         not null default (0),
	[percentcold] [float]         not null default (0),
	[brutto]      [float]         not null default (0),
	[percentheat] [float]         not null default (0),
	[exitproduct] [float]         not null default (0),
	[description] [nvarchar](200) not null default (N''),
    primary key clustered ([id], [index])
  )
end

