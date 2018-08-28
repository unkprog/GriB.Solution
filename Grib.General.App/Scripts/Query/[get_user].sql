--declare @regtype int, @phone nvarchar(255)
--select @regtype = 0, @phone = '+79264042915'
select [id], [regtype], [phone], [email]
from [pos_user] with(nolock)
where [regtype] = @regtype and [phone] = @phone