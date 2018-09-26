select [id], [d], [cd], [cu], [ud], [uu], [name], [type]
from [t_org] with(nolock)
where [d] = 0 and [type] = 1