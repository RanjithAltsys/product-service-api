const mongoose = require('mongoose');
const { ProductVariantModel } = require("../models");
const { ProductModel } = require("../models");
const { FeatureModel } = require("../models");

//Dealing with data base operations
class ProductVariantRepository {


    async createProductVariant({ name, description, createdBy,priceList, updatedBy , productId}){

        const productVariant = new ProductVariantModel({
            name, description, createdBy, updatedBy, priceList, productId
        });

        const productVarianttResult = await productVariant.save();
        return productVarianttResult;
    }

    async findByProductId(productId) {
        console.log("__productId____", productId);
        let productsVariants = await ProductVariantModel.aggregate([
            {
                $match: {
                    "productId": mongoose.Types.ObjectId(productId)
                }
            }
        ]).exec();

        return productsVariants;
    }

}

module.exports = ProductVariantRepository;
