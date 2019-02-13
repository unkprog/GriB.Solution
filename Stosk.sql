 declare @datefrom datetime, @dateto datetime
 select @datefrom = '20190125', @dateto = '20190228'
 --and (@datefrom <= '18991230' or (@datefrom > '18991230' and [d].[cd] >= @datefrom))
 select [rep].[salepoint], [salepointname]=isnull([s].[name], ''), [rep].[product], [productname]=isnull([p].[name], '')
     , [rep].[quantityDebBeg], [rep].[quantityCreBeg], [rep].[quantityDeb], [rep].[quantityCre]
from (
select [rep].[salepoint], [rep].[product]
     , [quantityDebBeg]=sum([rep].[quantityDebBeg]), [quantityCreBeg]=sum([rep].[quantityCreBeg])
	 , [quantityDeb]   =sum([rep].[quantityDeb])   , [quantityCre]   =sum([rep].[quantityCre])
from (
      select [d].[salepoint], [p].[product]
           , [quantityDebBeg] = cast(0 as float), [quantityCreBeg] = sum(case when [d].[cd] <  @datefrom then [p].[quantity] else 0 end)
	       , [quantityDeb]    = cast(0 as float), [quantityCre]    = sum(case when [d].[cd] >= @datefrom then [p].[quantity] else 0 end)
      from [t_check_position] [p] with(nolock)
      inner join [t_check] [d] with(nolock) on [p].[id] = [d].[id]
      where [d].[d] = 0 and ([d].[options] & 1) = 1 
        and (@dateto <= '18991230' or (@dateto > '18991230' and [d].[cd] <= @dateto))
      group by  [d].[salepoint], [p].[product]
      union all	
      select [d].[salepoint], [p].[product]
           , [quantityDebBeg] = sum(case when [d].[cd] <  @datefrom and [d].[doctype] = 10        then [p].[quantity] else 0 end)
           , [quantityCreBeg] = sum(case when [d].[cd] <  @datefrom and [d].[doctype] in (40, 50) then [p].[quantity] else 0 end)
           , [quantityDeb]    = sum(case when [d].[cd] >= @datefrom and [d].[doctype] = 10        then [p].[quantity] else 0 end)
           , [quantityCre]    = sum(case when [d].[cd] >= @datefrom and [d].[doctype] in (40, 50) then [p].[quantity] else 0 end)
      from [t_document_position] [p] with(nolock)
      inner join [t_document] [d] with(nolock) on [p].[id] = [d].[id]
      where [d].[d] = 0 and ([d].[options] & 1) = 1 
        and (@dateto <= '18991230' or (@dateto > '18991230' and [d].[cd] <= @dateto))
      group by  [d].[salepoint], [p].[product]
      union all
      select [d].[salepointto], [p].[product]
           , [quantityDebBeg] = sum(case when [d].[cd] <  @datefrom then [p].[quantity] else 0 end), [quantityCreBeg] = 0
           , [quantityDeb]    = sum(case when [d].[cd] >= @datefrom then [p].[quantity] else 0 end), [quantityCre] = 0
      from [t_document_position] [p] with(nolock)
      inner join [t_document] [d] with(nolock) on [p].[id] = [d].[id]
      where [d].[d] = 0 and ([d].[options] & 1) = 1 and [d].[doctype] in (50)
        and (@dateto <= '18991230' or (@dateto > '18991230' and [d].[cd] <= @dateto))
      group by  [d].[salepointto], [p].[product]
     ) [rep]
group by  [rep].[salepoint], [rep].[product]
) [rep]
left outer join [t_product] [p] with(nolock) on [p].[d] = 0 and [rep].[product]   = [p].[id]
left outer join [t_org]     [s] with(nolock) on [s].[d] = 0 and [rep].[salepoint] = [s].[id]