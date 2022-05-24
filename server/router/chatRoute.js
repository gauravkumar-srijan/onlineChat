const express = require('express');
const route = express.Router();
const chatRoute = require('../controll/chatcontrol');
const Verifytoken = require('./../middleware/mid_middleware');
//jwt token authe

route.post("/" , Verifytoken,chatRoute.accessChat);
route.get("/" ,  Verifytoken);
route.post("/group" ,  Verifytoken);
route.put("/rename" ,  Verifytoken);
route.put("/groupremove" ,  Verifytoken);
route.put("/groupadd" ,  Verifytoken);

// route.post("/" ,  chatRoute.accessChat);
route.get("/" ,  chatRoute.fetchChats);
route.post("/group" ,  chatRoute.createGroupChat);
route.put("/rename" ,  chatRoute.renameGroup);
route.put("/groupremove" ,  chatRoute.removeFromGroup);
route.put("/groupadd" ,  chatRoute.addToGroup);


//invitation request handler
route.post("/invite" ,  chatRoute.Inviteuser);

module.exports = route;