select [id], [d], [cd], [cu], [ud], [uu], [name], [type]
from [t_org] with(nolock)
where [d] = 0 and [type] = 1 
  and case @field when 'id'    then case when [id]    = @id    then 1 else 0 end
				  when ''      then 1
				  else 0
	 end = 1