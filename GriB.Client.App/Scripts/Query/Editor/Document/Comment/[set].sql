if exists(select [id] from [t_document_comment] with(nolock) where [id]=@id)
begin
  update [t_document_comment] 
  set [comment] = @comment
  where [id] = @id 
end
else begin
  insert into [t_document_comment]([id], [comment])
  select @id, @comment
end

select @id

