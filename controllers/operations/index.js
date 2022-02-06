import { HttpCode } from '../../lib/constants.js';
import OperationsService from '../../service/operations/';
import repository from '../../repository/operations';
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

const changeBalance = async (req, res, next) => {
  const { id } = req.user;
  const user = await repository.updateBalance(id, req.body);
  if (!user) {
    return res.status(HttpCode.NOT_FOUND).json({ message: 'Not found' });
  }
  res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    user: {
      id,
      balance: user.balance,
    },
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

export { addIncome, deleteIncome, changeBalance };
