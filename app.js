var express = require('express')
var app = express()
var mongoose = require('mongoose')
var config = require('./config')
var setupController = require('./controllers/setupController')
var apiController = require('./controllers/apiController')
var Todo = require('./models/todoModel')

var port = process.env.PORT || 3000

app.use('/assets', express.static(__dirname + '/public'))
app.use('/vendor/bulma/', express.static(__dirname + '/node_modules/bulma/css'))
app.use('/vendor/jquery/', express.static(__dirname + '/node_modules/jquery/dist'))

app.set('view engine', 'ejs')

app.get('/', function(req, res) {
    Todo.find({}, function(err, todos) {
        if (err) throw err

        res.render('index', { todos: todos })
    })
})

mongoose.connect(config.getDbConnectionString())
setupController(app)
apiController(app)

app.listen(port)
