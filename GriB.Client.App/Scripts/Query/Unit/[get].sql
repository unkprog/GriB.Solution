select [t].[id], [t].[code], [t].[nameshort], [t].[name]
from [t_unit] [t] with(nolock)
where [d] = 0 and (@type = 0 or (@type <> 0 and [type] = @type))
  and (@code = '' or (@code <> '' and  [t].[code] = @code))
  and (@nameshort = '' or (@nameshort <> '' and  [t].[nameshort] = @nameshort))
  and (@name = '' or (@name <> '' and  [t].[name] = @name))
  