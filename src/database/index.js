// database related modules
module.exports = {
    databaseConnection: require('./connection'),
    ProductRepository: require('./repository/product-repository'),
    CategoryRepository: require('./repository/category-repository'),
    Oemepository: require('./repository/oem-repository'),
    SubCategoryRepository: require('./repository/sub-category-repository'),
    FeatureRepository: require('./repository/feature-repository'),
}