import Joi from 'joi';
import { HttpCode } from '../../../lib/constants.js';

const monthTransactionsSchema = Joi.object({
  unixStart: Joi.string().length(10).required(),
  unixEnd: Joi.string().length(10).required(),
  category: Joi.string().valid('incomes', 'expenses').required(),
});

const monthAmountsSchema = Joi.object({
  unixStart: Joi.string().length(10).required(),
  unixEnd: Joi.string().length(10).required(),
});

export const validateMonthTransactionsSchema = async (req, res, next) => {
  try {
    await monthTransactionsSchema.validateAsync(req.body);
  } catch (err) {
    return res
      .status(HttpCode.BAD_REQUEST)
      .json({ message: err.message.replace(/"/g, '') });
  }
  next();
};

export const validateMonthAmountsSchema = async (req, res, next) => {
  try {
    await monthAmountsSchema.validateAsync(req.body);
  } catch (err) {
    return res
      .status(HttpCode.BAD_REQUEST)
      .json({ message: err.message.replace(/"/g, '') });
  }
  next();
};
