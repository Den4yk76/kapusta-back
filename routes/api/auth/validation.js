import Joi from 'joi';
import { HttpCode } from '../../../lib/constants.js';

const authSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(30),
});

export const validateAuth = async (req, res, next) => {
  try {
    await authSchema.validateAsync(req.body);
  } catch (err) {
    return res
      .status(HttpCode.BAD_REQUEST)
      .json({ message: err.message.replace(/"/g, '') });
  }
  next();
};
