const Joi = require('joi');

// users 
const email = Joi.string().pattern(/^[\w\.\-]+@([\w\-]+\.)+[\w\-]{2,4}$/);
const username = Joi.string().pattern(/^[\w\s\-]{1,50}$/);
const user_password = Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
const is_verified = Joi.boolean();
const image_url = Joi.string();

// settings
const theme = Joi.string();
const time_day_starts = Joi.string().pattern(/^([0-9]{2})\:([0-9]{2})$/);

// validation
function validateUser(user, option) {
    const newUserSchema = Joi.object().keys({
        email: email.required(),
        username: username.required(),
        user_password: user_password.required()
    });

    const updateUsernameSchema = Joi.object().keys({
        username: username.required()
    });

    const updateEmailSchema = Joi.object().keys({
        email: email.required()
    });

    const updateUserGeneral = Joi.object().keys({
        username: username.required(),
        email: email.required()
    });

    const updatePasswordSchema = Joi.object().keys({
        new_password: user_password.required(),
        old_password: user_password.required()
    });

    const updateVerifiedSchema = Joi.object().keys({
        is_verified: is_verified.required()
    });

    const updateImageUrlSchema = Joi.object().keys({
        image_url: image_url.required()
    });

    const updateThemeSchema = Joi.object().keys({
        theme: theme.required()
    });

    const updateDayStartTimeSchema = Joi.object().keys({
        time_day_starts: time_day_starts.required()
    });

    switch (option) {
        case 'new':
            return newUserSchema.validate(user);
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
        case 'theme':
            return updateThemeSchema.validate(user);
        case 'time':
            return updateDayStartTimeSchema.validate(user);
        case 'general':
            return updateUserGeneral.validate(user);
        default:
            throw new Error("Error: invalid option");
    }
}

exports.validateUser = validateUser;