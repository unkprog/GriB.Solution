if exists(select [id] from [t_org_info] with(nolock) where [id]=@id)
begin
  update [t_org_info] 
  set [phone] = @phone, [email] = @email, [site] = @site where [id] = @id
end
else begin
  insert into [t_org_info]([id], [phone], [email], [site])
  select @id, @phone, @email, @site
end

select @id