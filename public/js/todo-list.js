function TodoList() {}

TodoList.prototype.changeItemStatus = function(id, isDone) {
    $.post('/api/todo', { id: id, isDone: isDone})
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
    var todoItems = $('.js-todo-item').toArray()

    var _this = this
    todoItems.forEach(function(item) {
        var todoId = $(item).data('id')

        var checkbox = $(item).find(':checkbox')[0]
        $(checkbox).change(function() {
            _this.changeItemStatus(todoId, $(this).is(':checked'))
        })

        var deleteButton = $(item).find('.button')[0]
        $(deleteButton).click(function() {
            _this.deleteItem(todoId)
        })
    })

}

var todoList = new TodoList()
