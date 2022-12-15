const userController = require("../controllers/user");
const cartController = require("../controllers/cart");
const { register } = require("../middlewares/index");

module.exports = (app) => {
  //User Routes
  app.post(
    "/users/register",
    register,
    userController.register
  );

  app.post(
    "/users/signin",
    userController.signin
  );


  // Cart Routes
  app.post(
    "/cart/item",
    cartController.addItemToCart
  );

  app.get(
    "/cart/items",
    cartController.getAllItemsInCart
  );

  app.delete(
    "/cart",
    cartController.emptyCart
  );

  app.get(
    "/cart/checkout-value",
    cartController.checkoutValue
  );

};
