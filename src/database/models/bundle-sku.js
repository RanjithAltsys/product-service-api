const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BundleSkuSchema = new Schema({
    name: String,
    description: String,
    productFamilyId: [{
        type: Schema.Types.ObjectId,
        ref: 'productsFamily',
        required: true
    }],
    oemId: {
        type: Schema.Types.ObjectId,
        ref: 'oems',
        required: true
    },
    createdBy: String,
    updatedBy: String,

},{ timestamps: true});

module.exports =  mongoose.model('bundleSku', BundleSkuSchema);