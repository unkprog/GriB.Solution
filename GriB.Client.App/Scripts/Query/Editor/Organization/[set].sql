if @id > 0
begin
  update [t_org] 
  set [ud] = getdate(), [uu]=@uu, [name] = @name, [type] = @type, [pid] = @pid where [id] = @id
  select @id
end
else begin
  insert into [t_org]([cu], [uu], [name], [type], [pid])
  select @cu, @uu, @name, @type, @pid

  select cast(scope_identity() as int)
end

