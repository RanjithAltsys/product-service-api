const { Oemepository } = require("../database");
const { FormateData } = require("../utils");

// All Business logic will be here
class OemService {

    constructor(){
        this.repository = new Oemepository();
    }
    

    async createOem(oemInputs){

        const oemResult = await this.repository.createOem(oemInputs)
        return FormateData(oemResult);
    }
    
    async getOems(){
        const oemsResult = await this.repository.oems();
        return FormateData({
            oems: oemsResult
           })
    }
 

}

module.exports = OemService;
