const userModel = require("../models/user");
const jwtService = require("../../utils/auth/jwtservice");
const bcrypt = require("bcrypt");
const { responseObject } = require("../../utils/others/ApiResponse");

module.exports = {
  register: async (req, res) => {
    try {
      let reqBody = req.body;
      const user = await userModel.findOne({ username: reqBody.username });

      // If user already exists
      if (user) {
        return res.status(400).send(
            responseObject( null, "User has already been registered, please Signin", "Fail" )
          );
      }

      // If user not exists
      else {
        reqBody.password = await bcrypt.hash(reqBody.password, 10);
        const userData = await new userModel(reqBody).save();

        let accessToken = await jwtService.createAccessToken({ userId: userData._id });
        userData.password = "";

        return res.status(200).send(
          responseObject({userData, accessToken}, "user successfully registered", "Success")
        );
      }
    } catch (error) {
      return res.status(500).send(responseObject(null, error.message, "Fail"));
    }
  },

  signin: async (req, res) => {
    try {
      let username = req.body.username;
      let password = req.body.password;

      if (username && password) {
        const userData = await userModel.findOne({ username: username });
        if(!userData){
          return res.status(400).send( responseObject(null, "Invalid username or password", "Fail") );
        }

        let matchPassword = await bcrypt.compare(password, userData.password);
        // If username and password correct
        if (matchPassword) {
          let accessToken = await jwtService.createAccessToken({ userId: userData._id });
          userData.password = "";

          return res.status(200).send(
            responseObject({userData, accessToken}, "User signin success", "Success")
          );
        }
        // If username or password wrong
        else {
          return res.status(400).send( responseObject(null, "Invalid username or password", "Fail") );
        }
      }
      // If username and password missing
      else {
        return res.status(400).send( responseObject(null, "Required fields are missing!", "Fail") );
      }
    } catch (error) {
      return res.status(500).send(responseObject(null, error.message, "Fail"));
    }
  },
  
};
