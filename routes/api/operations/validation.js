import Joi from 'joi';
import { HttpCode } from '../../../lib/constants.js';


const addIncomeSchema = Joi.object({
    email: Joi.string().email().required(),
    time: Joi.string().max(100).required(),
    count: Joi.string().max(100).required(),
    category: Joi.string().max(1000).required(),
    description: Joi.string().max(1000),
})

export const validateAddIncome = async (req, res, next) => {
    try {
        await addIncomeSchema.validateAsync(req.body);
    } catch (err) {
        return res
            .status(HttpCode.BAD_REQUEST)
            .json({ message: err.message.replace(/"/g, '') });
    }
    next();
}