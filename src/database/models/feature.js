const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FeatureSchema = new Schema({
    name: String,
    description: String,
    createdBy: String,
    updatedBy: String,
    subCategoryId: {
        type: Schema.Types.ObjectId,
        ref: 'subcategorys',
        required: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'products',
        required: false
    },
    productVariantId: {
        type: Schema.Types.ObjectId,
        ref: 'productsVariant',
        required: false
    },
    properties: [{
        type: Object,
        require: false
    }]

},{ timestamps: true});

module.exports =  mongoose.model('features', FeatureSchema);