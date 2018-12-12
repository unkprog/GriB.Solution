--declare @regtype int, @phone nvarchar(255)
--select @regtype = 0, @find = '+79264042915'
select [id], [d], [cd], [cu], [ud], [uu], [phone]
from [t_client] with(nolock)
where case @field when 'id'    then case when [id]    = @id    then 1 else 0 end
                  when 'phone' then case when [phone] = @phone then 1 else 0 end
				  when ''      then 1
				  else 0
	  end = 1
 and [d] = 0