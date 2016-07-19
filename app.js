var express = require('express')
var app = express()
var mongoose = require('mongoose')
var config = require('./config')
var setupController = require('./controllers/setupController')
var apiController = require('./controllers/apiController')

var port = process.env.PORT || 3000

app.use('/assets', express.static(__dirname + '/public'))
app.use('/vendor/angular', express.static(__dirname + '/node_modules/angular'))

app.set('view engine', 'ejs')

app.get('/', function(req, res) {
    res.render('index')
})

mongoose.connect(config.getDbConnectionStringLocalhost())
setupController(app)
apiController(app)

app.listen(port)
