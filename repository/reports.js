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

const findMonthTransactions = async (unixStart, unixEnd, category) => {
  if (category === 'incomes') {
    const result = await Income.find({
      $and: [
        { date: { $gte: Number(unixStart) } },
        { date: { $lte: Number(unixEnd) } },
      ],
    });
    return result;
  }

  if (category === 'expenses') {
    const result = await Expense.find({
      $and: [{ date: { $gte: unixStart } }, { date: { $lte: unixEnd } }],
    });
    return result;
  }
};

const findMonthAmounts = async (unixStart, unixEnd) => {
  const incomes = await Income.find({
    $and: [{ date: { $gte: unixStart } }, { date: { $lte: unixEnd } }],
  });
  const expenses = await Expense.find({
    $and: [{ date: { $gte: unixStart } }, { date: { $lte: unixEnd } }],
  });

  return { incomes, expenses };
};

export default {
  findIncome,
  findExpense,
  findMonthTransactions,
  findMonthAmounts,
};
