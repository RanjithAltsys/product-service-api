const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OemSchema = new Schema({
    name: String,
    description: String,
    createdBy: String,
    updatedBy: String,

},{ timestamps: true});

module.exports =  mongoose.model('oems', OemSchema);