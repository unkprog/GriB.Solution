select [o].[id], [o].[d], [o].[cd], [o].[cu], [o].[ud], [o].[uu], [o].[name], [o].[type], [o].[pid]
     , [o].[defcurrency], [defcurrencyname]=isnull([c].[name], '')
from [t_org] [o] with(nolock)
left outer join [t_unit] [c] with(nolock) on [o].[defcurrency] = [c].[id]
where [o].[d] = 0 and (@type = 0 or (@type <> 0 and [o].[type] = @type))
  and case @field when 'id'    then case when [o].[id]   = @id   then 1 else 0 end
				  when 'name'  then case when [o].[name] = @name then 1 else 0 end
				  when ''      then 1
				  else 0
	 end = 1
