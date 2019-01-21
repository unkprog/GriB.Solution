select [t].[id], [t].[comment]
from [t_document_comment] [t] with(nolock)
where [t].[id] = @id
  