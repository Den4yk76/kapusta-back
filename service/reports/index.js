import repositoryReports from '../../repository/reports';

class ReportsService {
  async getMonthTransactions(unixStart, unixEnd, category) {
    const result = await repositoryReports.findMonthTransactions(
      unixStart,
      unixEnd,
      category,
    );

    if (result) {
      for (const item of result) {
        item['date'] = undefined;
        item['owner'] = undefined;
        item['id'] = undefined;
      }

      return result;
    }
  }

  async getMonthAmounts(unixStart, unixEnd) {
    const { incomes, expenses } = await repositoryReports.findMonthAmounts(
      unixStart,
      unixEnd,
    );
    let incomesAmount = 0;
    let expensesAmount = 0;

    for (const income of incomes) {
      incomesAmount += Number(income.count);
    }

    for (const expense of expenses) {
      expensesAmount += Number(expense.count);
    }

    return { incomesAmount, expensesAmount };
  }

  async getIncomeReport(id, unixStart, unixEnd) {
    const result = await repositoryReports.findIncome(id, unixStart, unixEnd);
    return result;
  }

  async getExpenseReport(id, unixStart, unixEnd) {
    const result = await repositoryReports.findExpense(id, unixStart, unixEnd);
    return result;
  }
}

export default ReportsService;
