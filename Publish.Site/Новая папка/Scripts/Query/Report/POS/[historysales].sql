 select [k].[id], [p].[id], [p].[cd], [p].[sum], [p].[type], [p].[option]
 from [t_check] [k] with(nolock)
 inner join (select [id], [d], [cd], [cu], [ud], [uu], [salepoint], [options] 
             from [t_change] [t] with(nolock)
             where [t].[id] = @change) [c] on [k].[cd] >= [c].[cd] and (([c].[cd] = [c].[ud] and [k].[cd] < getdate()) or ([k].[cd] <= [c].[ud])) and [k].[salepoint] = [c].[salepoint]
inner join [t_payment] [p] with(nolock) on [p].[check] = [k].[id]
	