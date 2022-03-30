const axios = require('axios')
const prop = require('../extProperties')
const commissionRulesProcesser = require('../processers/commission-rules.processer')

const getCommissionDataController = () => {
  const getCommissionRates = async (req, res) => {
    try {
      var currencyConversionValue = 1
      if (req.currency && req.currency !== 'EUR') {
        currencyConversionValue = await _callExchangeRateService(req.currency)
      }

      let response = commissionRulesProcesser().applyComissionRules(
        req,
        currencyConversionValue
      )
      return res.status(200).json(response)
    } catch (error) {
      console.log('error -' + error)
      return res.status(500).json({ message: `${JSON.stringify(error)}` })
    }
  }

  const _callExchangeRateService = async (currency) => {
    console.log('calling exchange Rate service')

    let config = {
      method: 'get',
      url: prop().EXCHANGE_RATE_SERVICE_URL,
    }

    return await axios(config)
      .then(function (response) {
        if (response.data.success) {
          console.log('exchange rate service called successfully')
          return response.data.rates[currency]
        }
      })
      .catch(function (error) {
        // do to extract error handling in a utils function
        console.log('error while calling exchange rate service' + error)
      })
  }

  return {
    getCommissionRates,
  }
}

module.exports = getCommissionDataController
