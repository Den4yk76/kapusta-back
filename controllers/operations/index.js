import { HttpCode } from '../../lib/constants.js';
import OperationsService from '../../service/operations/';
import repository from '../../repository/operations';
import usersRepository from '../../repository/users';
import { CustomError } from '../../lib/custom-error';
const operationsService = new OperationsService();

const addIncome = async (req, res, next) => {
  const { count } = req.body;
  const { id } = req.user;

  let currentBalance = await usersRepository.findById(id);

  const newBalance = Number(currentBalance.balance) + Number(count);

  const user = await repository.updateBalance(id, { balance: newBalance });
  if (!user) {
    throw new CustomError(HttpCode.NOT_FOUND, 'Not found');
  }

  const addIncomeObject = await operationsService.addIncomeObject(id, req.body);

  if (!addIncomeObject) {
    throw new CustomError(
      HttpCode.INTERNAL_SERVER_ERROR,
      'Unknown server error',
    );
  }

  res.status(HttpCode.CREATED).json({
    status: 'success',
    code: HttpCode.CREATED,
    newBalance: {
      balance: user.balance,
    },
  });
};

const addExpense = async (req, res, next) => {
  const { count } = req.body;
  const { id } = req.user;

  let currentBalance = await usersRepository.findById(id);

  const newBalance = Number(currentBalance.balance) - Number(count);

  const user = await repository.updateBalance(id, { balance: newBalance });
  if (!user) {
    throw new CustomError(HttpCode.NOT_FOUND, 'Not found');
  }

  const addExpenseObject = await operationsService.addExpenseObject(
    id,
    req.body,
  );

  if (!addExpenseObject) {
    throw new CustomError(
      HttpCode.INTERNAL_SERVER_ERROR,
      'Unknown server error',
    );
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
  if (!user) {
    res.status(HttpCode.BAD_REQUEST).json({
      status: 'bad request',
      code: HttpCode.BAD_REQUEST,
      user: {
        balance: user.balance,
      },
    });
  }
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
    throw new CustomError(HttpCode.NOT_FOUND, 'Not found');
  } else {
    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      transaction: { income },
    });
  }
};

const deleteExpense = async (req, res, next) => {
  const { id: expenseId } = req.params;
  const { id: userId } = req.user;
  const expense = await operationsService.deleteExpense(userId, expenseId);

  if (!expense) {
    throw new CustomError(HttpCode.NOT_FOUND, 'Not found');
  } else {
    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      transaction: { expense },
    });
  }
};

export { addIncome, deleteIncome, deleteExpense, changeBalance, addExpense };
