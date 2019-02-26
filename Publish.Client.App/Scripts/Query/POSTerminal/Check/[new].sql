declare @numbercalc int

select @numbercalc = isnull(max([number]), 0) 
from [t_check] with(nolock)
where [salepoint] = @salepoint and [cu] = @u and cast([cd] as date) = cast(getdate() as date)

insert into [t_check]([cu],	[uu], [salepoint], [number], [change])
select @u, @u, @salepoint, @numbercalc + 1, @change

select [t].[id], [t].[d], [t].[cd], [t].[cu], [t].[ud], [t].[uu], [t].[salepoint], [t].[options]
	 , [t].[client], [clientfname]=isnull([cp].[fname], ''), [clientmname]=isnull([cp].[mname],''), [clientlname]=isnull([cp].[lname], '')
	 , [t].[number], [t].[change], [t].[discount], [t].[comment]
	 , [t].[discountref], [discountrefname] = isnull([dr].[name], '')
from [t_check] [t] with(nolock)
left outer join [t_client_person] [cp]   with(nolock) on [t].[client]    = [cp].[id]
left outer join [t_discount]      [dr] with(nolock) on [t].[discountref] = [dr].[id]
where [t].[id] = scope_identity()