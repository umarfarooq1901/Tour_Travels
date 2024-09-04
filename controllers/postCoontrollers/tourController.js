const Tour = require("../../modals/tourModal");
const messageHandler = require('../../utils/messageHandler');
const User = require('../../modals/userModal');

const cloudinary = require('cloudinary').v2;
const {config} = require('dotenv');
config({ path: './.env' });


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});


// handler for create tour
const handleCreateTour = async(req, res)=>{
    try {
        const _id = req.user;
            
        const user = await User.findById(_id)

        if(!user){
            return messageHandler(res, 401, 'AdminDashboard', 'Admin not Found!')
        }

        const {title, description, price} = req.body;
        const image = req.file.path;

        if(title === '' || description ==='' || price ==='' || !image ){
            return messageHandler(res, 203, 'AdminDashboard', 'All data Fields Required' )
        }

        const upload = await cloudinary.uploader.upload(image);
        if(!upload){
            return messageHandler(res, 404, 'AdminDashboard', "Cloudinary error!");
        }

        const imageUrl = upload.secure_url;

        const newTour = await Tour.create({title, description, price, imageUrl});
        if(newTour){
        return messageHandler(res, 201, 'AdminDashboard', 'Tour Created Successfully!')
        }


        
    } catch (error) {
        console.log(error);
        
    }
      

}



module.exports = {handleCreateTour};