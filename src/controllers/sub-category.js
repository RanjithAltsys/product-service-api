const SubCategoryService = require("../services/sub-category-service");
module.exports = {
    create: async (req,res) => {
        const service = new SubCategoryService();
        try {
            const { data } = await service.createSubCategory(req.body);
            return res.status(200).json(data);
        } catch (error) {
            return res.status(404).json({ error });
        }
    },
    getByOemId: async (req,res) => {
        const service = new SubCategoryService();
        try {
            const { data } = await service.getSubCategoryByOemId(req.body);
            return res.status(200).json(data);
        } catch (error) {
            return res.status(404).json({ error });
        }
    }
};