import { HttpCode } from '../../lib/constants.js';
import repository from '../../repository/reports';

export const incomeReport = async (req, res, next) => {
  const { id } = req.user;
  const result = await repository.findIncome(id); // owner by user id?
  // масив даних за останні пів року
  res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    message: {
      report: result,
    },
  });
};

export const expenseReport = async (req, res, next) => {
  const { id } = req.user;
  const result = await repository.findExpense(id);
  // масив даних за останні пів року
  res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    message: {
      report: result,
    },
  });
};
