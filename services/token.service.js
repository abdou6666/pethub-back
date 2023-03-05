const jwt = require("jsonwebtoken");


// const createAccessToken = (user) => {
//     return jwt.sign({ id: user.id, role: user.role }, process.env.ACCESS_TOKEN_SECRET, {
//         expiresIn: '7d'
//     })
// }

// const createRefreshToken = (user) => {
//     return jwt.sign({ id: user.id, role: user.role }, process.env.REFRESH_TOKEN_SECRET, {
//         expiresIn: '14d'
//     })
// }

// const emailToken = (user) => {
//     return jwt.sign({ id: user.id, role: user.role }, process.env.REFRESH_TOKEN_SECRET, {
//         expiresIn: '30m'
//     })
// }

const generateToken = (user, type) => {
    let token;
    const tokensTypes = ['access_token', 'refresh_token', 'email_token'];
    if (!type || !tokensTypes.includes(type)) {
        throw new Error(`can not generate this type of token : ${type}`)
    }

    if (type === 'access_token') {
        token = jwt.sign({ id: user.id, role: user.role, tokenVersion: user.tokenVersion }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '7d'
        })
    }
    if (type === 'refresh_token') {
        token = jwt.sign({ id: user.id, role: user.role, tokenVersion: user.tokenVersion }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '14d'
        })
    }

    if (type === 'email_token') {
        token = jwt.sign({ id: user.id, role: user.role, tokenVersion: user.tokenVersion }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '30m'
        })
    }

    return token;
}

module.exports = generateToken;
// module.exports = { createAccessToken, createRefreshToken, emailToken, generateToken }