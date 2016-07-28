var Todos = require('../models/todoModel')
var bodyParser = require('body-parser')

module.exports = function(app) {
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended:true }))

    app.get('/api/todos', function(req, res) {
        Todos.find(req.query, function(err, todos) {
            if (err) throw err
            res.render('todo-list/todo-items', { todos: todos })
        })
    })

    app.get('/api/todo/:id', function(req, res) {
        Todos.findById({ _id: req.params.id }, function(err, todo) {
            if (err) throw err
            res.send(todo)
        })
    })

    app.post('/api/todo', function(req, res) {
        var newTodo = { username: 'test'}
        if (req.body.todo !== undefined) newTodo['todo'] = req.body.todo
        if (req.body.isDone !== undefined) newTodo['isDone'] = req.body.isDone
        if (req.body.hasAttachment !== undefined) newTodo['hasAttachment'] = req.body.hasAttachment

        console.log(newTodo)

        if (req.body.id){
            Todos.findByIdAndUpdate(
                req.body.id,
                newTodo,
                function(err, todo) {
                    if (err) throw err
                    res.send('success.')
                }
            )
        } else {
            var todo = Todos(newTodo)

            todo.save(function(err) {
                if (err) throw err
                res.send('success.')
            })
        }
    })

    app.delete('/api/todo', function(req, res) {
        console.log('deletando: ' + req.body.id)
        Todos.findByIdAndRemove(req.body.id, function(err) {
            if (err) throw err
            res.send('success.')
        })
    })
}
