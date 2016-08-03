var dotenv = require('dotenv')
var mongoose = require('mongoose')
var express = require('express')
var app = express()

var passport = require('passport')
var session = require('express-session')
var RedisStore = require('connect-redis')(session)

var config = require('./config')
var setupController = require('./controllers/setupController')
var apiController = require('./controllers/apiController')
var Todo = require('./models/todoModel')


dotenv.load({ path: '.env.example' });

var port = process.env.PORT || 3000

app.use('/assets', express.static(__dirname + '/public'))
app.use('/vendor/bulma/', express.static(__dirname + '/node_modules/bulma/css'))
app.use('/vendor/jquery/', express.static(__dirname + '/node_modules/jquery/dist'))

app.use(session({
    store: new RedisStore({
        url: config.redisStore.url
    }),
    secret: config.redisStore.secret,
    resave: false,
    saveUninitialized: false
}))


app.set('view engine', 'ejs')

app.get('/', function(req, res) {
    res.render('login')
})

app.get('/todos', function(req, res) {
    Todo.find({}, function(err, todos) {
        if (err) throw err

        res.render('index', { todos: todos })
    })
})

mongoose.connect(process.env.MONGODB_URI || MONGOLAB_URI)
setupController(app)
apiController(app)

app.listen(port)
