update [t_client] 
set [d] = @id, [uu] = @u, [ud] = getdate()
where [id] = @id