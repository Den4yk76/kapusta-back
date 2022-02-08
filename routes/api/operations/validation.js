import Joi from 'joi';
import { HttpCode } from '../../../lib/constants.js';
import pkg from 'mongoose';

const { Types } = pkg;

const addIncomeSchema = Joi.object({
  email: Joi.string().email().required(),
  time: Joi.string().max(100).required(),
  count: Joi.string().max(100).required(),
  category: Joi.string().max(1000).required(),
  description: Joi.string().max(1000),
});

const updateBalanceSchema = Joi.object({
  balance: Joi.string().required(),
});

export const validateAddIncome = async (req, res, next) => {
  try {
    await addIncomeSchema.validateAsync(req.body);
  } catch (err) {
    return res
      .status(HttpCode.BAD_REQUEST)
      .json({ message: err.message.replace(/"/g, '') });
  }
  next();
};

export const validationUpdateBalance = async (req, res, next) => {
  try {
    await updateBalanceSchema.validateAsync(req.body);
  } catch (err) {
    return res
      .status(HttpCode.BAD_REQUEST)
      .json({ message: err.message.replace(/"/g, '') });
  }
  next();
};

export const validateId = async (req, res, next) => {
  if (!Types.ObjectId.isValid(req.params.id)) {
    return res
      .status(HttpCode.BAD_REQUEST)
      .json({ message: 'Invalid ObjectId' });
  }
  next();
};
