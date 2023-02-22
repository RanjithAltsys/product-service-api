const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productsFamilyLicenseMapSchema = new Schema({
    productFamilyId: {
        type: Schema.Types.ObjectId,
        ref: 'productsFamily',
        required: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'products',
        required: true
    },
    createdBy: String,
    updatedBy: String
},{ timestamps: true });

module.exports =  mongoose.model('productsFamilyLicenseMap', productsFamilyLicenseMapSchema);