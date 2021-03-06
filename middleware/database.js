// in real life app, will have functions to fetch / insert data from Database
const storedTransactionsDatabase = () => {
  return [
    {
      client_id: 42,
      date: '2021-01-02',
      amount: 2000,
      currency: 'EUR',
      commission_amount: 0.05,
      commission_currency: 'EUR',
    },
    {
      client_id: 1,
      date: '2021-01-03',
      amount: 500,
      currency: 'EUR',
      commission_amount: 2.5,
      commission_currency: 'EUR',
    },
    {
      client_id: 1,
      date: '2021-01-04',
      amount: 499,
      currency: 'EUR',
      commission_amount: 2.5,
      commission_currency: 'EUR',
    },
    {
      client_id: 1,
      date: '2021-01-05',
      amount: 100,
      currency: 'EUR',
      commission_amount: 0.5,
      commission_currency: 'EUR',
    },
    {
      client_id: 1,
      date: '2021-01-06',
      amount: 1,
      currency: 'EUR',
      commission_amount: 0.03,
      commission_currency: 'EUR',
    },
    {
      client_id: 1,
      date: '2021-02-01',
      amount: 500,
      currency: 'EUR',
      commission_amount: 2.5,
      commission_currency: 'EUR',
    },
  ]
}

module.exports = storedTransactionsDatabase
