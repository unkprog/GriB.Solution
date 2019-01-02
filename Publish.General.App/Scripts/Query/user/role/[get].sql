--declare @regtype int, @phone nvarchar(255)
--select @regtype = 0, @find = '+79264042915'
select [id], [user], [role]
from [pos_user_role] with(nolock)
where [user] = @user