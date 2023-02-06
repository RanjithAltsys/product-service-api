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
 

}

module.exports = FeatureService;
