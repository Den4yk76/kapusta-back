import { HttpCode } from '../../lib/constants.js';
import repository from '../../repository/reports';
import ReportsService from '../../service/reports';
const reportsService = new ReportsService();

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

export const monthTransactions = async (req, res, next) => {
  const { unixStart, unixEnd, category } = req.body;

  const result = await reportsService.getMonthTransactions(
    unixStart,
    unixEnd,
    category,
  );

  if (!result) {
    return res.status(HttpCode.NOT_FOUND).json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      message: 'Transactions not found',
    });
  }

  res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    category,
    transactions: result,
  });
};
export const monthAmounts = async (req, res, next) => {
  const { unixStart, unixEnd } = req.query;
  const result = await reportsService.getMonthAmounts(unixStart, unixEnd);

  if (!result) {
    return res.status(HttpCode.NOT_FOUND).json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      message: 'Transactions not found',
    });
  }

  res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    result,
  });
};
