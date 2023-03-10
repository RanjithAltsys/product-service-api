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
        return await SubCategoryModel.find({ oemId:  mongoose.Types.ObjectId(oemId), categoryId:  mongoose.Types.ObjectId(categoryId) });
    }

    async subCategoryByCategoryId({categoryId }){
        return await SubCategoryModel.find({categoryId:  mongoose.Types.ObjectId(categoryId) });
    }

    async getSubCategoryListBySearch(searchKey) {
        const query = { name: { $regex: searchKey, $options: 'i' } };
        let subCategoryList = await SubCategoryModel.find(query);
        subCategoryList = subCategoryList.map((category) => { return category._id });
        return subCategoryList.length > 0 ? subCategoryList : [];    
    }

    async subCategoryByCategoryId(categoryId){
        return await SubCategoryModel.find({ categoryId: mongoose.Types.ObjectId(categoryId)});
    }

    async categoryBySubCategoryId(subSubCategoryId ){
        return await SubCategoryModel.findOne({ _id:  mongoose.Types.ObjectId(subSubCategoryId)});
    }
    
}

module.exports = SubCategoryRepository;
