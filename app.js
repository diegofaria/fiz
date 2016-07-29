var express = require('express')
var app = express()
var mongoose = require('mongoose')
var dotenv = require('dotenv')
var setupController = require('./controllers/setupController')
var apiController = require('./controllers/apiController')
var Todo = require('./models/todoModel')

dotenv.load({ path: '.env.example' });

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

mongoose.connect(process.env.MONGODB_URI)
setupController(app)
apiController(app)

app.listen(port)
