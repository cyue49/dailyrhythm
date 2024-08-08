const Joi = require('joi');

// habits
const habit_name = Joi.string().pattern(/^[\w\s\-]{1,50}$/);
const habit_description = Joi.string().allow('').max(255);
const is_active = Joi.boolean();
const frequency_count = Joi.number();
const frequency_type = Joi.string().allow('').max(50);
const weekdays = Joi.string().allow('').max(10);

// category
const category_id = Joi.string();

// validation
function validateHabit(habit, option) {
    const newHabitSchema = Joi.object().keys({
        habit_name: habit_name.required(),
        habit_description: habit_description.required(),
        frequency_count: frequency_count.required(),
        frequency_type: frequency_type.required(),
        weekdays: weekdays.required(),
        category_id: category_id.required()
    });

    const updateHabitGeneralSchema = Joi.object().keys({
        habit_name: habit_name.required(),
        habit_description: habit_description.required(),
        frequency_count: frequency_count.required(),
        frequency_type: frequency_type.required(),
        weekdays: weekdays.required(),
        category_id: category_id.required()
    });

    const updateHabitActiveSchema = Joi.object().keys({
        is_active: is_active.required()
    });

    switch (option) {
        case 'new':
            return newHabitSchema.validate(habit);
        case 'update':
            return updateHabitGeneralSchema.validate(habit);
        case 'active':
            return updateHabitActiveSchema.validate(habit);
        default:
            throw new Error("Error: invalid option");
    }
}

exports.validateHabit = validateHabit;