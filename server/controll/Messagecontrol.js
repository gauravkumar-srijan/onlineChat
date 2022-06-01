const chatModel = require('../model/chatModel');
const Message = require('../model/messageModel');
const UserModel = require('../model/user');

class Messagecontrol{
 static sendMessage =  async(req,res)=>{
     const {content , chatId} = req.body;
     const file = req.files
     if(!content || !chatId){
         console.log("invalid data passed")
         res.sendstatus(400);
     }
     var newMessage = {
        sender: req.user._id, 
        content: content ? content : file,
        chat: chatId,
    
     }
     try {
         var  message  = await Message.create(newMessage);
         message = await message.populate("sender", "name pic")
         message = await message.populate("chat")
         message = await UserModel.populate(message, {
           path: "chat.users",
           select: "name pic email",
         });
         await chatModel.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

         res.json(message);
     
     } catch (error) {
        res.status(400);
         console.log(error)
     }
 }

 static allMessages = async (req, res) => {
    try {
      const messages = await Message.find({ chat: req.params.chatId })
        .populate("sender", "name pic email")
        .populate("chat");
      res.json(messages);
    } catch (error) {
      res.status(400);
      console.log(error);
    }
  };


}

module.exports = Messagecontrol;