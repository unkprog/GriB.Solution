declare @numbercalc int

select @numbercalc = isnull(max([number]), 0) 
from [t_check] with(nolock)
where [cu] = @u and cast([cd] as date) = cast(getdate() as date)

insert into [t_check]([cu],	[uu], [number],	[change])
select @u, @u, @numbercalc + 1, @change

select [t].[id], [t].[d], [t].[cd], [t].[cu], [t].[ud], [t].[uu]
     , [t].[options], [t].[client], [t].[number], [t].[change], [t].[discount], [t].[comment]
from [t_check] [t] with(nolock)
where [t].[id] = scope_identity()