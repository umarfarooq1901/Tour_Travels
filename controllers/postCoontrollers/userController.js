const User = require('../../modals/userModal');
const messageHandler = require('../../utils/messageHandler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { config } = require("dotenv");
// Load environment variables from .env file
config({ path: './.env' });


// User Signup Handler

const handleUserSignup = async (req, res) => {
   
    try {
        const { username, email, contact, password } = req.body;

        // Input validation
        if (!username || !email || !contact || !password) {
            return messageHandler(res, 400, 'Signup', 'All Credentials Required!');
        }

        // Check if user already exists
        const findUser = await User.findOne({ email });
        if (findUser) {
            return messageHandler(res, 401, 'Signup', 'User Already Registered!');
        }

        // Hash password
        const hashPass = await bcrypt.hash(password, 10);

        // Create new user
        const createUser = await User.create({ username, email, contact, password: hashPass });

        // Check if user creation was successful
        if (createUser) {
            return messageHandler(res, 200, 'Signup', 'User Registered Successfully!');
        } else {
            return messageHandler(res, 500, 'Signup', 'User Registration Failed!');
        }

    } catch (error) {
        console.error('Error during user signup:', error);
        return messageHandler(res, 500, 'Signup', 'An error occurred, please try again later.');
    }
};


// User Login Handler


const handleUserLogin = async (req, res)=>{
    try {
        const secretkey = process.env.SECRET_KEY;
        const {email, password} = req.body;

        // Input validation
        if(!email || !password){
            return messageHandler(res, 400, 'Login', "All Credentials Required");
        }
        // Check if user exists
        const findUser = await User.findOne({email});
        if(!findUser){
            return messageHandler(res, 202, 'Login', "User Not Registered!")
        }

         // Compare passwords
        const confirmPass = await bcrypt.compare(password, findUser.password);
        if(!confirmPass){
            return messageHandler(res, 400, 'Login', "Incorrect Password!");
        }

        // Generate JWT token
        const createToken = jwt.sign({_id: findUser._id}, secretkey);
       
        // Set the token as a cookie
            res.cookie("token", createToken, {
                // maxAge: 24*60*60*1000, // 1 day
                maxAge: 7 * 24 * 60 * 60 * 1000,    // 7 days
                httpOnly: true,  // Prevents client-side JS from accessing the cookie
                secure: true,   // Ensures the cookie is only sent over HTTPS
                
            });

             // Send success message
            messageHandler(res, 200, 'index', "User LoggedIn Successfully");

    } catch (error) {
        console.error('Error during user login:', error);
        return messageHandler(res, 500, "Login", "Server Error!")
        
    }
  

}


// User Delete Handler

        const handleUserDelete = async(req, res)=>{
            try {
                const {email, password} = req.body;
                 const user = await User.findOne({email});

                 if(!user){
                    return messageHandler(res, 404, "Signup", 'User Not Found!')
                  
                 }
                //  verifyPassword
                const verifyPassword = await bcrypt.compare(password, user.password);
                if(!verifyPassword){
                    return messageHandler(res, 401, "Signup", "Incorrect Password!")
                }

                // Delete user

                await User.findByIdAndDelete(user._id);

                return messageHandler(res, 200, 'Signup', 'User Account Deleted Successfully!')
                
            } catch (error) {
                console.log("Error occur while deleting the user, please try again later", error);
                return messageHandler(res, 500, 'Login', 'An error occurred, please try again later.');
               
            }
        }

module.exports = {handleUserSignup, handleUserLogin, handleUserDelete};
