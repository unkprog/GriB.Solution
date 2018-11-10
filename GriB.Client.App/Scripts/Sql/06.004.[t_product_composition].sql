if not exists (select * from [sys].[objects] where [object_id] = object_id(N'[t_product_composition]') and type in (N'U'))
begin
  create table [t_product_composition]
  (
    [id]         [int]           not null,
	[index]      [int]           not null default (0),
	[product]    [int]           not null default (0),
	[quantity]   [float]         not null default (0),
    primary key clustered ([id])
  )
end


if exists(select * from [sys].[indexes] where [name] = '[t_product_composition_idx_1]')
  drop index [t_product_composition_idx_1] on [t_product_composition]

go

create nonclustered index [t_product_composition_idx_1] ON [t_product_composition] ([id], [index])

go