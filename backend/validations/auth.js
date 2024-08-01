const Joi = require('joi');

const email = Joi.string().pattern(/^[\w\.\-]+@([\w\-]+\.)+[\w\-]{2,4}$/);
const user_password = Joi.string();

function validateAuth(user) {
    const authSchema = Joi.object().keys({
        email: email.required(),
        user_password: user_password.required()
    });

    return authSchema.validate(user);
}

exports.validateAuth = validateAuth;