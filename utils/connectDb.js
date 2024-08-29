const mongoose = require('mongoose');

const connectDb = async ()=>{
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/Tour_Travels');
        console.log('Db Connected successfully at port 27017!')
    } catch (error) {
        console.log('Error while connecting to the database')
    }
       
}


module.exports = connectDb


