const Admin = require('../../modals/adminModal');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const messageHandler = require('../../utils/messageHandler');
const { config } = require('dotenv');
config({ path: "./.env" });





// const handleAdminSignup = async (req, res) => {
//     try {
//       const { username, email, password } = req.body;
  
//       // Input validation
//       if (!username || !email || !password) {
//         return messageHandler(res, 400, "AdminSignup", "All Credentials Required!");
//       }
  
//       // Check if admin already exists
//       const existingAdmin = await Admin.findOne({ email, isAdmin: true });
//       if (existingAdmin) {
//         return messageHandler(res, 401, "AdminSignup", "Admin Already Registered!");
//       }
  
//       // Hash password
//       const hashPass = await bcrypt.hash(password, 10);
  
//       // Create new admin
//       const newAdmin = await Admin.create({
//         username,
//         email,
//         password: hashPass,
//         isAdmin: true, // Set the isAdmin field to true
//       });
  
//       // Check if admin creation was successful
//       if (newAdmin) {
//         return messageHandler(res, 200, "AdminSignup", "Admin Registered Successfully!");
//       } else {
//         return messageHandler(res, 500, "AdminSignup", "Admin Registration Failed!");
//       }
//     } catch (error) {
//       console.error("Error during admin signup:", error);
//       return messageHandler(res, 500, "AdminSignup", "An error occurred, please try again later.");
//     }
//   };


const adminLoginHandler = async (req, res) => {
  try {
    const secretkey = process.env.SECRET_KEY;
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
      return messageHandler(res, 400, "AdminLogin", "All Credentials Required");
    }

    // Find Admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return messageHandler(res, 400, "AdminLogin", "Invalid Credentials!");
    }

    // Check password
    const checkPass = await bcrypt.compare(password, admin.password);
    if (!checkPass) {
      return messageHandler(res, 400, "AdminLogin", "Incorrect Password!");
    }

    // Generate token
    const createToken = jwt.sign({ _id: admin._id }, secretkey);

    // Set the token as a cookie
    res.cookie("token", createToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      httpOnly: true,
      secure: true,
    });

    // Redirect to the admin dashboard
    res.redirect('/admin/dashboard');

  } catch (error) {
    console.error(error);
    return messageHandler(res, 500, "AdminLogin", 'Server Error!');
  }
};

module.exports = { handleAdminSignup, adminLoginHandler };
