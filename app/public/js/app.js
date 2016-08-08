angular.module('TodoApp', [])

angular.module('TodoApp')
    .controller('MainController', ctrlFunc)

function ctrlFunc() {
    this.message = 'Hello'
}