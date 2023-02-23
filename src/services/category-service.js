const { CategoryRepository, SubCategoryRepository } = require("../database");
const { FormateData } = require("../utils");

// All Business logic will be here
class CategoryService {

    constructor(){
        this.repository = new CategoryRepository();
        this.subCategoryRepository = new SubCategoryRepository();
    }
    

    async createCategory(categoryInputs){

        const categoryResult = await this.repository.createCategory(categoryInputs)
        return FormateData(categoryResult);
    }
    
    async getCategorys(){
        let  categoryResult = await this.repository.categorys();

        categoryResult = await Promise.all(categoryResult.map(async(data) => {
            let categoryItem = Object.assign({}, data._doc);
            categoryItem.subCategories = await this.subCategoryRepository.subCategoryByCategoryId(data._id);
            return categoryItem;
        }));

        return FormateData({
            categorys: categoryResult
        })
        
    }
 

}

module.exports = CategoryService;
