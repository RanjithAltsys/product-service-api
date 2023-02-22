const mongoose = require('mongoose');
const { BundleSkuModel } = require("../models");

//Dealing with data base operations
class BundleSkuRepository {


    async createBundleSku({ name, description, createdBy, updatedBy,productFamilyId, oemId }){

        const bundleSku = new BundleSkuModel({
            name, description, productFamilyId, oemId, createdBy, updatedBy
        })

        const bundleSkuresult = await bundleSku.save();
        return bundleSkuresult;
    }

    async bundleSkuById(bundleId){
        return  await BundleSkuModel.findById({ _id: bundleId });
    }
    
}

module.exports = BundleSkuRepository;
