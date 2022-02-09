import repositoryReports from '../../repository/reports';

class ReportsService {
  async getMonthTransactions(unixStart, unixEnd, category) {
    const result = await repositoryReports.findMonthTransactions(
      unixStart,
      unixEnd,
      category,
    );
  }
}

export default ReportsService;
