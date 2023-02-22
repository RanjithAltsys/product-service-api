const { BundleSkuRepository } = require("../database");
const { FormateData } = require("../utils");
const ProductFamilyService = require("./product-family");

// All Business logic will be here
class BundleSkuService {
    
    constructor(){
        this.repository = new BundleSkuRepository();
    }
    
    async formatProductFamilyList(payload) {
        console.log(payload);
        if(payload?.data?.productsFamily.length > 0)  {
             let data = payload?.data?.productsFamily;
             let productFamilyList = data.map((item) => {
                return { 
                    'details' : item.productFamily[0],
                    'products': item?.products ? item.products : [],
                    'features': item?.features ? item.features : []
                }
             })
          return productFamilyList;
        } else {
          return [];
        }
    }

    async createBundleSku(bundleInputs){

        const bundleSkuResult = await this.repository.createBundleSku(bundleInputs)
        return FormateData(bundleSkuResult);
    }

    async getBundleById(bundleId){

        const bundleSku = await this.repository.bundleSkuById(bundleId);
        let productFamilylist =  await new ProductFamilyService().getProductsFamilyByIds(bundleSku.productFamilyId);
        productFamilylist = await this.formatProductFamilyList(productFamilylist);
        return FormateData({
            bundleSku: bundleSku,
            productFamilylist: productFamilylist
        })
    }
}

module.exports = BundleSkuService;
