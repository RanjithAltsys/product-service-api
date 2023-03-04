const { parentCategoryList } = require("../constants/parentCategory");

module.exports = {
    getAllParentCategorys: async (req,res) => {
        try {
            const data = { 'parentCategories' : parentCategoryList };
            return res.status(200).json(data);
        } catch (error) {
            return res.status(404).json({ error });
        }
    }
};