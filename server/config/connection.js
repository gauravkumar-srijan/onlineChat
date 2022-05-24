const mongoose = require('mongoose');
const connectdb = async (Data_url)=>{
    try{
        const db_option = {
            dbname : 'users'
        }
        await mongoose.connect(Data_url , db_option )
        console.log('connect work')
    }
    catch(error){
        console.log(error)
    }
}
module.exports = connectdb;