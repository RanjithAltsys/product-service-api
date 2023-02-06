const OemService = require("../services/oem-service");
module.exports = {
    create: async (req,res) => {
        const service = new OemService();
        try {
            const { data } = await service.createOem(req.body);
            return res.status(200).json(data);
        } catch (error) {
            return res.status(404).json({ error });
        }
    },
    getAllOems: async (req,res) => {
        const service = new OemService();
        try {
            const { data } = await service.getOems();
            return res.status(200).json(data);
        } catch (error) {
            return res.status(404).json({ error });
        }
    }
};