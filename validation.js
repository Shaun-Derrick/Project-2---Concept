const Joi = require('joi')

const registerValidation = (data) => {
  const schema = Joi.object({
    firstname: Joi.string().min(3).required(),
    lastname: Joi.string().min(3).max(10).required(),
    password: Joi.string().min(6).max(1024).required(),
    email: Joi.string().min(3).required().email(),
  })
  return schema.validate(data)
}

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(3).required().email(),
    password: Joi.string().min(6).max(1024).required(),
  })
  return schema.validate(data)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation