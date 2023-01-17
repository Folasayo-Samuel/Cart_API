const express = require("express");
const carts = require("../routes/carts");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/cart", carts);
};
