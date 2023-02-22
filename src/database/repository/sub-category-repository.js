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

    async getSubCategoryListBySearch(searchKey) {
        console.log("++++searchKey++++++",searchKey);
        const query = { name: { $regex: searchKey, $options: 'i' } };
        let subCategoryList = await SubCategoryModel.find(query);
        subCategoryList = subCategoryList.map((category) => { return category._id });
        return subCategoryList.length > 0 ? subCategoryList : [];    
    }

    async subCategoryByCategoryId(categoryId){
        return await SubCategoryModel.find({ categoryId: mongoose.Types.ObjectId(categoryId)});
    }
    
}

module.exports = SubCategoryRepository;
