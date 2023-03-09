const ProductVariantService = require("../services/product-variant-service");
module.exports = {
    create: async (req,res) => {
        const service = new ProductVariantService();
        try {
            const { data } = await service.createProductVariant(req.body);
            return res.status(200).json(data);
        } catch (error) {
            return res.status(404).json({ error });
        }
    },
    getProducts: async (req,res) => {
        const service = new ProductVariantService();
        try {
            const { data } = await service.getProducts();
            return res.status(200).json(data);
        } catch (error) {
            return res.status(404).json({ error });
        }
    }
};