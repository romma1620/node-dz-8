const {emailActionEnum} = require('../../constants')
const {ErrorHandler} = require('../../errors')
const {hashPassword, checkHashPassword} = require('../../helpers')
const {emailService, userService} = require('../../service')

module.exports = {
    getAllUsers: async (req, res) => {
        let users = await userService.getUsers();
        res.json(users)
    },

    getUser: async (req, res) => {
        let users = await userService.getUser(req.params.id);
        res.json(users)
    },

    updateUser: async (req, res) => {
        try {
            const user = req.body;
            await userService.updateUser(req.body.id, req.body);
            await emailService.sendMail(user.email, emailActionEnum.USER_UPDATE, {userName: user.name});
        } catch (e) {
            res.json(e)
        }
        res.end()
    },

    deleteUser: async (req, res) => {
        try {
            const user = req.body;
            await emailService.sendMail(user.email, emailActionEnum.USER_DELETE, {userName: user.name});
            await userService.deleteUser(req.params.id);
        } catch (e) {
            res.json(e)
        }

        res.sendStatus(204)
    },

    createUser: async (req, res) => {
        try {
            const user = req.body;

            user.password = await hashPassword(user.password)

            await userService.createUser(user);
            await emailService.sendMail(user.email, emailActionEnum.USER_REGISTER, {userName: user.name});
        }
         catch (e) {
            res.json(e)
        }

        res.end()
    },

    loginUser: async (req, res, next) => {

        const {email, password} = req.body;

        const user = await userService.getUserByParams({email})

        if (!user) {
            return next(new ErrorHandler('User not found', 404, 4041))
        }

        await checkHashPassword(user.password, password)

        res.json(user)


    }

};
