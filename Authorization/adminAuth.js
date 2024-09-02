const jwt = require('jsonwebtoken');
const messageHandler = require('../utils/messageHandler');
const {config} = require('dotenv');
const User = require('../modals/userModal');
config({path: "./.env"});


const adminAuth = async (req, res, next)=>{
    try {
        const {token} = req.cookies;

        if(!token){
            return messageHandler(res, 401, 'Login', 'Unauthorized Access!');
        }
            const secretkey = process.env.SECRET_KEY;
               jwt.verify(token, secretkey, async (error, decode)=>{
                    if(error){
                        return messageHandler(res, 403, 'Login', 'Access Denied!');
                    }

                    // fetch the user from the database
                    const user = await User.findById(decode._id);
                     
                    if(!user || !user.isAdmin){
                        return messageHandler(res, 401, 'Login', 'Unauthorized to access!')
                    }
                    // User is an admin, populate req.user and proceed
                    req.user = user;
                    next();

               })
    } catch (error) {
        console.log(error);
        return messageHandler(res, 500, 'Login', 'Internal Server Error!')
        
    }
       

}


module.exports = adminAuth;