if not exists(select [id] from [t_change] where [d] = 0 and [salepoint] = @salepoint and [options] = 0)
begin
  insert into [t_change]([cu], [uu], [salepoint])
  select @u, @u, @salepoint

  select [id], [d], [cd], [cu], [ud], [uu], [salepoint], [options]
  from [t_change] [t]
  where [t].[id] = scope_identity()
end