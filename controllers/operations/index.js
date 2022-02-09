import { HttpCode } from '../../lib/constants.js';
import OperationsService from '../../service/operations/';
import repository from '../../repository/operations';
import usersRepository from '../../repository/users';
const operationsService = new OperationsService();

const addIncome = async (req, res, next) => {
  const { count } = req.body;
  const { id } = req.user;

  let currentBalance = await usersRepository.findById(id).balance;
  currentBalance = currentBalance + count;

  const user = await repository.updateBalance(id, { balance: currentBalance });
  if (!user) {
    return res.status(HttpCode.NOT_FOUND).json({ message: 'Not found' });
  }
  // const newBalance = await repository.updateBalance(id, { count });
  // if (!newBalance) {
  //   return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
  //     status: 'error',
  //     code: HttpCode.INTERNAL_SERVER_ERROR,
  //     message: 'Unknown server error',
  //   });
  // }

  const addIncomeObject = await operationsService.addIncomeObject(id, req.body);
  if (!addIncomeObject) {
    return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      code: HttpCode.INTERNAL_SERVER_ERROR,
      message: 'Unknown server error',
    });
  }

  res.status(HttpCode.CREATED).json({
    status: 'success',
    code: HttpCode.CREATED,
    newBalance: {
      balance: user.balance,
    },
  });
};

const changeBalance = async (req, res, next) => {
  const { id } = req.user;
  const user = await repository.updateBalance(id, req.body);
  res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    user: {
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

const deleteExpense = async (req, res, next) => {
  const { id: expenseId } = req.params;
  const { id: userId } = req.user;
  const expense = await operationsService.deleteExpense(userId, expenseId);

  if (!expense) {
    return res.status(HttpCode.NOT_FOUND).json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      message: 'Not Found',
    });
  } else {
    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      user: { expense },
    });
  }
};

export { addIncome, deleteIncome, deleteExpense, changeBalance };
