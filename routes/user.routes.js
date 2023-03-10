const express = require("express");
const { createUser, deleteUser, getUser, getUsers, updateUser, resetPassword, resetPasswordEmail } = require("../controllers/user.controller")
const validationMiddleware = require('../middlewares/validation.middleware')
const { object, string, } = require('yup');
const authenticationMiddleware = require('../middlewares/auth.middleware');
const hasRoleMiddleware = require('../middlewares/hasRole.middleware');

const createUserValidationSchema = object({
    firstname: string().required(),
    lastname: string().required(),
    email: string().email().required(),
    password: string().required()
});

const resetPassowrdValidationSchema = object({
    token: string().required(),
    password: string().required(),
    confirmPassword: string().required(),
});

const requestResetPasswordValidationSchema = object({
    email: string().email().required()
});


const router = express.Router();


router.post('/', validationMiddleware(createUserValidationSchema), createUser)
router.get('/', authenticationMiddleware, getUsers)
router.delete('/:id', deleteUser)
router.put('/:id', validationMiddleware(createUserValidationSchema), authenticationMiddleware, hasRoleMiddleware('admin'), updateUser)

router.get('/:id', getUser)

router.post('/email/reset-password', validationMiddleware(requestResetPasswordValidationSchema), resetPasswordEmail)
router.post('/reset-password', validationMiddleware(resetPassowrdValidationSchema), resetPassword)

module.exports = router;