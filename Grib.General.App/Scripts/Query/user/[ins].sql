insert into [pos_user] ([cu], [uu], [phone])
select @cu, @uu, @phone

select cast(scope_identity() as int)