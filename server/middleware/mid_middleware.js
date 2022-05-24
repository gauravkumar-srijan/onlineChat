const jwt = require('jsonwebtoken');
const UserModel = require('../model/user');
const JWT_ID = "dkde78ydbdhedh8chdccde3";

const Verifytoken = async (req,res,next)=>{
    
let token ;
const {authorization} = req.headers;
if(authorization && authorization.startsWith('Bearer')){
    try{
      token = authorization.split(' ')[1];
     

      const {userID} = jwt.verify(token ,JWT_ID );
        console.log(userID)
      req.user = await UserModel.findById(userID).select("-password");
      console.log(req.user);
    //   res.send("token work;")
      next()
      
    }
    catch(error){
        res.send("token error");
    }

    if(!token){
        res.send("not token assign");
    }
}



}
module.exports = Verifytoken ;