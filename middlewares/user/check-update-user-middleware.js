const Joi = require('joi')

const {updateUserValidator} = require('../../validators')
const {ErrorHandler} = require('../../errors')



module.exports = async (req, res, next) => {
    try {
        const user = req.body;

        const {error} = Joi.validate(user, updateUserValidator);

        if (error) {
            return next(new ErrorHandler(error.details[0].message, 400))
        }

        next();

    } catch (e) {
        res.render('error', {message: e.message})
    }

}
