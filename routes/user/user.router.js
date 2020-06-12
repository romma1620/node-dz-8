const {Router} = require('express');

const userRouter = Router();

const {userController} = require('../../controllers');
const {fileMiddleware} = require('../../middlewares')
const {checkIsUserExists, checkUpdateUser} = require('../../middlewares/user');


userRouter.post(
    '/',
    checkIsUserExists,
    fileMiddleware.fileCheckMiddleware,
    fileMiddleware.userPhotoCountMiddleware,
    userController.createUser
);

userRouter.post('/auth', userController.loginUser)

userRouter.get('/', userController.getAllUsers);

userRouter.get('/:id', userController.getUser);

userRouter.put('/', checkUpdateUser, userController.updateUser);

userRouter.delete('/:id', userController.deleteUser);


module.exports = userRouter;
