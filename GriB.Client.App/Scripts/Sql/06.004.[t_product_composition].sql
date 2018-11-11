if not exists (select * from [sys].[objects] where [object_id] = object_id(N'[t_product_composition]') and type in (N'U'))
begin
  create table [t_product_composition]
  (
    [id]         [int]           not null,
	[index]      [int]           not null default (0),
	[product]    [int]           not null default (0),
	[quantity]   [float]         not null default (0),
    primary key clustered ([id], [index])
  )
end
