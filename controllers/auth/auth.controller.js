const {authEnum, emailActionEnum, responceStatusCodesEnum} = require('../../constants')
const {error, ErrorHandler} = require('../../errors');
const {tokenGenerator, checkHashPassword} = require('../../helpers');
const {authService, emailService, userService} = require('../../service');


module.exports = {
    loginUser: async (req, res, next) => {
        try {
            const {email, password} = req.body;
            const user = await userService.getUserByParams({email});

            if (!user) {
                return next(new ErrorHandler('Miss user', 404, 4041))
            }

            await checkHashPassword(user.password, password);

            const tokens = tokenGenerator();

            await authService.createTokenPair({...tokens, userId: user.id});

            res.json(tokens);

        } catch (e) {

            next(e)
        }

    },

    logoutUser: async (req, res, next) => {
        try {

            const access_token = req.get(authEnum.AUTH);


            await authService.deleteByParams({access_token});

            res.sendStatus(200);

        } catch (e) {
            next(e)
        }
    },

    refreshToken: async (req, res, next) => {
        try {
            const refresh_token = req.get(authEnum.AUTH);
            const userId = req.userId;


            const user = await userService.getUser(userId);
            if (!user) {
                return next(new ErrorHandler(
                    error.NOT_FOUND.message,
                    responceStatusCodesEnum.NOT_FOUND,
                    error.NOT_FOUND.code
                ))
            }

            const tokens = tokenGenerator();

            await emailService.sendMail(user.email, emailActionEnum.USER_REFRESH, {userName: user.name});
            await authService.deleteByParams({refresh_token});
            await authService.createTokenPair({...tokens, userId: req.userId})


                res.json(tokens);

        } catch (e) {
            next(e)
        }
    }

};
