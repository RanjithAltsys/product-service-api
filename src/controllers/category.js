const CategoryService = require("../services/category-service");
module.exports = {
    create: async (req,res) => {
        const service = new CategoryService();
        try {
            const { data } = await service.createCategory(req.body);
            return res.status(200).json(data);
        } catch (error) {
            return res.status(404).json({ error });
        }
    },
    getAllCategorys: async (req,res) => {
        const service = new CategoryService();
        try {
            const { data } = await service.getCategorys();
            return res.status(200).json(data);
        } catch (error) {
            return res.status(404).json({ error });
        }
    }
};