const mongoose = require('mongoose');
const {  OemModel } = require("../models");

//Dealing with data base operations
class OemRepository {


    async createOem({ name, description, createdBy, updatedBy }){

        const oem = new OemModel({
            name, description, createdBy, updatedBy
        })

        const oemResult = await oem.save();
        return oemResult;
    }


     async oems(){
        return await OemModel.find();
    }
    
}

module.exports = OemRepository;
