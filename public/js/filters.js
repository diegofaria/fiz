function SearchFilters() {
    this.buttons = {
        'all': $('.js-todo-filters-all'),
        'todo': $('.js-todo-filters-todo'),
        'done': $('.js-todo-filters-done')
    }
    this.container = undefined
}

SearchFilters.prototype.all = function() {
    this.buttons['all'].addClass('is-active')
    this.buttons['todo'].removeClass('is-active')
    this.buttons['done'].removeClass('is-active')

    // this.container.load()
}

SearchFilters.prototype.todo = function() {
    this.buttons['todo'].addClass('is-active')
    this.buttons['all'].removeClass('is-active')
    this.buttons['done'].removeClass('is-active')
}

SearchFilters.prototype.done = function() {
    this.buttons['done'].addClass('is-active')
    this.buttons['todo'].removeClass('is-active')
    this.buttons['all'].removeClass('is-active')
}

SearchFilters.prototype.initializeBinds = function() {
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

SearchFilters.prototype.init = function(containerClass) {
    this.container = $(containerClass)

    this.initializeBinds()
}

var filters = new SearchFilters()
