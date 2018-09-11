--declare @regtype int, @phone nvarchar(255)
--select @regtype = 0, @find = '+79264042915'
select [id], [regtype], [phone], [email]
from [pos_user] with(nolock)
where [regtype] = @regtype and ((@regtype = 0 and [phone] = @find) or (@regtype = 1 and [email] = @find))