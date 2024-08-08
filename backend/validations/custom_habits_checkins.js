const Joi = require('joi');

// checkin 
const for_date = Joi.date();

// habit
const habit_id = Joi.string();

// validation
function validateCheckin(checkin) {
    const habitCheckinSchema = Joi.object().keys({
        for_date: for_date.required(),
        habit_id: habit_id.required()
    });

    return habitCheckinSchema.validate(checkin);
}

exports.validateCheckin = validateCheckin;