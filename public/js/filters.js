var username = 'test'

function TodosFilter() {
    this.buttons = {
        'all': $('.js-todo-filters-all'),
        'todo': $('.js-todo-filters-todo'),
        'done': $('.js-todo-filters-done')
    }
    this.filters = { username: undefined }
    this.container = undefined
}

TodosFilter.prototype.getTodos = function() {
    var _this = this

    $.get('/api/todos/', _this.filters)
    .done(function(data) {
        _this.container.html(data)
    })
}

TodosFilter.prototype.all = function() {
    this.buttons['all'].addClass('is-active')
    this.buttons['todo'].removeClass('is-active')
    this.buttons['done'].removeClass('is-active')

    delete this.filters['isDone']

    this.getTodos()
}

TodosFilter.prototype.todo = function() {
    this.buttons['todo'].addClass('is-active')
    this.buttons['all'].removeClass('is-active')
    this.buttons['done'].removeClass('is-active')

    this.filters['isDone'] = false

    this.getTodos()
}

TodosFilter.prototype.done = function() {
    this.buttons['done'].addClass('is-active')
    this.buttons['todo'].removeClass('is-active')
    this.buttons['all'].removeClass('is-active')

    this.filters['isDone'] = true

    this.getTodos()
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
    this.filters.username = username
    this.initializeBinds()
}

var filters = new TodosFilter()
