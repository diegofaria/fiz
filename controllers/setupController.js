var Todos = require('../models/todoModel')

module.exports = function(app) {
    app.get('/api/setupTodos', function(req, res) {
        //seed database
        var starterTodos = [
            {
                username: 'test',
                todo: 'Buy milk',
                isDone: false,
                hasAttachment: false
            },
            {
                username: 'test',
                todo: 'Feed dog',
                isDone: true,
                hasAttachment: false
            },
            {
                username: 'test',
                todo: 'Learn node',
                isDone: false,
                hasAttachment: false
            }
        ]
        
        console.log('seeding.')
        Todos.create(starterTodos, function(err, results) {
            console.log('seeding return.')
            res.send(results)
        })
        console.log('passed seeding.')
        
    })
}