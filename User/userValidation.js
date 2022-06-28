const joi = require('joi');
const { inputErr } = require('../helpers/customError');

const userAddingSchema = joi.object({
  firstName: joi.string().min(1).required(),
  lastName: joi.string().min(1).required(),
  email: joi.string().email().required(),
  password: joi.string().min(8).required(),
});

const addValidation = async (req, res, next) => {
  try {
    const validated = await userAddingSchema.validateAsync(req.body);
    req.body = validated;
    next();
  } catch (error) {
    if (error.isJoi) next(inputErr);
    next(error);
  }
};

module.exports = addValidation;
