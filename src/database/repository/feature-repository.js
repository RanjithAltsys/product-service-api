const mongoose = require('mongoose');
const { FeatureModel,ProductVariantModel } = require("../models");

//Dealing with data base operations
class FeatureRepository {


    async createFeature({ name, description, createdBy, updatedBy,subCategoryId ,productId, productVariantId, properties, isHighlight }){

        const feature = new FeatureModel({
            name, description, createdBy, updatedBy, subCategoryId, productId, productVariantId, properties, isHighlight
        })

        const featureresult = await feature.save();
        return featureresult;
    }

     async getFeatureList(){
        return await FeatureModel.find();
    }
    
    async getFeatureProductsBySubCategory(subCategoryId) {
        let featureList = await FeatureModel.find({subCategoryId});
        var productsList = featureList.map((feature) => { return feature.productId });
        return productsList.length > 0 ? productsList : [];    
    }

    async getFeatureListByProduct(productId) {
        let featureList = await FeatureModel.find({productId});
        return featureList.length > 0 ? featureList : [];   
    }

    async getFeatureListBySearch(searchKey) {
        const query = { name: { $regex: searchKey, $options: 'i' } };
        let featureList = await FeatureModel.find(query);
        var productsList = featureList.map((feature) => { return feature.productId });
        return productsList.length > 0 ? productsList : [];    
    }

    async getFeatureListBySubCategory(subCategoryIds) {
        let featureList = await FeatureModel.find().where('subCategoryId').in(subCategoryIds).exec();
        // this.getSubCategoryProductCounts(featureList);
        var productsList = featureList.filter((feature) => {
            if(feature.productId) return feature.productId 
        });
        return productsList.length > 0 ? productsList : [];    
    }

    async getProductVariantsBySubCategory(subCategoryIds) {
        let featureList = await FeatureModel.find().where('subCategoryId').in(subCategoryIds).exec();
        let productVariantIdList = [];
        featureList.forEach(feature => {
            if(feature.productVariantId) {
                productVariantIdList.push(feature.productVariantId);
            }
        });
        return productVariantIdList.length > 0 ? productVariantIdList : [];    
    }


    async getFeatureListByProductVariantId(productsVariantId) {
        let productsVariants =  await FeatureModel.aggregate([
            {
                $match: {
                    "productVariantId": productsVariantId
                }
             }
         ]).exec();
        return productsVariants.length > 0 ? productsVariants : [];    
    }

    async getSubCategoryProductCounts(payload) {
      let categoryMap = {};
        for (let i = 0; i < payload.length; i++) {
            if (payload[i].productId) {
                if (categoryMap[payload[i].subCategoryId] == undefined) {
                    categoryMap[payload[i].subCategoryId] = new Set([payload[i].productId]);
                }
                else {
                    let products = categoryMap[payload[i].subCategoryId];
                    products.add(payload[i].productId);
                }
            }
        }
    }
}

module.exports = FeatureRepository;
