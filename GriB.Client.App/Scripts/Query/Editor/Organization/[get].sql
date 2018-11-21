select [id], [d], [cd], [cu], [ud], [uu], [name], [type], [pid]
from [t_org] with(nolock)
where [d] = 0 and (@type = 0 or (@type <> 0 and [type] = @type))
  and case @field when 'id'    then case when [id]   = @id   then 1 else 0 end
				  when 'name'  then case when [name] = @name then 1 else 0 end
				  when ''      then 1
				  else 0
	 end = 1
