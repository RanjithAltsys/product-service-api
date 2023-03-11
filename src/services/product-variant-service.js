const { ProductRepository,FeatureRepository,ProductVariantRepository} = require("../database");
const { FormateData } = require("../utils");
const CategoryService = require("./category-service");
const FeatureService = require("./feature-service");
const SubCategoryService = require("./sub-category-service");

// All Business logic will be here
class ProductVariantService {

    constructor(){
        this.repository = new ProductVariantRepository();
        this.featureRepository = new FeatureRepository();
        this.subCategoryService = new SubCategoryService();
        this.featureService = new FeatureService();
        this.categoryService = new CategoryService();
    }

    async createProductVariant(productVariantInputs){

        const productVariantResult = await this.repository.createProductVariant(productVariantInputs);
        return FormateData(productVariantResult);
    }

    async findByProductId(productId){
        const productVariantResult = await this.repository.findByProductId(productId);
        return FormateData({
            productVariants: productVariantResult
        })
    }

    async findByProductIdsByIds(productVariantIds) {
        const productsResult = await this.repository.findByProductIdsByIds(productVariantIds);
        return FormateData({
            products: productsResult
        })
    }
}

module.exports = ProductVariantService;
