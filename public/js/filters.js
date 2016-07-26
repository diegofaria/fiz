var username = 'test'

function TodosFilter() {
    this.buttons = {
        'all': $('.js-todo-filters-all'),
        'todo': $('.js-todo-filters-todo'),
        'done': $('.js-todo-filters-done')
    }
    this.container = undefined
}

TodosFilter.prototype.getTodos = function(filters) {
    var _this = this

    $.get('/api/todos/', filters)
    .done(function(data) {
        _this.container.html(data)
    })
}

TodosFilter.prototype.all = function() {
    this.buttons['all'].addClass('is-active')
    this.buttons['todo'].removeClass('is-active')
    this.buttons['done'].removeClass('is-active')

    this.getTodos({ username: username })
}

TodosFilter.prototype.todo = function() {
    this.buttons['todo'].addClass('is-active')
    this.buttons['all'].removeClass('is-active')
    this.buttons['done'].removeClass('is-active')

    this.getTodos({ isDone: false, username: username})
}

TodosFilter.prototype.done = function() {
    this.buttons['done'].addClass('is-active')
    this.buttons['todo'].removeClass('is-active')
    this.buttons['all'].removeClass('is-active')

    this.getTodos({ isDone: true, username: username})
}

TodosFilter.prototype.initializeBinds = function() {
    var _this = this

    this.buttons['all'].click(function(){
        _this.all()
    })

    this.buttons['todo'].click(function(){
        _this.todo()
    })

    this.buttons['done'].click(function(){
        _this.done()
    })
}

TodosFilter.prototype.init = function(containerClass) {
    this.container = $(containerClass)

    this.initializeBinds()
}

var filters = new TodosFilter()
