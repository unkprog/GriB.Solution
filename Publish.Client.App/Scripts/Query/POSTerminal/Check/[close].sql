update [t_check] set [ud] = getdate(), [uu] = @u, [salepoint] = @salepoint, [options] = @options, [client] = @client
                   , [number] = @number, [change] = @change, [discount] = @discount, [comment] = @comment
where [id] = @id
