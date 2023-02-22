const mongoose = require('mongoose');
const { ProductFamilyModel,ProductFamilyLicenseMapModel,ProductModel,
ProductFamilyFeatureMapModel,FeatureModel } = require("../models");

//Dealing with data base operations
class ProductFamilyRepository {


    async createProductFamily({ name, description, createdBy, updatedBy }){

        const productFamily = new ProductFamilyModel({
            name, description, createdBy, updatedBy
        })

        const productFamilyResult = await productFamily.save();
        return productFamilyResult;
    }


    async productsFamily(){
        return await ProductFamilyModel.find();
    }
   
    async addProductToProductFamily({ productFamilyId, productId, createdBy, updatedBy }){

        const productFamilyLicenseMap = new ProductFamilyLicenseMapModel({
            productFamilyId, productId, createdBy, updatedBy
        });

        const productFamilyLicenseMapResult = await productFamilyLicenseMap.save();
        return productFamilyLicenseMapResult;
    }
    
    async productsFamilyById(productFamilyId){
        let productFamily =  await ProductFamilyLicenseMapModel.aggregate([
            {
               $lookup:
                  {
                    from: ProductFamilyModel.collection.name,
                    localField: "productFamilyId",
                    foreignField: "_id",
                    as: "productFamily"
                  },
            },
            {
                $lookup: {
                    from: ProductModel.collection.name,
                    localField: "productId",
                    foreignField: "_id",
                    as: "products"
                },
            },
            {
                $lookup: {
                    from: ProductModel.collection.name,
                    localField: "productId",
                    foreignField: "_id",
                    as: "products"
                },
            },
            {
                $match: {
                    "productFamilyId":  mongoose.Types.ObjectId(productFamilyId)
                }
             }
         ]).exec();

         let features =  await ProductFamilyFeatureMapModel.aggregate([
            {
                $lookup: {
                    from: FeatureModel.collection.name,
                    localField: "featureId",
                    foreignField: "_id",
                    as: "features"
                },
            },
            {
                $match: {
                    "productFamilyId":  mongoose.Types.ObjectId(productFamilyId)
                }
             }
         ]).exec();
   
        if(features.length > 0)
        productFamily[0].features = features[0].features;
        else productFamily[0].features = [];
 
         return  productFamily;

    }

    async productsFamilyByIds(productFamilyIds){
        let productFamily =  await ProductFamilyLicenseMapModel.aggregate([
            {
               $lookup:
                  {
                    from: ProductFamilyModel.collection.name,
                    localField: "productFamilyId",
                    foreignField: "_id",
                    as: "productFamily"
                  },
            },
            {
                $lookup: {
                    from: ProductModel.collection.name,
                    localField: "productId",
                    foreignField: "_id",
                    as: "products"
                },
            },
            {
                $lookup: {
                    from: ProductModel.collection.name,
                    localField: "productId",
                    foreignField: "_id",
                    as: "products"
                },
            },
            { 
                $match: 
                    { "productFamilyId" : { $in: productFamilyIds } } 
            }
         ]).exec();

         let features =  await ProductFamilyFeatureMapModel.aggregate([
            {
                $lookup: {
                    from: FeatureModel.collection.name,
                    localField: "featureId",
                    foreignField: "_id",
                    as: "features"
                },
            },
            { 
                $match: 
                    { "productFamilyId" : { $in: productFamilyIds } } 
            }
         ]).exec();
   
        if(features.length > 0)
        productFamily[0].features = features[0].features;
        else productFamily[0].features = [];
 
         return  productFamily;

    }


    async addFeatureToProductFamily({ productFamilyId, featureId, createdBy, updatedBy }){

        const productFamilyFeatureMap = new ProductFamilyFeatureMapModel({
            productFamilyId, featureId, createdBy, updatedBy
        });

        const productFamilyFeatureMapResult = await productFamilyFeatureMap.save();
        return productFamilyFeatureMapResult;
    }
    
}

module.exports = ProductFamilyRepository;
