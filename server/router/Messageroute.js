const express = require('express');
const route = express.Router();
const Verifytoken = require('./../middleware/mid_middleware');
const Messagecontrol = require('../controll/Messagecontrol');


//middleware
route.post("/" , Verifytoken )
route.get("/:chatId" , Verifytoken)
//protected
route.post("/" ,  Messagecontrol.sendMessage)
route.get("/:chatId" ,  Messagecontrol.allMessages)






module.exports = route;