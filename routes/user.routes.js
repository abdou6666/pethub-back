const express = require("express");
const { createUser, deleteUser, getUser, getUsers, updateUser, resetPassword } = require("../controllers/user.controller")
const validationMiddleware = require('../middlewares/validation.middleware')
const { object, string, } = require('yup');
const authenticationMiddleware = require('../middlewares/auth.middleware');
const hasRoleMiddleware = require('../middlewares/hasRole.middleware');

const userValidationSchema = object({
    firstname: string().required(),
    lastname: string().required(),
    email: string().email().required(),
    password: string().required()
});

const router = express.Router();


router.post('/', validationMiddleware(userValidationSchema), createUser)
router.get('/', authenticationMiddleware, getUsers)
router.delete('/:id', deleteUser)
router.put('/:id', validationMiddleware(userValidationSchema), authenticationMiddleware, hasRoleMiddleware('admin'), updateUser)
router.get('/:id', getUser)

router.post('/reset-password', resetPassword)

module.exports = router;