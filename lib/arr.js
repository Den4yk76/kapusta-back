export const test = [
  {
    id: '6202235b936dff0b217cd85d',
    owner: '61ffcfa8d74369c7ce9db5c7',
    time: '1643857200744',
    count: 5000,
    category: 'Salary',
    description: 'My salary',
  },
  {
    id: '6202235b936dff0b217cd85r',
    owner: '61ffcfa8d74369c7ce9db5c7',
    time: '1689557253741',
    count: 2000,
    category: 'Salary',
    description: 'My salary',
  },
  {
    id: '6202235b936dff0b217cd8555',
    owner: '61ffcfa8d74369c7ce9db5c7',
    time: '1999857990714',
    count: 2000,
    category: 'Salary',
    description: 'My salary',
  },
];

const lastSixMonth = now => {
  let resultArray = [];
  let currentYear = now.getFullYear();
  let currentMonth = now.getMonth();
  let monthStart = new Date(currentYear, currentMonth, 1, 0, 0, 0, 0);
  resultArray.push({ start: +monthStart, end: +now, month: currentMonth + 1 });
  for (let i = 1; i <= 5; i++) {
    currentMonth = currentMonth - 1;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear = currentYear - 1;
    }
    let monthEnd = monthStart - 1;
    monthStart = new Date(currentYear, currentMonth, 1, 0, 0, 0, 0);
    resultArray.push({
      start: +monthStart,
      end: +monthEnd,
      month: currentMonth + 1,
    });
  }
  return resultArray;
};
let res = lastSixMonth(new Date());
console.log(res);
