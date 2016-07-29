function TodoInput() {
    this.input = undefined
    this.refreshList = undefined
}

TodoInput.prototype.addTodo = function(description) {
    var _this = this

    $.ajax({
        url: '/api/todo/',
        type: 'POST',
        data: { todo: description }
    })
    .done(function() {
        _this.input.val('')
        _this.refreshList()
    })
    .fail(function(err) {
        console.log(err);
    })

}

TodoInput.prototype.init = function(refreshListCallback) {
    var _this = this
    
    _this.input = $('.js-todo-create-input')
    _this.refreshList = refreshListCallback

    _this.input.keyup(function(event){
        if(event.keyCode == 13)
            _this.addTodo(_this.input.val())
    })
}

var todoInput = new TodoInput()
