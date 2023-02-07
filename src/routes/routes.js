const productCtrl = require('../controllers/products');
const categoryCtrl = require('../controllers/category');
const oemCtrl = require('../controllers/oem');
const subCategoryCtrl = require('../controllers/sub-category');
const featureCtrl = require('../controllers/feature');

module.exports = (app) => {
  //Health Check
  app.get("/",productCtrl.productsHealthCheck);

  //Category
  app.post("/api/category",categoryCtrl.create);
  app.get("/api/category",categoryCtrl.getAllCategorys);

  //OEM
  app.post("/api/oem",oemCtrl.create);
  app.get("/api/oem",oemCtrl.getAllOems);

  //Sub category
  app.post("/api/sub-category",subCategoryCtrl.create);
  app.post("/api/sub-category/list",subCategoryCtrl.getByOemId);

  //Features
  app.post("/api/feature",featureCtrl.create);
  app.get("/api/feature",featureCtrl.getAllFeatures);

  //Products 
  app.post("/api/product",productCtrl.create);
  app.get("/api/product",productCtrl.getProducts);
  app.get("/api/product/list/:id",productCtrl.getProductsBySubCategory);
  app.get("/api/product/:id",productCtrl.getProductsById);
  app.get("/api/products/search",productCtrl.getProductsBySearch);
};
