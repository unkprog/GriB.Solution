insert into [pos_user_role] ([user], [role])
select @user, @role

select cast(scope_identity() as int)