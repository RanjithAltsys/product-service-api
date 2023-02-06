const mongoose = require('mongoose');
const { SubCategoryModel } = require("../models");

//Dealing with data base operations
class SubCategoryRepository {


    async createSubCategory({ name, description, createdBy, updatedBy,categoryId, oemId }){

        const subCategory = new SubCategoryModel({
            name, description, categoryId, oemId, createdBy, updatedBy
        })

        const subCategoryesult = await subCategory.save();
        return subCategoryesult;
    }

     async subCategoryByOemId({ oemId, categoryId }){
        return await SubCategoryModel.find({ oemId, categoryId });
    }
    
}

module.exports = SubCategoryRepository;
