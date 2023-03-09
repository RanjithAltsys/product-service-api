const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
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
    },
    updatedBy: {
        type: String,
        require: false
    },
    priceList: [{
        type: Object,
        require: false
    }],
    productImages: [
        {
            type: String,
            require: false
        }
    ],
    heroImage: {
        type: String,
        require: false
    },
    productLanguages: [{
        type: String,
        require: false
    }],
    productOfficialLink: {
        type: String,
        require: false
    },
    review: {
        type: Number,
        require: false
    }

}, { timestamps: true });

module.exports = mongoose.model('products', ProductSchema);