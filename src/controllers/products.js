const ProductService = require("../services/product-service");
module.exports = {
    productsHealthCheck: async (req,res) => { 
        try {
            const data = { message: 'Success', status:'Ok'}
            return res.status(200).json(data);
        } catch (error) {
            return res.status(404).json({ error });
        }
    },
    create: async (req,res) => {
        const service = new ProductService();
        try {
            const { data } = await service.createProduct(req.body);
            return res.status(200).json(data);
        } catch (error) {
            return res.status(404).json({ error });
        }
    },
    getProducts: async (req,res) => {
        const service = new ProductService();
        try {
            const { data } = await service.getProducts();
            return res.status(200).json(data);
        } catch (error) {
            return res.status(404).json({ error });
        }
    },
    getProductsBySubCategory: async (req,res) => {
        const service = new ProductService();
        try {
            const { data } = await service.getProductsBySubCategory(req.params['id']);
            return res.status(200).json(data);
        } catch (error) {
            return res.status(404).json({ error });
        }
    },

    getProductsById: async (req,res) => {
        const service = new ProductService();
        try {
            const { data } = await service.getProductsById(req.params['id']);
            return res.status(200).json(data);
        } catch (error) {
            return res.status(404).json({ error });
        }
    },

    getProductsBySearch: async (req,res) => {
        const service = new ProductService();
        try {
            console.log("+++INPUT+++++",req.query);
            const { data } = await service.getProductsBySearch(req.query['search']);
            return res.status(200).json(data);
        } catch (error) {
            return res.status(404).json({ error });
        }
    },

    getProductsBySubCategoryIds: async (req,res) => {
        const service = new ProductService();
        try {
            const { data } = await service.getProductsBySubCategoryIds(req.body?.subCategoryIds);
            return res.status(200).json(data);
        } catch (error) {
            return res.status(404).json({ error });
        }
    },

    getProductsByOemIds: async (req,res) => {
        const service = new ProductService();
        try {
            const { data } = await service.getProductsByOemIds(req.body?.oemIds);
            return res.status(200).json(data);
        } catch (error) {
            return res.status(404).json({ error });
        }
    },

};