import Joi from 'joi';
import { HttpCode } from '../../../lib/constants.js';

const monthTransactionsSchema = Joi.object({
  unixStart: Joi.date().timestamp('unix').required(),
  unixEnd: Joi.date().timestamp('unix').required(),
  category: Joi.string().valid('incomes', 'expenses').required(),
});

const queryStringSchema = Joi.object({
  unixStart: Joi.date().timestamp('unix').required(),
  unixEnd: Joi.date().timestamp('unix').required(),
});

export const validateMonthTransactionsSchema = async (req, res, next) => {
  try {
    await monthTransactionsSchema.validateAsync(req.query);
  } catch (err) {
    return res
      .status(HttpCode.BAD_REQUEST)
      .json({ message: err.message.replace(/"/g, '') });
  }
  next();
};

export const queryStringValidation = async (req, res, next) => {
  try {
    await queryStringSchema.validateAsync(req.query);
  } catch (err) {
    return res
      .status(HttpCode.BAD_REQUEST)
      .json({ message: err.message.replace(/"/g, '') });
  }
  next();
};
