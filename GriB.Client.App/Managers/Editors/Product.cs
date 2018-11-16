using System.Collections.Generic;
using System.Data.SqlClient;
using GriB.Common.Sql;
using GriB.Client.App.Models.Editor;
using System;

namespace GriB.Client.App.Managers.Editors
{
    public static class Product
    {

        private static product readFromValues(object[] values) => new product() { id = (int)values[0], pid = (int)values[1], type = (int)values[2], category = (int)values[3], name = (string)values[4], photo = (string)values[5] };

        private const string cmdGet = @"Product\[get]";
        public static List<product> GetProducts(this Query query)
        {
            List<product> result = new List<product>();
            query.Execute(cmdGet, new SqlParameter[] { new SqlParameter() { ParameterName = "@id", Value = 0 }, new SqlParameter() { ParameterName = "@name", Value = string.Empty } }
            , (values) =>
            {
                result.Add(readFromValues(values));
            });

            return result;
        }

        public static product GetProduct(this Query query, int id)
        {
            product result = new product();
            query.Execute(cmdGet, new SqlParameter[] { new SqlParameter() { ParameterName = "@id", Value = id }, new SqlParameter() { ParameterName = "@name", Value = string.Empty } }
            , (values) =>
            {
                result = readFromValues(values);
            });

            return result;
        }

        private const string cmdSet = @"Product\[set]";
        public static product SetProduct(this Query query, product product, int user)
        {
            product result = product;
            query.Execute(cmdSet, new SqlParameter[] { new SqlParameter("@id", product.id), new SqlParameter("@u", user), new SqlParameter("@pid", product.pid), new SqlParameter("@type", product.type), new SqlParameter("@category", product.category), new SqlParameter("@name", product.name), new SqlParameter("@photo", product.photo) }
            , (values) =>
            {
                result.id = (int)values[0];
            });

            return GetProduct(query, result.id);
        }

        private const string cmdDel = @"Product\[del]";
        public static void DelProduct(this Query query, int id, int user)
        {
            query.Execute(cmdDel, new SqlParameter[] { new SqlParameter("@id", id), new SqlParameter("@u", user) }
            , (values) => { });
        }

        private const string cmdGetDescription = @"Product\Description\[get]";
        public static product GetProductDescription(this Query query, product product)
        {
            product result = product;
            query.Execute(cmdGetDescription, new SqlParameter[] { new SqlParameter("@id", product.id), new SqlParameter("@description", product.description) }
            , (values) =>
            {
                product.description = (string)values[1];
            });

            return result;
        }

        private const string cmdSetDescription = @"Product\Description\[set]";
        public static product SetProductDescription(this Query query, product product)
        {
            product result = product;
            query.Execute(cmdSetDescription, new SqlParameter[] { new SqlParameter("@id", product.id), new SqlParameter("@description", product.description) }
            , (values) => { });
            return result;
        }

        private const string cmdGetSalepointAcces = @"Product\SalepointAccess\[get]";
        public static product GetProductSalepointAccess(this Query query, product product)
        {
            product result = product;
            result.accesssalepoints = new List<salepointaccess>();

            query.Execute(cmdGetSalepointAcces, new SqlParameter[] { new SqlParameter("@id", product.id), new SqlParameter("@type", Organization.typeDivision) }
            , (values) =>
            {
                int idx = 0;
                salepointaccess item = new salepointaccess()
                {
                    salepoint = new salepoint() { id = (int)values[idx++], name = (string)values[idx++], company_id = (int)values[idx++], city = (string)values[idx++], address = (string)values[idx++], schedule = (string)values[idx++] }
                    , isaccess = (bool)values[idx++]
                };
                result.accesssalepoints.Add(item);
            });

            return result;
        }

        private const string cmdSetSalepointAcces = @"Product\SalepointAccess\[set]";
        public static product SetProductSalepointAccess(this Query query, product product)
        {
            product result = product;
            foreach (var item in result.accesssalepoints)
                query.Execute(cmdSetSalepointAcces, new SqlParameter[] { new SqlParameter("@id", product.id), new SqlParameter("@salepoint", item.salepoint.id), new SqlParameter("@isaccess", item.isaccess) }
                , (values) => { });
            return result;
        }

        private const string cmdGetAccount = @"Product\Account\[get]";
        public static product GetProductAccount(this Query query, product product)
        {
            product result = product;
            query.Execute(cmdGetAccount, new SqlParameter[] { new SqlParameter("@id", product.id), new SqlParameter("@vendorcode", string.Empty), new SqlParameter("@barcode", string.Empty) }
            , (values) =>
            {
                product.vendorcode = (string)values[1];
                product.barcode = (string)values[2];
                product.unit = (int)values[3];
                product.quantity = (double)values[4];
                product.currency = (int)values[5];
            });

            return result;
        }

        private const string cmdSetAccount = @"Product\Account\[set]";
        public static product SetProductAccount(this Query query, product product)
        {
            product result = product;
            query.Execute(cmdSetAccount, new SqlParameter[] { new SqlParameter("@id", product.id), new SqlParameter("@vendorcode", product.vendorcode), new SqlParameter("@barcode", product.barcode)
            , new SqlParameter("@unit", product.unit), new SqlParameter("@quantity", product.quantity), new SqlParameter("@currency", product.currency) }
            , (values) => { });
            return result;
        }

        private const string cmdGetCost = @"Product\Cost\[get]";
        public static product GetProductCost(this Query query, product product)
        {
            product result = product;
            query.Execute(cmdGetCost, new SqlParameter[] { new SqlParameter("@id", product.id) }
            , (values) =>
            {
                product.costprices.Add(new price_item() { date = (DateTime)values[1], price = (double)values[2] });
            });
            if(product.costprices.Count > 0)
            product.costprice = product.costprices[0].price;

            return result;
        }

        private const string cmdSetCost = @"Product\Cost\[set]";
        public static product SetProductCost(this Query query, product product, int user)
        {
            product result = product;
            query.Execute(cmdSetCost, new SqlParameter[] { new SqlParameter("@id", product.id), new SqlParameter("@u", user), new SqlParameter("@price", product.costprice) }
            , (values) => { });
            return result;
        }

        private const string cmdGetSale = @"Product\Sale\[get]";
        public static product GetProductSale(this Query query, product product)
        {
            product result = product;
            query.Execute(cmdGetSale, new SqlParameter[] { new SqlParameter("@id", product.id) }
            , (values) =>
            {
                product.sellingprices.Add(new price_item() { date = (DateTime)values[1], price = (double)values[2] });
            });
            if (product.sellingprices.Count > 0)
                product.sellingprice = product.sellingprices[0].price;

            return result;
        }

        private const string cmdSetSale = @"Product\Sale\[set]";
        public static product SetProductSale(this Query query, product product, int user)
        {
            product result = product;
            query.Execute(cmdSetSale, new SqlParameter[] { new SqlParameter("@id", product.id), new SqlParameter("@u", user), new SqlParameter("@price", product.sellingprice) }
            , (values) => { });
            return result;
        }

        private const string cmdGetComposition = @"Product\Composition\[get]";
        public static product GetProductComposition(this Query query, product product)
        {
            product result = product;
            query.Execute(cmdGetComposition, new SqlParameter[] { new SqlParameter("@id", product.id) }
            , (values) =>
            {
                product.composition.Add(new product_composition() { index = (int)values[1], quantity = (double)values[3], product = new product() { id = (int)values[2], name = (string)values[4], sellingprice = (double)values[5], unit = (int)values[6], unit_name = (string)values[7] } });
            });

            return result;
        }

        private const string cmdGetCompositionNew = @"Product\Composition\[get_new]";
        public static product_composition GetProductCompositionNew(this Query query, int id)
        {
            product_composition result = new product_composition();
            query.Execute(cmdGetCompositionNew, new SqlParameter[] { new SqlParameter("@id", id) }
            , (values) =>
            {
               result = new product_composition() { index = (int)values[1], quantity = (double)values[3], product = new product() { id = (int)values[2], name = (string)values[4], sellingprice = (double)values[5], unit = (int)values[6], unit_name = (string)values[7] } };
            });

            return result;
        }

        private const string cmdSetConposition = @"Product\Composition\[set]";
        public static product SetProductComposition(this Query query, product product)
        {
            product result = product;
            int index = 0;
            foreach (var item in result.composition)
            {
                index++;
                item.index = index;
                query.Execute(cmdSetConposition, new SqlParameter[] { new SqlParameter("@id", result.id), new SqlParameter("@index", item.index), new SqlParameter("@quantity", item.quantity), new SqlParameter("@product", item.product?.id) }
                , (values) => { });
            }
            DelProductComposition(query, product);
            return result;
        }

        private const string cmdDelConposition = @"Product\Composition\[del]";
        public static product DelProductComposition(this Query query, product product)
        {
            product result = product;
            query.Execute(cmdDelConposition, new SqlParameter[] { new SqlParameter("@id", result.id), new SqlParameter("@index", (result.composition != null && result.composition.Count > 0 ? result.composition[result.composition.Count-1].index : 0)) }
                , (values) => { });
            return result;
        }
    }
}