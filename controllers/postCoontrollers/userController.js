const User = require('../../modals/userModal');
const messageHandler = require('../../utils/messageHandler');
const bcrypt = require('bcrypt');

const handleUserSignup = async (req, res) => {
    console.log(req.body)
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


const handleUserLogin = async (req, res)=>{

}

module.exports = {handleUserSignup, handleUserLogin};
