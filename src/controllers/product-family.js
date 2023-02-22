const ProductFamilyService = require("../services/product-family");
module.exports = {
    create: async (req,res) => {
        const service = new ProductFamilyService();
        try {
            const { data } = await service.createProductFamily(req.body);
            return res.status(200).json(data);
        } catch (error) {
            return res.status(404).json({ error });
        }
    },
    getProductsFamily: async (req,res) => {
        const service = new ProductFamilyService();
        try {
            const { data } = await service.getProductsFamily();
            return res.status(200).json(data);
        } catch (error) {
            return res.status(404).json({ error });
        }
    },

    addProductToProductFamily: async (req,res) => {
        const service = new ProductFamilyService();
        try {
            const { data } = await service.addProductToProductFamily(req.body);
            return res.status(200).json(data);
        } catch (error) {
            return res.status(404).json({ error });
        }
    },

    getProductsFamilyById: async (req,res) => {
        const service = new ProductFamilyService();
        try {
            const { data } = await service.getProductsFamilyById(req.params['id']);
            return res.status(200).json(data);
        } catch (error) {
            return res.status(404).json({ error });
        }
    },

    addFeatureToProductFamily: async (req,res) => {
        const service = new ProductFamilyService();
        try {
            const { data } = await service.addFeatureToProductFamily(req.body);
            return res.status(200).json(data);
        } catch (error) {
            return res.status(404).json({ error });
        }
    }


};