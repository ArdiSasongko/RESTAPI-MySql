const joi = require("joi")

const bookValidator = joi.object({
    title : joi.string().required(),
    description : joi.string().required(),
    price : joi.number().required(),
    amount : joi.number().required()
})

module.exports = bookValidator