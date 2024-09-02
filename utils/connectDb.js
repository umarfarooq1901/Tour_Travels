const mongoose = require('mongoose');
const {config} = require('dotenv');
config({path: './.env'});

const dbConnection = process.env.DATABASE_CONNECTION;

const connectDb = async ()=>{
    try {
        await mongoose.connect(dbConnection);
        console.log('Db Connected successfully!')
    } catch (error) {
        console.log('Error while connecting to the database')
    }
       
}


module.exports = connectDb


