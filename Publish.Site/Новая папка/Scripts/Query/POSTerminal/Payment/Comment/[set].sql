if exists(select [id] from [t_payment_comment] with(nolock) where [id]=@id)
begin
  update [t_payment_comment] 
  set [comment] = @comment
  where [id] = @id 
end
else begin
  insert into [t_payment_comment]([id], [comment])
  select @id, @comment
end

select @id

