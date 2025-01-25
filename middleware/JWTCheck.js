const jwt = require('jsonwebtoken');

const CheckTheJWT = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(401).json({ error: 'Authorization header is missing' });
        }
        const authToken = authHeader.split(' ')[1];
        const decode = jwt.verify(authToken, process.env.JWT_SecrtKey);
        console.log('Decoded Token:', decode); 
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            console.error('Token expired at:', err.expiredAt);
            return res.status(401).json({ error: 'Token has expired', expiredAt: err.expiredAt });
        } else {
            console.error(err.message);
            return res.status(403).json({ error: 'Invalid token' });
        }
    }
};

module.exports = CheckTheJWT;
