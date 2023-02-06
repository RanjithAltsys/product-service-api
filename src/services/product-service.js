const { ProductRepository,FeatureRepository } = require("../database");
const { FormateData } = require("../utils");

// All Business logic will be here
class ProductService {

    constructor(){
        this.repository = new ProductRepository();
        this.featureRepository = new FeatureRepository();
    }
    

    async createProduct(productInputs){

        const productResult = await this.repository.createProduct(productInputs)
        return FormateData(productResult);
    }
    
    async getProducts(){
        const products = await this.repository.products();
        
        return FormateData({
            products: products 
        })

    }

    async getProductsBySubCategory(subCategoryId){
        let productIds = await this.featureRepository.getFeatureProductsBySubCategory(subCategoryId);
        const products = await this.repository.findSelectedProducts(productIds)
        return FormateData(products);
    }

    async getProductsById(productId){
        const products = await this.repository.findById(productId);
        const featureList = await this.featureRepository.getFeatureListByProduct(productId);
        return FormateData({products: products , featureList: featureList})
    }
 

}

module.exports = ProductService;
