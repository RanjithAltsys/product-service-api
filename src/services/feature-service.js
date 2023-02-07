const { FeatureRepository } = require("../database");
const { FormateData } = require("../utils");

// All Business logic will be here
class FeatureService {

    constructor(){
        this.repository = new FeatureRepository();
    }
    
    async createFeature(featureInputs){

        const featureResult = await this.repository.createFeature(featureInputs)
        return FormateData(featureResult);
    }
    
    async getFeatureList(){
        const featureResult = await this.repository.getFeatureList();
        return FormateData({
            features: featureResult
        })
    }

    async getFeatureListByProduct(productId){
        const featureResult = await this.repository.getFeatureListByProduct(productId);
        return FormateData({
            features: featureResult
        })
    }

    async getFeatureListBySearch(searchKey){
        const featureResult = await this.repository.getFeatureListBySearch(searchKey);
        return FormateData({
            products: featureResult
        })
    }

    async getFeatureListBySubCategory(subCategoryids){
        const subCategoryResult = await this.repository.getFeatureListBySubCategory(subCategoryids);
        return FormateData({
            products: subCategoryResult
        })
    }
}

module.exports = FeatureService;
