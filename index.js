const bodyParser = require('body-parser')
const cors = require('cors')
const app = require('express')()

const port = 8088

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
  req.socket.on('error', function (err) {
    console.log('error - req' + err)
  })
  res.socket.on('error', function (err) {
    console.log('error - res' + err)
  })

  next()
})

var defaultRoutes = require('./routes/index.js')
app.use('/connect/api', defaultRoutes)

app
  .listen(port, function () {
    console.log('8088 ~ ~')
  })
  .on('error', function (err) {
    //we can define dashboards in sumologic and ELK using 'error in service call' search param
    console.log('error in service call - ' + err)
  })
