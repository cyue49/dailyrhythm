const Joi = require('joi');

const category_name = Joi.string().pattern(/^[\w\s\-]{1,50}$/);

// validation
function validateCategory(category) {
    const categorySchema = Joi.object().keys({
        category_name: category_name.required()
    });

    return categorySchema.validate(category);
}

exports.validateCategory = validateCategory;