const {responceStatusCodesEnum} = require('../../constants');
const {ErrorHandler} = require('../../errors');

module.exports = (req, res, next) => {

    if (req.docs.length) {
        return next(new ErrorHandler('You can`t upload files to user', responceStatusCodesEnum.BAD_REQUEST))
    }

    if (req.photos.length > 1) {
         return next(new ErrorHandler('You can`t upload several photos to user', responceStatusCodesEnum.BAD_REQUEST))
    }

    next()

}
