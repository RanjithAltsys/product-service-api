const { SubCategoryRepository } = require("../database");
const { FormateData } = require("../utils");

// All Business logic will be here
class SubCategoryService {

    constructor(){
        this.repository = new SubCategoryRepository();
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
        const subCategoryResult = await this.repository.subCategoryByCategoryId(queryInputs);

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
