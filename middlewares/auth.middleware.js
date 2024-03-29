const jwt = require('jsonwebtoken');
const UserSchema = require('../models/UserSchema');

const authenticationMiddleware = async (req, res, next) => {
    const authorization = req.headers.authorization;

    if (!authorization) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    if (!authorization.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    // console.log(req.cookies)
    // if (!req.cookies.jwt) {
    //     return res.status(401).json({ error: 'Missing token' })
    // }
    // const refreshToken = req.cookies.jwt;
    // const refreshTokenPayload = jwt.decode(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    // if (!refreshTokenPayload) {
    //     return res.status(401).json({ error: 'Token has been changed' })
    // }

    const token = authorization.split(' ')[1];


    //TODO : verify throws error needs fix
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!payload) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const user = await UserSchema.findById(payload.id)
    if (user.tokenVersion !== payload.tokenVersion) {
        return res.status(401).json({ error: 'Token has been revoked' });
    }

    req.user = {
        id: payload.id,
        role: payload.role,
        tokenVersion: payload.tokenVersion
    }

    next();
}

module.exports = authenticationMiddleware;