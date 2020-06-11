const Joi = require('joi')

const {regexpEnum} = require('../../constants')

module.exports = Joi.object().keys({
    name: Joi.string().trim().min(2).max(60).required().allow('TRUMPET'),
    email: Joi.string().trim().regex(regexpEnum.EMAIL).required(),
    password: Joi.string().trim().min(8).required(),
    age: Joi.number().integer().min(0).max(120).required(),
    description: Joi.string().optional().allow(null, ''),
    family: Joi.array().items(
        Joi.object().keys({
            name: Joi.string().trim().min(2).max(60)
        })
    ).optional()
})
