import Income from '../model/income';
import Expense from '../model/expense';

const findIncome = async (id, start, end) => {
  const result = await Income.find({
    owner: id,
    date: { $gt: start, $lt: end },
  });
  return result;
};

const findExpense = async (id, start, end) => {
  const result = await Expense.find({
    owner: id,
    date: { $gt: start, $lt: end },
  });
  return result;
};

const findMonthAmounts = async (id, unixStart, unixEnd) => {
  const incomes = await Income.find({
    owner: id,
    date: { $gt: unixStart, $lt: unixEnd },
  });
  const expenses = await Expense.find({
    owner: id,
    date: { $gt: unixStart, $lt: unixEnd },
  });

  return { incomes, expenses };
};

export default {
  findIncome,
  findExpense,
  findMonthAmounts,
};
