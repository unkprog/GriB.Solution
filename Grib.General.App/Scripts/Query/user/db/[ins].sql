insert into [pos_userdb] ([id], [db])
values(@id, @db)

select cast(scope_identity() as int)