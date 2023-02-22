const mongoose = require('mongoose');
const { ProductModel } = require("../models");

//Dealing with data base operations
class ProductRepository {


    async createProduct({ name, description,price, createdBy, updatedBy }){

        const product = new ProductModel({
            name, description, createdBy, updatedBy, price
        })

        const productResult = await product.save();
        return productResult;
    }


     async products(){
        return await ProductModel.find();
    }
   
    async findById(id){   
       return await ProductModel.findById(id);
    }

    async findBySubCategory(subCategoryId){
        const products = await ProductModel.find({ subCategoryId: subCategoryId });

        return products;
    }

    async findSelectedProducts(selectedIds){
        const products = await ProductModel.find().where('_id').in(selectedIds.map(_id => _id)).exec();
        return products;
    }

    async getProductListBySearch(searchKey) {
        console.log("++++searchKey++++++",searchKey);
        const query = { name: { $regex: searchKey, $options: 'i' } };
        let productList = await ProductModel.find(query);
        productList = productList.map((product) => { return product._id });
        return productList.length > 0 ? productList : [];    
    }
    
}

module.exports = ProductRepository;
