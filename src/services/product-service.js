const { ProductRepository,FeatureRepository,SubCategoryRepository} = require("../database");
const { FormateData } = require("../utils");
const CategoryService = require("./category-service");
const FeatureService = require("./feature-service");
const SubCategoryService = require("./sub-category-service");

// All Business logic will be here
class ProductService {

    constructor(){
        this.repository = new ProductRepository();
        this.featureRepository = new FeatureRepository();
        this.subCategoryService = new SubCategoryService();
        this.featureService = new FeatureService();
        this.categoryService = new CategoryService();
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

    async getProductsBySubCategory(categoryId){
        let categoryFound = await this.categoryService.getCategoryById(categoryId);
        let subCategoryIds = [];
        if(categoryFound?.data?.category != null) {
            let subCategories = await this.subCategoryService.getSubCategoryByCategoryId(categoryId);
            subCategoryIds = subCategories?.data?.subCategorys.map((data) => { return data._id });
        }
        else subCategoryIds = [categoryId];

        let productIds = await this.featureRepository.getFeatureListBySubCategory(subCategoryIds);
        const products = await this.repository.findSelectedProducts(productIds)
        return FormateData({products: products });
    }

    async getProductsBySubCategoryIds(subCategoryIds) {
        let productIds = await this.featureRepository.getFeatureListBySubCategory(subCategoryIds);
        const products = await this.repository.findSelectedProducts(productIds)
        return FormateData({products: products });
    }


    async getProductsById(productId){
        const products = await this.repository.findById(productId);
        const featureList = await this.featureRepository.getFeatureListByProduct(productId);
        return FormateData({products: products , featureList: featureList})
    }

    async getProductsBySearch(searchKey){
        const featureList = await this.featureService.getFeatureListBySearch(searchKey);
        const subCategoryList = await this.subCategoryService.getSubCategoryBySearch(searchKey);
        const subCategoryProductList = await this.featureService.getFeatureListBySubCategory(subCategoryList['data']['subCategorys']);
        const productList = await this.getProductsListBySearch(searchKey);
        let productIds = [
            ... await this.getProductIdsByResponse(featureList),
            ...await this.getProductIdsByResponse(subCategoryProductList),
            ...await this.getProductIdsByResponse(productList)
        ];
        let products = await this.repository.findSelectedProducts(productIds);
        return FormateData({ products });
    }

    async getProductIdsByResponse(payload) {
       return payload['data']['products'];
    };

    async getProductsListBySearch(searchKey){
        const products = await this.repository.getProductListBySearch(searchKey);
        return FormateData({
            products: products 
        })
    }

}

module.exports = ProductService;
