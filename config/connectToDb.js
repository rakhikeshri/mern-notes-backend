// const mongoose = require('mongoose')
import mongoose from 'mongoose'

async function connectToDb(){
    try{await mongoose.connect(process.env.DB_URL)
        console.log('connected to db')
    }catch(err){
        console.log(err)
    }
}

// module.exports = connectToDb;
export default connectToDb