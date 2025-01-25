const express = require('express');
const GetUserMiddleWare = require('../middleware/GetUserInfo');
const UserControllers = require('../controllers/users.controller');
const JWT_check = require('../middleware/JWTCheck')
const router = express.Router();
router.route('/')
    .get(GetUserMiddleWare,UserControllers.GetAllUsersController)
router.route('/registr')
    .post(GetUserMiddleWare,UserControllers.RegistrationUsersController)
router.route('/login')
    .post(GetUserMiddleWare,UserControllers.LoginUserController)
router.route('/userAgent')
    .get(UserControllers.GetUserAgentInfo)

module.exports = router;