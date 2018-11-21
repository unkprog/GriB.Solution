if exists(select [id] from [t_unit] with(nolock) where [id]=@id)
begin
  update [t_unit] 
  set [ud] = getdate(), [uu] = @u, [code] = @code, [nameshort] = @nameshort, [name] = @name, [type] = @type
  where [id] = @id 
  select @id
end
else begin
  insert into [t_unit]([cu], [uu], [code], [nameshort], [name], [type])
  select @u, @u, @code, @nameshort, @name, @type
  select cast(scope_identity() as int)
end

