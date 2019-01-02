﻿if exists(select [id] from [t_payment] with(nolock) where [id]=@id)
begin
  update [t_payment] 
  set [ud] = getdate(), [uu] = @u, [check] = @check, [type] = @type, [sum] = @sum, [option] = @option, [client] = @client, [comment] = @comment
  where [id] = @id 
  select @id
end
else begin
  insert into [t_payment]([cu], [uu], [check], [type], [sum], [option], [client], [comment])
  select @u, @u, @check, @type, @sum, @option, @client, @comment
  select cast(scope_identity() as int)
end

