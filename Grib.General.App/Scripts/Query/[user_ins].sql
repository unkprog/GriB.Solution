insert into [pos_user] ([cu], [uu], [regtype], [phone], [email])
select @cu, @uu, @regtype, @phone, @email

select cast(scope_identity() as int)