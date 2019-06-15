update [t_check] set [ud] = getdate(), [uu] = @u, [discount] = @discount, [discountref]=@discountref
where [id] = @id