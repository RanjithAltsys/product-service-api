const BundleSkuService = require("../services/bundle-sku-service");
module.exports = {
    create: async (req,res) => {
        const service = new BundleSkuService();
        try {
            const { data } = await service.createBundleSku(req.body);
            return res.status(200).json(data);
        } catch (error) {
            return res.status(404).json({ error });
        }
    },
    getBundleById: async (req,res) => {
        const service = new BundleSkuService();
        try {
            const { data } = await service.getBundleById(req.params['id']);
            return res.status(200).json(data);
        } catch (error) {
            return res.status(404).json({ error });
        }
    },
};