const { ProductRepository,FeatureRepository,SubCategoryRepository} = require("../database");
const { FormateData } = require("../utils");
const CategoryService = require("./category-service");
const FeatureService = require("./feature-service");
const SubCategoryService = require("./sub-category-service");
const ProductVariantService = require("./product-variant-service");

// All Business logic will be here
class ProductService {

    constructor(){
        this.repository = new ProductRepository();
        this.featureRepository = new FeatureRepository();
        this.subCategoryService = new SubCategoryService();
        this.featureService = new FeatureService();
        this.categoryService = new CategoryService();
        this.productVariantService = new ProductVariantService();
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
        let products = await this.featureRepository.getFeatureListBySubCategory(subCategoryIds);
        let productVariantIds = await this.featureRepository.getProductVariantsBySubCategory(subCategoryIds);
        const productsIdsNew = await this.productVariantService.findByProductIdsByIds(productVariantIds);
        products = [...products,...productsIdsNew.data.products];
        let productsList = await this.repository.findSelectedProducts(products);
        return FormateData({ products: productsList });
    }


    async getProductsById(productId) {
            const products = await this.repository.findById(productId);
            const productVariants = await this.productVariantService.findByProductId(productId);
            let productFeatureList = [];
            let productVariantFeatureList = [];
            if (productVariants?.data && productVariants?.data?.productVariants?.length > 0) {
                productVariantFeatureList = await this.featureService.getFeatureListByProductVariantIds(productVariants.data.productVariants);
                if(productVariantFeatureList?.data?.productVariants?.length > 0) {
                    productVariantFeatureList = productVariantFeatureList?.data?.productVariants;
                }
                else productVariantFeatureList = []
            }
            else {
                productFeatureList = await this.featureRepository.getFeatureListByProduct(productId);
            }
            return FormateData({ products: products, productFeatureList: productFeatureList, productVariants: productVariantFeatureList })
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
