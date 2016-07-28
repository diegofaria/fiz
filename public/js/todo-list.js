function TodoList() {}

TodoList.prototype.changeItemStatus = function(id, isDone) {
    $.post('/api/todo', { id: id, isDone: isDone })
        .done(function() {
            console.log('checked')
        })
}

TodoList.prototype.deleteItem = function(id) {

    $.ajax({
        url: '/api/todo',
        type: 'DELETE',
        dataType: 'json',
        data: { "id": id }
    })
    .done(function() {
        console.log("success");
    })
    .fail(function() {
        console.log("error");
    })
    .always(function() {
        console.log("complete");
    });

}

TodoList.prototype.init = function() {
    var _this = this

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
