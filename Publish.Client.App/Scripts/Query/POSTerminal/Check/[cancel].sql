update [t_check] set [ud] = getdate(), [uu] = @u, [options] = @options, [comment] = @comment
where [id] = @id