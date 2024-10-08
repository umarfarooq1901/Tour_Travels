const User = require("../../modals/userModal");
const Tour = require('../../modals/tourModal')
const messageHandler = require("../../utils/messageHandler");


// handler for fetching details
const getAdminDashboard = async (req, res) => {
    try {

        const usersCount = await User.countDocuments();
        // Check if the logged-in user is an admin
        if (req.user.isAdmin) {

            // Render the AdminDashboard with non-admin users
            res.render('AdminDashboard', {usersCount, adminName: req.user.username, isAdmin: req.user.isAdmin });
        } else {
            // If the logged-in user is not an admin, handle accordingly
            return messageHandler(res, 403, 'AdminDashboard', 'Access Denied: Admins only.');
        }
    } catch (error) {
        console.log("Error while fetching the data", error);
        return messageHandler(res, 500, 'AdminDashboard', "Unable to load dashboard!");
    }
}


// admin users page

const getUsersDetails = async (req, res)=>{
    try {
          // Fetch all users from the database
          const users = await User.find().lean(); // `.lean()` returns plain JavaScript objects
          if(req.user.isAdmin){
              const nonAdminUsers = users.filter(user=> !user.isAdmin);
              res.render('AdminUsers', {users: nonAdminUsers, isAdmin: req.user.isAdmin});

          }
          else{
            return messageHandler(res, 403, 'AdminUsers', "Access Denied: Admins Only!")
          }
        
    } catch (error) {
        console.log(error);
        return messageHandler(res, 500, 'AdminUsers', "Unable to load this Pages!");
        
    }

   
  }

// handler for log-out

const adminLogout = (req, res)=>{
    // clear the authentication cookie

    res.clearCookie('token', {path: '/'});

    res.redirect('/user/login')
};

module.exports = {getAdminDashboard,getUsersDetails, adminLogout};
