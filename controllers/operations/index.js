import { HttpCode } from '../../lib/constants.js';
import OperationsService from '../../service/operations/';
const operationsService = new OperationsService();

const addIncome = async (req, res, next) => {
  const { email, count } = req.body;
  const newBalance = await operationsService.changeBalance(email, count);
  if (!newBalance) {
    return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      code: HttpCode.INTERNAL_SERVER_ERROR,
      message: 'Unknown server error',
    });
  }

  const addIncome = await operationsService.addIncome(req.body);
  if (!addIncome) {
    return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      code: HttpCode.INTERNAL_SERVER_ERROR,
      message: 'Unknown server error',
    });
  }

  res.status(HttpCode.CREATED).json({
    status: 'success',
    code: HttpCode.CREATED,
    user: { newBalance },
  });
};

const deleteIncome = async (req, res, next) => {
  const { id: incomeId } = req.params;
  const { id: userId } = req.user;
  const income = await operationsService.deleteIncome(userId, incomeId);

  if (!income) {
    return res.status(HttpCode.NOT_FOUND).json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      message: 'Not Found',
    });
  } else {
    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      user: { income },
    });
  }
};

export { addIncome, deleteIncome };
