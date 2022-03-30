const storedTransactions = require('../middleware/database')
const constants = require('../constants/application.constant')()

const commissionRulesProcesser = () => {
  /**
   * this function applyies the commission rules and retuns the amount
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  const applyComissionRules = (req, currencyExchangeRate) => {
    let response = {
      amount: _assignDefaultCommision(req, currencyExchangeRate),
      currency: 'EUR',
    }
    _applyBusinessRulesForCommission(response, req)
    // converting to string to match the provided response
    response.amount = response.amount.toString()
    return response
  }

  const _assignDefaultCommision = (req, currencyExchangeRate) => {
    let defaultComissionPercentage = 0.005 // 0.5% of every transaction
    // rounding the commission to two places, on assumption from the provided request and responses.
    let defaultCommision = (
      defaultComissionPercentage *
      currencyExchangeRate *
      parseFloat(req.amount)
    ).toFixed(2)
    defaultCommision = defaultCommision < 0.05 ? 0.05 : defaultCommision
    return defaultCommision
  }

  const _applyBusinessRulesForCommission = (response, req) => {
    _applyDiscountedCommissionRate(response, req)

    if (req.client_id && req.client_id === 42 && response.amount > 0.05) {
      response.amount = constants.CLIENT42_TRANSACTION_COMMISSION
    }

    return response
  }

  const _applyDiscountedCommissionRate = (response, req) => {
    let endDate = new Date(req.date)
    let startDate = new Date(endDate.getFullYear(), endDate.getMonth(), 1)
    
    // identify that if transactions over the past month from the date requested,
    // have exceeded the configured transaction turnover
    let totalMonthlyTransactionValue = 0
    storedTransactions().map((transactionData) => {
      let transactionDate = new Date(transactionData.date)
      if (
        transactionData.client_id === req.client_id &&
        transactionDate >= startDate &&
        transactionDate <= endDate
      ) {
        totalMonthlyTransactionValue += parseFloat(transactionData.amount)
      }
    })
    if (totalMonthlyTransactionValue >= constants.TRANSACTION_TURNOVER) {
      response.amount = constants.DISCOUNT_TRANSACTION_COMMISSION
    }
  }

  return {
    applyComissionRules,
  }
}

module.exports = commissionRulesProcesser
