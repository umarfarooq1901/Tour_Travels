const User = require('../../modals/userModal');
const messageHandler = require('../../utils/messageHandler');
const bcrypt = require('bcrypt');



const handleUserSignup = async (req, res) => {
    try {
        const { username, email, contact, password } = req.body;

        if (username === '' || email === '' || contact === '' || password === '') {
            return messageHandler(res, 400, 'Signup', 'All Credentials Required!');
        }

        const findUser = await User.findOne({ email });
        if (findUser) {
            return messageHandler(res, 401, 'Signup', 'User Already Registered!');
        }

        // Make sure password is properly defined before hashing
        const hashPass = await bcrypt.hash(password, 10);

        const createUser = await User.create({ username, email, contact, password: hashPass });

        if (createUser) {
            return messageHandler(res, 200, 'Signup', 'User Registered Successfully!');
        }

    } catch (error) {
        console.log(error);
        return messageHandler(res, 500, 'Signup', 'An error occurred, please try again later.');
    }
};



module.exports = handleUserSignup