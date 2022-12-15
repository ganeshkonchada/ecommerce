const request = require("request");
const util = require("util");

const { Cart } = require("../models/cart");
const { calculateShippingCost } = require("../services/util");
const { responseObject } = require("../../utils/others/ApiResponse");

module.exports = {

    addItemToCart: async (req, res) => {
        try {
        
          // To get product details using product API
          const options = {
            method: "GET",
            url: `http://43.205.194.158:8080/product/${req.body.productId}`
          }

          const requestPromise = util.promisify(request);
          const response = await requestPromise(options);
          const responseBody = JSON.parse(response.body);

          if(responseBody.status === 200){
            const product = responseBody.response;

            let cart = await Cart.create({user: req.userId, product: product });

            if(!cart){
              return res
                .status(400)
                .send(responseObject(null, "Item not added", "Fail"));
            }
            return res
              .status(200)
              .send(responseObject(cart, "Item has been added to cart", "Success"));
          }
          else {
            return res.status(400).send( responseObject(null, responseBody.message, "Fail") );
          }

        } catch (err) {
          // throwing any other errors if occured
          return res.status(500).send( responseObject(null, err.message, "Fail") );
        }
    },

    getAllItemsInCart: async (req, res) => {
      try {
        let cartItems = await Cart.find({user: req.userId});
        if(cartItems.length === 0){
          return res
              .status(400)
              .send(responseObject(null, "Cart is Empty", "Fail"));
        }

        return res
            .status(200)
            .send(responseObject(cartItems, "Cart items available", "Success"));
      
      } catch (error) {
        // throwing any other errors if occured
        return res.status(500).send( responseObject(null, error.message, "Fail") );
      }
      
    },

    emptyCart: async (req, res) => {
      try {
        let cartItems = await Cart.deleteMany({user: req.userId});
        return res
            .status(200)
            .send(responseObject(cartItems, "Cart has been empty", "Success"));
      
      } catch (error) {
        // throwing any other errors if occured
        return res.status(500).send( responseObject(null, error.message, "Fail") );
      }
    },

    checkoutValue: async (req, res) => {
      try {

        // To get distance based on postal code
        const options = {
          method: "GET",
          url: `http://43.205.194.158:8080/warehouse/distance?postal_code=${req.query.shipping_postal_code}`
        }

        const requestPromise = util.promisify(request);
        const response = await requestPromise(options);
        const responseBody = JSON.parse(response.body);
        if(responseBody.status != 200){
          return res.status(400).send(responseObject(null, responseBody.message, "Fail"));
        }

        const totalDistance = responseBody.distance_in_kilometers;

        // To calculte discount price
        let cartItems = await Cart.find({user: req.userId});
        if(cartItems.length === 0){
          return res
              .status(400)
              .send(responseObject(null, "Cart is Empty", "Fail"));
        }

        let totalWeightInGrms = 0, totalItemsPrice = 0, totalItemsDiscount = 0;
        cartItems.map( itemObj => {
          const price = itemObj.product.price;
          const discountpercentage = itemObj.product.discount_percentage;
          totalWeightInGrms += itemObj.product.weight_in_grams;
          totalItemsPrice += price;
          totalItemsDiscount += ( price * (discountpercentage/100) );
        })

        totalItemsDiscount = Number( totalItemsDiscount.toFixed(2) );
        let totalWeight = Number( (totalWeightInGrms / 1000).toFixed(2) );

        // Shipping charges calculation
        const shippingCharges = calculateShippingCost(totalDistance, totalWeight);

        // Final Cart value calculation
        let finalCartValue = totalItemsPrice - totalItemsDiscount + shippingCharges;
        finalCartValue = Number( finalCartValue.toFixed(2) );

        return res.status(200).send( responseObject( {
          totalItemsPrice,
          totalItemsDiscount,
          shippingCharges,
          finalCartValue
        }, "Cart value", "Success") );
        
      } catch (error) {
        return res.status(500).send( responseObject(null, error.message, "Fail") );
      }
    }

}