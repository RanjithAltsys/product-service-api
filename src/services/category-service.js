const { CategoryRepository } = require("../database");
const { FormateData } = require("../utils");

// All Business logic will be here
class CategoryService {

    constructor(){
        this.repository = new CategoryRepository();
    }
    

    async createCategory(categoryInputs){

        const categoryResult = await this.repository.createCategory(categoryInputs)
        return FormateData(categoryResult);
    }
    
    async getCategorys(){
        const categoryResult = await this.repository.categorys();
        return FormateData({
            categorys: categoryResult
           })

    }
 

}

module.exports = CategoryService;
