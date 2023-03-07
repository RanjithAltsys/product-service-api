const productCtrl = require('../controllers/products');
const categoryCtrl = require('../controllers/category');
const oemCtrl = require('../controllers/oem');
const subCategoryCtrl = require('../controllers/sub-category');
const featureCtrl = require('../controllers/feature');
const productFamilyCtrl = require('../controllers/product-family');
const bundleSkuCtrl = require('../controllers/bundle-sku');
const constantCtrl = require('../controllers/constants');
const fileStorageService = require('../services/file-storage-service');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const fileStorageServiceInstance = new fileStorageService();

module.exports = (app) => {
  //Health Check
  app.get("/", productCtrl.productsHealthCheck);

  //Category
  app.post("/api/category", categoryCtrl.create);
  app.get("/api/category", categoryCtrl.getAllCategorys);

  //OEM
  app.post("/api/oem", oemCtrl.create);
  app.get("/api/oem", oemCtrl.getAllOems);

  //Sub category
  app.post("/api/sub-category", subCategoryCtrl.create);
  app.post("/api/sub-category/list", subCategoryCtrl.getByOemId);
  app.get("/api/sub-category/:id", subCategoryCtrl.getByCategoryId);

  //Features
  app.post("/api/feature", featureCtrl.create);
  app.get("/api/feature", featureCtrl.getAllFeatures);

  //Products 
  app.post("/api/product", productCtrl.create);
  app.get("/api/product", productCtrl.getProducts);
  app.get("/api/product/list/:id", productCtrl.getProductsBySubCategory);
  app.get("/api/product/:id", productCtrl.getProductsById);
  app.get("/api/products/search", productCtrl.getProductsBySearch);
  app.post("/api/products", productCtrl.getProductsBySubCategoryIds);

  //Poducts Family 
  app.post("/api/product-family", productFamilyCtrl.create);
  app.get("/api/product-family", productFamilyCtrl.getProductsFamily);
  app.post("/api/product-family-license", productFamilyCtrl.addProductToProductFamily);
  app.get("/api/product-family/:id", productFamilyCtrl.getProductsFamilyById);
  app.post("/api/product-family-feature", productFamilyCtrl.addFeatureToProductFamily);

  //Bundle SKU 
  app.post("/api/bundle", bundleSkuCtrl.create);
  app.get("/api/bundle/:id", bundleSkuCtrl.getBundleById);

  //Constants
  app.get("/api/parent-categories", constantCtrl.getAllParentCategorys);

  //File Storage 
  app.post("/api/file/upload", upload.single('file'),fileStorageServiceInstance.uploadSingleFile);
};
