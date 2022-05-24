const express = require('express');
const router = express.Router();
const usercontrol= require('./../controll/usercontrol')
const Verifytoken = require('./../middleware/mid_middleware');

//middle midware
router.put('/changepass' , Verifytoken)
router.use('/loggeduser' , Verifytoken);
// router.use('/' , Verifytoken );

//public
router.get('/' ,  usercontrol.userSearch);
router.post('/ragister' , usercontrol.userRagister );
router.post('/login' , usercontrol.userlogin);
router.post('/user-reset-email-pass' , usercontrol.user_emailAnd_pass);
router.post('/user-reset/:id/:token' , usercontrol.userEmailPass);


//protected
router.put('/changepass' , usercontrol.changePass);
router.get('/loggeduser' , usercontrol.loggeduser);

module.exports = router;