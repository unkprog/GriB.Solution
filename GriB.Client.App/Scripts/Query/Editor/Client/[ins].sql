insert into [t_client] ([cu], [uu], [phone])
select @cu, @uu, @phone

select cast(scope_identity() as int)