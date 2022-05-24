const UserModel = require('./../model/user');
const bcrypt = require('bcrypt');
const jwt  = require('jsonwebtoken');
const transporter = require('./../config/email'); //nodemailer part

const JWT_ID = "dkde78ydbdhedh8chdccde3";//jwt part
class usercontrol{

    static userRagister = async (req, res)=>{
        
    //    console.log("hello world");
        const {name, email,password,cpassword} = req.body;
        let user = await UserModel.findOne({email :email})
        if(user){
            res.send({"satuts" : "failure" , "message" : "email alredy exits!" })
        }
        else{
            if(name && email && password && cpassword  ){
                if(password ===cpassword){
                    try{
                        const salt = await bcrypt.genSalt(10);
                        const hashPass = await bcrypt.hash(password , salt);
                   let user  =  new UserModel({
                       name :name,
                       email:email,
                       password:hashPass
                   }) 
                   await user.save(); 
                     //jwt token
                     const save_user = await UserModel.findOne({email : email});
                     const token = jwt.sign({userID : save_user._id} , JWT_ID , {expiresIn : '5d'});

                     res.status(201).json({
                        "message" : "user Ragister",
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        token: token,
                      });
                   
                }catch(error) {
                    res.send("not send data")
                }
                }
                else{
                    res.send({"satuts" : "failure" , "message" : "Password incoreect " })
                }
            }
            else{
                res.send({"satuts" : "failure" , "message" : "plz fill  all field    " })
            }
        }
        
    }

    static userlogin =async (req, res)=>{
        // console.log("hello world");
        const { email , password} = req.body;
        console.log(req.body);
        const user = await UserModel.findOne({email});
        if(user != null){
                const matchPass = await bcrypt.compare(password , user.password);
                if((user.email === email) && matchPass){
                    const token = jwt.sign({userID : user._id} , JWT_ID , {expiresIn : '5d'});
                    res.status(201).json({
                        "message" : "user email match",
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        token: token,
                      });
                }
                else{
                   
                    res.status(400)
                        throw new Error('Invalid email or passsword') 
                }
        }
        else{
            
            res.status(400)
            throw new Error('Invalid email or passsword') 
        }
    }

    static changePass = async (req,res)=>{
        // console.log("fjv");
        console.log(req.body);
        const {password , cpassword} = req.body;

        if(password && cpassword ){
            if(password !==cpassword){
                    res.send({"message" : "new pass not match to cpass"})
            }
        else{
            const salt = await bcrypt.genSalt(10);
            const hashpass = await bcrypt.hash(password , salt);
            await UserModel.findByIdAndUpdate(req.user._id, {$set : {password: hashpass }})
            res.send({"status" : "sucess" , "message" : "password change sucessfully"})
        }
    }
        else{
            res.send({"status" : "failure" , "message" : "pass not enter"})
        }
    }

    static loggeduser = async (req, res)=>{

        
        res.send({user : req.user});
        // res.send({"user" : req.user})
        console.log(req.user);
     

    }

    static userSearch = async (req, res)=>{
        const wordKey = req.query?{
            $or : [
                {name : {$regex: req.query.search , $options : "i" }},
                {email : {$regex: req.query.search , $options : "i" }},
            ],
        }
        : {};
        const user = await UserModel.find(wordKey) //find({_id : {$ne : req.user._id}})
        console.log(user);
        res.send(user)
    }

    static user_emailAnd_pass = async(req,res)=>{
        const {email} = req.body;
        // console.log(transporter);
        const user = await UserModel.findOne({email:email});
        if(user){
            const secret = user._id + JWT_ID;
            const token = jwt.sign({userID : user._id } , secret ,{expiresIn : "10m"})
            var link = `http://127.0.0.1:3000/api/user/reset/${user._id}/${token}` ;
            // console.log(link);
            // console.log(user.email)
            // send email
        
            console.log("check");
            var name = link;
            try{
                // console.log(link)
                let info = await transporter.sendMail({
                    from : 'gourav14669@gmail.com' ,
                    to : user.email,
                    subject : "OnlineChat! -  password reset ink",
                    html :`<a href=${name}> click here </a>`
                               
                })
                console.log(link)
                console.log(info)
                res.send({"message" : "Password reset email send " , "email" : user.email})
            }
            
            catch(error){
                res.send({"message" : error.message})
            }
           
           

        }
        else{
            res.send({"message" : "email does not exist "})
        }
    }
    static userEmailPass = async (req,res)=>{
       
        const {password , cpassword} = req.body;
        const {id , token} = req.params;
        const user = await UserModel.findById(id);
        const newSecret = user._id + JWT_ID;
        try {
            jwt.verify(token , newSecret);
        
        } catch (error) {
            console.log(error)
        }
        if(password && cpassword){
            if(password !== cpassword){
                res.send({"message" : "new pass not match to cpass"})
            }
            else{
                const salt = await bcrypt.genSalt(10);
            const hashpass = await bcrypt.hash(password , salt);
            await UserModel.findByIdAndUpdate(user._id, {$set : {password: hashpass }})
            res.send({"status" : "sucess" , "message" : "password change sucessfully"})

            }
        }
        else{
            res.send("enter both pass");
        }
    }
}
module.exports = usercontrol;