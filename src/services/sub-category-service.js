const { SubCategoryRepository } = require("../database");
const { FormateData } = require("../utils");
const CategoryService = require("./category-service");

// All Business logic will be here
class SubCategoryService {

    constructor(){
        this.repository = new SubCategoryRepository();
        this.categoryService = new CategoryService();
    }
    
    async createSubCategory(subCategoryInputs){

        const subCategoryResult = await this.repository.createSubCategory(subCategoryInputs)
        return FormateData(subCategoryResult);
    }
    
    async getSubCategoryByOemId(queryInputs){
        const subCategoryResult = await this.repository.subCategoryByOemId(queryInputs);
        return FormateData({
            subCategorys: subCategoryResult
        })
    }

    async getSubCategoryByCategoryId(queryInputs){
        let categoryFound = await this.categoryService.getCategoryById(queryInputs);
        let subCategoryResult = [];
        if(categoryFound?.data?.category != null)
          subCategoryResult = await this.repository.subCategoryByCategoryId(queryInputs);
        else {
           let subCategory = await this.repository.categoryBySubCategoryId(queryInputs);
           queryInputs = subCategory?.categoryId;
           subCategoryResult = await this.repository.subCategoryByCategoryId(queryInputs);
        }
        
        return FormateData({
            subCategories: subCategoryResult
        })
    }


    async getSubCategoryBySearch(queryInputs){
        const subCategoryResult = await this.repository.getSubCategoryListBySearch(queryInputs);
        return FormateData({
            subCategorys: subCategoryResult
        })
    }
}

module.exports = SubCategoryService;
