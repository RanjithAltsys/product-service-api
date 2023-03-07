const mongoose = require('mongoose');
const { CategoryModel } = require("../models");

//Dealing with data base operations
class CategoryRepository {


    async createCategory({ name, description, createdBy, updatedBy , parentCategoryId = null}){

        const category = new CategoryModel({
            name, description, createdBy, updatedBy, parentCategoryId
        })

        const categoryResult = await category.save();
        return categoryResult;
    }


    async categorys(){
        return await CategoryModel.find();
    }

    async getCategoryById(id) {
        return await CategoryModel.findById(id);
    }
    
}

module.exports = CategoryRepository;
