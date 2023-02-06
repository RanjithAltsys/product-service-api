const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: String,
    description: String,
    createdBy: String,
    updatedBy: String,

},{ timestamps: true});

module.exports =  mongoose.model('categorys', CategorySchema);