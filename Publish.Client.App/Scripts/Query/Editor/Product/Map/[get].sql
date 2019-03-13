select [id] = [t].[id], [approver] = [t].[approver], [signer] = [t].[signer], [finishproduct] = [t].[finishproduct], [finishdish] = [t].[finishdish]
from [t_product_map] [t] with(nolock)
where [t].[id] = @id
