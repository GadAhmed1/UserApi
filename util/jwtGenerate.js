const jwt = require('jsonwebtoken');
module.exports = async (payload) =>{
    const JWT_Secret =  await jwt.sign(payload,process.env.JWT_SecrtKey,{
        expiresIn:"20s"
    });
    return JWT_Secret;
}