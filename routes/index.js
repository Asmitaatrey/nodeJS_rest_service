var express = require('express')
var router = express.Router()
const controllers = require('../controllers/get-commission-rate.controller')

router.post('/getCommissionRate', function (req, res) {
  const commissionRateController = controllers()
  return commissionRateController.getCommissionRates(req.body, res)
})

module.exports = router
