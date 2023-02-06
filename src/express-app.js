const express = require("express");
const cors = require("cors");
const { routes } = require("./routes");


module.exports = async (app) => {
  app.use(express.json());
  app.use(cors());
  routes(app);
};
