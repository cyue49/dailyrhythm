const Joi = require('joi');

const email = Joi.string().pattern(/^[\w\.\-]+@([\w\-]+\.)+[\w\-]{2,4}$/);
const username = Joi.string().pattern(/^[\w\s\-]{1,30}$/);
const user_password = Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
const hashed_password = Joi.string();
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

function validateUpdateUser(user, field) {
    const updateUsernameSchema = Joi.object().keys({
        username: username.required()
    });

    const updateEmailSchema = Joi.object().keys({
        email: email.required()
    });

    const updatePasswordSchema = Joi.object().keys({
        user_password: hashed_password.required()
    });

    const updateVerifiedSchema = Joi.object().keys({
        is_verified: is_verified.required()
    });

    const updateImageUrlSchema = Joi.object().keys({
        image_url: image_url.required()
    });

    switch (field) {
        case 'username':
            return updateUsernameSchema.validate(user);
        case 'email':
            return updateEmailSchema.validate(user);
        case 'password':
            return updatePasswordSchema.validate(user);
        case 'verified':
            return updateVerifiedSchema.validate(user);
        case 'imageurl':
            return updateImageUrlSchema.validate(user);
        default:
            throw new Error("Error: invalid field");
    }
}

exports.validateNew = validateNewUser;
exports.validateUpdate = validateUpdateUser;