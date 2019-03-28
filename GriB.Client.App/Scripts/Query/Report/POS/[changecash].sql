select [sumEncashment]=sum(case when [t].[doctype] = 40 then [t].[sum] else 0 end), [sumDeposit]=sum(case when [t].[doctype] = 20 then [t].[sum] else 0 end), [sumWithDrawal]=sum(case when [t].[doctype] = 30 then [t].[sum] else 0 end)
from [t_payment] [t] with(nolock)
inner join (select [id], [d], [cd], [cu], [ud], [uu], [salepoint], [options] 
            from [t_change] [t] with(nolock)
            where [t].[id] = @change) [c] on [t].[cd] >= [c].[cd] and (([c].[cd] = [c].[ud] and [t].[cd] < getdate()) or ([t].[cd] <= [c].[ud])) and [t].[salepoint] = [c].[salepoint]
