function TodoList() {
    this.refreshList = undefined
}

TodoList.prototype.changeItemStatus = function(id, isDone) {
    $.post('/api/todo', { id: id, isDone: isDone })
        .done(function() {
            console.log('checked')
        })
}

TodoList.prototype.deleteItem = function(id) {
    var _this = this
    
    $.ajax({
        url: '/api/todo',
        type: 'DELETE',
        data: { "id": id }
    })
    .done(function() {
        _this.refreshList()
    })
    .fail(function() {
        console.log("error");
    })
    .always(function() {
        console.log("complete");
    });

}

TodoList.prototype.init = function(refreshListCallback) {
    var _this = this

    _this.refreshList = refreshListCallback

    var todoListContainer = $('.js-todos-container')
    todoListContainer.on('change', ':checkbox', function(event) {
        var todoId = $(this).closest('.js-todo-item').data('id')
        _this.changeItemStatus(todoId, $(this).is(':checked'))
    });
    todoListContainer.on('click', '.js-delete-todo-button', function(event) {
        var todoId = $(this).closest('.js-todo-item').data('id')
        _this.deleteItem(todoId)
    });

}

var todoList = new TodoList()
