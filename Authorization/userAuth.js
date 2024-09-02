const jwt = require('jsonwebtoken');
const messageHandler = require('../utils/messageHandler');
const {config} = require('dotenv');
config({path: "./.env"});




const userAuth = async(req, res, next)=>{
            try {
                const {token} = req.cookies;
                
                if(!token){
                    return messageHandler(res, 401, 'Login', 'Unauthorized Access!')
                }
                
                const secretkey = process.env.SECRET_KEY;
                jwt.verify(token, secretkey, (error, decode)=>{
                    if(error){
                        return messageHandler(res, 403, 'Login', "Access Denied!")
                    }

                    req.user = decode._id;
                    return next();
                })
                
            } catch (error) {
                console.log(error)
            }
}



module.exports = userAuth;