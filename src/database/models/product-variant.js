const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductsVariantSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: false
    },
    createdBy: {
        type: String,
        require: false
    },   priceType: {
        type: String,
        require: false
    },
    updatedBy: {
        type: String,
        require: false
    },
    priceList: [{
        type: Object,
        require: false
    }],
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'products',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('productsVariant', ProductsVariantSchema);