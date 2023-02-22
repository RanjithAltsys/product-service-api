const { ProductFamilyRepository } = require("../database");
const { FormateData } = require("../utils");

// All Business logic will be here
class ProductFamilyService {

    constructor() {
        this.repository = new ProductFamilyRepository();
    }

    async createProductFamily(productFamilyInputs){

        const productFamilyResult = await this.repository.createProductFamily(productFamilyInputs)
        return FormateData(productFamilyResult);
    }
    
    async getProductsFamily(){

        const productsFamily = await this.repository.productsFamily();
        
        return FormateData({
            productsFamily: productsFamily 
        })
    }

    async addProductToProductFamily(productFamilyLicenseMapInputs){

        const productFamilyLicenseMapResult = await this.repository.addProductToProductFamily(productFamilyLicenseMapInputs)
        return FormateData(productFamilyLicenseMapResult);
    }

    async getProductsFamilyById(productFamilyId){
        const productsFamily = await this.repository.productsFamilyById(productFamilyId);
        
        return FormateData({
            productsFamily: productsFamily 
        })
    }

    async getProductsFamilyByIds(productFamilyIds){
        const productsFamily = await this.repository.productsFamilyByIds(productFamilyIds);
        
        return FormateData({
            productsFamily: productsFamily 
        })
    }

    async addFeatureToProductFamily(productFamilyFeatureMapInputs){

        const productFamilyFeatureMapResult = await this.repository.addFeatureToProductFamily(productFamilyFeatureMapInputs)
        return FormateData(productFamilyFeatureMapResult);
    }
 

}

module.exports = ProductFamilyService;
