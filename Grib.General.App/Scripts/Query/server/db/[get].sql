select [id], [server], [catalog], [user], [pass]
from [dbo].[pos_sqldb] with(nolock)
where case @field when 'id'      then case when [id]      = @id      then 1 else 0 end
                  when 'server'  then case when [server]  = @server  then 1 else 0 end
                  when 'catalog' then case when [catalog] = @catalog then 1 else 0 end
				  when ''        then 1
				  else 0
	  end = 1