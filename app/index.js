const path = require('path')

const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)

const config = require('../config')
const app = express()

const setupController = require('./controllers/setupController')
const apiController = require('./controllers/apiController')
const Todo = require('./models/todoModel')

require('./authentication').init(app)

app.use(session({
    store: new RedisStore({
        url: config.redisStore.url
    }),
    secret: config.redisStore.secret,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/assets', express.static(__dirname + '/public'))
app.use('/vendor/bulma/', express.static(__dirname + '../../node_modules/bulma/css'))
app.use('/vendor/jquery/', express.static(__dirname + '../../node_modules/jquery/dist'))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname) + '/views')

app.get('/', function(req, res) {
    res.render('login')
})

app.post('/login', passport.authenticate('local', {
    successRedirect: '/todos',
    failureRedirect: '/'
}))

app.get('/todos', function(req, res) {
    Todo.find({}, function(err, todos) {
        if (err) throw err

        res.render('index', { todos: todos })
    })
})

mongoose.connect(process.env.MONGODB_URI || MONGOLAB_URI)
setupController(app)
apiController(app)

module.exports = app
