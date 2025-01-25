const UsersModel = require('../models/user.model');
const UserAgent = require('../models/UserAgentInfo')
const StatusUtil = require('../util/statusUtil');
const jwtGenerate = require('../util/jwtGenerate');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const GetAllUsersController = async (req, res) => {
    try {
        const AllUsers = await UsersModel.find();
        res.status(200).json({
            status: StatusUtil.SUCCESS,
            data: {
                ...AllUsers
            }
        })
    } catch (err) {
        res.status(404).json({
            status: StatusUtil.ERROR,
            massage: err
        })
    }
}

const RegistrationUsersController = async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const CheckUserIsExsist = await UsersModel.findOne({ email: email });
        if (CheckUserIsExsist) {
            return res.status(401).json({
                status: StatusUtil.FAIL,
                massage: "User Is Already Exsist"
            })
        }
        if (!firstname || !lastname || !email || !password) {
            return res.status(401).json({
                status: StatusUtil.FAIL,
                massage: "InVaild Value"
            })
        }
        if (!emailRegex.test(email)) {
            return res.status(401).json({
                status: StatusUtil.FAIL,
                massage: "InVaild Email"
            })
        }
        const JWT_Generate = await jwtGenerate({ email: email, role: "user" });
        const HashPassword = bcrypt.hashSync(password, 8);
        const AddNewUser = UsersModel({ firstname, lastname, email, password: HashPassword });
        await AddNewUser.save()
        res.status(201).json({
            status: StatusUtil.SUCCESS,
            data: {
                token: JWT_Generate,
                ...AddNewUser._doc
            }
        })
    } catch (err) {
        res.status(404).json({
            status: StatusUtil.ERROR,
            massage: err
        })
    }
}

const LoginUserController = async (req, res) => {
    try {
        const {email,password} = req.body;
        const User = await UsersModel.findOne({ email: email });
        if(!User){
            return res.status(401).json({
                status: StatusUtil.FAIL,
                massage: "User Is Not Exsist"
            })
        }
        if (!email || !password) {
            return res.status(401).json({
                status: StatusUtil.FAIL,
                massage: "InVaild Value"
            })
        }
        const CheckThePassword = await bcrypt.compare(password,User.password);
        const JWT_Generate = await jwtGenerate({ email: User.email, role: "user" });
        if(CheckThePassword){
            res.status(200).json({
                status:StatusUtil.SUCCESS,
                data:{
                    jwt_token:JWT_Generate,
                    User
                }
            })
        }else{
            res.status(404).json({
                status:StatusUtil.FAIL,
                data:null,
                massage:"password is false"
            })
        }
    } catch (err) {
        res.status(404).json({
            status: StatusUtil.ERROR,
            massage: err
        })
    }
}

const GetUserAgentInfo = async (req,res) => {
    try {
        const UserAgenJson = await UserAgent.find();

        const formattedData = UserAgenJson.map((user, index) => ({
            IP: user.ip,
            SearchEngine: user.searchengine?.name || "N/A",
            Browser:user.browser || "N/A",
            Version: user.searchengine?.version || "N/A",
            OS: user.os?.name || "N/A",
            OS_Version: user.os?.version || "N/A",
            Device_Type: user.device?.type || "N/A",
            Device_Model: user.device?.model || "N/A",
            Device_Vendor: user.device?.vendor || "N/A"
        }));
    
        console.table(formattedData);
    
        res.status(200).json({
            status: StatusUtil.SUCCESS,
            data: UserAgenJson
        });
    } catch (err) {
        res.status(404).json({
            status: StatusUtil.ERROR,
            message: err.message
        });
    }
    
}

module.exports = {
    GetAllUsersController,
    RegistrationUsersController,
    LoginUserController,
    GetUserAgentInfo
}