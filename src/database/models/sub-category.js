const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SubCategorySchema = new Schema({
    name: String,
    description: String,
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'categorys',
        required: true
    },
    oemId: {
        type: Schema.Types.ObjectId,
        ref: 'oems',
        required: true
    },
    createdBy: String,
    updatedBy: String,

},{ timestamps: true});

module.exports =  mongoose.model('subcategorys', SubCategorySchema);