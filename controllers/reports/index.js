import { HttpCode } from '../../lib/constants.js';
import ReportsService from '../../service/reports';
import { CustomError } from '../../lib/custom-error';
const reportsService = new ReportsService();

export const incomeReport = async (req, res, next) => {
  const { id } = req.user;
  const { unixStart, unixEnd } = req.query;
  const result = await reportsService.getIncomeReport(id, unixStart, unixEnd);
  if (!result) {
    throw new CustomError(HttpCode.NOT_FOUND, 'Not found');
  }
  res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    transactions: result,
  });
};

export const expenseReport = async (req, res, next) => {
  const { id } = req.user;
  const { unixStart, unixEnd } = req.params;
  const result = await reportsService.getExpenseReport(id, unixStart, unixEnd);
  if (!result) {
    throw new CustomError(HttpCode.NOT_FOUND, 'Not found');
  }
  res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    transactions: result,
  });
};

export const monthAmounts = async (req, res, next) => {
  const { unixStart, unixEnd } = req.query;
  const result = await reportsService.getMonthAmounts(unixStart, unixEnd);

  if (!result) {
    throw new CustomError(HttpCode.NOT_FOUND, 'Not found');
  }

  res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    result,
  });
};
