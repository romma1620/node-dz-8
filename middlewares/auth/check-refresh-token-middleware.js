const jwt = require('jsonwebtoken');

const {authService} = require('../../service')
const {
    authEnum,
    responceStatusCodesEnum,
    wordsEnum: {JWT_REFRESH_SECRET}
}
    = require('../../constants');
const {error, ErrorHandler} = require('../../errors')

module.exports = async (req, res, next) => {
    try {
        
        const token = req.get(authEnum.AUTH);

        if (!token) {
            return next(new ErrorHandler('No token', 400, 4002));
        }

        jwt.verify(token, JWT_REFRESH_SECRET, err => {
            if (err) {
                throw new ErrorHandler(
                    error.NOT_VALID_TOKEN.message,
                    responceStatusCodesEnum.UNAUTHORIZED,
                    error.NOT_VALID_TOKEN.code
                );
            }
        });

        const tokenFromDB = await authService.getTokenByParams({refresh_token: token});

        if (!tokenFromDB) {
            return next(new ErrorHandler(
                error.NOT_VALID_TOKEN.message,
                responceStatusCodesEnum.UNAUTHORIZED,
                error.NOT_VALID_TOKEN.code
            ));
        }

        req.userId = tokenFromDB.userId
        next()

    } catch (e) {
        next(e)

    }

}
