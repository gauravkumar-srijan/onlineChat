const express = require('express');
const app = express();
const connectDb = require('./config/connection');
const cors = require('cors');
const Port = process.env.PORT || 8000;
const data_url = "mongodb://localhost:27017";
const route  = require('./router/route');
const Chatroute  = require('./router/chatRoute.js');
const Messageroute  = require('./router/Messageroute.js');
const path = require('path');

connectDb(data_url);
//middleware
app.use(cors());
app.use(express.json());
app.use('/api/user' , route);
app.use('/api/chat' , Chatroute);
app.use('/api/message' , Messageroute);

//---deployment----------------
const dir_name = path.resolve();
const dev = "production";
if(dev === "production"){
        app.use(express.static(path.join(dir_name, "/webchat/build")))
        app.get('*' , (req,res)=>{
            res.sendFile(path.resolve(dir_name, "webchat" , "build", "index.html"))
        })
}
else{
    app.get('/', (req, res)=>{
        res.send("he! WORKS");
    })
}



//------deployment--------

const server = app.listen(Port , ()=>{
    console.log("connection worked" + Port)
})

const io = require('socket.io')(server,{
    pingTimeOut:60000,
    cors:{
        origin:"http://localhost:3000"
    },
});
io.on("connection" , (socket)=>{
    console.log("its connect" , socket.id)
   socket.on("setup" , (userData)=>{
       console.log(userData._id)
       socket.join(userData._id)
   }) 
   socket.on("joinchat" , (room)=>{
    console.log(room)
    socket.join(room)
   })
   socket.on("message" ,(Newmessage)=>{
       var chat  = Newmessage.chat;
       if(!chat.users) return console.log("Chat users are not defined")
       chat.users.forEach((user) => {
        if(user._id === Newmessage.sender._id)  
        {
            return
        }
        socket.in(user._id).emit("showmessage", Newmessage)
    })
   })
})