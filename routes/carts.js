const express = require("express");
const router = express.Router();
const Cart = require("../models/cart");

router.get("/", (req, res) => {
  if (!req.session.cart) return res.render("cart", { products: null });

  const cart = new Cart(req.session.cart);
  res.render("cart", {
    products: cart.generateArray(),
    totalPrice: cart.totalPrice,
  });
});

router.post("/:id", (req, res) => {
  const productId = req.params.id;
  let cart = new Cart(req.session.cart ? req.session.cart : {});

  Product.findById(productId, (err, product) => {
    if (err) return res.redirect("/");

    cart.add(product, product.id);
    req.session.cart = cart;
    res.redirect("/");
  });
});

router.put("/:id", (req, res) => {
  const productId = req.params.id;
  const quantity = req.body.quantity;
  let cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.updateQuantity(productId, quantity);
  req.session.cart = cart;
  res.redirect("/api/cart");
});

router.delete("/:id", (req, res) => {
  const productId = req.params.Id;
  let cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.remove(productId);
  req.session.cart = cart;
  res.redirect("/api/cart");
});

module.exports = router;
