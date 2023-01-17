const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

cartSchema.methods.addProduct = function (productId, quantity) {
  const productIndex = this.products.findIndex(
    (p) => p.product.toString() === productId.toString()
  );
  if (productIndex === -1) this.products.push({ product: productId, quantity });
  else this.products[productIndex].quantity += quantity;

  return this.save();
};

cartSchema.methods.removeProduct = function (productId) {
  this.products = this.products.filter(
    (p) => p.product.toString() !== productId.toString()
  );
  if (productIndex !== -1) {
    this.products[productIndex].quantity = quantity;

    return this.save();
  }

  return Promise.reject(new Error("Product not found in cart"));
};

cartSchema.methods.getTotalPrice = async function () {
  const products = await Promise.all(
    this.products.map(async (p) => {
      const product = await Product.findById(p.product);
      return {
        ...p,
        product: {
          ...product.toObject(),
          price: product.price * p.quantity,
        },
      };
    })
  );
  this.totalPrice = products.reduce((total, p) => total + p.product.price, 0);
  return this.save();
};

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
