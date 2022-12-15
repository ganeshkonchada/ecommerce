const { responseObject } = require("../../utils/others/ApiResponse");

module.exports = {
    register: function(req, res, next) {
        try {
            let body = req.body || {};
            if(!body.username){
                return res.status(400).send( responseObject(null, "Username is required", "Fail") );
            }
            if(!body.password){
                return res.status(400).send( responseObject(null, "Password is required", "Fail") );
            }

            next();
        } catch (error) {
            return res.status(500).send( responseObject(null, error.message, "Fail") );
        }
        
    }
}