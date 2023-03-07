const express = require('express');
const router = express.Router();
const { login, logout, revoke, refreshToken, invalid_token, confirmAccount } = require('../controllers/auth.controller')
router.post('/login', login);
router.post('/logout', logout);
router.post('/revoke/:id', revoke)
router.post('/refresh-token', refreshToken)
router.get('/confirm/:token', confirmAccount)
// router.post('/invalid', invalid_token)

module.exports = router;