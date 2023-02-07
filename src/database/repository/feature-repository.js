const mongoose = require('mongoose');
const { FeatureModel } = require("../models");

//Dealing with data base operations
class FeatureRepository {


    async createFeature({ name, description, createdBy, updatedBy,subCategoryId ,productId }){

        const feature = new FeatureModel({
            name, description, createdBy, updatedBy, subCategoryId, productId
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
        console.log("++++searchKey++++++",searchKey);
        const query = { name: { $regex: searchKey, $options: 'i' } };
        let featureList = await FeatureModel.find(query);
        var productsList = featureList.map((feature) => { return feature.productId });
        return productsList.length > 0 ? productsList : [];    
    }

    async getFeatureListBySubCategory(subCategoryIds) {
        console.log("++++subCategoryIds++++++",subCategoryIds);
        let featureList = await FeatureModel.find().where('subCategoryId').in(subCategoryIds).exec();
        var productsList = featureList.map((feature) => { return feature.productId });
        return productsList.length > 0 ? productsList : [];    
    }
    
}

module.exports = FeatureRepository;
