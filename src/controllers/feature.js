const FeatureService = require("../services/feature-service");
module.exports = {
    create: async (req,res) => {
        const service = new FeatureService();
        try {
            const { data } = await service.createFeature(req.body);
            return res.status(200).json(data);
        } catch (error) {
            return res.status(404).json({ error });
        }
    },
    getAllFeatures: async (req,res) => {
        const service = new FeatureService();
        try {
            const { data } = await service.getFeatureList();
            return res.status(200).json(data);
        } catch (error) {
            return res.status(404).json({ error });
        }
    }
};