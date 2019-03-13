﻿using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using GriB.Common.Sql;
using GriB.Client.App.Models.Editor;
using GriB.Client.App.Models;

namespace GriB.Client.App.Managers.Editors
{
    public static class Product
    {

        private static product readFromValues(object[] values) => new product() { id = (int)values[0], pid = (int)values[1], type = (int)values[2], category = new category() { id = (int)values[3], name = (string)values[7] }, name = (string)values[4], photo = (string)values[5], putonsale = (bool)values[6], unit = new unit() { id = (int)values[8], code = (string)values[9] } };

        private const string cmdGet = @"Editor\Product\[get]";
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

        private const string cmdGetMap = @"Editor\Product\[getmap]";
        public static List<product> GetProductMaps(this Query query)
        {
            List<product> result = new List<product>();
            query.Execute(cmdGetMap, new SqlParameter[] { new SqlParameter() { ParameterName = "@id", Value = 0 }, new SqlParameter() { ParameterName = "@name", Value = string.Empty } }
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

            if(result.id == 0)
            {
                List<t_org> listOrgs = Organization.GetOrganizations(query, Organization.typeCompany);
                if (listOrgs != null && listOrgs.Count > 0)
                    result.currency = listOrgs[0].defcurrency;
            }

            return result;
        }

        private const string cmdSet = @"Editor\Product\[set]";
        public static product SetProduct(this Query query, product product, int user)
        {
            product result = product;
            query.Execute(cmdSet, new SqlParameter[] { new SqlParameter("@id", product.id), new SqlParameter("@u", user), new SqlParameter("@pid", product.pid), new SqlParameter("@type", product.type), new SqlParameter("@category", product.category == null ? 0 : product.category.id), new SqlParameter("@name", product.name), new SqlParameter("@photo", product.photo), new SqlParameter("@putonsale", product.putonsale) }
            , (values) =>
            {
                result.id = (int)values[0];
            });

            return GetProduct(query, result.id);
        }

        private const string cmdDel = @"Editor\Product\[del]";
        public static void DelProduct(this Query query, int id, int user)
        {
            query.Execute(cmdDel, new SqlParameter[] { new SqlParameter("@id", id), new SqlParameter("@u", user) }
            , (values) => { });
        }

        private const string cmdGetDescription = @"Editor\Product\Description\[get]";
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

        private const string cmdSetDescription = @"Editor\Product\Description\[set]";
        public static product SetProductDescription(this Query query, product product)
        {
            product result = product;
            query.Execute(cmdSetDescription, new SqlParameter[] { new SqlParameter("@id", product.id), new SqlParameter("@description", product.description) }
            , (values) => { });
            return result;
        }

        private const string cmdGetSalepointAcces = @"Editor\Product\SalepointAccess\[get]";
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

        private const string cmdSetSalepointAcces = @"Editor\Product\SalepointAccess\[set]";
        public static product SetProductSalepointAccess(this Query query, product product)
        {
            product result = product;
            foreach (var item in result.accesssalepoints)
                query.Execute(cmdSetSalepointAcces, new SqlParameter[] { new SqlParameter("@id", product.id), new SqlParameter("@salepoint", item.salepoint.id), new SqlParameter("@isaccess", item.isaccess) }
                , (values) => { });
            return result;
        }

        private const string cmdGetAccount = @"Editor\Product\Account\[get]";
        public static product GetProductAccount(this Query query, product product)
        {
            product result = product;
            query.Execute(cmdGetAccount, new SqlParameter[] { new SqlParameter("@id", product.id), new SqlParameter("@vendorcode", string.Empty), new SqlParameter("@barcode", string.Empty) }
            , (values) =>
            {
                int cnt = 1;
                product.vendorcode = (string)values[cnt++];
                product.barcode = (string)values[cnt++];
                product.unit = new unit() { id = (int)values[cnt++], name = (string)values[cnt++] };
                product.quantity = (double)values[cnt++];
                product.currency = new unit() { id = (int)values[cnt++], name = (string)values[cnt++] };
            });

            return result;
        }

        private const string cmdSetAccount = @"Editor\Product\Account\[set]";
        public static product SetProductAccount(this Query query, product product)
        {
            product result = product;
            query.Execute(cmdSetAccount, new SqlParameter[] { new SqlParameter("@id", product.id), new SqlParameter("@vendorcode", product.vendorcode), new SqlParameter("@barcode", product.barcode)
            , new SqlParameter("@unit", Helper.GetSqlParamValue(product.unit)), new SqlParameter("@quantity", product.quantity), new SqlParameter("@currency",  Helper.GetSqlParamValue(product.currency)) }
            , (values) => { });
            return result;
        }

        private const string cmdGetCost = @"Editor\Product\Cost\[get]";
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

        private const string cmdSetCost = @"Editor\Product\Cost\[set]";
        public static product SetProductCost(this Query query, product product, int user)
        {
            product result = product;
            query.Execute(cmdSetCost, new SqlParameter[] { new SqlParameter("@id", product.id), new SqlParameter("@u", user), new SqlParameter("@price", product.costprice) }
            , (values) => { });
            return result;
        }

        private const string cmdGetSale = @"Editor\Product\Sale\[get]";
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

        private const string cmdSetSale = @"Editor\Product\Sale\[set]";
        public static product SetProductSale(this Query query, product product, int user)
        {
            product result = product;
            query.Execute(cmdSetSale, new SqlParameter[] { new SqlParameter("@id", product.id), new SqlParameter("@u", user), new SqlParameter("@price", product.sellingprice) }
            , (values) => { });
            return result;
        }

        private const string cmdGetMapEdit = @"Editor\Product\Map\[get]";
        public static product GetProductMap(this Query query, product product)
        {
            product result = product;
            query.Execute(cmdGetMapEdit, new SqlParameter[] { new SqlParameter("@id", product.id) }
            , (values) =>
            {
                int cnt = 1;
                product.approver      = (string)values[cnt++];
                product.signer        = (string)values[cnt++];
                product.finishproduct = (string)values[cnt++];
                product.finishdish    = (string)values[cnt++];
            });

            return result;
        }
        private const string cmdSetMapEdit = @"Editor\Product\Map\[set]";
        public static product SetProductMap(this Query query, product product)
        {
            product result = product;
            query.Execute(cmdSetMapEdit, new SqlParameter[] { new SqlParameter("@id", result.id), new SqlParameter("@approver", product.approver), new SqlParameter("@signer", product.signer)
                   , new SqlParameter("@finishproduct", product.finishproduct), new SqlParameter("@finishdish", product.finishdish) }
            , (values) => { });
            return result;
        }

        private const string cmdGetComposition = @"Editor\Product\Composition\[get]";
        public static product GetProductComposition(this Query query, product product)
        {
            product result = product;
            query.Execute(cmdGetComposition, new SqlParameter[] { new SqlParameter("@id", product.id) }
            , (values) =>
            {
                int cnt = 1;
                product.composition.Add(new product_composition() { index = (int)values[cnt++]
                    , product = new product() { id = (int)values[cnt++], name = (string)values[cnt++] }
                    , unit = new unit() { id = (int)values[cnt++], code = (string)values[cnt++] }
                    , netto = (double)values[cnt++], percentcold = (double)values[cnt++], brutto = (double)values[cnt++], percentheat = (double)values[cnt++], exitproduct = (double)values[cnt++], description=(string)values[cnt++] } );
            });

            return result;
        }

        //private const string cmdGetCompositionNew = @"Editor\Product\Composition\[get_new]";
        //public static product_composition GetProductCompositionNew(this Query query, int id)
        //{
        //    product_composition result = new product_composition();
        //    query.Execute(cmdGetCompositionNew, new SqlParameter[] { new SqlParameter("@id", id) }
        //    , (values) =>
        //    {
        //       result = new product_composition() { index = (int)values[1], quantity = (double)values[3], product = new product() { id = (int)values[2], name = (string)values[4], sellingprice = (double)values[5], unit = new unit() { id = (int)values[6], name = (string)values[7] } } };
        //    });

        //    return result;
        //}

        private const string cmdSetConposition = @"Editor\Product\Composition\[set]";
        public static product SetProductComposition(this Query query, product product)
        {
            product result = product;
            int index = 0;
            foreach (var item in result.composition)
            {
                index++;
                item.index = index;
                query.Execute(cmdSetConposition, new SqlParameter[] { new SqlParameter("@id", result.id), new SqlParameter("@index", item.index)
                    , new SqlParameter("@product", Helper.GetSqlParamValue(item.product)), new SqlParameter("@unit", Helper.GetSqlParamValue(item.unit))
                , new SqlParameter("@netto", item.netto), new SqlParameter("@percentcold", item.percentcold), new SqlParameter("@brutto", item.brutto), new SqlParameter("@percentheat", item.percentheat), new SqlParameter("@exitproduct", item.exitproduct), new SqlParameter("@description", item.description) }
                , (values) => { });
            }
            DelProductComposition(query, product);
            return result;
        }

        private const string cmdDelConposition = @"Editor\Product\Composition\[del]";
        public static product DelProductComposition(this Query query, product product)
        {
            product result = product;
            query.Execute(cmdDelConposition, new SqlParameter[] { new SqlParameter("@id", result.id), new SqlParameter("@index", (result.composition != null && result.composition.Count > 0 ? result.composition[result.composition.Count-1].index : 0)) }
                , (values) => { });
            return result;
        }
    }
}