const Admin = require('../../modals/adminModal');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const messageHandler = require('../../utils/messageHandler');
const {config} = require('dotenv');
config({ path: "./.env" });



// Admin Logic

const adminLoginHandler = async(req, res)=>{
        try {
            const secretkey = process.env.SECRET_KEY;
            const {email, password} = req.body;

            // Find Admin by email

            const admin = await Admin.findOne({email});
            if(!admin){
                return messageHandler(res, 400, "Login", "Invalid Credentials!")
            }

            // check password

            const checkPass = await bcrypt.compare(password, admin.password);
            if(!checkPass){
                return messageHandler(res, 400, 'Login', "Incorrect Password!");
            }
                // GENERATE TOKEN
            const createToken = jwt.sign({_id: admin._id}, secretkey);

           // Set the token as a cookie
            res.cookie("token", createToken, {
                 // maxAge: 24*60*60*1000, // 1 day
              maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
              httpOnly: true, // Prevents client-side JS from accessing the cookie
              secure: true, // Ensures the cookie is only sent over HTTPS
      });

              

        } catch (error) {
            console.log(error);
            
        }
}