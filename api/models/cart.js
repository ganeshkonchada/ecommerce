const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    quantity: { type: Number, default: 1 },
    product: { type: mongoose.Schema.Types.Mixed }
  },
  {
    timestamps: true
  }
);
const Cart = mongoose.model("Cart", cartSchema);

module.exports = {
  Cart
};
