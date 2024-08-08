const Joi = require('joi');

const category_name = Joi.string();

// validation
function validateCategory(category) {
    const categorySchema = Joi.object().keys({
        category_name: category_name.required()
    });

    return categorySchema.validate(category);
}

exports.validateCategory = validateCategory;