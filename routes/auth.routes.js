const express = require('express');
const router = express.Router();
const { login, logout, revoke } = require('../controllers/auth.controller')
router.post('/login', login);
router.post('/logout', logout);
router.post('/revoke/:id', revoke)

module.exports = router;