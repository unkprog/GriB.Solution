if not exists(select * from [pos_sqlsrv] with(nolock))
	insert into [pos_sqlsrv] ([address], [user], [pass])
	select @address, @user, @pass
