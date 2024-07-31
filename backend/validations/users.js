const Joi = require('joi');

const email = Joi.string().pattern(/^[\w\.\-]+@([\w\-]+\.)+[\w\-]{2,4}$/);
const username = Joi.string().pattern(/^[\w\s\-]{1,30}$/);
const user_password = Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
const is_verified = Joi.boolean();
const image_url = Joi.string();

function validateNewUser(user) {
    const userSchema = Joi.object().keys({
        email: email.required(),
        username: username.required(),
        user_password: user_password.required()
    });

    return userSchema.validate(user);
}

function validateUpdateUser(user) {
    const userSchema = Joi.object().keys({
        email, username, user_password, is_verified, image_url
    });

    return userSchema.validate(user);
}

exports.validateNew = validateNewUser;
exports.validateUpdate = validateUpdateUser;