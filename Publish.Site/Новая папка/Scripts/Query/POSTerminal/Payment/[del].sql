update [t_payment] set [ud] = getdate(), [uu] = @u, [d] = [id]
where [id] = @id
