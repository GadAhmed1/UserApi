const UAParser = require('ua-parser-js');
const UserAgentModel = require('../models/UserAgentInfo')
const GetUserInfo = async (req, res, next) => {
    const userAgent = req.headers['user-agent'];

    const parser = new UAParser(userAgent);
    const result = parser.getResult();

    let ip = req.ip || req.connection.remoteAddress;
    if (req.headers['x-forwarded-for']) {
        ip = req.headers['x-forwarded-for'].split(',')[0];
    }
    const TheRes = {
        ip: ip,
        searchengine: result.browser,
        browser: req.rawHeaders[7],
        os: result.os,
        device: result.device
    };
    const UserAgent = await UserAgentModel(TheRes);
    await UserAgent.save();
    next();

};

module.exports = GetUserInfo;
