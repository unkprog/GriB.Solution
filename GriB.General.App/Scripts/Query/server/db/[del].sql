set identity_insert [pos_sqldb] on

delete from [pos_sqldb]
output -[deleted].[id], [deleted].[server], [deleted].[catalog], [deleted].[user], [deleted].[pass]
into [pos_sqldb]([id], [server], [catalog], [user], [pass])
where [id] = @id 

set identity_insert [pos_sqldb] off