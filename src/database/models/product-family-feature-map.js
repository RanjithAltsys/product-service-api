const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productsFamilyFeatureMapSchema = new Schema({
    productFamilyId: {
        type: Schema.Types.ObjectId,
        ref: 'productsFamily',
        required: true
    },
    featureId: {
        type: Schema.Types.ObjectId,
        ref: 'features',
        required: true
    },
    createdBy: String,
    updatedBy: String
},{ timestamps: true });

module.exports =  mongoose.model('productsFamilyFeatureMap', productsFamilyFeatureMapSchema);